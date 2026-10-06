---
title: "The Netcat Stream Adapter: Protocol Inversion Transmuter"
description: "Adapt standard POSIX standard input/output pipes and local commands into bidirectional TCP socket servers via named FIFOs without touching source code."
type: "shell"
gofPattern: "Adapter (Structural)"
gofCategory: "Structural"
arcaneSchool: "Transmutation // Adapting Raw Sockets to Named Fifos"
formula: "rm -f /tmp/tek_fifo && mkfifo /tmp/tek_fifo && cat /tmp/tek_fifo | /bin/sh 2>&1 | nc -l -p 9999 > /tmp/tek_fifo"
tags: ["shell", "oneliners", "adapter-pattern", "netcat", "fifo", "networking", "ipc", "gof-patterns", "sysadmin"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, the **Adapter** pattern bridges incompatible interfaces:

> *"Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces."*
> — Gang of Four, *Structural Patterns*

When an existing class has the necessary data or functionality, but its method signatures do not match the interface expected by the caller, the Adapter wraps the existing object and translates calls between the two worlds.

### The Transmutation to UNIX Streams and Sockets

In UNIX architectures, commands naturally consume standard input (`stdin`) and write to standard output (`stdout`). However, remote clients and observability nodes expect a **Network TCP Server Interface** (`bind`, `listen`, `accept`).

Standard command-line utilities (like `/bin/sh`, diagnostic scripts, or sensor monitors) do not have embedded TCP socket code. Recompiling them to add socket libraries is invasive and violates modularity.

The **Netcat Stream Adapter** uses a **Named FIFO (`mkfifo`)** to act as a structural **Adapter**:
- It wraps the standard file descriptor interface of any shell command.
- It translates network socket reads/writes into standard file stream bytes, adapting non-networked CLI utilities into interactive TCP services.

---

## The Spell Formula

Cast this invocation to adapt a standard command into an interactive network daemon on port 9999:

```bash
rm -f /tmp/tek_fifo && \
mkfifo /tmp/tek_fifo && \
cat /tmp/tek_fifo | /bin/sh 2>&1 | nc -l -p 9999 > /tmp/tek_fifo
```

Or adapt a diagnostic telemetry generator into an on-demand remote HTTP metrics endpoint:

```bash
rm -f /tmp/http_fifo && mkfifo /tmp/http_fifo && \
while true; do
  cat /tmp/http_fifo | {
    read req;
    printf "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n[TEKROMANCY TELEMETRY]\nUptime: $(uptime)\nMemory: $(free -h | awk '/Mem:/ {print $3 \" / \" $2}')\n";
  } | nc -l -p 8080 > /tmp/http_fifo;
done
```

---

## Anatomy of the Spell

### 1. `mkfifo /tmp/tek_fifo`
- Materializes a First-In, First-Out (FIFO) named pipe node in the Linux VFS.
- Unlike anonymous pipes (`|`), which only link processes with a common ancestor in a single pipeline, named FIFOs can connect completely arbitrary processes across different shell sessions.

### 2. The Circular Stream Loop
```
   ┌──────────────────────────────────────────────┐
   │                                              │
   ▼                                              │
[cat /tmp/tek_fifo] ──> [/bin/sh] ──> [nc -l] ────┘
```
1. `cat /tmp/tek_fifo` reads bytes pushed by the network client and pipes them into `/bin/sh`.
2. `/bin/sh` executes the command and streams stdout/stderr into `nc -l -p 9999`.
3. `nc` transmits the response back over the TCP wire to the remote client.
4. When the remote client sends a new command, `nc` writes it back into `/tmp/tek_fifo`, completing the adapter cycle.

---

## Why the Named Pipe Adapter Is Pure GoF

The Adapter pattern requires that neither the target client (the TCP socket) nor the adaptee (the shell command) knows about each other's protocol. The named FIFO encapsulates the translation mechanics completely at the file descriptor boundary.
