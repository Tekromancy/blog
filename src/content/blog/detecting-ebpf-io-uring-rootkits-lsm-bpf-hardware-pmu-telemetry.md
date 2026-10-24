---
title: "Ghost in the Ring: Detecting io_uring & eBPF Kernel Rootkits When kprobes and Syscall Tables Lie"
description: "Why legacy syscall-hooking EDRs are completely blind to modern io_uring SQPOLL implants and offensive eBPF rootkits—and how to hunt them using BPF_LSM, ring-buffer fdinfo inspection, and hardware PMU branch tracing."
pubDate: "2026-10-27"
updatedDate: "2026-10-27"
heroImage: "30.jpg"
tags: ["security", "ebpf", "linux", "kernel", "red-team", "blue-team"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

For the past decade, Linux Endpoint Detection and Response (EDR) agents and runtime security monitors (`Falco`, `auditd`, legacy `tracepoint/raw_syscalls/sys_enter` sensors) have relied on a single foundational assumption: **every meaningful interaction between a userspace process and the outside world must cross the `syscall` instruction boundary.**

In 2026, two native Linux kernel subsystems have shattered that assumption for offensive rootkit authors:
1. **`io_uring` Asynchronous Ring Buffers (`IORING_SETUP_SQPOLL`)**: Once a process calls `io_uring_setup(2)` and `mmap()`s the Submission Queue (`SQ`) and Completion Queue (`CQ`) rings into shared memory, it can open files, spawn network sockets, connect to C2 servers, and exfiltrate secrets using **zero system calls**—writing Submission Queue Entries (`SQEs`) in userspace while a kernel thread (`iou-sqp-<pid>`) polls and executes them inside Ring-0.
2. **Offensive eBPF Rootkits (`bpf_probe_write_user` & `fexit`)**: When an attacker achieves `CAP_BPF` + `CAP_PERFMON` (or `root`), they no longer load noisy, unsigned `.ko` kernel modules (`insmod`). Instead, they load verified eBPF programs attached to `tp_btf/sys_exit` or `fexit/__x64_sys_getdents64` that overwrite userspace buffers on the fly—hiding rogue PIDs, concealing C2 TCP sockets from `ss`/`netstat`, and spoofing `/proc/modules`.

Here is how to hunt both classes of "Ghost in the Ring" implants when standard syscall telemetry is completely blind.

---

## 1. Anatomy of an `io_uring` Syscall-Less Implant (Curing / RingReaper)

Why do `auditd` and `tracepoint/syscalls/sys_enter_*` miss `io_uring` activity completely?

Look at the execution path Inside `io_uring/io_uring.c`:

```text
+-------------------------------------------------------------------------------+
|          WHY SYSCALL TELEMETRY MISSES IO_URING + SQPOLL IMPLANTS              |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ Standard Process ]                                                         |
|    └── openat() / connect() / sendmsg()                                       |
|          |                                                                    |
|          +---> [ SYSCALL ENTRY: tracepoint/raw_syscalls/sys_enter ] (CAUGHT!) |
|                                                                               |
|  ---------------------------------------------------------------------------  |
|                                                                               |
|  [ io_uring SQPOLL Implant ]                                                  |
|    ├── 1. One-time `io_uring_setup(entries, IORING_SETUP_SQPOLL)` at startup  |
|    ├── 2. Userspace writes `IORING_OP_OPENAT` / `IORING_OP_CONNECT` /         |
|    |      `IORING_OP_SEND` directly into mmap'd shared SQ Ring Buffer         |
|    |      (ZERO SYSCALLS ISSUED!)                                             |
|    └── 3. Kernel `iou-sqp` thread wakes up in Ring-0:                         |
|          └── `io_sq_thread()` -> `io_submit_sqes()` -> `io_issue_sqe()`       |
|                ├── Calls `do_filp_open()` / `__sys_connect_file()` directly   |
|                └── ONLY Enforceable at LSM (`security_*`) or `io_uring` TP!   |
|                                                                               |
+-------------------------------------------------------------------------------+
```

When an implant initializes its ring with `IORING_SETUP_SQPOLL`, the kernel spawns an internal `io_sq_thread` worker that continuously polls the memory-mapped submission ring. The implant can run for weeks executing file reads (`IORING_OP_READV`), network connections (`IORING_OP_SOCKET`, `IORING_OP_CONNECT`), and process execution (`IORING_OP_URING_CMD`) while its syscall counter remains completely frozen at zero!

---

## 2. Hunting & Blocking Rogue `io_uring` Instances in Production

To close the `io_uring` visibility gap, you must move your telemetry hooks from the **syscall entry layer** down to the **`io_uring` tracepoint layer** and the **Linux Security Module (`BPF_LSM`) layer**:

### Defense Layer 1: Disable Unprivileged `io_uring` Across Container Hosts (`sysctl`)

On Linux kernels `6.6+` / `6.12+`, `kernel.io_uring_disabled` controls who can instantiate a ring buffer:
- `0`: All processes can create `io_uring` instances (Dangerous default on many distros—exposed to both rootkit evasion and recurring `io_uring` local privilege escalation CVEs).
- `1`: Only processes within the `kernel.io_uring_group` GID (or holding `CAP_SYS_ADMIN`) can call `io_uring_setup()`.
- `2`: **`io_uring` disabled system-wide**, even for `root` unless flipped via sysctl.

```bash
# Restrict io_uring creation strictly to a dedicated high-throughput group (e.g., GID 994 for ScyllaDB/ClickHouse)
sysctl -w kernel.io_uring_disabled=1
sysctl -w kernel.io_uring_group=994
```

### Defense Layer 2: Live Forensics via `/proc/<pid>/fdinfo` & `io_uring` Tracepoints

Every active `io_uring` instance is backed by an anonymous inode file descriptor (`anon_inode:[io_uring]`). Even if an implant uses `SQPOLL`, you can expose every process holding an open `io_uring` descriptor and inspect its live `SqThread` state directly through `/proc/[pid]/fdinfo/`:

```bash
#!/usr/bin/env bash
# hunt-io-uring-implants.sh — Enumerate all processes with active io_uring rings & SQPOLL threads
set -euo pipefail

for fd_link in /proc/[0-9]*/fd/*; do
  target=$(readlink "$fd_link" 2>/dev/null || true)
  if [[ "$target" == "anon_inode:[io_uring]" ]]; then
    pid=$(echo "$fd_link" | cut -d/ -f3)
    fd=$(echo "$fd_link" | cut -d/ -f5)
    comm=$(cat "/proc/$pid/comm" 2>/dev/null || echo "unknown")
    cmdline=$(tr '\0' ' ' < "/proc/$pid/cmdline" 2>/dev/null || echo "")
    echo "================================================================"
    echo "[!] ACTIVE IO_URING DETECTED: PID=$pid ($comm) FD=$fd"
    echo "    Cmdline: $cmdline"
    grep -E "SqThread|SqHead|SqTail|CqHead|CqTail|UserFiles" "/proc/$pid/fdinfo/$fd" 2>/dev/null || true
  fi
done
```

And to capture every single `SQE` opcode (`IORING_OP_SOCKET`, `IORING_OP_CONNECT`, `IORING_OP_OPENAT`) regardless of whether it arrived via `io_uring_enter()` or `SQPOLL`, attach `bpftrace` directly to `tracepoint:io_uring:io_uring_submit_req`:

```bash
# Trace all io_uring opcodes submitted across the entire host (catches SQPOLL workers!)
bpftrace -e '
tracepoint:io_uring:io_uring_submit_req {
  printf("[IO_URING SQE] pid=%d comm=%s opcode=%d flags=0x%x\n",
         pid, comm, args->opcode, args->flags);
}'
```

---

## 3. Hunting Offensive eBPF Rootkits (`bpf_probe_write_user` & `fexit`)

What happens when the attacker uses **eBPF itself** as the rootkit?

When an eBPF program calls the helper `bpf_probe_write_user(void *dst, const void *src, u32 len)`, it can directly mutate the userspace memory buffer of whichever thread triggered the probe:
- **PID & File Hiding**: Hooking `tp_btf/sys_exit` on `sys_getdents64` lets the eBPF rootkit unlink specific `linux_dirent64` entries (`d_reclen` patching) so `/proc/<rogue_pid>` vanishes from `ps` and `top`.
- **Backdoor SSH / PAM Authentication**: Hooking `uprobe/libpam.so:pam_authenticate` or `sys_read` on `/etc/shadow` lets the eBPF program overwrite the return value or inject an attacker's SSH public key into memory without ever modifying a single byte on disk!

### Step 1: Audit All Loaded BPF Programs & Maps (`bpftool`)

Because the Linux kernel emits a kernel taint (`TAINT_USER` / warning in `dmesg`) the first time any program Containing `bpf_probe_write_user` or `bpf_override_return` is loaded, and tracks every loaded program inside the kernel's `prog_idr` radix tree, run this forensic triage script:

```bash
#!/usr/bin/env bash
# hunt-ebpf-rootkits.sh — Detect offensive eBPF helpers (bpf_probe_write_user / bpf_override_return)
set -euo pipefail

echo "[1/3] Checking kernel ring buffer for bpf_probe_write_user taint warnings..."
dmesg | grep -iE "bpf_probe_write_user|bpf_override_return" || echo "      No dmesg helper warnings found."

echo "[2/3] Enumerating all active BPF programs & PIDs holding references..."
bpftool prog show --json | jq -r '.[] | "\(.id)\t\(.type)\t\(.name // "unnamed")\tpids:\(.pids // [])"'

echo "[3/3] Scanning loaded BPF bytecode instructions for Helper ID #36 (bpf_probe_write_user)..."
for id in $(bpftool prog show --json | jq -r '.[].id'); do
  if bpftool prog dump xlated id "$id" 2>/dev/null | grep -qE "bpf_probe_write_user|helper call 36"; then
    echo "❌ CRITICAL ALERT: BPF Program ID $id invokes bpf_probe_write_user (Userspace Memory Tampering)!"
    bpftool prog show id "$id"
  fi
done
```

> [!WARNING]
> **What If the eBPF Rootkit Hooks `sys_bpf` to Hide From `bpftool`?**
> Sophisticated eBPF rootkits hook `__x64_sys_bpf` (`BPF_PROG_GET_NEXT_ID` / `BPF_PROG_GET_INFO_BY_FD`) and use `bpf_probe_write_user` to overwrite the `bpf_attr` struct returned to `bpftool`, hiding their own program ID!

### Step 2: Prevent & Defeat Self-Hiding eBPF Rootkits with `BPF_LSM`

To prevent an attacker (even one who escalates to `root` inside a service) from loading unauthorized eBPF programs or spawning `io_uring` kernel polling threads, attach a **signed `BPF_LSM` policy** to `lsm/bpf` and `lsm/uring_sqpoll`—and then lock the policy in place:

```c
// SPDX-License-Identifier: GPL-2.0
#include "vmlinux.h"
#include <bpf/bpf_helpers.h>
#include <bpf/bpf_tracing.h>
#include <errno.h>

char LICENSE[] SEC("license") = "GPL";

// Map of allowed loader binary inode numbers (populated at boot before lockdown)
struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 32);
    __type(key, __u64);
    __type(value, __u8);
} trusted_bpf_loaders SEC(".maps");

// 1. Block ANY unapproved process (even root!) from calling bpf(BPF_PROG_LOAD)
SEC("lsm/bpf")
int BPF_PROG(restrict_bpf_load, int cmd, union bpf_attr *attr, unsigned int size)
{
    if (cmd != BPF_PROG_LOAD)
        return 0;

    struct task_struct *task = (struct task_struct *)bpf_get_current_task_btf();
    struct file *exe = task->mm ? task->mm->exe_file : NULL;
    if (!exe || !exe->f_inode)
        return -EPERM;

    __u64 ino = exe->f_inode->i_ino;
    if (!bpf_map_lookup_elem(&trusted_bpf_loaders, &ino)) {
        bpf_printk("LSM BLOCKED rogue BPF_PROG_LOAD from pid=%d ino=%llu\n",
                   task->pid, ino);
        return -EPERM;
    }
    return 0;
}

// 2. Block io_uring IORING_SETUP_SQPOLL kernel thread creation completely
SEC("lsm/uring_sqpoll")
int BPF_PROG(block_uring_sqpoll, int ret)
{
    return -EPERM;
}
```

Combine this `BPF_LSM` gate with `sysctl kernel.unprivileged_bpf_disabled=1` and **Linux Kernel Lockdown (`lockdown=confidentiality`)** so even a compromised UID 0 process cannot inject unsigned eBPF rootkits or silently spin up syscall-less `io_uring` channels.
