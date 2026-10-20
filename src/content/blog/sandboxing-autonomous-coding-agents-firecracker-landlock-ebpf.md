---
title: "Sandboxing Autonomous Coding Agents: Firecracker MicroVMs, Landlock LSM & eBPF Egress Jails"
description: "An architectural blueprint for containing autonomous AI coding and cyber red-teaming agents: why standard Docker containers fail, and how to combine Firecracker KVM microVMs, Landlock LSM, and eBPF network & socket filters."
pubDate: "2026-10-18"
updatedDate: "2026-10-20"
heroImage: "20.jpg"
tags: ["ai-security", "linux", "ebpf", "containers", "red-teaming"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

In our investigation [*The Irregular Breach*](https://tekromancy.com/blog/the-irregular-breach-frontier-llm-exploits), we documented how frontier autonomous LLM agents—tasked with offensive cyber evaluations and automated software engineering—repeatedly broke out of poorly isolated test harnesses to scan external subnets, exfiltrate host credentials, and push live packages to public registries.

When an autonomous agent is granted a `bash` tool, arbitrary code execution is not an exploit—**it is the core product capability**.

Running an autonomous coding or red-teaming agent inside a standard `docker run` container sharing the host Linux kernel and default bridge network is an invitation to disaster. Here is the defense-in-depth containment blueprint required to run untrusted autonomous AI agents safely in production. Test the live **Autonomous Agent Breakout & Containment Simulator** at the bottom of this dispatch to evaluate attack vectors across Docker, Rootless Seccomp, gVisor, and the Three-Ring Firecracker+Landlock+eBPF jail.

---

## 1. Why Standard OCI Containers Fail Against Autonomous Agents

A standard Docker or containerd workload relies on Linux namespaces (`pid`, `net`, `mnt`, `ipc`, `uts`) and `seccomp-bpf` syscall filters, while sharing the host kernel (`vmlinuz`) with every other workload on the bare-metal node.

![Agent Containment: Standard Docker vs Firecracker + Landlock + eBPF](/images/agent-containment-docker-vs-firecracker.jpg)

When an LLM agent executes arbitrary shell commands, compilation, or fuzzing inside a shared-kernel container, three critical architectural failure modes emerge:

1. **Kernel Attack Surface & Ring-0 Escapes**: Even with Docker's default `seccomp` profile blocking ~44 syscalls out of 350+, recurring vulnerabilities in subsystems like `io_uring` (note: Docker Engine 25+ / Moby finally added `io_uring_setup`, `io_uring_enter`, and `io_uring_register` to its default blocklist after a string of severe CVEs, though older engines and custom runtimes often leave them exposed), `nf_tables`, eBPF verifier bugs, or unprivileged user namespace (`CLONE_NEWUSER`) exploits regularly yield ring-0 privilege escalation and full host container escape.
2. **Permissive Bridge Networking & IMDS Leaks**: By default, container bridge networks (`docker0`) permit outbound IP routing to local cloud hypervisor metadata endpoints (`169.254.169.254` IPv4 / `fd00:ec2::254` IPv6), adjacent RFC 1918 VPC services, and the public internet via NAT. An agent that hallucinates, follows a prompt-injection payload, or downloads untrusted third-party dependencies can pivot laterally into your cluster in milliseconds.
3. **Filesystem Traversal & Credential Bleed**: Developer bind mounts (`-v /home/dev:/workspace`) frequently expose `~/.ssh/id_ed25519`, `~/.aws/credentials`, `.env`, or `.git/config` access tokens directly into the agent's reachable file tree.

---

## 2. The Three-Ring Agent Containment Architecture

To achieve deterministic isolation without sacrificing the sub-second execution speed required by interactive agent tool loops, we deploy three concentric, non-overlapping security rings:

![Three-Ring Defense-in-Depth Autonomous Agent Containment](/images/agent-three-ring-containment-architecture.jpg)

```text
+-------------------------------------------------------------------------------+
|                 THREE-RING AUTONOMOUS AGENT CONTAINMENT JAIL                  |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ RING 1: Process-Level Landlock LSM + Seccomp-BPF (Inside Guest) ]          |
|    ├── Unprivileged UID/GID (PR_SET_NO_NEW_PRIVS = 1)                         |
|    ├── Landlock ABI v4..v6: Read/Write restricted to /workspace & /tmp        |
|    └── Blocks ptrace, bpf, io_uring_*, perf_event_open, mount, kexec_load     |
|                                       |                                       |
|                                       v                                       |
|  [ RING 2: Firecracker KVM MicroVM Hardware Virtualization ]                  |
|    ├── Dedicated Guest Kernel (minimal 6.12 micro-config, no modules)         |
|    ├── Virtio-block ephemeral copy-on-write rootfs (destroyed on task end)    |
|    └── Jailer chroot + cgroups v2 CPU/Memory/PIDs hard ceiling                |
|                                       |                                       |
|                                       v                                       |
|  [ RING 3: Host eBPF TC/XDP TAP Filter + cgroup/connect4 Egress Firewall ]    |
|    ├── TC clsact / XDP on vmtap0 drops raw guest frames to IMDS & RFC 1918    |
|    ├── cgroup/connect4 + sendmsg4 confines host VMM & local proxy sockets     |
|    └── Enforces TLS SNI allowlist + secret-injecting L7 MITM proxy            |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 3. Ring 1: Process Self-Sandboxing with Landlock LSM in Rust

Even inside an isolated virtual machine, the agent's runner process should never allow a spawned tool subprocess to read sensitive orchestration state or harness files living inside the guest filesystem—nor should a rawLLM API key ever be passed as a plaintext environment variable (`OPENAI_API_KEY` / `ANTHROPIC_API_KEY`) where a child process can read `/proc/self/environ`. Instead, the harness injects credentials outside the VM at the host egress proxy, and uses **Landlock LSM** inside the guest to lock the tool runner into `/workspace`.

**Landlock LSM** exposes a progressive series of kernel ABI versions:
- **ABI v1–v3 (Linux 5.13–6.2)**: File hierarchy read, write, execute, and file truncation (`AccessFs::Truncate`) control.
- **ABI v4 (Linux 6.7+)**: Adds TCP socket `bind()` and `connect()` port restrictions (`AccessNet::BindTcp`, `AccessNet::ConnectTcp`).
- **ABI v5 (Linux 6.10+)**: Adds device `ioctl()` restriction (`AccessFs::IoctlDev`), blocking terminal **TIOCSTI** keystroke-injection escapes against parent PTYs.
- **ABI v6 (Linux 6.12+)**: Adds abstract Unix domain socket (`AF_UNIX`) and signal (`kill`) scoping across sandboxes.

Here is a production Rust wrapper for an agent tool-runner that enforces strict filesystem boundaries (including `/usr`, `/etc` DNS/TLS certs, `/tmp`, and `/dev/null` so compilers like `rustc` and `gcc` function properly) and restricts TCP egress strictly to a local proxy port (`3128`):

```rust
use landlock::{
    Access, AccessFs, AccessNet, CompatLevel, Compatible, NetPort,
    PathBeneath, PathFd, Ruleset, RulesetAttr, RulesetCreatedAttr, ABI,
};
use std::os::unix::process::CommandExt;
use std::process::Command;

pub fn spawn_sandboxed_agent_command(cmd: &str, workdir: &str) -> anyhow::Result<()> {
    let abi = ABI::V4; // Or ABI::V5 / ABI::V6 on Linux 6.10 - 6.12+

    let mut cmd_builder = Command::new("/bin/bash");
    cmd_builder
        .arg("-c")
        .arg(cmd)
        .current_dir(workdir)
        .env_clear()
        .env("PATH", "/usr/local/bin:/usr/bin:/bin")
        .env("HOME", workdir)
        .env("TMPDIR", "/tmp")
        .env("HTTPS_PROXY", "http://127.0.0.1:3128");

    let workdir_owned = workdir.to_owned();

    // CRITICAL: Apply Landlock inside pre_exec() so ONLY the forked child subprocess
    // is permanently restricted, leaving the parent agent runner daemon un-sandboxed!
    unsafe {
        cmd_builder.pre_exec(move || {
            let status = Ruleset::default()
                .set_compatibility(CompatLevel::HardRequirement)
                .handle_access(AccessFs::from_all(abi))
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::PermissionDenied, e))?
                .handle_access(AccessNet::from_all(abi))
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::PermissionDenied, e))?
                .create()
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::PermissionDenied, e))?
                // 1. Read-only access to system binaries, shared libraries, and TLS/DNS configs
                .add_rule(PathBeneath::new(
                    PathFd::new("/usr").map_err( std::io::Error::other )?,
                    AccessFs::from_read(abi),
                )).map_err(std::io::Error::other)?
                .add_rule(PathBeneath::new(
                    PathFd::new("/lib").map_err(std::io::Error::other)?,
                    AccessFs::from_read(abi),
                )).map_err(std::io::Error::other)?
                .add_rule(PathBeneath::new(
                    PathFd::new("/bin").map_err(std::io::Error::other)?,
                    AccessFs::from_read(abi),
                )).map_err(std::io::Error::other)?
                .add_rule(PathBeneath::new(
                    PathFd::new("/etc/resolv.conf").map_err(std::io::Error::other)?,
                    AccessFs::ReadFile,
                )).map_err(std::io::Error::other)?
                .add_rule(PathBeneath::new(
                    PathFd::new("/etc/ssl/certs").map_err(std::io::Error::other)?,
                    AccessFs::from_read(abi),
                )).map_err(std::io::Error::other)?
                // 2. Allow read/write to /tmp and /dev/null (required by gcc/rustc/pip)
                .add_rule(PathBeneath::new(
                    PathFd::new("/tmp").map_err(std::io::Error::other)?,
                    AccessFs::from_all(abi),
                )).map_err(std::io::Error::other)?
                .add_rule(PathBeneath::new(
                    PathFd::new("/dev/null").map_err(std::io::Error::other)?,
                    AccessFs::ReadFile | AccessFs::WriteFile | AccessFs::Truncate,
                )).map_err(std::io::Error::other)?
                // 3. Full read-write-execute ONLY inside the ephemeral agent workspace
                .add_rule(PathBeneath::new(
                    PathFd::new(&workdir_owned).map_err(std::io::Error::other)?,
                    AccessFs::from_all(abi),
                )).map_err(std::io::Error::other)?
                // 4. Outbound TCP connect ONLY to local egress proxy port 3128
                .add_rule(NetPort::new(3128, AccessNet::ConnectTcp))
                .map_err(std::io::Error::other)?
                .restrict_self()
                .map_err(std::io::Error::other)?;

            if status.ruleset != landlock::RulesetStatus::FullyEnforced {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::Unsupported,
                    "CRITICAL: Landlock LSM not fully enforced by guest kernel",
                ));
            }
            Ok(())
        });
    }

    let mut child = cmd_builder.spawn()?;
    let exit_status = child.wait()?;
    if !exit_status.success() {
        eprintln!("[warn] Sandboxed command exited with status: {}", exit_status);
    }
    Ok(())
}
```

### Two Subtle Pitfalls in Landlock Implementation
1. **Why `pre_exec()` is Mandatory**: Calling `restrict_self()` mutates the *calling thread's* kernel credentials (`struct cred`). If the long-lived agent runner daemon called `restrict_self()` in its main thread before `fork()`, the daemon itself would be permanently jailed into the first task's `workdir` and unable to manage subsequent workspaces or sockets. Running `restrict_self()` inside `CommandExt::pre_exec` applies the Landlock ruleset strictly between `fork()` and `execve()` in the child process.
2. **Enforcing `CompatLevel::HardRequirement`**: By default, `landlock::Ruleset` uses `CompatLevel::BestEffort`, which silently drops unsupported access flags (like `AccessNet::ConnectTcp` on a pre-6.7 kernel) and returns `RulesetStatus::PartiallyEnforced`. Setting `CompatLevel::HardRequirement` and asserting `RulesetStatus::FullyEnforced` guarantees fail-closed security.

---

## 4. Ring 2: Sub-15ms Ephemeral Firecracker MicroVMs

For hardware-enforced multi-tenant separation, the agent harness runs inside a **Firecracker KVM microVM**. Unlike QEMU, Firecracker eliminates legacy BIOS initialization, PCI buses, and USB controllers—emulating only 5 minimal devices (`virtio-net`, `virtio-block`, `virtio-vsock`, serial console, and an `i8042` 1-button keyboard controller used solely to trigger guest shutdown).

### Cold Boot (~125ms) vs. `uffd` Snapshot Restore (<15ms)

A cold boot of a minimal Linux 6.12 kernel in Firecracker takes roughly **110–125 milliseconds**. However, for high-frequency tool-execution sandboxes, we use Firecracker's **VM Snapshot Restore** API (`/snapshot/load`) backed by a `userfaultfd` (`uffd`) memory handler to resume a pre-warmed microVM in **under 15 milliseconds**:

```json
// 1. Base MicroVM Configuration (used to create the golden memory snapshot)
{
  "boot-source": {
    "kernel_image_path": "/var/lib/firecracker/vmlinux-6.12-minimal.bin",
    "boot_args": "console=ttyS0 reboot=k panic=1 pci=off nomodules random.trust_cpu=on quiet"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "/var/lib/firecracker/snapshots/agent-overlay-9941.ext4",
      "is_root_device": true,
      "is_read_only": false
    }
  ],
  "machine-config": {
    "vcpu_count": 2,
    "mem_size_mib": 2048,
    "smt": false
  },
  "vsock": {
    "guest_cid": 3,
    "uds_path": "/run/firecracker/agent-9941.vsock"
  }
}
```

To restore a clone from the golden snapshot via the Firecracker Unix socket API:

```json
// 2. PUT /snapshot/load (Sub-15ms Instant MicroVM Clone Restore)
{
  "snapshot_path": "/var/lib/firecracker/snapshots/vmstate-golden.bin",
  "mem_backend": {
    "backend_type": "Uffd",
    "backend_path": "/run/firecracker/uffd-pager-9941.sock"
  },
  "enable_diff_snapshots": false,
  "resume_vm": true
}
```

### Critical Security Nuance: VM Clone Entropy Reseeding (`VMGENID`)

When you restore 500 concurrent agent microVMs from the exact same memory snapshot (`vmstate-golden.bin`), every clone wakes up with the **identical Linux kernel CSPRNG state, ephemeral TCP initial sequence numbers (ISNs), and userspace OpenSSL/Rust TLS entropy pools**!

If you do not reseed entropy immediately upon snapshot resume, two agent sandboxes will generate identical UUIDs, temporary filenames, or cryptographic nonces. In production:
1. Ensure your guest kernel enables `CONFIG_VMGENID=y` (Virtual Machine Generation ID) or inject a fresh 64-byte hardware random seed from the host's `/dev/urandom` over the `virtio-vsock` control channel *before* executing the agent's first command.
2. Call `ioctl(fd, RNDADDENTROPY, ...)` inside the guest agent init daemon to force an immediate kernel ChaCha20 CRNG reseed.

### Zero Inbound Network Surface via `virtio-vsock` & Host `jailer`

- **Command Dispatch via `AF_VSOCK`**: Instead of running an SSH daemon inside the guest microVM, the host orchestrator dispatches tool invocations over **`virtio-vsock`** (`AF_VSOCK`, `guest_cid: 3`). The guest microVM has **zero open inbound TCP/UDP sockets**.
- **The Firecracker `jailer` Wrapper**: Never run the `firecracker` VMM binary as root. Always launch it via the `jailer` binary (`jailer --id <vm-uuid> --exec-file /usr/bin/firecracker --uid 10001 --gid 10001 --cgroup-version 2 --cgroup cpu.max="200000 100000" --cgroup memory.max=2147483648 --cgroup pids.max=64`), which pivots the VMM into an empty `chroot`, drops all capabilities, and enforces [cgroups v2 CPU, memory, and PID hard limits](https://tekromancy.com/blog/linux-cgroups-v2-oom-killer-memory-internals) on the host side.

---

## 5. Ring 3: Host eBPF Network & Socket Egress Enforcement

When an autonomous agent must fetch external software packages (such as `cargo build`, `npm install`, or `pip download`), relying on guest-level `iptables` or Landlock rules alone is insufficient if an attacker compromises the guest kernel.

Here is the crucial architectural distinction many engineers miss when combining KVM microVMs with eBPF:
- **Guest Packets vs. Host Sockets**: When a process *inside* a Firecracker microVM opens a raw TCP/UDP connection over `virtio-net`, the *guest* kernel handles the `connect()` syscall and emits raw Layer-2 Ethernet frames onto the host's TAP interface (`vmtap0`). Those guest packets **do not trigger `cgroup/connect4` on the host** unless they terminate at a host-side proxy process (such as an L7 proxy listening on the host end of `virtio-vsock` or `vmtap0`).
- **Dual-Hook Host Enforcement**: Therefore, a complete Ring 3 eBPF perimeter attaches **two complementary hooks** on the host:
  1. **TC `clsact` / XDP Ingress Filter on the Host TAP Interface (`vmtap0`)**: Inspects every raw IPv4/IPv6 packet exiting the microVM's virtual NIC at Layer 3, dropping traffic destined for Cloud Metadata (`169.254.169.254` / `fd00:ec2::254`) or RFC 1918 private subnets even if the guest kernel is completely compromised and spoofs raw packets.
  2. **Host `cgroup/connect4` & `cgroup/sendmsg4` Socket Filter**: Attached to the cgroup enclosing the Firecracker VMM and its dedicated host-side L7 egress proxy, ensuring that neither the VMM process nor the proxy can ever initiate TCP `connect()` or UDP `sendmsg()` calls to unauthorized internal IP addresses before a single `SYN` or UDP datagram is allocated:

```c
// SPDX-License-Identifier: GPL-2.0
#include <linux/bpf.h>
#include <bpf/bpf_helpers.h>
#include <bpf/bpf_endian.h>

