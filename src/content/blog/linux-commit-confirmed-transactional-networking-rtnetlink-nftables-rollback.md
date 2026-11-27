---
title: "Zero-Lockout Linux Networking: Engineering commit confirmed Dead-Man's Switches Across rtnetlink, nftables, and Routing Tables"
description: "Why Linux lacks a unified cross-subsystem network transaction—and how to engineer Juniper-style commit confirmed rollback across rtnetlink, nf_tables RCU batches, ECMP multipath routes, out-of-process systemd timers, and Management VRFs without locking yourself out of remote bare-metal infrastructure."
pubDate: "2026-11-25"
updatedDate: "2026-11-27"
heroImage: "45.jpg"
tags: ["linux", "networking", "nftables", "netlink", "sre"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

Every systems engineer who has managed bare-metal Linux routers, edge firewalls, or remote Kubernetes nodes eventually learns the same visceral lesson: **Linux has no kernel-wide network transaction**. You can modify an unassigned secondary NIC over a management WebUI or SSH session, watch the HTTP request spin until timeout, and discover that a single bad prefix or route replacement permanently severed your remote control plane two states away.

On dedicated network operating systems (JunOS `commit confirmed 2`, Arista EOS `configure session`), staging an invalid BGP policy or broken management route never causes a truck roll—if the operator does not explicitly prove reachability before the countdown expires, the control plane reverts atomically. On raw Linux, building an equivalent **zero-lockout guarantee** fails in practice for four structural reasons:

1. **Asymmetric kernel atomicity (`nf_tables` vs. `rtnetlink`)**: `NETLINK_NETFILTER` (`nf_tables`) batches ruleset swaps behind an RCU generation flip (`NFNL_MSG_BATCH_BEGIN` / `NFNL_MSG_BATCH_END`), whereas `NETLINK_ROUTE` (`rtnetlink`) mutates links, addresses, and FIB routes message-by-message with zero cross-object rollback.
2. **Cross-interface collateral damage**: Assigning an overlapping subnet to an idle secondary NIC injects a `proto kernel scope link` route into the `main` table—causing `net/ipv4/fib_frontend.c` (`rp_filter=1`) or longest-prefix matching to blackhole return packets on the active management NIC.
3. **Naive in-process revert timers commit suicide**: Scheduling a `time.AfterFunc()` rollback timer inside the same control-plane daemon that reloads `systemd-networkd`, `sshd`, or its own TLS proxy dies the instant a config reload sends `SIGTERM`, triggers an OOM kill, or panics mid-apply.
4. **Partial state divergence across kernel, daemons, and disk**: Rolling back `/etc` files without reconciling live `rtnetlink` leaves the running kernel broken until reboot; conversely, rolling back kernel links without stopping a newly spawned `dhcpcd` client or restoring `nftables` lets a lease renewal wipe out your static gateway 30 seconds later.

Engineering a production-grade **`commit confirmed` dead-man's switch** on Linux requires treating **kernel telemetry (`ip -j` / `rtnetlink`)**, **RCU ruleset swaps (`nft -c -f` / `nft -f`)**, **out-of-process PID 1 timers (`systemd-run`)**, **on-disk rollback journals**, and **L3 Management VRFs (`vrf-mgmt`)** as one deterministic state machine.

---

## 1. The Transaction Asymmetry Inside the Linux Network Stack

The root cause of remote Linux lockouts is that packet filtering, addressing, routing, sysctls, and userspace protocol daemons live in disconnected failure domains:

```text
+-----------------------------------------------------------------------------------+
|               LINUX NETWORK TRANSACTION ASYMMETRY & RECOVERY ENGINE               |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [1] ATOMIC PLANE: nf_tables (NETLINK_NETFILTER)                                  |
|  ├── Preflight AST/Hook Validate: `nft -c -f candidate.nft`                       |
|  ├── Queue `nft_trans` list between NFNL_MSG_BATCH_BEGIN .. NFNL_MSG_BATCH_END    |
|  └── Single RCU `genid` pointer flip -> 100% ruleset swap or 0% mutation          |
|                                                                                   |
|  [2] NON-ATOMIC PLANES: rtnetlink + sysctl + Userspace Daemons                    |
|  ├── RTM_NEWLINK / RTM_NEWADDR / RTM_NEWROUTE commit individually per syscall     |
|  ├── `devinet.c` cascades (`promote_secondaries=0` purges secondary IPs on del)   |
|  ├── `fib_frontend.c` (`rp_filter=1`) drops asymmetric traffic on prefix overlap  |
|  ├── Userspace daemons (`dhcpcd`, `kea`, `unbound`, `frr`) mutate async state     |
|  └── `/etc` config files persist across reboot even if live RAM diverges          |
|                                         |                                         |
|                                         v                                         |
|  [3] OUT-OF-PROCESS DEAD-MAN'S SWITCH + 3-PHASE KERNEL ROLLBACK ENGINE            |
|  ├── Pre-Apply: Fsync LKG kernel JSON + external file backups + `lkg.nft`         |
|  ├── Watchdog:  `systemd-run --unit=net-tx-rollback --on-active=120s` (PID 1)     |
|  ├── BootGuard: `net-tx-boot-guard.service` (reverts dirty tx on crash/reboot)    |
|  └── Rollback:  Phase A (Prune Added) -> Phase B (Restore Static/DHCP)            |
|                 -> Phase C (ECMP Route Reconcile) -> Phase D (`O_NOFOLLOW` + nft) |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

![Linux Network Transaction Asymmetry and 3-Phase Differential Rollback](/images/linux-rtnetlink-nftables-transaction-asymmetry.jpg)
*Figure 1: Transaction boundary mismatch between RCU-atomic `nf_tables` batches and piecemeal `rtnetlink` / FIB / userspace daemon mutations, guarded by a three-phase differential LKG rollback engine.*

### Comparing Existing Linux Network Rollback Mechanisms

| Mechanism | Scope Covered | Crash / Daemon-Restart Survival | Preserves CNI / VPN Overlays (`wg*`, `veth*`) | ECMP Multipath Route Fidelity | Kernel + Disk Parity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`netplan try`** | Netplan YAML (`networkd` / `NM`) | Partial (`netplan` CLI process holds `stdin` prompt; `SIGHUP`/SSH drop triggers revert) | Yes (YAML-scoped) | Good (`routes` stanza) | YAML only (no `nftables`, Kea, or arbitrary daemons) |
| **`nmstate` (`nmstatectl apply --commit`)** | NetworkManager state | Yes (daemon checkpoint timer in NM) | Requires explicit ignore rules | Good | Requires NetworkManager everywhere |
| **`ifupdown2 -c` / raw shell scripts** | `/etc/network/interfaces` | No (if `sleep 60 && cp` script dies or SSH drops mid-run, behavior varies) | Fragile (`ip addr flush` risks collateral damage) | Poor (`ip route replace` often flattens `nexthop` weights) | Partial |
| **In-Process Go/Node Agent Timer** | Agent-managed files + `rtnetlink` | **No** (reloading the agent kills the goroutine/timer!) | Only if explicitly filtered | Only if `nexthops` parsed | Often forgets external `/etc` files or `dhcpcd` |
| **Hardened Out-of-Process Engine (`systemd-run` + Differential `rtnetlink` + `nft`)** | Links, IPs, ECMP routes, `nftables`, external `/etc`, daemons | **Yes** (PID 1 `systemd` timer + `pending.json` boot guard survive crashes & power loss) | **Strict prefix allow/deny guard** (`wg*`, `tailscale*`, `cilium*`, `veth*`) | **Full `nexthop` weight + `metric` reconciliation** | **Strict (`O_NOFOLLOW` restore + daemon reload)** |

---

## 2. Six Kernel & Userspace Traps That Break Naive Network Rollbacks

Most homegrown "revert if I don't confirm in 60 seconds" scripts fail during real incidents because of subtle Linux kernel semantics. Every single one of these six traps has caused production lockouts:

### Trap 1: `ip addr flush` & `promote_secondaries=0` Cascading Deletions

Inside the Linux kernel's IPv4 address teardown path (`net/ipv4/devinet.c`, `__inet_del_ifa`), IPv4 addresses on an interface are ordered as a **primary** address followed by zero or more **secondary** (`IFA_F_SECONDARY`) addresses sharing the same subnet.

When `net.ipv4.conf.<iface>.promote_secondaries` defaults to `0`, deleting the primary IPv4 address causes the kernel to **purge every secondary IP on that subnet automatically**. Even worse, running `ip addr flush dev ens1f0` during a naive rollback wipes:
- Keepalived / VRRP virtual IPs (`VIPs`) actively serving gateway traffic.
- Link-local or out-of-band secondary management aliases.
- Kernel-generated connected subnet routes (`proto kernel scope link`), which immediately causes the kernel to **reject or silently drop dependent default routes** (`Nexthop has invalid gateway`) because the gateway IP is no longer directly reachable!

**Hardened rule:** Never call `ip addr flush` during rollback. Always perform a **differential reconciliation** on non-secondary addresses (`!addr.Secondary`), preserving secondary VIPs and issuing `ip addr replace` before restoring default routes.

### Trap 2: Cross-Interface Blackholing via Subnet Overlap & `rp_filter=1`

Why can configuring a *brand-new, previously unused* interface (`ens2f0`) immediately kill your existing SSH/HTTPS management session arriving on `ens1f0`?

Two mechanisms combine to create an instant blackhole:
1. **Connected Route Hijack (`proto kernel`)**: Suppose `ens1f0` handles management traffic on `198.51.100.10/24`. You accidentally stage `198.51.100.99/24` (or an overlapping `/25` or `/23` prefix) on `ens2f0` and bring `ens2f0` UP. Even if `ens2f0` has no cable plugged in—or worse, has link carrier to a different VLAN—the kernel installs a `198.51.100.0/24 dev ens2f0` (or more specific `/25`) connected route. Longest-prefix match or equal-metric ordering can steer outbound replies out `ens2f0` instead of `ens1f0`.
2. **Strict Reverse Path Forwarding (`net.ipv4.conf.*.rp_filter = 1`)**: In `net/ipv4/fib_frontend.c` (`fib_validate_source`), strict mode validates whether the best reverse route to the client's source IP leaves via the *exact same interface* the packet arrived on. The moment a candidate route or overlapping prefix tilts the FIB lookup toward `ens2f0`, `fib_validate_source` drops every inbound packet on `ens1f0`—including your operator `confirm` RPC!

**Hardened rule:** Run an explicit preflight overlap detector across all active interfaces *before* touching Netlink, reject duplicate or overlapping subnets across distinct non-bonded L3 interfaces, and set `net.ipv4.conf.all.rp_filter=2` (loose mode) or `0` on multi-homed routers unless strict symmetric routing is guaranteed.

### Trap 3: In-Process Dead-Man's Switch Suicide

If your configuration agent executes:
1. `time.AfterFunc(120 * time.Second, rollback)` inside its own memory space, and
2. Steps 3–4 of the apply bundle rewrite `/etc/systemd/network/10-mgmt.network`, trigger `systemctl reload-or-restart networking`, or reload the API daemon itself—

PID 1 sends `SIGTERM` to your daemon, the in-memory goroutine evaporates, and the broken interface configuration becomes permanent.

**Hardened rule:** Never trust the mutating process to hold its own watchdog timer. Persist the pre-apply snapshot to disk with `fsync()` *before* mutating anything, and arm the rollback countdown inside an independent PID 1 `systemd` timer unit (`systemd-run`).

### Trap 4: Overlay, WireGuard & Kubernetes CNI Collateral Damage

Modern Linux firewalls and bare-metal Kubernetes nodes host dozens of kernel-managed virtual devices: `wg0`, `tailscale0`, `cilium_host`, `cilium_net`, `veth*`, `cni0`, `flannel.1`, `docker0`, `br-*`, `virbr*`, `kube-ipvs0`, `nodelocaldns`, and `xfrm*`.

If your rollback snapshot captured live `ip -j addr show` 90 seconds ago and a Kubernetes pod cycled or Tailscale rekeyed during that window, a blind "restore exact interface inventory" loop will try to `ip link set veth8f2a9c down` or delete ephemeral tunnel addresses—tearing down the exact WireGuard overlay you rely on for remote administration!

**Hardened rule:** Maintain an explicit dynamic-virtual-interface filter (`isDynamicVirtualIface()`) covering VPN, CNI, container, hypervisor, and XFRM prefixes so generic L3 rollback touches *only* host-owned physical/bond/VLAN interfaces.

### Trap 5: Flattening ECMP Multipath Default Routes & Rogue DHCP Races

Two insidious bugs surface in multi-WAN deployments:
- **ECMP collapse**: Running `ip route replace default via <gw> dev <dev>` when the pre-apply kernel held a multipath route (`default nexthop via 198.51.100.1 dev ens1f0 weight 2 nexthop via 203.0.113.1 dev ens1f1 weight 1 metric 100`) collapses dual-uplink routing down to a single path or drops the `metric` tie-breaker.
- **Zombie DHCP client race**: If the candidate config enabled DHCP on `ens2f0`, spawning `dhcpcd ens2f0` or `dhclient ens2f0`, and rollback runs `ip addr del` + `ip link set ens2f0 down` *without* killing the newly spawned DHCP daemon, `dhcpcd` wakes up on its retry loop, brings `ens2f0` back up, acquires a lease, and re-injects a default route that overrides your restored gateway.

**Hardened rule:** Track per-interface `DhcpRunning` state in the snapshot. During Phase A of rollback, terminate any DHCP client on interfaces where DHCP was not active pre-apply *before* deleting addresses and setting links `DOWN`; during Phase B, rebind DHCP only on interfaces that originally ran it and lost their dynamic lease.

### Trap 6: Kernel-vs-Disk Divergence & Symlink TOCTOU (`O_NOFOLLOW`)

Reverting `rtnetlink` in RAM while leaving broken `/etc/network/interfaces`, `/etc/kea/kea-dhcp4.conf`, or `/etc/nftables.conf` on disk creates a delayed-fuse outage: the box looks healthy until an automated kernel security reboot three weeks later boots straight into the unconfirmed bad config.

Equally, backing up and restoring arbitrary root-owned paths outside your config directory introduces a classic symlink Time-of-Check-to-Time-of-Use (TOCTOU) vulnerability if any intermediate directory or target file becomes a symlink. Always verify with `os.Lstat` (`ModeSymlink == 0`) and open restored files with `syscall.O_NOFOLLOW` and preserved `0600`/`0644` permissions.

---

## 3. Live Kernel Snapshotting & Three-Phase Differential Rollback

Below is the complete state machine that binds preflight checks, `fsync()`ed snapshots, an out-of-process `systemd` timer, and boot-time crash recovery into one zero-lockout loop:

```text
  [ IDLE ]
     │
     ▼  (1) Preflight: `nft -c -f` + IP prefix overlap check + `ip route get <mgmt>`
  [ PREFLIGHT_OK ]
     │
     ▼  (2) Snapshot live `ip -j -4 addr/route` + `lkg.nft` + external files -> `fsync()`
  [ LKG_PERSISTED ]
     │
     ▼  (3) Arm out-of-process timer (`systemd-run --unit=net-tx-rollback --on-active=120s`)
  [ WATCHDOG_ARMED ]
     │
     ▼  (4) Apply atomic `nft -f`, `rtnetlink` links/addrs/routes, reload services
  [ PENDING_CONFIRM ] ──────(5a) Operator RPC `confirm` < 120s ──────► [ COMMITTED ]
     │                                                                  (stop timer,
     │ (5b) Timer expires OR daemon panic OR power-loss reboot           unlink pending.json)
     ▼      (`net-tx-boot-guard.service` runs before `network-pre.target`)
  [ 3-PHASE DIFFERENTIAL ROLLBACK ]
     ├── Phase A: Delete added non-secondary IPs, kill rogue DHCP, down new links
     ├── Phase B: Bring LKG links UP, `ip addr replace` static IPs, rebind LKG DHCP
     ├── Phase C: Reconcile single + ECMP `nexthop` default routes & metrics
     └── Phase D: `O_NOFOLLOW` restore external files + `nft -f lkg.nft` + reload units
     │
     ▼
  [ ROLLED_BACK_TO_LKG ]
```

![commit confirmed Lifecycle, Boot Guard and Management VRF Isolation](/images/linux-deadmans-switch-watchdog-state-machine.jpg)
*Figure 2: End-to-end `commit confirmed` transaction state machine, boot-time crash recovery guard, and three-layer management-plane isolation.*

### Reference Implementation: Differential `rtnetlink` Snapshot & Rollback in Go

The self-contained Go module below (`net_tx_rollback.go`) avoids `ip addr flush`, skips dynamic virtual/CNI/VPN devices, distinguishes `dynamic` DHCP leases from static CIDRs, tracks ECMP `nexthop` arrays, and restores external files safely with `O_NOFOLLOW`:

```go
// net_tx_rollback.go — Differential live-kernel network snapshot & 3-phase rollback
package nettx

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
	"syscall"
	"time"
)

