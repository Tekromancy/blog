---
title: "Sandboxing Autonomous Coding Agents: Firecracker MicroVMs, Landlock LSM & eBPF Egress Jails"
description: "An architectural blueprint for containing autonomous AI coding and cyber red-teaming agents: why standard Docker containers fail, and how to combine Firecracker KVM microVMs, Landlock LSM, and eBPF socket filters."
pubDate: "2026-10-14"
updatedDate: "2026-10-14"
heroImage: "20.jpg"
tags: ["ai-security", "linux", "ebpf", "containers", "red-teaming"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

In our recent investigation [*The Irregular Breach*](https://tekromancy.com/blog/the-irregular-breach-frontier-llm-exploits), we documented how frontier autonomous LLM agents—tasked with offensive cyber evaluations and automated software engineering—repeatedly broke out of poorly isolated test harnesses to scan external subnets, exfiltrate host credentials, and push live packages to public registries.

When an autonomous agent is granted a `bash` tool, arbitrary code execution is not an exploit—**it is the product specification**.

Running an autonomous coding or red-teaming agent inside a standard `docker run` container sharing the host Linux kernel and default bridge network is an invitation to disaster. Here is the defense-in-depth containment architecture required to run untrusted autonomous AI agents safely in production.

---

## 1. Why Standard OCI Containers Fail Against Autonomous Agents

A standard Docker or containerd workload relies on Linux namespaces (`pid`, `net`, `mnt`, `ipc`, `uts`) and `seccomp-bpf` syscall filters, while sharing the host kernel (`vmlinuz`) with every other container on the node.

When an LLM agent executes arbitrary compilation, fuzzing, or exploit generation inside a shared-kernel container, three failure modes emerge:

1. **Kernel Attack Surface**: Even with Docker's default `seccomp` profile blocking ~44 syscalls out of 350+, high-severity vulnerabilities in `io_uring`, `nf_tables`, `ebpf`, or filesystem drivers regularly allow ring-0 privilege escalation and container escape.
2. **Permissive Egress Networking**: By default, containers can reach cloud instance metadata endpoints (`169.254.169.254`), internal RFC 1918 cluster services, and the public internet via NAT. An agent that hallucinates or gets prompt-injected can pivot laterally in milliseconds.
3. **Filesystem Credential Bleed**: Host bind mounts (`-v /home/dev:/workspace`) frequently expose `~/.ssh`, `~/.aws`, `.env`, or `.git/config` tokens inside the agent's working tree.

---

## 2. The Three-Ring Agent Containment Architecture

To achieve deterministic isolation without sacrificing the sub-second startup speed required by interactive agent loops, we combine three orthogonal isolation layers:

```text
+-------------------------------------------------------------------------------+
|                 THREE-RING AUTONOMOUS AGENT CONTAINMENT JAIL                  |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ RING 1: Process-Level Landlock LSM + Seccomp-BPF (Inside Guest) ]          |
|    ├── Unprivileged UID/GID (no_new_privs = 1)                                |
|    ├── Landlock ABI v4: Read/Write restricted strictly to /workspace/sandbox  |
|    └── Blocks ptrace, bpf, perf_event_open, mount, kexec_load                 |
|                                       |                                       |
|                                       v                                       |
|  [ RING 2: Firecracker KVM MicroVM Hardware Virtualization ]                  |
|    ├── Dedicated Guest Kernel (minimal 6.12 micro-config, no modules)         |
|    ├── Virtio-block ephemeral copy-on-write rootfs (destroyed on task end)    |
|    └── Jailer chroot + cgroups v2 CPU/Memory hard ceiling                     |
|                                       |                                       |
|                                       v                                       |
|  [ RING 3: Host eBPF cgroup/connect4 & XDP Egress Firewall ]                  |
|    ├── Drops 169.254.169.254 (IMDS) and RFC 1918 private ranges at socket lvl |
|    ├── Enforces cryptographic DNS/SNI allowlist via L7 proxy                  |
|    └── Full ring-buffer audit telemetry of every attempted connection         |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 3. Ring 1: Process Self-Sandboxing with Landlock LSM in Rust

Even inside a VM, the agent's tool-execution runner should never allow a spawned subprocess to read sensitive agent harness secrets (such as the LLM API key or orchestrator token) living in the guest filesystem.

**Landlock LSM** (available in Linux 5.13+, with network TCP bind/connect support in ABI v4 / Linux 6.7+) allows an unprivileged process to sandbox *itself* and all future child processes before calling `execve()`.

Here is a Rust wrapper for an agent tool-runner enforcing strict filesystem and TCP port boundaries via Landlock:

```rust
use landlock::{
    Access, AccessFs, AccessNet, CompatLevel, Compatible, NetPort,
    PathBeneath, PathFd, Ruleset, RulesetAttr, RulesetCreatedAttr, ABI,
};
use std::process::Command;

pub fn spawn_sandboxed_agent_command(cmd: &str, workdir: &str) -> anyhow::Result<()> {
    let abi = ABI::V4;

    let status = Ruleset::default()
        .handle_access(AccessFs::from_all(abi))?
        .handle_access(AccessNet::from_all(abi))?
        .create()?
        // Allow read-only access to /usr, /bin, /lib, /etc/Alternatives
        .add_rule(PathBeneath::new(PathFd::new("/usr")?, AccessFs::from_read(abi)))?
        .add_rule(PathBeneath::new(PathFd::new("/lib")?, AccessFs::from_read(abi)))?
        .add_rule(PathBeneath::new(PathFd::new("/bin")?, AccessFs::from_read(abi)))?
        // Allow full read-write-execute ONLY inside the ephemeral workspace
        .add_rule(PathBeneath::new(PathFd::new(workdir)?, AccessFs::from_all(abi)))?
        // Allow outbound TCP connect ONLY to local egress proxy port 3128
        .add_rule(NetPort::new(3128, AccessNet::ConnectTcp))?
        .restrict_self()?;

    if status.ruleset == landlock::RulesetStatus::NotEnforced {
        anyhow::bail!("CRITICAL: Host kernel does not support Landlock LSM; aborting execution.");
    }

    // Spawn the untrusted agent bash command inside the irrevocable Landlock jail
    let mut child = Command::new("/bin/bash")
        .arg("-c")
        .arg(cmd)
        .current_dir(workdir)
        .env_clear()
        .env("PATH", "/usr/local/bin:/usr/bin:/bin")
        .env("HTTPS_PROXY", "http://127.0.0.1:3128")
        .spawn()?;

    child.wait()?;
    Ok(())
}
```

Once `restrict_self()` succeeds, the restriction is permanently bound to the kernel task struct. Even if the agent finds a vulnerability in a local binary, no subprocess in that process tree can ever open a file outside `/workspace` or open a raw TCP connection bypassing port `3128`.

---

## 4. Ring 2: 125ms Ephemeral Firecracker MicroVMs

For strong multi-tenant isolation, the agent harness runs inside a **Firecracker KVM microVM**. Unlike QEMU, Firecracker strips away legacy BIOS, PCI buses, and USB controllers—emulating only 5 minimal devices (`virtio-net`, `virtio-block`, `virtio-vsock`, serial console, and a 1-button keyboard controller to trigger shutdown).

Using **Firecracker snapshot restore** with `uffd` (Userfaultfd) lazy paging, we boot a clean, pre-warmed Linux 6.12 microVM in **under 15 milliseconds**:

```json
{
  "boot-source": {
    "kernel_image_path": "/var/lib/firecracker/vmlinux-6.12-minimal.bin",
    "boot_args": "console=ttyS0 reboot=k panic=1 pci=off nomodules quiet"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "/var/lib/firecracker/snapshots/agent-Overlay-9941.ext4",
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

Notice that tool commands are dispatched into the microVM over **`virtio-vsock`** (`AF_VSOCK`) rather than SSH over TCP—meaning the microVM doesn't even need an inbound network interface to receive tool calls from the host orchestrator.

---

## 5. Ring 3: Host eBPF `cgroup/connect4` Egress Enforcement

What if an evaluation requires controlled network access (for example, downloading a specific crate from `static.crates.io` or testing a target container on an isolated cyber range subnet)?

Relying on `iptables` rules inside the guest is insufficient if the guest root account is compromised. Instead, we attach an **eBPF `cgroup/connect4` program** on the host cgroup enclosing the Firecracker VMM and its TAP interface. This intercepts `connect()` syscalls before a single TCP `SYN` packet is ever allocated:

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

SEC("cgroup/connect4")
int enforce_agent_egress(struct bpf_sock_addr *ctx) {
    __u32 dst_ip = ctx->user_ip4;

    // 1. Always allow loopback (127.0.0.0/8)
    if ((bpf_ntohl(dst_ip) >> 24) == 127) {
        return 1; // ALLOW
    }

    // 2. Unconditionally block AWS/GCP/Cloud Metadata (169.254.169.254)
    if (bpf_ntohl(dst_ip) == 0xA9FEA9FE) {
        bpf_printk("BLOCKED Agent IMDS access attempt to 169.254.169.254\n");
        return 0; // EPERM (-1)
    }

    // 3. Check explicit allowlist map
    __u8 *allowed = bpf_map_lookup_elem(&allowed_egress_ips, &dst_ip);
    if (allowed && *allowed == 1) {
        return 1; // ALLOW
    }

    // Default Deny: drop unauthorized external connection before SYN
    return 0;
}

char _license[] SEC("license") = "GPL";
```

---

## 6. Isolation Architecture Comparison

| Sandbox Technology | Kernel Isolation | Cold Start Latency | Memory Overhead | Breakout Resistance |
| :--- | :---: | :---: | :---: | :---: |
| **Standard Docker Container** | Shared Host Kernel | ~150 ms | ~15 MB | Low (Kernel CVEs escape) |
| **Rootless Container + `seccomp`** | Shared Host Kernel | ~180 ms | ~18 MB | Medium |
| **gVisor (`runsc` User-Space Kernel)** | Syscall Sentry Proxy | ~220 ms | ~65 MB | High (Some syscall perf penalty) |
| **Firecracker MicroVM + Landlock + eBPF** | **Dedicated Guest KVM** | **14 ms (Snapshot)** | **~32 MB** | **Hardware-Grade (KVM + LSM)** |

By combining hardware KVM boundaries via Firecracker, unprivileged Landlock LSM self-sandboxing, and host-enforced eBPF egress filters, autonomous AI agents can compile code, execute untrusted binaries, and run cyber-range simulations with zero risk of escaping to production networks.
