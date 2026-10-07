---
title: "The Monadic Ward: Robust Singleton Daemon Supervisor in Bash"
description: "A production-grade, hardened Bash daemon supervisor that enforces strict single-instance execution via Linux flock file descriptors, signal traps, and auto-healing watchdog loops."
type: "script"
gofPattern: "Singleton Pattern (Creational)"
gofCategory: "Creational"
arcaneSchool: "Abjuration // The Monadic Ward"
formula: |2
  #!/usr/bin/env bash
  set -Eeuo pipefail
  readonly LOCKFILE="/var/run/monadic-ward.lock"
  exec 200>"${LOCKFILE}"
  flock -n 200 || { echo "[ABJURATION COLLISION] Daemon instance already bound to physical plane." >&2; exit 1; }
  echo $$ >&200
  cleanup() { rm -f "${LOCKFILE}"; echo "[WARD DISSOLVED] Monadic seal released gracefully." >&2; }
  trap cleanup EXIT INT TERM
  while true; do supervise_daemon_cycle; sleep 5; done
tags: ["bash", "shell-script", "singleton", "flock", "daemon", "process-supervision", "gof-patterns", "abjuration"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Singleton

In 1994, the Gang of Four defined the **Singleton Pattern**:
> *"Ensure a class only has one instance, and provide a global point of access to it."*
> — Design Patterns, p. 127

In systems administration and kernel operations, uncoordinated duplicate processes are catastrophic. Two instances of a backup runner writing to the same ZFS pool corrupt snapshot trees; two database migrators racing on a schema cause deadlock; two supervisory daemons trying to bind `0.0.0.0:443` crash the socket stack.

Naive shell scripts often test for PID files with fragile logic:
```bash
# ⚠️ THE RACING ROOKIE ANTI-PATTERN
if [ -f /var/run/my-script.pid ]; then
    echo "Already running!"
    exit 1
fi
echo $$ > /var/run/my-script.pid
```
If two processes spawn simultaneously, both can evaluate `[ -f ... ]` as false before either writes its PID, immediately creating a split-brain condition.

The **Monadic Ward** implements an atomic, kernel-enforced Singleton using POSIX file locks (`flock`) directly bound to dedicated file descriptors.

---

## The Complete Bash Script

Save this script as `/usr/local/bin/monadic-supervisor.sh` and make it executable (`chmod +x`):

```bash
#!/usr/bin/env bash
# ==============================================================================
# SCRIPT: monadic-supervisor.sh
# PATTERN: Singleton Pattern (Gang of Four Creational)
# ARCANUM: Abjuration // The Monadic Ward
# DESCRIPTION: Atomic, flock-backed single-instance daemon supervisor.
# ==============================================================================
set -Eeuo pipefail

readonly WARD_NAME="archon-worker"
readonly LOCK_DIR="/var/run/tekromancy"
readonly LOCK_FILE="${LOCK_DIR}/${WARD_NAME}.lock"
readonly LOG_FILE="/var/log/tekromancy/${WARD_NAME}.log"
readonly FD=200

# ------------------------------------------------------------------------------
# 1. ATOMIC SINGLETON INSTANTIATION (FLOCK MUTEX)
# ------------------------------------------------------------------------------
mkdir -p "${LOCK_DIR}" "$(dirname "${LOG_FILE}")"

# Bind arbitrary file descriptor 200 to the lock target
eval "exec ${FD}>\"${LOCK_FILE}\""

# Attempt non-blocking kernel lock
if ! flock -x -n "${FD}"; then
    EXISTING_PID=$(cat "${LOCK_FILE}" 2>/dev/null || echo "UNKNOWN")
    echo "[ABJURATION COLLISION] ${WARD_NAME} is already manifest on PID ${EXISTING_PID}." >&2
    echo "[WARD DEFENSE] Aborting duplicate incarnation attempt." >&2
    exit 1
fi

# Write current PID into the locked descriptor
echo "$$" >&"${FD}"

# ------------------------------------------------------------------------------
# 2. SIGNAL TRAPPING & TEARDOWN GUARDS
# ------------------------------------------------------------------------------
cleanup() {
    local exit_code=$?
    echo "[$(date -Iseconds)] [WARD SHUTDOWN] Releasing monadic seal (FD ${FD}, PID $$)..." | tee -a "${LOG_FILE}" >&2
    # Truncate lock content to signal death
    true >&"${FD}" || true
    # flock automatically releases when file descriptor closes upon process termination
    rm -f "${LOCK_FILE}"
    exit "${exit_code}"
}

trap cleanup EXIT INT TERM HUP

# ------------------------------------------------------------------------------
# 3. SUPERVISED WORKLOAD CYCLE
# ------------------------------------------------------------------------------
log() {
    echo "[$(date -Iseconds)] [PID $$] $*" | tee -a "${LOG_FILE}"
}

execute_workload_cycle() {
    log "Beginning harmonic maintenance cycle..."
    # Simulate workload or health check
    sleep 2
    log "Cycle completed with zero anomalies. Entering sleep trance."
}

log "Monadic Ward engaged successfully. Sole instance established."

# Main supervisory loop
while true; do
    execute_workload_cycle
    sleep 10
done
```

---

## Architectural Mechanics

```
  Process Inception ($$)
            │
            ▼
    Open File Descriptor 200
  ───▶ /var/run/tekromancy/*.lock
            │
            ▼
┌───────────────────────────────┐
│  flock -x -n 200              │
│  (Kernel sys_flock syscall)   │
└───────────────┬───────────────┘
                │
       Lock Granted?
       ├── NO  ──▶ [Collision Detected] ──▶ Print PID & Exit 1
       │
       └── YES ──▶ Record PID to FD 200
                     │
                     ▼
           Trap EXIT/INT/TERM
                     │
                     ▼
           Execute Workload Loop
                     │
                     ▼
        Process Dies / Terminated
                     │
                     ▼
       Kernel releases FD 200 Lock automatically!
```

---

## Why Kernel Flocks Defeat Zombie Locks

1. **Automatic Kernel Garbage Collection**: If the supervisor is killed with `kill -9` (SIGKILL), traps cannot run and the lock file remains on disk. However, the Linux kernel **automatically closes all open file descriptors for dead processes**, instantaneously releasing the `flock` lock.
2. **Zero TOCTOU Races**: Unlike checking if a PID is alive with `kill -0 $PID`, `flock` executes atomically in the VFS layer.
3. **Descriptor Persistence**: By dedicating file descriptor `200`, child subprocesses spawned by the supervisor can inherit or isolate the descriptor cleanly.