type LiveNetAddrSnapshot struct {
	CIDR      string `json:"cidr"`
	Dynamic   bool   `json:"dynamic,omitempty"`
	Secondary bool   `json:"secondary,omitempty"`
}

type LiveNetIfaceSnapshot struct {
	Device      string                `json:"device"`
	IsUp        bool                  `json:"isUp"`
	Addresses   []LiveNetAddrSnapshot `json:"addresses,omitempty"`
	DhcpRunning bool                  `json:"dhcpRunning,omitempty"`
}

type LiveRouteNexthop struct {
	Gateway string `json:"gateway,omitempty"`
	Device  string `json:"device"`
	Weight  int    `json:"weight,omitempty"`
}

type LiveDefaultRoute struct {
	Gateway  string             `json:"gateway,omitempty"`
	Device   string             `json:"device"`
	Metric   int                `json:"metric,omitempty"`
	Protocol string             `json:"protocol,omitempty"`
	Nexthops []LiveRouteNexthop `json:"nexthops,omitempty"`
}

type LiveNetSnapshot struct {
	CapturedAt    string                 `json:"capturedAt"`
	Interfaces    []LiveNetIfaceSnapshot `json:"interfaces"`
	DefaultRoutes []LiveDefaultRoute     `json:"defaultRoutes,omitempty"`
}