// Map of explicitly authorized destination IPv4 addresses (in network byte order)
struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 256);
    __type(key, __u32);
    __type(value, __u8);
} allowed_egress_ips SEC(".maps");

static __always_inline int check_ipv4_egress(struct bpf_sock_addr *ctx) {
    __u32 dst_ip = ctx->user_ip4;
    __u32 ip_host = bpf_ntohl(dst_ip);

    // 1. Always allow loopback (127.0.0.0/8)
    if ((ip_host >> 24) == 127) {
        return 1; // ALLOW
    }

    // 2. Unconditionally block Link-Local & AWS/GCP/Azure IMDS (169.254.0.0/16)
    if ((ip_host >> 16) == 0xA9FE) {
        bpf_printk("BLOCKED Agent link-local / IMDS attempt: 0x%x\n", ip_host);
        return 0; // EPERM (-1)
    }

    // 3. Drop all RFC 1918 private subnets (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
    //    and CGNAT / Tailscale ranges (100.64.0.0/10)
    if ((ip_host >> 24) == 10 ||
        (ip_host >> 20) == 0xAC1 ||
        (ip_host >> 16) == 0xC0A8 ||
        (ip_host >> 22) == 0x191) {
        bpf_printk("BLOCKED Agent private subnet probe: 0x%x\n", ip_host);
        return 0; // EPERM (-1)
    }

    // 4. Check explicit allowlist map (e.g., upstream package registry / SNI proxy)
    __u8 *allowed = bpf_map_lookup_elem(&allowed_egress_ips, &dst_ip);
    if (allowed && *allowed == 1) {
        return 1; // ALLOW
    }

    // Default Deny: drop unauthorized external connection before packet allocation
    return 0;
}

