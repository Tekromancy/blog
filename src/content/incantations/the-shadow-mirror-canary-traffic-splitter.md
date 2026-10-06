---
title: "The Phantasmal Mirror: Kernel TEE Shadow Traffic Duplicator"
description: "Duplicate live production TCP traffic asynchronously to a dark staging service using iptables TEE and statistical packet sampling without impacting caller latency."
type: "shell"
gofPattern: "Shadow Traffic Mirroring (Structural)"
gofCategory: "Structural"
arcaneSchool: "Illusion // The Phantasmal Mirror Plane"
formula: "iptables -t mangle -A PREROUTING -p tcp --dport 80 -m statistic --mode random --probability 0.10 -j TEE --gateway 10.0.4.99"
tags: ["shell", "oneliners", "illusion", "shadow-traffic", "canary", "iptables", "networking", "sysadmin", "resilience"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Archmage"
draft: false
---

## The Lineage to Shadow Launching & Dark Traffic Testing

In production systems engineering, synthetic testing cannot reproduce the nuance, edge cases, and volume of live user traffic:

> *"Shadow traffic, or dark launching, duplicates real incoming production requests and replays them asynchronously against a candidate release. Responses from the shadow service are discarded, allowing performance, correctness, and memory profiles to be validated with zero user risk."*
> — Site Reliability Engineering, Google SRE Book

Traditional proxy-based mirroring (such as Envoy or Nginx `mirror`) consumes application-layer CPU cycles and adds potential latency if not carefully buffered.

The **Phantasmal Mirror** operates under the arcane school of **Illusion**:
- It utilizes the Linux kernel's `iptables` / `netfilter` **`TEE` target** inside the `mangle` PREROUTING table.
- At the raw Ethernet frame layer, the kernel duplicates an exact copy of incoming packets and clones them toward a gateway mirror node.
- Real users experience zero latency degradation, while your staging cluster battles real production traffic.

---

## The Spell Formula

Cast this invocation to clone 10% of all incoming HTTP traffic on port 80 and send it to the dark staging gateway at `10.0.4.99`:

```bash
iptables -t mangle -A PREROUTING \
  -p tcp --dport 80 \
  -m statistic --mode random --probability 0.10 \
  -j TEE --gateway 10.0.4.99
```

To disarm the phantasmal mirror and dismantle the shadow conduit:

```bash
iptables -t mangle -D PREROUTING \
  -p tcp --dport 80 \
  -m statistic --mode random --probability 0.10 \
  -j TEE --gateway 10.0.4.99
```

---

## Anatomy of the Spell

### 1. `-t mangle -A PREROUTING`
- Intercepts incoming network frames before the kernel routing decision is made.
- Modifying packets in PREROUTING ensures the original packet proceeds on its natural destination path without modification.

### 2. `-p tcp --dport 80`
- Filters for inbound HTTP traffic (or modify for port 443 / 8080 / custom RPC ports).

### 3. `-m statistic --mode random --probability 0.10`
- Statistical sampling module. Selects exactly 10% of TCP sessions through pseudo-random packet sampling, preventing the staging cluster from being overwhelmed.

### 4. `-j TEE --gateway 10.0.4.99`
- The `TEE` extension clones the packet at the network layer and routes the clone to the specified gateway IP address.
- The destination application receives identical HTTP payloads and headers.

---

## The Phantasmal Mirror Topology

```
                  [Live User Inbound Request]
                              │
                              ▼
                 ┌───────────────────────────┐
                 │  Linux Kernel Netfilter   │
                 │   (iptables mangle TEE)   │
                 └─────────────┬─────────────┘
                               │
             ┌─────────────────┴─────────────────┐
             ▼ (Original 100%)                   ▼ (Cloned 10% Mirror)
  ┌─────────────────────┐             ┌─────────────────────┐
  │ Live Production Pod │             │ Dark Staging Pod    │
  │ (Emits response)    │             │ (Responses dropped) │
  └──────────┬──────────┘             └─────────────────────┘
             ▼
   [HTTP Response to User]
```

---

## Why Kernel-Layer Shadow Mirroring Excels

1. **Zero Impact on Production SLA**: The packet clone is handled asynchronously in kernel memory; if the dark staging server crashes or drops connections, the production request is 100% unaffected.
2. **True Protocol Fidelity**: Captures raw byte anomalies, slowloris patterns, and malformed headers that application-level proxies often sanitize or normalize.
3. **Bandwidth Tuning**: The `--probability` argument gives you instant control to dial traffic up from 1% to 100% or down to 0% dynamically.

By bending network reality through the Phantasmal Mirror, you validate bleeding-edge code against genuine production chaos with absolute impunity.