type ExternalFileEntry struct {
	Path       string `json:"path"`
	Existed    bool   `json:"existed"`
	Mode       uint32 `json:"mode,omitempty"`
	BackupName string `json:"backupName,omitempty"`
}

type ExternalBundleMeta struct {
	Files          []ExternalFileEntry `json:"files,omitempty"`
	ReloadServices []string            `json:"reloadServices,omitempty"`
}

type ipAddrShowEntry struct {
	Ifname   string   `json:"ifname"`
	Flags    []string `json:"flags"`
	AddrInfo []struct {
		Family    string `json:"family"`
		Local     string `json:"local"`
		Prefixlen int    `json:"prefixlen"`
		Scope     string `json:"scope"`
		Dynamic   bool   `json:"dynamic"`
		Secondary bool   `json:"secondary"`
	} `json:"addr_info"`
}

type ipRouteShowEntry struct {
	Gateway  string `json:"gateway"`
	Dev      string `json:"dev"`
	Metric   int    `json:"metric"`
	Protocol string `json:"protocol"`
	Nexthops []struct {
		Gateway string `json:"gateway"`
		Dev     string `json:"dev"`
		Weight  int    `json:"weight"`
	} `json:"nexthops,omitempty"`
}

var validNetdevRe = regexp.MustCompile(`^[a-zA-Z0-9._:-]{1,15}$`)

