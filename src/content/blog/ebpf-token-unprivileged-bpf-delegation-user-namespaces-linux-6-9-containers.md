---
title: "Safe Unprivileged eBPF in Multi-Tenant Containers: Deep Dive into Linux 6.9+ BPF Tokens (BPF_TOKEN_CREATE), User Namespaces, and bpffs Delegation"
description: "Why global CAP_BPF broke multi-tenant container isolation—and how Linux 6.9+ BPF Tokens (struct bpf_token) safely delegate granular eBPF program types, maps, and attach hooks into rootless User Namespaces via bpffs mount options and LSM gates."
pubDate: "2026-11-07"
updatedDate: "2026-11-07"
heroImage: "41.jpg"
tags: ["linux", "ebpf", "security", "kubernetes", "containers"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

For years, Kubernetes platform and security engineers faced an impossible Catch-22 when running eBPF-powered workloads (such as rootless container profilers, per-pod XDP/TC service-mesh sidecars, or CI/CD runners testing eBPF programs) on multi-tenant Linux hosts:
1. To load *any* eBPF program via `sys_bpf(BPF_PROG_LOAD, ...)`, the kernel historically required **`CAP_BPF` (and `CAP_PERFMON` or `CAP_NET_ADMIN`) in the Initial User Namespace (`init_user_ns`)**—i.e., real host root!
2. Why couldn't the kernel simply check `ns_capable(current_user_ns(), CAP_BPF)` to let a rootless container inside a **User Namespace (`CLONE_NEWUSER`)** load eBPF programs? Because an unprivileged user on the host can call `unshare(CLONE_NEWUSER)` at any time to gain full `CAP_BPF` inside their new namespace, immediately bypassing `sysctl kernel.unprivileged_bpf_disabled=1` and exposing the entire Ring-0 verifier and kernel memory read helpers (`bpf_probe_read_kernel`) to local privilege escalation!

Introduced by Andrii Nakryiko in **Linux 6.9+**, **BPF Tokens (`BPF_TOKEN_CREATE` / `struct bpf_token`)** finally solve unprivileged eBPF delegation cleanly.

Instead of trusting ambient User Namespace capabilities, a privileged host daemon mounts a dedicated **`bpffs` (`sys_fs_Mount`)** instance configured with fine-grained **delegation bitmasks (`delegate_cmds`, `delegate_maps`, `delegate_progs`, `delegate_attachs`)** inside a target User Namespace, allowing rootless containers to derive a cryptographic capability fd (`bpf_token_fd`) verified by both the kernel and **`BPF_LSM` (`security_bpf_token_cmd`)**.

---

## 1. How `struct bpf_token` & `bpffs` Delegation Work Inside the Kernel

Why did Linux tie BPF Tokens to a **`bpffs` filesystem instance** (`kernel/bpf/inode.c` and `kernel/bpf/token.c`) rather than creating a standalone syscalls-only token?

Because `bpffs` is already a kernel object bound to a specific **User Namespace (`sb->s_user_ns`)** at `fsopen("bpf")` creation time, and can only be configured (`fsconfig`) by a process holding `CAP_SYS_ADMIN` in the parent/initial namespace!

```text
+-----------------------------------------------------------------------------------+
|         LINUX 6.9+ BPF TOKEN (BPF_TOKEN_CREATE) DELEGATION ARCHITECTURE           |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ PRIVILEGED HOST ORCHESTRATOR / CRI RUNTIME (`init_user_ns` + `CAP_SYS_ADMIN`) ]|
|    1. Creates User Namespace (`userns_fd`) for Rootless Container Pod             |
|    2. Opens `bpffs` via New Mount API (`fsopen("bpf")`) bound to `userns_fd`      |
|    3. Configures fine-grained bitmasks via `fsconfig()`:                          |
|       ├── `delegate_cmds   = (1 << BPF_PROG_LOAD) | (1 << BPF_MAP_CREATE)`        |
|       ├── `delegate_progs  = (1 << BPF_PROG_TYPE_SOCKET_FILTER) | (1 << XDP)`     |
|       ├── `delegate_maps   = (1 << BPF_MAP_TYPE_RINGBUF) | (1 << HASH)`           |
|       └── `delegate_attachs = (1 << BPF_XDP) | (1 << BPF_CGROUP_INET_INGRESS)`    |
|    4. Mounts `bpffs` at `/sys/fs/bpf` inside the Rootless Container               |
|                                      |                                            |
|  ------------------------------------+------------------------------------------  |
|                                      v                                            |
|  [ UNPRIVILEGED ROOTLESS CONTAINER (`container_user_ns`, Host UID 100000) ]       |
|    5. Opens `/sys/fs/bpf` (`bpffs_fd`)                                            |
|    6. Calls `token_fd = bpf(BPF_TOKEN_CREATE, { token_create.bpffs_fd })`         |
|    7. Calls `bpf(BPF_PROG_LOAD, { prog_type = XDP, prog_token_fd = token_fd })`   |
|       ├── Kernel checks `bpf_token_capable(token, CAP_BPF)` in `container_user_ns`|
|       ├── Kernel verifies `(token->allowed_progs & (1ULL << BPF_PROG_TYPE_XDP))`  |
|       └── `BPF_LSM` hook `security_bpf_token_cmd()` audits BTF & helper calls!    |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### The Three Security Invariants of `bpf_token_capable()`

When a rootless container process calls `sys_bpf(BPF_PROG_LOAD, &attr, sizeof(attr))` and passes `attr.prog_token_fd`:
1. **User Namespace Ownership Match**: In `bpf_token_capable(token, cap)` (`kernel/bpf/token.c`), the kernel verifies that the calling process has capability `cap` (`CAP_BPF`, `CAP_NET_ADMIN`, or `CAP_PERFMON`) **inside the exact `user_ns` that owns the `bpffs` superblock (`token->userns`)** via `ns_capable(token->userns, cap)`.
2. **Bitmask Intersection Check**: Even if the container holds `CAP_BPF` inside its own `user_ns`, it **cannot** load `BPF_PROG_TYPE_KPROBE` or `BPF_PROG_TYPE_LSM` unless the host orchestrator explicitly set those bits in `delegate_progs` on the `bpffs` superblock!
3. **LSM Fine-Grained Inspection (`security_bpf_token_cmd` / `security_bpf_token_create`)**: Even within an allowed program type (e.g., `BPF_PROG_TYPE_SCHED_CLS`), an eBPF LSM program on the host can inspect the `struct bpf_token *` and reject specific dangerous kfuncs or helper IDs.

---

## 2. Provisioning a Delegated `bpffs` Instance via the Linux Mount API (`fsopen` / `fsconfig`)

To configure `delegate_cmds`, `delegate_progs`, `delegate_maps`, and `delegate_attachs`, you use the modern Linux file-descriptor mount API (`sys_fsopen`, `sys_fsconfig`, `sys_fsmount`, `sys_move_mount`) introduced in Linux 5.2+ and extended for `bpffs` in Linux 6.9+:

```c
// setup_delegated_bpffs.c — Host daemon provisioning a scoped BPF Token mount
#define _GNU_SOURCE
#include <sys/mount.h>
#include <sys/syscall.h>
#include <linux/bpf.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <stdint.h>

static inline int sys_fsopen(const char *fsname, unsigned int flags) {
    return syscall(__NR_fsopen, fsname, flags);
}

static inline int sys_fsconfig(int fd, unsigned int cmd, const char *key,
                               const void *val, int aux) {
    return syscall(__NR_fsconfig, fd, cmd, key, val, aux);
}

static inline int sys_fsmount(int fd, unsigned int flags, unsigned int attr_flags) {
    return syscall(__NR_fsmount, fd, flags, attr_flags);
}

int mount_scoped_bpffs_for_container(const char *target_path) {
    // 1. Open a new bpffs filesystem context inside the target User Namespace
    //    (Caller enters the container's user_ns before calling fsopen("bpf"),
    //     then switches back to init_user_ns to configure delegate_* options!)
    int fs_fd = sys_fsopen("bpf", FSOPEN_CLOEXEC);
    if (fs_fd < 0) return -1;

    // 2. Allow ONLY BPF_MAP_CREATE, BPF_PROG_LOAD, BPF_BTF_LOAD, and BPF_LINK_CREATE
    uint64_t cmds_mask = (1ULL << BPF_MAP_CREATE) |
                         (1ULL << BPF_PROG_LOAD)  |
                         (1ULL << BPF_BTF_LOAD)   |
                         (1ULL << BPF_LINK_CREATE);

    // 3. Allow ONLY safe networking program types (XDP and TC / SCHED_CLS)
    //    (Strictly block KPROBE, TRACEPOINT, LSM, and RAW_TRACEPOINT!)
    uint64_t progs_mask = (1ULL << BPF_PROG_TYPE_XDP) |
                          (1ULL << BPF_PROG_TYPE_SCHED_CLS) |
                          (1ULL << BPF_PROG_TYPE_SOCKET_FILTER);

    // 4. Allow ONLY Array, Hash, and Ringbuf maps
    uint64_t maps_mask = (1ULL << BPF_MAP_TYPE_ARRAY) |
                         (1ULL << BPF_MAP_TYPE_HASH)  |
                         (1ULL << BPF_MAP_TYPE_RINGBUF);

    uint64_t attachs_mask = (1ULL << BPF_XDP) | (1ULL << BPF_TCX_INGRESS);

    char buf[32];
    snprintf(buf, sizeof(buf), "0x%llx", (unsigned long long)cmds_mask);
    sys_fsconfig(fs_fd, FSCONFIG_SET_STRING, "delegate_cmds", buf, 0);

    snprintf(buf, sizeof(buf), "0x%llx", (unsigned long long)progs_mask);
    sys_fsconfig(fs_fd, FSCONFIG_SET_STRING, "delegate_progs", buf, 0);

    snprintf(buf, sizeof(buf), "0x%llx", (unsigned long long)maps_mask);
    sys_fsconfig(fs_fd, FSCONFIG_SET_STRING, "delegate_maps", buf, 0);

    snprintf(buf, sizeof(buf), "0x%llx", (unsigned long long)attachs_mask);
    sys_fsconfig(fs_fd, FSCONFIG_SET_STRING, "delegate_attachs", buf, 0);

    // 5. Instantiate the superblock and mount it into the container's /sys/fs/bpf
    sys_fsconfig(fs_fd, FSCONFIG_CMD_CREATE, NULL, NULL, 0);
    int mnt_fd = sys_fsmount(fs_fd, FSMOUNT_CLOEXEC, 0);
    syscall(__NR_move_mount, mnt_fd, "", AT_FDCWD, target_path, MOVE_MOUNT_F_EMPTY_PATH);

    close(mnt_fd);
    close(fs_fd);
    return 0;
}
```

Or directly from the command line on Linux 6.9+ (`util-linux 2.40+`) when configuring a container's `bpffs`:

```bash
# Mount a bpffs instance delegating ONLY XDP & Socket Filter programs + Hash/Ringbuf maps:
mount -t bpf bpffs /var/lib/containers/pod-net/sys/fs/bpf \
  -o delegate_cmds=prog_load:map_create:btf_load:link_create,\
delegate_progs=xdp:socket_filter:sched_cls,\
delegate_maps=hash:array:ringbuf,\
delegate_attachs=xdp:tcx_ingress

# Inside the unprivileged container: libbpf 1.4+ automatically discovers /sys/fs/bpf,
# calls bpf(BPF_TOKEN_CREATE), and passes token_fd to every map/prog load!
# Or specify a custom path via BPF_OBJECT_OPEN_OPTS:
export LIBBPF_BPF_TOKEN_PATH=/sys/fs/bpf
```

---

## 3. Security Comparison: Privileged Pod vs. Host `CAP_BPF` vs. `BPF_TOKEN_CREATE`

| Container eBPF Deployment Model | Host `init_user_ns` Capabilities Needed in Pod | Can Pod Read Arbitrary Kernel RAM (`bpf_probe_read_kernel`)? | Can Pod Attach `kprobes` to Host `sshd` / `kubelet`? | Multi-Tenant Blast Radius |
| :--- | :---: | :---: | :---: | :--- |
| **`privileged: true` Pod** | Full Host `CAP_SYS_ADMIN` | **Yes (Total Host Compromise)** | **Yes** | Catastrophic (Trivial host root escape) |
| **Host `CAP_BPF` + `CAP_NET_ADMIN`** | Host `CAP_BPF` + `CAP_NET_ADMIN` | No (Unless `CAP_PERFMON` also granted) | No (`CAP_PERFMON` needed), but can manipulate all `init_user_ns` BPF maps | High (Global BPF subsystem access) |
| **Rootless `CLONE_NEWUSER` + `BPF_TOKEN_CREATE`** | **ZERO Host Capabilities (`UID 100000`)** | **No (`delegate_progs` blocks tracing/kprobe!)** | **No (Strictly scoped to container `netns` + allowed bitmask)** | **Minimal (Least-Privilege Scoped)** |
