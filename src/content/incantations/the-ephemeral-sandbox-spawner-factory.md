---
title: "The Ephemeral Sandbox Spawner: Unshare Namespace Factory"
description: "Instantiate isolated Linux kernel namespace execution sandboxes on demand using the unshare syscall without heavyweight container runtimes."
type: "shell"
gofPattern: "Factory Method (Creational)"
gofCategory: "Creational"
arcaneSchool: "Conjuration // Spawning the Isolated Familiar"
formula: "spawn_sandbox() { local kind=\"$1\"; shift; case \"$kind\" in net) unshare -n -- bash -c \"ip link set lo up; $*\" ;; pid) unshare -p -f --mount-proc -- \"$@\" ;; full) unshare -Urimn -p -f --mount-proc -- \"$@\" ;; *) echo \"Unknown sandbox archetype: $kind\" >&2; return 1 ;; esac; }; spawn_sandbox net ping -c 1 127.0.0.1"
tags: ["shell", "oneliners", "factory-method", "unshare", "namespaces", "containers", "security", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, the **Factory Method** pattern defers concrete instantiation:

> *"Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses."*
> — Gang of Four, *Creational Patterns*

A client requests an abstract product (e.g., `Document.create()`), and the factory determines which specialized product (`TextDocument`, `SpreadsheetDocument`) to materialize based on runtime parameters.

### The Transmutation to Linux Kernel Namespaces

In modern secure systems, executing untrusted binaries or testing network services requires isolation. Full container engines (Docker, containerd) introduce heavy background daemons, socket overhead, and storage drivers.

The Linux kernel provides native primitives for process isolation: **Namespaces** (`CLONE_NEWNET`, `CLONE_NEWPID`, `CLONE_NEWNS`, `CLONE_NEWUSER`).

The **Ephemeral Sandbox Spawner** implements the **Factory Method** in shell:
- `spawn_sandbox()` defines the public creation interface.
- Sub-parameters select the concrete namespace archetype:
  - `net`: Isolated loopback network stack (ideal for testing port collisions).
  - `pid`: Isolated process tree where the target command acts as PID 1.
  - `full`: Rootless user namespace container with private mounts, IPC, and network.

---

## The Spell Formula

Cast this invocation to define the sandbox factory and summon an isolated network realm:

```bash
spawn_sandbox() {
  local kind="$1"
  shift
  case "$kind" in
    net)
      # Network isolation: private routing table and interfaces
      unshare -n -- bash -c "ip link set lo up; $*"
      ;;
    pid)
      # Process isolation: command becomes PID 1 in a private /proc
      unshare -p -f --mount-proc -- "$@"
      ;;
    full)
      # Complete containerization: user, rootless UID mapping, mount, PID, net
      unshare -Urimn -p -f --mount-proc -- "$@"
      ;;
    *)
      echo "Unknown sandbox archetype: $kind (valid: net, pid, full)" >&2
      return 1
      ;;
  esac
}

# Example: Run a command inside an isolated network sandbox
spawn_sandbox net curl -I https://tekromancy.com
```

---

## Anatomy of the Spell

### 1. `unshare -n`
- Unshares the network namespace from the parent system. The new process has zero network interfaces except a down loopback `lo`.
- Any services started within cannot bind to or interfere with host network ports.

### 2. `unshare -p -f --mount-proc`
- `-p`: Unshares the PID namespace.
- `-f`: Forks a child process immediately, which is required because the calling process cannot change its own PID.
- `--mount-proc`: Mounts a fresh, private `/proc` filesystem so commands like `ps aux` only reveal processes inside this sandbox.

### 3. `unshare -Urimn`
- `-U`: User namespace (maps unprivileged host user to UID 0 root inside the container).
- `-r`: Map current UID/GID to superuser.
- `-i`: IPC namespace (isolated System V message queues and shared memory).
- `-m`: Mount namespace (private filesystem mounts).

---

## Factory Method Comparison

| Isolation Level | Host Daemons Required | Startup Latency | Factory Call |
| :--- | :--- | :--- | :--- |
| **Docker Container** | `dockerd`, `containerd`, socket | 600–1,200 ms | `docker run --rm ...` |
| **Network Sandbox** | **None (Pure Linux syscall)** | **< 3 ms** | `spawn_sandbox net ...` |
| **PID Sandbox** | **None (Pure Linux syscall)** | **< 4 ms** | `spawn_sandbox pid ...` |
| **Full Rootless Pod** | **None (Pure Linux syscall)** | **< 8 ms** | `spawn_sandbox full ...` |

By routing sandbox creation through a parameter-driven Factory Method, you achieve microsecond-fast isolation without external daemon dependencies.