// Never touch runtime overlay, VPN, CNI, bridge, or VM tap interfaces during rollback.
var dynamicVirtualPrefixes = []string{
	"tailscale", "wg", "veth", "tap", "cni", "flannel", "cilium",
	"lxc", "docker", "virbr", "vmbr", "tun", "ovpn", "xfrm",
	"ifb_", "kube-ipvs", "nodelocaldns", "br-",
}

func isDynamicVirtualIface(dev string) bool {
	lower := strings.ToLower(strings.TrimSpace(dev))
	for _, prefix := range dynamicVirtualPrefixes {
		if strings.HasPrefix(lower, prefix) {
			return true
		}
	}
	return false
}

func ReadLiveNetState(dhcpRunningFn func(string) bool) (*LiveNetSnapshot, error) {
	addrOut, err := exec.Command("ip", "-j", "-4", "addr", "show").Output()
	if err != nil {
		return nil, fmt.Errorf("ip -j -4 addr show: %w", err)
	}
	var rawIfaces []ipAddrShowEntry
	if err := json.Unmarshal(bytes.TrimSpace(addrOut), &rawIfaces); err != nil {
		return nil, fmt.Errorf("decode addr json: %w", err)
	}

	var defaultRoutes []LiveDefaultRoute
	if routeOut, rErr := exec.Command("ip", "-j", "-4", "route", "show", "default").Output(); rErr == nil {
		trimmed := bytes.TrimSpace(routeOut)
		if len(trimmed) > 0 && trimmed[0] == '[' {
			var rawRoutes []ipRouteShowEntry
			if json.Unmarshal(trimmed, &rawRoutes) == nil {
				for _, r := range rawRoutes {
					if len(r.Nexthops) > 0 {
						var hops []LiveRouteNexthop
						for _, nh := range r.Nexthops {
							dev := strings.TrimSpace(nh.Dev)
							gw := strings.TrimSpace(nh.Gateway)
							if !validNetdevRe.MatchString(dev) || (gw != "" && net.ParseIP(gw) == nil) {
								continue
							}
							hops = append(hops, LiveRouteNexthop{Gateway: gw, Device: dev, Weight: nh.Weight})
						}
						if len(hops) > 0 {
							defaultRoutes = append(defaultRoutes, LiveDefaultRoute{
								Metric: r.Metric, Protocol: strings.TrimSpace(r.Protocol), Nexthops: hops,
							})
						}
						continue
					}
					dev := strings.TrimSpace(r.Dev)
					gw := strings.TrimSpace(r.Gateway)
					if !validNetdevRe.MatchString(dev) || (gw != "" && net.ParseIP(gw) == nil) {
						continue
					}
					defaultRoutes = append(defaultRoutes, LiveDefaultRoute{
						Gateway: gw, Device: dev, Metric: r.Metric, Protocol: strings.TrimSpace(r.Protocol),
					})
				}
			}
		}
	}

	snap := &LiveNetSnapshot{
		CapturedAt:    time.Now().UTC().Format(time.RFC3339),
		Interfaces:    make([]LiveNetIfaceSnapshot, 0, len(rawIfaces)),
		DefaultRoutes: defaultRoutes,
	}

	for _, raw := range rawIfaces {
		dev := strings.TrimSpace(raw.Ifname)
		if dev == "lo" || !validNetdevRe.MatchString(dev) || isDynamicVirtualIface(dev) {
			continue
		}
		var addrs []LiveNetAddrSnapshot
		for _, a := range raw.AddrInfo {
			if a.Family != "inet" || a.Local == "" || a.Scope == "host" || a.Scope == "link" {
				continue
			}
			addrs = append(addrs, LiveNetAddrSnapshot{
				CIDR:      fmt.Sprintf("%s/%d", a.Local, a.Prefixlen),
				Dynamic:   a.Dynamic,
				Secondary: a.Secondary,
			})
		}
		snap.Interfaces = append(snap.Interfaces, LiveNetIfaceSnapshot{
			Device:      dev,
			IsUp:        slices.Contains(raw.Flags, "UP"),
			Addresses:   addrs,
			DhcpRunning: dhcpRunningFn != nil && dhcpRunningFn(dev),
		})
	}
	return snap, nil
}

