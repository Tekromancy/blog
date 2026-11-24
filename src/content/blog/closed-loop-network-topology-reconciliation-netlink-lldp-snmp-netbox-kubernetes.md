---
title: "Closed-Loop Network Topology Reconciliation on Linux: Stitching Netlink, LLDP, SNMP FDB Tables, NetBox, and Kubernetes into a Live Fabric Graph"
description: "Why static IPAM spreadsheets and single-layer SNMP maps drift into split-brain—and how to build a closed-loop L1-to-L7 topology reconciler on Linux combining rtnetlink, IEEE 802.1AB LLDP, Q-BRIDGE-MIB FDB indirection, NetBox cable conflict guards, and two-phase staged apply."
pubDate: "2026-11-24"
updatedDate: "2026-11-24"
tags: ["linux", "networking", "kubernetes", "netlink", "observability"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

In almost every multi-rack Linux and bare-metal Kubernetes environment, network truth fragments into three incompatible silos the moment an engineer swaps a DAC cable during an outage:

1. **The Source of Truth (DCIM/IPAM, e.g., NetBox)** still insists `node-04:ens1f0` terminates on `tor-a:Ethernet1/12` with VLAN `120` untagged.
2. **The Physical Switch Control Plane (SNMP/NMS)** still holds the old MAC address in `tor-a`'s hardware FDB table for up to 300 seconds while already learning the new neighbor on `tor-b:Ethernet1/14` via LLDP.
3. **The Linux Host & Kubernetes Overlay** actually routes pod traffic across a kernel LACP `bond0`, a WireGuard `wg0` tunnel, and a network-namespace `veth` pair (`IFLA_LINK_NETNSID`) that the Top-of-Rack switch cannot inspect at all.

Relying on any single layer produces **topology split-brain**: blindly auto-writing unconfirmed SNMP MAC tables corrupts your DCIM cable database with phantom star topologies off uplink trunks, while blindly applying desired YAML/API changes without preflight validation leaves half a rack unreachable mid-rollout.

Building a production **closed-loop network topology reconciler** requires unifying three layers into a single deterministic pipeline:
1. **Kernel-native host telemetry (`AF_NETLINK` + `sysfs` + `lldpd`)** for zero-fork link, master/enslavement, neighbor, and WireGuard tunnel state.
2. **Switch-side SNMPv3 correlation (`LLDP-MIB`, `Q-BRIDGE-MIB`, `BRIDGE-MIB`, `IF-MIB`)** with explicit `dot1dBasePort` indirection and LLDP-first trunk pruning.
3. **Three-way ("Triad") graph reconciliation and two-phase staged apply** across Intended State (DCIM), Observed Wire State (LLDP/FDB/Netlink), and Kubernetes L3–L7 overlay graphs.

---

## 1. The Triad Reconciliation Architecture: Intended vs. Observed vs. Overlay

A resilient topology engine treats neither the switch nor the DCIM database as an unverified oracle. Instead, it fuses **Observed Underlay Telemetry**, **Intended Source-of-Truth State**, and **Kubernetes/WireGuard Overlay State** into a normalized graph before emitting a single mutation:

```text
+-----------------------------------------------------------------------------------+
|                 CLOSED-LOOP L1-TO-L7 TOPOLOGY RECONCILIATION ENGINE               |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [1] HOST KERNEL PROBES           [2] SWITCH SNMPv3 POLLER     [3] DCIM & K8s     |
|  ├── AF_NETLINK (RTM_GETLINK)     ├── LLDP-MIB (lldpRemTable)  ├── NetBox Cables  |
|  ├── sysfs (carrier, speed)       ├── Q-BRIDGE-MIB (FDB MACs)  ├── VLANs / VRFs   |
|  ├── lldpd (802.1AB neighbors)    ├── BRIDGE-MIB (BasePort->If)├── K8s Nodes/Pods |
|  └── wg genetlink (peer keys)     └── IF-MIB (ifXTable 64-bit) └── EndpointSlices |
|                |                               |                        |         |
|                +---------------+---------------+------------------------+         |
|                                |                                                  |
|                                v                                                  |
|  +-----------------------------------------------------------------------------+  |
|  |                     CANONICAL FABRIC GRAPH RECONCILER                       |  |
|  |  1. Identity Normalizer   (Device + Canonical ifName; never raw ifIndex)    |  |
|  |  2. Trunk-Aware Resolver  (LLDP uplinks pruned before FDB edge synthesis)   |  |
|  |  3. Quorum Classifier     (VERIFIED | CREATE_IN_SOT | CABLE_CONFLICT | STALE)| |
|  +-----------------------------------------------------------------------------+  |
|                                |                                                  |
|                                v                                                  |
|  +-----------------------------------------------------------------------------+  |
|  |                   TWO-PHASE STAGED FABRIC APPLY ENGINE                      |  |
|  |  Phase 1: Preflight Dry-Run (DCIM conflict check + K8s ServerSideApply)     |  |
|  |  Phase 2: Sequential Commit + Compensating Rollback Closures on Failure     |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Telemetry Source Authority Matrix

| Layer / Source | OSI Scope | Authoritative For | Convergence Window | Primary Failure Mode |
| :--- | :--- | :--- | :--- | :--- |
| **`AF_NETLINK` (`NETLINK_ROUTE`) + `sysfs`** | L1 / L2 / L3 | Local carrier, LACP/bridge enslavement (`IFLA_MASTER`), `veth` `netns` peers | **Sub-millisecond** (event-driven) | Torn dumps (`NLM_F_DUMP_INTR`) under high `veth` churn |
| **IEEE 802.1AB (`LLDP-MIB` / `lldpd`)** | L1 / L2 | Direct point-to-point chassis + port adjacency across switches and hosts | **5–30 s** tx interval (`120 s` TTL) | NIC firmware or Linux bridge dropping `01:80:c2:00:00:0e` |
| **SNMPv3 `Q-BRIDGE-MIB` + `BRIDGE-MIB`** | L2 | Access-port MAC learning for non-LLDP endpoints (BMCs, appliances) | **300 s** default aging timer | Uplink trunk MAC explosions & `dot1dBasePort` vs. `ifIndex` confusion |
| **WireGuard `genetlink` + Kubernetes API** | L3 / L4 / L7 | Encrypted mesh peer endpoints, `Node` <-> `EndpointSlice` <-> `NetworkPolicy` | **1–15 s** (watch / handshake) | Physical NIC swap invisible to overlay; CNI `veth` churn |

---

## 2. Kernel-Native Host Probing Without Shell Scraping (`AF_NETLINK` + `sysfs`)

Spawning `ip -j link`, `bridge fdb`, and `ip neigh` subprocesses every polling tick works in lab scripts, then falls apart on dense bare-metal Kubernetes nodes: every `fork()`/`execve()` allocates page tables and parses JSON while hundreds of ephemeral container `veth` devices come and go.

Speaking **`AF_NETLINK` (`NETLINK_ROUTE`)** directly from your host probe gives you zero-fork access to the kernel's exact routing and link state tables:

- **`RTM_GETLINK` (`NLM_F_REQUEST | NLM_F_DUMP`)**: Returns one `struct ifinfomsg` per interface with structured `rtattr` TLVs:
  - `IFLA_IFNAME`: Canonical interface name (e.g., `ens1f0`, `bond0`, `wg0`).
  - `IFLA_ADDRESS`: Hardware MAC address (`6` bytes for Ethernet).
  - `IFLA_OPERSTATE`: RFC 2863 operational state (`IF_OPER_UP`, `IF_OPER_LOWERLAYERDOWN`, `IF_OPER_DOWN`).
  - `IFLA_MASTER`: `ifindex` of the enslaving master device (e.g., `bond0` or `br0`), letting you build the host's internal bonding/bridge hierarchy deterministically.
  - `IFLA_LINK` and `IFLA_LINK_NETNSID`: Links a VLAN subinterface to its parent device or maps a host-side `veth` interface directly across a network-namespace boundary into a container pod!
- **`RTM_GETNEIGH`**: Queries both `AF_INET`/`AF_INET6` ARP/NDP neighbors (`NDA_DST`, `NDA_LLADDR`, state flags `NUD_REACHABLE` vs. `NUD_STALE`) and `AF_BRIDGE` kernel bridge FDB entries (`NDA_LLADDR`, `NDA_VLAN`, `NUD_PERMANENT` vs. `NTF_EXT_LEARNED`).
- **`sysfs` (`O_RDONLY`)**: Pairs cleanly with Netlink for hardware physical-layer attributes like `/sys/class/net/<dev>/carrier`, `/sys/class/net/<dev>/speed` (in Mbps), and `/sys/class/net/<dev>/duplex`.

Here is a self-contained C probe (`netlink_link_probe.c`) that opens a `NETLINK_ROUTE` socket with `NETLINK_EXT_ACK`, issues an `RTM_GETLINK` dump, guards against torn reads with `NLM_F_DUMP_INTR`, and extracts interface topology relationships:

```c
// netlink_link_probe.c — Zero-fork Linux RTM_GETLINK topology probe
#define _GNU_SOURCE
#include <arpa/inet.h>
#include <errno.h>
#include <linux/if.h>
#include <linux/if_link.h>
#include <linux/netlink.h>
#include <linux/rtnetlink.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

static const char *operstate_str(uint8_t st) {
    switch (st) {
    case IF_OPER_UP:             return "UP";
    case IF_OPER_DOWN:           return "DOWN";
    case IF_OPER_LOWERLAYERDOWN: return "LOWERLAYERDOWN";
    case IF_OPER_DORMANT:        return "DORMANT";
    default:                     return "OTHER";
    }
}

static void parse_link_msg(struct nlmsghdr *nlh) {
    struct ifinfomsg *ifi = NLMSG_DATA(nlh);
    int attr_len = IFLA_PAYLOAD(nlh);
    const char *ifname = "<unknown>";
    uint8_t mac[6] = {0};
    int has_mac = 0;
    int master_idx = 0, link_idx = 0, link_netnsid = -1;
    uint8_t oper = IF_OPER_UNKNOWN;

    for (struct rtattr *rta = IFLA_RTA(ifi); RTA_OK(rta, attr_len);
         rta = RTA_NEXT(rta, attr_len)) {
        switch (rta->rta_type) {
        case IFLA_IFNAME:
            ifname = (const char *)RTA_DATA(rta);
            break;
        case IFLA_ADDRESS:
            if (RTA_PAYLOAD(rta) == 6) {
                memcpy(mac, RTA_DATA(rta), 6);
                has_mac = 1;
            }
            break;
        case IFLA_MASTER:
            if (RTA_PAYLOAD(rta) >= sizeof(int))
                master_idx = *(int *)RTA_DATA(rta);
            break;
        case IFLA_LINK:
            if (RTA_PAYLOAD(rta) >= sizeof(int))
                link_idx = *(int *)RTA_DATA(rta);
            break;
        case IFLA_LINK_NETNSID:
            if (RTA_PAYLOAD(rta) >= sizeof(int))
                link_netnsid = *(int *)RTA_DATA(rta);
            break;
        case IFLA_OPERSTATE:
            if (RTA_PAYLOAD(rta) >= sizeof(uint8_t))
                oper = *(uint8_t *)RTA_DATA(rta);
            break;
        }
    }

    printf("ifindex=%-3d name=%-16s state=%-14s master=%-3d link=%-3d netnsid=%-2d",
           ifi->ifi_index, ifname, operstate_str(oper),
           master_idx, link_idx, link_netnsid);
    if (has_mac) {
        printf(" mac=%02x:%02x:%02x:%02x:%02x:%02x",
               mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
    }
    putchar('\n');
}

int dump_links_once(int fd, uint32_t seq, int *interrupted) {
    struct {
        struct nlmsghdr nlh;
        struct ifinfomsg ifi;
    } req = {0};

    req.nlh.nlmsg_len = sizeof(req);
    req.nlh.nlmsg_type = RTM_GETLINK;
    req.nlh.nlmsg_flags = NLM_F_REQUEST | NLM_F_DUMP;
    req.nlh.nlmsg_seq = seq;
    req.ifi.ifi_family = AF_UNSPEC;

    if (send(fd, &req, sizeof(req), 0) < 0) return -1;

    uint8_t buf[32768];
    *interrupted = 0;

    for (;;) {
        ssize_t n = recv(fd, buf, sizeof(buf), 0);
        if (n < 0) {
            if (errno == EINTR) continue;
            return -1;
        }
        for (struct nlmsghdr *nlh = (struct nlmsghdr *)buf;
             NLMSG_OK(nlh, (int)n);
             nlh = NLMSG_NEXT(nlh, n)) {
            if (nlh->nlmsg_flags & NLM_F_DUMP_INTR) {
                // Kernel link table mutated mid-dump (e.g., pod CNI teardown)
                *interrupted = 1;
            }
            if (nlh->nlmsg_type == NLMSG_DONE) return 0;
            if (nlh->nlmsg_type == NLMSG_ERROR) {
                struct nlmsgerr *err = NLMSG_DATA(nlh);
                if (err->error != 0) {
                    errno = -err->error;
                    return -1;
                }
                return 0;
            }
            if (nlh->nlmsg_type == RTM_NEWLINK) parse_link_msg(nlh);
        }
    }
}

int main(void) {
    int fd = socket(AF_NETLINK, SOCK_RAW | SOCK_CLOEXEC, NETLINK_ROUTE);
    if (fd < 0) { perror("socket"); return 1; }

    int on = 1, rcvbuf = 1 << 20;
    setsockopt(fd, SOL_NETLINK, NETLINK_EXT_ACK, &on, sizeof(on));
    setsockopt(fd, SOL_SOCKET, SO_RCVBUF, &rcvbuf, sizeof(rcvbuf));

    for (int attempt = 0; attempt < 3; attempt++) {
        int interrupted = 0;
        if (dump_links_once(fd, (uint32_t)(attempt + 1), &interrupted) < 0) {
            perror("dump_links_once");
            close(fd);
            return 1;
        }
        if (!interrupted) break;
        fprintf(stderr, "WARN: NLM_F_DUMP_INTR detected, retrying consistent dump...\n");
    }
    close(fd);
    return 0;
}
```

> **Two Netlink invariants to enforce in production:**
> 1. Always handle **`NLM_F_DUMP_INTR` (`0x10`)**: when Kubernetes creates or destroys pods mid-`RTM_GETLINK` dump, the kernel sets `NLM_F_DUMP_INTR` to signal that your multi-packet snapshot is inconsistent and may skip or duplicate interfaces. Retry the dump with a bounded backoff.
> 2. Size `SO_RCVBUF` generously (at least `1 MiB`) and use `32 KiB` receive buffers (`buf[32768]`) so Netlink batches don't return `ENOBUFS` during interface churn storms.

---

## 3. Switch-Side SNMPv3 Telemetry: Exact OIDs, `dot1dBasePort` Indirection, and Trunk Pruning

Host probes only reveal one side of a patch panel. To validate the ToR and spine switch side without logging into proprietary vendor CLIs, your switch poller speaks **SNMPv3 (`authPriv`: SHA-256 + AES-128)** across four standard IETF/IEEE MIBs:

| MIB / Table | Base OID | Key Columns | Engineering Role & Gotcha |
| :--- | :--- | :--- | :--- |
| **`IF-MIB::ifXTable`** | `1.3.6.1.2.1.31.1.1.1` | `.1` `ifName`, `.6` `ifHCInOctets`, `.10` `ifHCOutOctets`, `.15` `ifHighSpeed`, `.18` `ifAlias` | **Never** poll 32-bit `ifInOctets` (`1.3.6.1.2.1.2.2.1.10`) on >=10G ports: `2^32 * 8 / 10^10` wraps in **3.44 seconds** at 10 GbE and **0.34 seconds** at 100 GbE. |
| **`LLDP-MIB::lldpLocPortTable`** | `1.0.8802.1.1.2.1.3.7.1` | `.3` `lldpLocPortId`, `.4` `lldpLocPortDesc` | Maps local LLDP port numbers (`lldpRemLocalPortNum`) back to switch interface names. |
| **`LLDP-MIB::lldpRemTable`** | `1.0.8802.1.1.2.1.4.1.1` | `.5` `lldpRemChassisId`, `.7` `lldpRemPortId`, `.9` `lldpRemSysName` | Highest-confidence L1/L2 adjacency signal; **always prune LLDP-confirmed trunks before evaluating FDB**. |
| **`BRIDGE-MIB::dot1dBasePortTable`** | `1.3.6.1.2.1.17.1.4.1` | `.1` `dot1dBasePort`, `.2` `dot1dBasePortIfIndex` | Mandatory translation bridge between bridge port indices and `IF-MIB` `ifIndex`. |
| **`Q-BRIDGE-MIB::dot1qTpFdbTable`** | `1.3.6.1.2.1.17.7.1.2.2.1` | `.2` `dot1qTpFdbPort`, `.3` `dot1qTpFdbStatus` | Indexed by `<vlan_id>.<mac_dec_1..6>`; returns `dot1dBasePort`, **not** `ifIndex`! |
| **`IP-MIB::ipNetToPhysicalTable`** | `1.3.6.1.2.1.4.35.1` | `.4` `ipNetToPhysicalPhysAddress` | Dual-stack IPv4/IPv6 ARP/NDP binding table for router SVIs (`Vlan100` -> MAC -> IP). |

### The Mandatory Three-Table FDB Join & LLDP-First Trunk Pruning

Almost every broken SNMP auto-discovery tool makes the same two mistakes: assuming `dot1qTpFdbPort == ifIndex`, and drawing edges for every MAC learned on an uplink trunk port.

```text
  Q-BRIDGE-MIB::dot1qTpFdbPort                BRIDGE-MIB                      IF-MIB
  OID suffix: <vlan>.<m1..m6> = 14  ------>  dot1dBasePortIfIndex[14] = 10012  ------>  ifName[10012] = "Ethernet1/12"
                                                                                              |
         +------------------------------------------------------------------------------------+
         v
  [ LLDP-FIRST TRUNK PRUNING ]
  1. Walk lldpRemTable first. Mark Ethernet1/1..Ethernet1/4 (connected to spine-01/02)
     and PortChannel/LAG members as `is_uplink_trunk = true`.
  2. Group remaining Q-BRIDGE-MIB FDB MACs by canonical switch port.
  3. Discard any port with `is_uplink_trunk == true` OR `unique_mac_count > trunk_mac_threshold` (e.g., > 8).
  4. Synthesize FDB-backed host links ONLY for low-cardinality access ports where LLDP is absent.
```

Verify all four tables against any Linux/NOS switch in seconds with `snmpbulkwalk`:

```bash
# 1. Walk 64-bit interface names and speeds (IF-MIB::ifXTable)
snmpbulkwalk -v3 -l authPriv -u netops-ro -a SHA-256 -A "$AUTH_PASS" -x AES -X "$PRIV_PASS" \
  tor-a.example.net 1.3.6.1.2.1.31.1.1.1.1

# 2. Walk IEEE 802.1AB LLDP remote neighbors (SysName + RemPortId)
snmpbulkwalk -v3 -l authPriv -u netops-ro -a SHA-256 -A "$AUTH_PASS" -x AES -X "$PRIV_PASS" \
  tor-a.example.net 1.0.8802.1.1.2.1.4.1.1.9

# 3. Walk bridge-port -> ifIndex indirection and VLAN-aware FDB
snmpbulkwalk -v3 -l authPriv -u netops-ro -a SHA-256 -A "$AUTH_PASS" -x AES -X "$PRIV_PASS" \
  tor-a.example.net 1.3.6.1.2.1.17.1.4.1.2
snmpbulkwalk -v3 -l authPriv -u netops-ro -a SHA-256 -A "$AUTH_PASS" -x AES -X "$PRIV_PASS" \
  tor-a.example.net 1.3.6.1.2.1.17.7.1.2.2.1.2
```

---

## 4. Three-Way Reconciliation & Two-Phase Staged Fabric Apply in Go

Once your host probes and SNMPv3 pollers populate normalized edges, **never mutate your Source of Truth or push live network/cluster edits directly from a raw discovery diff**.

Production fabric reconciliation enforces three non-negotiable safety invariants:
1. **Canonical Port Identity (`device + normalized_ifname`)**: Lowercase FQDNs stripped to canonical hostname + canonical interface name (`et1/12` and `Ethernet1/12` normalized identically), never volatile kernel `ifIndex` integers.
2. **Quorum Confirmation & Conflict Isolation**: An observed LLDP edge must pass a confirmation quorum (e.g., `Confirmations >= 2` consecutive poll intervals and `CarrierUp == true`) before proposing a DCIM update—and if NetBox already records a *different* termination cable on either port, classify it as `CABLE_CONFLICT` for operator review rather than silently overwriting physical patch documentation.
3. **Two-Phase Staged Apply (`Preflight` -> `Commit + Rollback`)**: Every fabric mutation batch runs full dry-run validation across all Kubernetes and peer host targets first; if target 7 of 8 fails validation, zero mutations occur. If target 7 fails *during* Phase 2 execution, compensating rollback closures restore targets 1 through 6 in reverse order.

```go
// triad_reconciler.go — Quorum-guarded Triad reconciliation & two-phase staged apply
package fabric

import (
	"context"
	"fmt"
	"strings"
)

type CanonicalPort struct {
	Device string
	IfName string
}

func (p CanonicalPort) Key() string {
	return strings.ToLower(strings.TrimSpace(p.Device)) + "::" + normalizeIfName(p.IfName)
}

func normalizeIfName(name string) string {
	s := strings.ToLower(strings.TrimSpace(name))
	s = strings.ReplaceAll(s, " ", "")
	if strings.HasPrefix(s, "ethernet") {
		return "eth" + strings.TrimPrefix(s, "ethernet")
	}
	return s
}

type EdgeSource uint8

const (
	SourceLLDP EdgeSource = iota + 1
	SourceFDB
)

type ObservedEdge struct {
	Local         CanonicalPort
	Remote        CanonicalPort
	Source        EdgeSource
	CarrierUp     bool
	Confirmations int
}

type IntendedCable struct {
	CableID string
	SideA   CanonicalPort
	SideB   CanonicalPort
}

type ReconcileAction string

const (
	ActionVerified            ReconcileAction = "VERIFIED"
	ActionCreateInSoT         ReconcileAction = "CREATE_IN_SOT"
	ActionCableConflict       ReconcileAction = "CABLE_CONFLICT"
	ActionStaleInSoT          ReconcileAction = "STALE_IN_SOT"
	ActionPendingConfirmation ReconcileAction = "PENDING_CONFIRMATION"
)

type EdgeDiff struct {
	Action   ReconcileAction
	Observed *ObservedEdge
	Existing *IntendedCable
	Reason   string
}

func CanonicalEdgeKey(a, b CanonicalPort) string {
	ka, kb := a.Key(), b.Key()
	if ka > kb {
		ka, kb = kb, ka
	}
	return ka + "<->" + kb
}

// ReconcileTriad compares observed wire edges against NetBox intended cables
// without ever mutating an existing conflicting cable termination automatically.
func ReconcileTriad(observed []ObservedEdge, intended []IntendedCable, minQuorum int) []EdgeDiff {
	byPort := make(map[string]IntendedCable, len(intended)*2)
	byPair := make(map[string]IntendedCable, len(intended))
	for _, c := range intended {
		byPort[c.SideA.Key()] = c
		byPort[c.SideB.Key()] = c
		byPair[CanonicalEdgeKey(c.SideA, c.SideB)] = c
	}

	seenPairs := make(map[string]struct{}, len(observed))
	var diffs []EdgeDiff

	for i := range observed {
		obs := &observed[i]
		pairKey := CanonicalEdgeKey(obs.Local, obs.Remote)
		seenPairs[pairKey] = struct{}{}

		if existing, ok := byPair[pairKey]; ok {
			diffs = append(diffs, EdgeDiff{
				Action: ActionVerified, Observed: obs, Existing: &existing,
				Reason: "observed wire matches intended DCIM cable",
			})
			continue
		}

		// Require carrier up + multi-sample quorum before proposing DCIM mutations
		if !obs.CarrierUp || obs.Confirmations < minQuorum || obs.Source != SourceLLDP {
			diffs = append(diffs, EdgeDiff{
				Action: ActionPendingConfirmation, Observed: obs,
				Reason: fmt.Sprintf("awaiting quorum (%d/%d) or LLDP verification", obs.Confirmations, minQuorum),
			})
			continue
		}

		// Guard against overwriting an existing cable on either endpoint
		if c, conflict := byPort[obs.Local.Key()]; conflict {
			diffs = append(diffs, EdgeDiff{
				Action: ActionCableConflict, Observed: obs, Existing: &c,
				Reason: fmt.Sprintf("local port %s already terminated to %s", obs.Local.Key(), c.CableID),
			})
			continue
		}
		if c, conflict := byPort[obs.Remote.Key()]; conflict {
			diffs = append(diffs, EdgeDiff{
				Action: ActionCableConflict, Observed: obs, Existing: &c,
				Reason: fmt.Sprintf("remote port %s already terminated to %s", obs.Remote.Key(), c.CableID),
			})
			continue
		}

		diffs = append(diffs, EdgeDiff{
			Action: ActionCreateInSoT, Observed: obs,
			Reason: "quorum-confirmed LLDP adjacency missing from DCIM",
		})
	}

	for _, c := range intended {
		if _, ok := seenPairs[CanonicalEdgeKey(c.SideA, c.SideB)]; !ok {
			cableCopy := c
			diffs = append(diffs, EdgeDiff{
				Action: ActionStaleInSoT, Existing: &cableCopy,
				Reason: "intended cable absent from live LLDP/FDB telemetry",
			})
		}
	}
	return diffs
}

type StagedMutation interface {
	Name() string
	PreflightDryRun(ctx context.Context) error
	Apply(ctx context.Context) (rollback func(context.Context) error, err error)
}

// ApplyFabricPlan enforces strict two-phase execution: zero mutations occur if
// any target fails Phase 1 dry-run; Phase 2 errors trigger reverse rollback.
func ApplyFabricPlan(ctx context.Context, mutations []StagedMutation) error {
	// Phase 1: Preflight all targets before modifying a single host or cluster object
	for _, m := range mutations {
		if err := m.PreflightDryRun(ctx); err != nil {
			return fmt.Errorf("preflight aborted on %s (zero changes applied): %w", m.Name(), err)
		}
	}

	// Phase 2: Sequential commit with LIFO compensating rollback stack
	var rollbacks []func(context.Context) error
	for _, m := range mutations {
		rb, err := m.Apply(ctx)
		if err != nil {
			for i := len(rollbacks) - 1; i >= 0; i-- {
				if rollbacks[i] != nil {
					_ = rollbacks[i](ctx)
				}
			}
			return fmt.Errorf("apply failed on %s (rolled back %d prior steps): %w", m.Name(), len(rollbacks), err)
		}
		rollbacks = append(rollbacks, rb)
	}
	return nil
}
```

---

## 5. Five Production Traps That Break Live Topology Engines

Even with clean Netlink dumps and SNMPv3 polling, five kernel and protocol quirks routinely blind automated topology maps in real clusters:

### Trap 1: NIC Firmware & Linux Bridges Silently Swallowing LLDP (`01:80:c2:00:00:0e`)

You configure `lldpd` on a bare-metal Linux node, `tcpdump` shows zero incoming LLDP frames from the ToR switch, and the switch sees zero frames from the host. Two silent blackholes cause this on Linux:
1. **SmartNIC / Intel `i40e` & `ice` Firmware LLDP Agents**: Intel X710 (`i40e`) and E810 (`ice`) NICs run an embedded firmware LLDP engine for DCB/PFC that intercepts and drops Ethernet type `0x88cc` (`01:80:c2:00:00:0e`) in hardware before packets ever reach the Linux kernel ring! Fix it persistently per interface:
   ```bash
   ethtool --set-priv-flags ens1f0 disable-fw-lldp on
   ```
2. **Linux Kernel Bridge `BR_GROUPFWD_RESTRICTED`**: Per IEEE 802.1D, a Linux kernel bridge (`br0`) drops all link-local reserved multicast addresses `01:80:c2:00:00:00` through `01:80:c2:00:00:0f` by default. If your host probe sits behind a Linux bridge (or if you need LLDP passed through a transparent bridge), bit 14 (`0x4000`) of `/sys/class/net/br0/bridge/group_fwd_mask` must explicitly permit `01:80:c2:00:00:0e`:
   ```bash
   ip link set br0 type bridge group_fwd_mask 0x4000
   ```

### Trap 2: Volatile `ifIndex` Renumbering & `NLM_F_DUMP_INTR` Torn Snapshots

Never persist Linux `ifIndex` or SNMP `ifIndex` as your primary topology key. Rebooting a server with predictable network interface naming disabled, hot-plugging a virtual function (`SR-IOV` VF), resetting a line card, or churning CNI pods shifts `ifIndex` integers monotonically (`42` -> `43` -> `1918`). Always index graph edges by normalized `(chassis_id / fqdn, canonical_ifname)`, and track `ifIndex` strictly as an ephemeral per-poll lookup handle.

### Trap 3: `Q-BRIDGE-MIB` `dot1dBasePort` Indirection & Multi-MAC Trunk Explosions

On many switches, physical interface `Ethernet1/1` might have `ifIndex = 10001` while `dot1dBasePort = 1`—or worse, `Po1` (`Port-Channel1`) has `ifIndex = 200001` and `dot1dBasePort = 49`. Treating `dot1qTpFdbPort` directly as an `ifIndex` causes silent misattribution to non-existent interfaces or totally wrong ports. Always resolve `dot1qTpFdbPort -> BRIDGE-MIB::dot1dBasePortIfIndex -> IF-MIB::ifName`, and never build host edges from FDB ports marked as LLDP-confirmed trunks or exceeding your access-port MAC threshold.

### Trap 4: Asymmetric Aging Windows (`LLDP 120s` vs. `FDB 300s` vs. `NUD_STALE`)

Move a host cable from `tor-a:Ethernet1/12` to `tor-a:Ethernet1/14`:
- `IF-MIB::ifOperStatus` and `sysfs carrier` drop **immediately** (`< 1 s`) on port `12` and come up on port `14`.
- `LLDP` learns the new adjacency within **5–30 seconds**, while the old `LLDP` entry lingers until its `120 s` TTL expires unless an explicit shutdown LLDPDU was sent.
- `Q-BRIDGE-MIB` FDB still retains the MAC on port `12` until either an explicit port-down flush occurs or the **300-second aging timer** expires.
- Meanwhile, Linux `RTM_GETNEIGH` keeps stale ARP/NDP entries in `NUD_STALE` (`0x04`) long after carrier drops!

**Rule**: Rank signals strictly (`LLDP + carrier=1` > `ARP/NDP NUD_REACHABLE` > `non-trunk FDB`), discard any Linux neighbor in `NUD_STALE` or `NUD_FAILED`, and enforce `CarrierUp == true` before admitting any edge into your live topology graph.

### Trap 5: The Bare-Metal-to-Kubernetes Overlay Discontinuity

A pure L1/L2 switch map stops dead at `node-04:bond0`. To trace why a Kubernetes `Service` hits packet loss between racks, your topology engine must stitch four extra hops across the kernel boundary:
1. **Bond / Bridge Graph (`IFLA_MASTER`)**: `ens1f0` + `ens1f1` -> `bond0` (`802.3ad` LACP) -> `br-cni` or host-routed loopback.
2. **Encrypted Mesh Overlay (`wg` genetlink)**: `wg0` interface -> WireGuard peer public key -> allowed IPs + endpoint IP:port + `latest_handshake` age.
3. **Container Namespace Boundary (`IFLA_LINK_NETNSID`)**: Host-side `vethXYZ` mapped via `netnsid` + inode to the container's `eth0` inside `/proc/<pid>/ns/net`.
4. **Kubernetes Control Plane Projection**: Match host primary/internal IP (`Node.status.addresses`) to `Pod.status.podIP`, `EndpointSlice.endpoints[].addresses`, `Ingress` backends, and `NetworkPolicy` ingress/egress selectors so an operator can click a failing L1 SFP lane and immediately see every impacted `Deployment` and `EndpointSlice`.

---

## 6. Field Verification & Lab Diagnostics Checklist

Before trusting any automated topology reconciler in production, verify each layer's ground truth directly on a Linux node and Kubernetes cluster:

```bash
# 1. Confirm hardware NIC firmware isn't eating LLDP frames (Intel i40e/ice)
ethtool --show-priv-flags ens1f0 | grep -i lldp

# 2. Inspect Linux bridge forwarding mask (0x4000 required if bridging LLDP)
cat /sys/class/net/br0/bridge/group_fwd_mask 2>/dev/null || true

# 3. Verify IEEE 802.1AB LLDP daemon neighbor visibility in structured JSON
lldpcli -f json show neighbors

# 4. Inspect kernel Netlink master/slave, veth peer, and netnsid relationships
ip -j -d link show | jq '.[] | {ifindex, ifname, operstate, master, link, link_netnsid, kind: .linkinfo.info_kind}'

# 5. Inspect WireGuard peer handshake freshness and kernel bridge FDB state
wg show all dump
bridge -j fdb show | jq '.[] | select(.state != "permanent") | {mac, ifname, vlan, state}'

# 6. Verify Kubernetes Node -> EndpointSlice mapping for L3-to-L7 graph stitching
kubectl get endpointslices -A -o wide
```

---

## Summary: Eliminating Topology Split-Brain

| Failure Surface | Naive Single-Source Discovery | Closed-Loop Triad Reconciliation |
| :--- | :--- | :--- |
| **Host Interface State** | Periodic `ip link` stdout scraping | Event-driven `AF_NETLINK` (`RTM_GETLINK` / `RTM_GETNEIGH`) with `NLM_F_DUMP_INTR` retry |
| **Switch FDB Mapping** | Assumes `dot1qTpFdbPort == ifIndex`; draws phantom trunk stars | `dot1qTpFdbPort -> dot1dBasePortIfIndex -> ifName` + LLDP-first trunk pruning |
| **LLDP Blind Spots** | Silent zero-neighbor gaps on Intel NICs & Linux bridges | `disable-fw-lldp on` + `group_fwd_mask 0x4000` validation |
| **DCIM Cable Drift** | Blindly overwrites NetBox cables from single-sample SNMP polls | Canonical `device::ifName` keys, `CarrierUp` + quorum gate, explicit `CABLE_CONFLICT` guard |
| **Fabric Configuration Rollout** | Imperative partial applies that brick racks mid-flight | Two-phase `PreflightDryRun` across all targets + LIFO compensating rollback |

When you combine zero-fork `AF_NETLINK` host probing, trunk-pruned SNMPv3 FDB correlation, WireGuard/Kubernetes overlay stitching, and quorum-guarded two-phase staged apply, your topology map stops drifting behind reality—and becomes an enforceable control plane for both bare-metal cabling and Kubernetes networking.
