---
title: "The Spool Queue Runner: Atomic Command Object Processor"
description: "Decouple command scheduling from execution using atomic filesystem spools, lock acquisition, and transactional completion queues with undo logs."
type: "shell"
gofPattern: "Command (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Evocation // Materializing the Execution Spool"
formula: "mkdir -p /var/spool/tekromancy/{pending,processing,done,failed} && for cmd_file in /var/spool/tekromancy/pending/*; do [ -e \"$cmd_file\" ] || continue; mv \"$cmd_file\" /var/spool/tekromancy/processing/ && { base=$(basename \"$cmd_file\"); bash \"/var/spool/tekromancy/processing/$base\" > \"/var/spool/tekromancy/done/$base.log\" 2>&1 && mv \"/var/spool/tekromancy/processing/$base\" /var/spool/tekromancy/done/ || mv \"/var/spool/tekromancy/processing/$base\" /var/spool/tekromancy/failed/; }; done"
tags: ["shell", "oneliners", "command-pattern", "queue", "spool", "concurrency", "sysadmin", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four behavioral patterns, the **Command** pattern separates invocation from execution:

> *"Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations."*
> — Gang of Four, *Behavioral Patterns*

In object-oriented software, a Command object encapsulates the receiver, the method to call, and the arguments into a persistent entity that can be queued, logged, serialized to disk, or retried upon failure.

### The Transmutation to UNIX Mail & Print Spool Directories

The historical foundation of the Command pattern in operating systems is the **UNIX Spool (`/var/spool/`)**:
- Instead of immediately executing long-running or resource-intensive tasks (like printing a 1,000-page document or sending emails to 50,000 users), the client writes an executable job command script into a `pending/` spool folder.
- A decoupled worker daemon (the **Invoker**) polls or watches the spool, claims the job using an atomic filesystem `rename()` syscall, runs the command, and records exit codes and logs.

The **Spool Queue Runner** implements the pure **Command Pattern** in POSIX shell: commands are reified into self-contained files that transition transactionally between `pending`, `processing`, `done`, and `failed` directories.

---

## The Spell Formula

Cast this invocation to process all pending command objects transactionally:

```bash
mkdir -p /var/spool/tekromancy/{pending,processing,done,failed} && \
for cmd_file in /var/spool/tekromancy/pending/*; do
  [ -e "$cmd_file" ] || continue
  base=$(basename "$cmd_file")

  # Atomic Claim: move from pending to processing (O(1) rename)
  if mv "$cmd_file" "/var/spool/tekromancy/processing/$base" 2>/dev/null; then
    echo "[INVOKER] Executing Command Object: $base"
    
    # Execute Command and record audit log
    if bash "/var/spool/tekromancy/processing/$base" \
         > "/var/spool/tekromancy/done/$base.log" 2>&1; then
      mv "/var/spool/tekromancy/processing/$base" /var/spool/tekromancy/done/
      echo "[SUCCESS] Command $base completed."
    else
      mv "/var/spool/tekromancy/processing/$base" /var/spool/tekromancy/failed/
      echo "[FAILURE] Command $base failed. Moved to failed quarantine." >&2
    fi
  fi
done
```

To schedule a new command object into the spool from any external process:

```bash
cat << 'EOF' > /var/spool/tekromancy/pending/cmd_$(date +%s%N).sh
# [COMMAND OBJECT PAYLOAD]
pg_dumpall -U postgres | gzip -9 > /backup/db_$(date +%F).sql.gz
EOF
```

---

## Why File-Based Command Spools Excel

| Property | In-Memory Async Threads | Atomic Spool Queue Runner |
| :--- | :--- | :--- |
| **Crash Resilience** | Lost if server restarts or crashes | **Persists across reboots and power outages** |
| **Atomic Claiming** | Requires database row locking | **Linux kernel `rename(2)` is atomic** |
| **Inspection & Debugging** | Opaque thread pool memory | **Inspectable via standard `cat` and `ls`** |
| **Dead-Letter Handling** | Complex retry queues | **Failed jobs quarantined in `failed/`** |

By encapsulating jobs into discrete command files, the Spool Queue Runner brings rock-solid reliability and transactional auditability to asynchronous automation.