func defaultRouteKey(r LiveDefaultRoute) string {
	if len(r.Nexthops) > 0 {
		parts := make([]string, 0, len(r.Nexthops))
		for _, nh := range r.Nexthops {
			w := max(nh.Weight, 1)
			parts = append(parts, fmt.Sprintf("%s|%s|%d", nh.Gateway, nh.Device, w))
		}
		return fmt.Sprintf("mp:%s|m=%d", strings.Join(parts, ","), r.Metric)
	}
	return fmt.Sprintf("%s|%s|m=%d", r.Gateway, r.Device, r.Metric)
}

func buildDefaultRouteArgs(verb string, r LiveDefaultRoute) []string {
	args := []string{"route", verb, "default"}
	if len(r.Nexthops) > 0 {
		for _, nh := range r.Nexthops {
			args = append(args, "nexthop")
			if nh.Gateway != "" {
				args = append(args, "via", nh.Gateway)
			}
			args = append(args, "dev", nh.Device)
			if nh.Weight > 0 {
				args = append(args, "weight", fmt.Sprintf("%d", nh.Weight))
			}
		}
	} else {
		if r.Gateway != "" {
			args = append(args, "via", r.Gateway)
		}
		args = append(args, "dev", r.Device)
	}
	if r.Metric > 0 {
		args = append(args, "metric", fmt.Sprintf("%d", r.Metric))
	}
	return args
}

// RestoreLiveNetSnapshot executes deterministic 3-phase kernel state restoration.
func RestoreLiveNetSnapshot(
	snapshot LiveNetSnapshot,
	dhcpRunningFn func(string) bool,
	stopDhcpFn func(string),
	rebindDhcpFn func(string),
) error {
	current, err := ReadLiveNetState(dhcpRunningFn)
	if err != nil {
		return err
	}

	snapByDev := make(map[string]LiveNetIfaceSnapshot, len(snapshot.Interfaces))
	for _, ifc := range snapshot.Interfaces {
		snapByDev[ifc.Device] = ifc
	}
	curByDev := make(map[string]LiveNetIfaceSnapshot, len(current.Interfaces))
	for _, ifc := range current.Interfaces {
		curByDev[ifc.Device] = ifc
	}

	// Phase A: Prune newly added non-secondary IPs, kill rogue DHCP clients, down newly upped NICs.
	for _, cur := range current.Interfaces {
		if isDynamicVirtualIface(cur.Device) {
			continue
		}
		snap, existed := snapByDev[cur.Device]
		snapAddrs := make(map[string]bool, len(snap.Addresses))
		for _, a := range snap.Addresses {
			snapAddrs[a.CIDR] = true
		}
		for _, addr := range cur.Addresses {
			if addr.Secondary || snapAddrs[addr.CIDR] {
				continue
			}
			if out, err := exec.Command("ip", "addr", "del", addr.CIDR, "dev", cur.Device).CombinedOutput(); err != nil {
				log.Printf("rollback: del addr %s on %s: %v (%s)", addr.CIDR, cur.Device, err, strings.TrimSpace(string(out)))
			}
		}
		if (!existed || !snap.DhcpRunning) && dhcpRunningFn(cur.Device) {
			stopDhcpFn(cur.Device)
		}
		if (!existed || !snap.IsUp) && cur.IsUp {
			if dhcpRunningFn(cur.Device) {
				stopDhcpFn(cur.Device)
			}
			_ = exec.Command("ip", "link", "set", cur.Device, "down").Run()
		}
	}

	// Phase B: Restore pre-apply UP links, missing static CIDRs, and pre-existing DHCP leases.
	for _, snap := range snapshot.Interfaces {
		if snap.IsUp {
			_ = exec.Command("ip", "link", "set", snap.Device, "up").Run()
		}
		cur := curByDev[snap.Device]
		curAddrs := make(map[string]bool, len(cur.Addresses))
		for _, a := range cur.Addresses {
			curAddrs[a.CIDR] = true
		}
		missingDynamic := false
		for _, addr := range snap.Addresses {
			if addr.Secondary {
				continue
			}
			if addr.Dynamic {
				if !curAddrs[addr.CIDR] {
					missingDynamic = true
				}
				continue
			}
			if !curAddrs[addr.CIDR] {
				if out, err := exec.Command("ip", "addr", "replace", addr.CIDR, "dev", snap.Device).CombinedOutput(); err != nil {
					log.Printf("rollback: replace addr %s on %s: %v (%s)", addr.CIDR, snap.Device, err, strings.TrimSpace(string(out)))
				}
			}
		}
		if snap.DhcpRunning && (!dhcpRunningFn(snap.Device) || missingDynamic) {
			rebindDhcpFn(snap.Device)
		}
	}

	// Phase C: Reconcile single-nexthop and ECMP multipath default routes.
	snapRoutes := make(map[string]bool, len(snapshot.DefaultRoutes))
	for _, r := range snapshot.DefaultRoutes {
		snapRoutes[defaultRouteKey(r)] = true
	}
	curRoutes := make(map[string]bool, len(current.DefaultRoutes))
	for _, r := range current.DefaultRoutes {
		curRoutes[defaultRouteKey(r)] = true
	}

	for _, curRoute := range current.DefaultRoutes {
		if !snapRoutes[defaultRouteKey(curRoute)] {
			_ = exec.Command("ip", buildDefaultRouteArgs("del", curRoute)...).Run()
		}
	}
	for _, snapRoute := range snapshot.DefaultRoutes {
		if !curRoutes[defaultRouteKey(snapRoute)] {
			_ = exec.Command("ip", buildDefaultRouteArgs("replace", snapRoute)...).Run()
		}
	}
	return nil
}

