---
title: "The Highlander Daemon Ward: Atomic Linux File Descriptor Lock"
description: "Enforce absolute singleton execution in shell daemons, cron jobs, and background workers using non-blocking Linux kernel file descriptor locks (flock). There can be only one."
type: "shell"
gofPattern: "Singleton (Creational)"
gofCategory: "Creational"
gofArcane: "Abjuration"
arcaneSchool: "Abjuration // The Law of One Vessel"
formula: "exec 200>/var/lock/tekromancy_daemon.lock; flock -n 200 || { echo \"[ABORT] Another daemon already holds the mortal vessel! Exit code 1.\" >&2; exit 1; }; trap 'rm -f /var/lock/tekromancy_daemon.lock' EXIT"
tags: ["shell", "oneliners", "flock", "linux", "concurrency", "singleton", "gof-patterns", "sysadmin"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, the **Singleton** pattern guarantees exclusivity of existence:

> *"Ensure a class only has one instance, and provide a global point of access to it."*
> — Gang of Four, *Creational Patterns*

In object-oriented code, the Singleton hides its constructor behind a private gate, providing a static accessor method that returns a single synchronized memory instance.

### The Transmutation to POSIX Operating Systems

In shell automation, DevOps, and systems engineering, the Singleton problem manifests everywhere:
- A heavy cron job scheduled every 5 minutes takes 7 minutes to complete, spawning overlapping processes that thrash disk I/O.
- An rsync synchronization script runs concurrently with itself, corrupting target file structures.
- A background worker consumes the same database queue twice, double-billing users.

Amateur shell scripts resort to naive PID file checks:
```bash
# VULNERABLE: Classic TOCTOU (Time-of-Check to Time-of-Use) Race Condition
if [ -f /var/run/my_daemon.pid ]; then
  exit 1
fi
echo $$ > /var/run/my_daemon.pid
```
If two processes execute this check simultaneously, both pass the conditional before either writes its PID. Furthermore, if the server loses power or receives `SIGKILL`, the PID file persists on disk indefinitely, creating a **stale lock** that permanently disables the service.

The **Highlander Daemon Ward** implements the pure Gang of Four Singleton pattern at the Linux kernel level via `flock(2)` file descriptor locking.

---

## The Spell Formula

Cast this invocation at the top of any critical shell script, migration runner, or cron task:

```bash
exec 200>/var/lock/tekromancy_daemon.lock
flock -n 200 || {
  echo "[ABORT] Another daemon already holds the mortal vessel! Exit code 1." >&2
  exit 1
}
trap 'rm -f /var/lock/tekromancy_daemon.lock' EXIT
```

Or as an atomic one-liner wrapper for arbitrary commands:

```bash
flock -n /var/lock/tekromancy_job.lock -c "rsync -az /data/ user@remote:/backup/ && sync"
```

---

## Anatomy of the Spell

### 1. `exec 200>/var/lock/tekromancy_daemon.lock`
- The `exec` builtin opens `/var/lock/tekromancy_daemon.lock` for writing and assigns it to custom file descriptor **200** for the lifetime of the shell process.
- Unlike standard descriptors (0=stdin, 1=stdout, 2=stderr), descriptor 200 remains open across all sub-commands executed within the script.

### 2. `flock -n 200`
- Calls the Linux kernel `sys_flock` syscall with `LOCK_EX` (exclusive lock) and `LOCK_NB` (non-blocking).
- If no other process holds an exclusive lock on this inode, the kernel grants the lock instantaneously.
- If another instance is running, `flock -n` does not wait; it returns exit code `1` immediately.

### 3. `|| { echo ... >&2; exit 1; }`
- Defensive short-circuit. If the lock cannot be acquired, the competing process emits a diagnostic warning to stderr and aborts without touching any shared resources.

### 4. `trap 'rm -f ...' EXIT`
- Registers an exit ward. When the script exits cleanly or terminates via `SIGINT` or `SIGTERM`, the lockfile is unlinked from the filesystem.

---

## Why Kernel File Descriptor Locks Surpass PID Files

| Failure Mode | Naive PID File | Highlander `flock` Ward |
| :--- | :--- | :--- |
| **Race Conditions** | Susceptible to microsecond TOCTOU window | Kernel atomic lock table guarantees zero race |
| **Crash / `SIGKILL -9`** | Stale file left on disk; script blocked permanently | **Kernel automatically drops the lock** upon process death |
| **PID Recycling** | High-churn systems may mistake unrelated processes for the lock owner | Unaffected; lock is bound to open inode descriptor |
| **Concurrency Latency** | Requires polling and sleep intervals | Instantaneous non-blocking return |

There can be only one mortal vessel for the daemon. Through the kernel's advisory lock table, the Singleton pattern preserves harmony across your infrastructure.
