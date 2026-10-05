---
title: "The Socket Ward: Ephemeral Port & Established Connection Auditor"
description: "Inspect the kernel TCP socket table with ss, awk, and sed to detect outbound reverse shells, beaconing C2 implants, and database connection pool exhaustion."
type: "shell"
gofPattern: "Facade & Adapter (Structural)"
gofCategory: "Structural"
arcaneSchool: "Abjuration // Interrogating Kernel Socket Gateways"
formula: "ss -tunap state established | awk 'NR>1 {print $5}' | sed -E 's/.*:([0-9]+)$/\\1/' | sort -n | uniq -c | sort -nr | awk '{printf \"[%5d sockets] -> Port %-6s\\n\", $1, $2}' | head -n 12"
tags: ["shell", "oneliners", "ss", "networking", "secops", "gof-patterns", "security"]
pubDate: "2026-10-05"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, structural patterns organize relationships between objects:
- **Facade**: Provides a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.
- **Adapter**: Converts the interface of a class into another interface clients expect.

Within the Linux kernel, networking state lives inside intricate C structs (`struct sock`, `struct inet_sock`, `struct tcp_sock`), scattered across kernel slabs and socket hash tables.

Directly inspecting raw socket state is overwhelming. The **Socket Ward** provides an architectural **Facade and Adapter**:
- `ss -tunap` queries the kernel netlink API (`sock_diag`), abstracting the internal socket structures into text stream records.
- `awk` and `sed` adapt the raw `IP:PORT` format into an aggregated telemetry facade, revealing at a single glance the distribution of outbound and inbound network conduits.

---

## The Spell Formula

Cast this one-liner during an active incident triage, suspected intrusion, or network performance anomaly:

```bash
ss -tunap state established \
  | awk 'NR>1 {print $5}' \
  | sed -E 's/.*:([0-9]+)$/\1/' \
  | sort -n \
  | uniq -c \
  | sort -nr \
  | awk '{printf "[%5d sockets] -> Port %-6s\n", $1, $2}' \
  | head -n 12
```

---

## Anatomy of the Spell

### 1. `ss -tunap state established`
- `ss`: The modern successor to `netstat`, querying `/proc/net/tcp` directly via kernel netlink sockets without expensive `/proc` file system string scanning.
- `-t`: TCP sockets.
- `-u`: UDP sockets.
- `-n`: Numeric resolution (prevents DNS reverse-lookup stalls from freezing the shell).
- `-a`: All sockets.
- `-p`: Show process and PID owning the file descriptor.
- `state established`: Filters strictly for active, bidirectional TCP sessions, ignoring passive listeners.

### 2. `awk 'NR>1 {print $5}'`
Extracts Column 5: the Remote Endpoint `IP:Port` (e.g., `10.0.4.15:5432` or `198.51.100.22:443`).

### 3. `sed -E 's/.*:([0-9]+)$/\1/'`
Uses a regular expression capture group to strip away the IP address, leaving solely the remote destination port number.

### 4. `sort -n | uniq -c | sort -nr`
Aggregates and counts occurrences, then re-sorts by socket density.

### 5. `awk '{printf "[%5d sockets] -> Port %-6s\n", $1, $2}'`
Converts raw counts into an aligned operational radar view. If you see thousands of sockets on Port `5432` (PostgreSQL), your connection pool is leaking. If you see an outbound connection on Port `4444` (Metasploit) or `1337`, you have an active breach.

---

## Arcane Lore: Watching the Castle Drawbridges

Every socket in an operating system is a drawbridge between the sovereign inner sanctum of your server and the hostile outer wilderness of the digital ether. Rogue daemons and compromised processes immediately cast outward tethering spells to phone home to foreign command towers.

The Socket Ward acts as the Sentinel on the ramparts, continuously auditing every drawbridge in real time.