// RestoreExternalFiles restores daemon config files outside the staging store safely via O_NOFOLLOW.
func RestoreExternalFiles(backupDir string, meta ExternalBundleMeta) {
	for _, entry := range meta.Files {
		if fi, err := os.Lstat(entry.Path); err == nil && (fi.Mode()&os.ModeSymlink) != 0 {
			log.Printf("rollback: refusing to follow symlink %s", entry.Path)
			continue
		}
		if !entry.Existed {
			_ = os.Remove(entry.Path)
			continue
		}
		data, err := os.ReadFile(filepath.Join(backupDir, entry.BackupName))
		if err != nil {
			continue
		}
		mode := os.FileMode(entry.Mode).Perm()
		if mode == 0 {
			mode = 0644
		}
		_ = os.MkdirAll(filepath.Dir(entry.Path), 0755)
		f, err := os.OpenFile(entry.Path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC|syscall.O_NOFOLLOW, mode)
		if err != nil {
			log.Printf("rollback: open %s: %v", entry.Path, err)
			continue
		}
		_, _ = f.Write(data)
		_ = f.Chmod(mode)
		_ = f.Sync()
		_ = f.Close()
	}
}
```

Notice the subtle ordering invariant in `RestoreLiveNetSnapshot`:
- **Phase A runs before Phase B**: removing a misconfigured overlapping IP on `ens2f0` *first* ensures `Phase B` can safely restore the pre-apply IP and link state on `ens1f0` without hitting kernel duplicate-route or `rp_filter` conflicts.
- **Phase B runs before Phase C**: restoring interface link `UP` state and static IPv4 addresses *first* ensures the connected subnet route (`proto kernel`) exists before `Phase C` calls `ip route replace default via <gw>`.

---

## 4. Atomic `nftables` Generation Swaps & Anti-Lockout Guard Chains

Unlike `iptables-legacy` (which historically walked rule chains locklessly or suffered read-modify-write races across `xtables.lock`), `nf_tables` compiles user rules into netlink bytecode inside `libnftables` and delivers an entire file inside one `NFNL_MSG_BATCH_BEGIN` ... `NFNL_MSG_BATCH_END` transaction. In the kernel (`net/netfilter/nf_tables_api.c`), `nf_tables_commit()` atomically advances the two-state generation cursor (`nft_gencursor_next()`), making the new table graph live for all CPUs in one RCU grace period—or rolling back every queued `nft_trans` object cleanly if any hook registration or set lookup fails.

However, **atomic syntax commit does not protect against an operator shooting themselves in the foot with a syntactically valid `drop` policy**! A classic failure is flushing the ruleset and applying a restrictive `input` chain with `policy drop` that omits the operator's bastion CIDR, WireGuard UDP port, or `ct state established,related`.

To eliminate firewall lockouts even when user-authored policy chains misbehave, understand one critical kernel invariant in `net/netfilter/core.c` (`nf_hook_slow()`): **an `accept` verdict in a lower-priority `nftables` base chain (`priority filter - 10`) terminates evaluation of *that chain only*—Netfilter still invokes every subsequent base chain registered at the same hook (`NF_INET_LOCAL_IN`)!** If a downstream user chain at `priority filter` ends in `policy drop`, it will still drop the packet unless it honors the guard decision.

The clean Linux pattern combines a **priority `-10` guard table (`inet anti_lockout`) that tags control-plane packets with a dedicated packet mark (`meta mark set 0x1000`)** and an immutable rule at line 1 of the downstream `input` chain that short-circuits marked management flows (`meta mark 0x1000 accept`):

```nft
#!/usr/sbin/nft -f
# /etc/net-tx/candidate.nft — Atomic ruleset with priority -10 anti-lockout guard

flush ruleset