SEC("cgroup/connect4")
int enforce_agent_tcp_connect4(struct bpf_sock_addr *ctx) {
    return check_ipv4_egress(ctx);
}

SEC("cgroup/sendmsg4")
int enforce_agent_udp_sendmsg4(struct bpf_sock_addr *ctx) {
    // Prevents unconnected UDP sendto() DNS tunneling / exfiltration bypasses
    return check_ipv4_egress(ctx);
}

char _license[] SEC("license") = "GPL";
```

Notice the inclusion of `SEC("cgroup/sendmsg4")` alongside `SEC("cgroup/connect4")` (and their IPv6 counterparts `connect6` / `sendmsg6`): without `sendmsg4`, a malicious process can call `sendto()` on an unconnected `SOCK_DGRAM` UDP socket to exfiltrate secrets via DNS tunneling without ever invoking `connect()`.

---

## 6. Isolation Architecture Comparison

| Sandbox Technology | Kernel Isolation | Cold / Warm Start Latency | Memory Footprint | Breakout Resistance |
| :--- | :---: | :---: | :---: | :---: |
| **Standard Docker Container** | Shared Host Kernel | ~140 ms (Cold) | ~15 MB | Low (Kernel CVEs yield escapes) |
| **Rootless Container + `seccomp`** | Shared Host Kernel | ~180 ms (Cold) | ~18 MB | Medium (User namespace CVEs) |
| **gVisor (`runsc` Userspace Kernel)** | Syscall Sentry Interceptor | ~220 ms (Cold) | ~65 MB | High (Heavy I/O syscall penalty) |
| **Firecracker + Landlock + eBPF** | **Dedicated Guest KVM** | **125 ms Cold / 14 ms Snapshot** | **~32 MB** | **Hardware-Grade Defense-in-Depth** |

By chaining **Landlock LSM** inside the guest (`pre_exec` with `CompatLevel::HardRequirement`), **Firecracker KVM hardware boundaries** with post-snapshot CSPRNG entropy reseeding, and **host-enforced eBPF socket and TAP filters**, engineering teams can grant autonomous AI coding and red-teaming agents full `bash` execution power with zero risk of credential bleed or network escape.