# 1. Immutable Management Control-Plane Guard (runs BEFORE priority filter)
table inet anti_lockout {
    set mgmt_bastions_v4 {
        type ipv4_addr
        flags interval
        elements = { 198.51.100.0/24, 203.0.113.10/32 }
    }

    set mgmt_bastions_v6 {
        type ipv6_addr
        flags interval
        elements = { 2001:db8:100::/48 }
    }

    chain input_guard {
        type filter hook input priority filter - 10; policy accept;

        # Always tag loopback & established control-plane flows
        iifname "lo" meta mark set 0x1000 accept
        ct state established,related meta mark set 0x1000 accept

        # Tag SSH / control-plane API from pinned bastions on mgmt NIC or VRF
        iifname { "ens1f0", "vrf-mgmt" } ip saddr @mgmt_bastions_v4 tcp dport { 22, 8443 } meta mark set 0x1000 accept
        iifname { "ens1f0", "vrf-mgmt" } ip6 saddr @mgmt_bastions_v6 tcp dport { 22, 8443 } meta mark set 0x1000 accept

        # Preserve out-of-band WireGuard management overlay handshakes
        udp dport 51820 meta mark set 0x1000 accept
    }
}

# 2. Operator Data-Plane & Service Policy (runs AFTER input_guard)
table inet firewall {
    chain input {
        type filter hook input priority filter; policy drop;

        # Honor anti_lockout guard verdict so downstream `policy drop` cannot sever mgmt
        meta mark 0x1000 accept

        ct state invalid drop
        icmp type echo-request limit rate 10/second accept
        icmpv6 type { echo-request, nd-neighbor-solicit, nd-neighbor-advert, nd-router-advert } accept

        # Public service ingress
        iifname "ens1f1" tcp dport { 80, 443 } accept

        log prefix "[nft-drop-input] " limit rate 5/minute counter drop
    }

    chain forward {
        type filter hook forward priority filter; policy drop;
        ct state established,related accept
        iifname "ens2f0" oifname "ens1f1" accept
    }
}
```

### Mandatory Preflight Verification Pipeline (Before Arming or Mutating)

Never feed an untrusted ruleset or interface bundle directly into `nft -f` or `rtnetlink`. Run a three-gate preflight check first:

```bash
#!/usr/bin/env bash
set -euo pipefail

CANDIDATE_NFT="/etc/net-tx/candidate.nft"
OPERATOR_IP="${OPERATOR_IP:-198.51.100.42}"
MGMT_IP="${MGMT_IP:-198.51.100.10}"
MGMT_DEV="${MGMT_DEV:-ens1f0}"

# Gate 1: Dry-run netlink compilation & kernel validation (no live mutation)
nft -c -f "${CANDIDATE_NFT}"

# Gate 2: Reject cross-interface overlapping IPv4 subnets in candidate topology
python3 - <<'EOF'
import ipaddress, sys

# Validate staged NIC prefixes have zero ambiguous overlap across L3 ports
staged = {"ens1f0": "198.51.100.10/24", "ens1f1": "203.0.113.2/30", "ens2f0": "192.0.2.1/24"}
nets = [(nic, ipaddress.ip_network(cidr, strict=False)) for nic, cidr in staged.items()]
for i, (nic_a, net_a) in enumerate(nets):
    for nic_b, net_b in nets[i+1:]:
        if net_a.overlaps(net_b):
            print(f"ABORT: overlapping prefix {net_a} ({nic_a}) vs {net_b} ({nic_b})", file=sys.stderr)
            sys.exit(1)
print("Gate 2 PASS: zero L3 subnet overlaps detected.")
EOF

# Gate 3: Prove return path for operator IP resolves via intended management plane
ROUTE_CHECK="$(ip route get "${OPERATOR_IP}" from "${MGMT_IP}" 2>&1)"
echo "Gate 3 route lookup: ${ROUTE_CHECK}"
grep -q "dev ${MGMT_DEV}" <<<"${ROUTE_CHECK}" || {
    echo "ABORT: return path to ${OPERATOR_IP} no longer exits via ${MGMT_DEV}" >&2
    exit 1
}
```

> **Wait-free alternative when user tables are decoupled:** If users edit an isolated table whose chains are rendered through a compiler or validator rather than raw `nft -f`, assert at preflight time (via `nft -j list ruleset` or AST inspection) that `meta mark 0x1000 accept` remains rule 1 of every `hook input` base chain—guaranteeing that `nf_hook_slow()` never falls through into `policy drop` on tagged management traffic.

---

## 5. Out-of-Process Dead-Man's Switch (`systemd-run`), Boot Guard & Management VRF Isolation

Once preflight passes and your LKG snapshot is `fsync()`ed to `/var/lib/net-tx/pending.json` (plus `/var/lib/net-tx/lkg.nft`), arm the dead-man's switch in **PID 1's `systemd` manager**, completely decoupled from your control-plane daemon:

```bash
# 1. Arm a 120-second out-of-process dead-man's switch via PID 1
systemd-run \
  --unit=net-tx-rollback \
  --description="Network Commit-Confirmed Dead-Man's Switch" \
  --on-active=120s \
  --timer-property=AccuracySec=1s \
  --property=Type=oneshot \
  /usr/local/libexec/net-tx-rollback --reason=timeout

# Verify the transient timer is ticking in PID 1
systemctl list-timers net-tx-rollback.timer --no-pager

# 2. If operator proves reachability and confirms within 120s: disarm timer & finalize
systemctl stop net-tx-rollback.timer
rm -f /var/lib/net-tx/pending.json
```

### Surviving Power Loss & Kernel Panics: `net-tx-boot-guard.service`

What happens if a bad NIC firmware reset, kernel panic, or watchdog reboot fires 18 seconds into your 120-second window? Transient `systemd-run` timers live in `/run/systemd/transient` (`tmpfs`) and vanish across reboot. A hardened node pairs the transient timer with a static boot-time guard unit ordered before `network-pre.target`:

```ini
# /etc/systemd/system/net-tx-boot-guard.service
[Unit]
Description=Recover Unconfirmed Network Transaction on Boot
DefaultDependencies=no
ConditionPathExists=/var/lib/net-tx/pending.json
Before=network-pre.target systemd-networkd.service nftables.service sshd.service
After=local-fs.target

[Service]
Type=oneshot
ExecStart=/usr/local/libexec/net-tx-rollback --reason=unconfirmed-crash-recovery
StandardOutput=journal+console
StandardError=journal+console

[Install]
WantedBy=sysinit.target
```

Because `ConditionPathExists=/var/lib/net-tx/pending.json` evaluates *before* `network-pre.target`, an unconfirmed transaction that crashed the host automatically restores `/etc/systemd/network/*`, `/etc/nftables.conf`, and daemon config files *before* the broken config can re-instantiate on boot!

### Management VRF (`vrf-mgmt`) Plane Isolation

![Cyberpunk Cutaway of Isolated Management VRF and Hardware Watchdog Relay](/images/linux-commit-confirmed-cyberpunk-rack.jpg)
*Figure 3: Isolated out-of-band Management VRF (`vrf-mgmt`, routing table `100`) decoupling SSH, WireGuard, and control-plane APIs from volatile data-plane FIB mutations, backed by an amber watchdog relay and `ttyS0` break-glass serial path.*

The strongest architectural defense against routing lockouts is ensuring your SSH, WireGuard, and control-plane daemon **never share a routing table with the data plane**:

```bash
# 1. Create dedicated Management VRF backed by routing table 100
ip link add vrf-mgmt type vrf table 100
ip link set vrf-mgmt up

# 2. Enslave out-of-band management NIC (ens1f0) into vrf-mgmt
ip link set ens1f0 master vrf-mgmt
ip addr replace 198.51.100.10/24 dev ens1f0
ip route replace default via 198.51.100.1 dev ens1f0 table 100

# 3. Allow global/unscoped sockets (or explicit VRF-bound sshd) to accept across VRFs,
#    prevent primary IP deletions from nuking VIPs, and use loose RPF on multi-NIC nodes
sysctl -w net.ipv4.tcp_l3mdev_accept=1
sysctl -w net.ipv4.udp_l3mdev_accept=1
sysctl -w net.ipv4.conf.all.promote_secondaries=1
sysctl -w net.ipv4.conf.all.rp_filter=2

# 4. Bind out-of-band SSH & control daemon strictly inside vrf-mgmt
ip vrf exec vrf-mgmt /usr/sbin/sshd -D -p 2222 -o ListenAddress=198.51.100.10
```

Now even if an engineer deletes the entire `default` route in `table main` or leaks an `0.0.0.0/1` route on `ens1f1`, traffic bound to `ens1f0` looks up `table 100` exclusively—keeping your control-plane connection alive to cancel or debug the failed transaction.

---

## 6. Production Failure-Mode & Anti-Lockout Verification Matrix

| Failure Scenario | Underlying Kernel / Daemon Symptom | Why Naive Rollback Fails | Hardened Mitigation |
| :--- | :--- | :--- | :--- |
| **Control-plane reload kills rollback timer** | Agent receives `SIGTERM` during config reload; in-memory timer dies silently | Broken kernel/disk state persists indefinitely | `systemd-run --unit=net-tx-rollback` inside PID 1 + `pending.json` boot guard |
| **Secondary NIC assigned overlapping CIDR** | `proto kernel scope link` + `rp_filter=1` blackholes `ens1f0` return path | Operator cannot send `confirm`; naive rollback leaves secondary NIC UP | Preflight prefix overlap abort + `rp_filter=2` + Phase A pruning of added IPs/links |
| **`ip addr flush` destroys primary & VIPs** | `devinet.c` purges secondary VIPs (`promote_secondaries=0`); gateway becomes unreachable | `ip route replace` fails with `Nexthop has invalid gateway` | Differential non-secondary diff + `promote_secondaries=1` + Phase B before Phase C |
| **ECMP dual-WAN route collapsed** | `ip route replace default via ...` strips multipath `nexthop` weights and `metric` | Asymmetric traffic loss or backup link stuck primary | `defaultRouteKey()` + `buildDefaultRouteArgs()` preserving full `nexthop` slices |
| **Newly started DHCP client re-hijacks gateway** | Background `dhcpcd`/`dhclient` rebinds 30s after Phase B static IP restore | Restored static default route gets overwritten asynchronously | Phase A explicitly kills non-LKG DHCP daemons before link down / Phase B |
| **Overlay `wg0` / `veth` / `cilium` torn down** | Dynamic CNI or VPN interface created after snapshot gets downed as "extra" | Remote WireGuard bastion or running K8s pods drop offline | `isDynamicVirtualIface()` exclusion list skips `wg*`, `tailscale*`, `veth*`, `cni*`, `cilium*` |
| **Kernel reverted, `/etc` left broken** | RAM works until next kernel-patch reboot loads broken `/etc` network/nft config | Silent time bomb triggered weeks after initial rollout | Phase D `O_NOFOLLOW` file restoration + `nft -f lkg.nft` + daemon reload |
| **Host panics or power-cycles mid-window** | Transient `systemd-run` timer in `/run` vanishes on reboot | System boots straight into unconfirmed broken config | `net-tx-boot-guard.service` (`Before=network-pre.target`, `ConditionPathExists=pending.json`) |

Treating network configuration as an unconfirmed transaction with an out-of-process PID 1 dead-man's switch, a three-phase differential kernel reconciler, and an isolated `vrf-mgmt` control plane eliminates almost every software-induced datacenter lockout. Pair that stack with a real hardware `ttyS0` (`115200n8`) / IPMI Serial-over-LAN break-glass console, and even a catastrophic kernel-level misconfiguration reduces from a late-night drive to a boring 120-second self-healing log line.
