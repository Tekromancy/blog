---
title: "Dark-Port Linux Perimeters: Kernel-Native nftables Port Knocking, Cryptographic SPA, and XDP Ephemeral Admission Gates"
description: "How to eliminate WAN attack surface for self-hosted control planes, VPN enrollment portals, and SSH bastions—combining in-kernel nf_tables dynamic timeout automata, Noise_IK Single Packet Authorization, Netlink set actuation, and XDP_DRV line-rate stealth gates."
pubDate: "2026-11-26"
updatedDate: "2026-11-27"
heroImage: "46.jpg"
tags: ["linux", "networking", "nftables", "ebpf", "security"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

Exposing an SSH bastion, a self-hosted WireGuard coordination control plane, or an emergency enrollment endpoint on a public WAN address puts a live, stateful parser directly in front of the entire internet. Even if your daemon enforces Ed25519 keys, mTLS, or hardware-backed FIDO2 tokens, **authentication runs *after* pre-auth socket accept and protocol framing**—leaving your kernel and edge exposed to pre-auth RCEs (`regreSSHion`-class signal races), TLS/HTTP/2 rapid-reset floods, and zero-day vulnerabilities in user-space TLS or SSH libraries.

Reactive defenses like `fail2ban` or generic `limit rate` rules do not solve this problem: they only ban *after* a scanner completes TCP handshakes, confirms an open listening socket (`SYN-ACK`), and exercises pre-auth code paths.

A **dark-port perimeter** flips the model completely. By combining **silent `policy drop` semantics**, **time-boxed kernel lease sets**, **in-kernel `nftables` dynamic automata (`nft_dynset.c`)**, **cryptographic Single Packet Authorization (SPA)** actuated over `NETLINK_NETFILTER`, and **NIC-driver `XDP_DRV` pre-`sk_buff` filtering**, an unauthenticated scanner receives neither a `SYN-ACK`, nor a TCP `RST`, nor an ICMP `port-unreachable`. Until cryptographic or behavioral admission succeeds *and* an ephemeral control-plane window is active, the service literally does not exist on the wire.

---

## 1. Kernel-Native Port Knocking Inside `net/netfilter/nft_dynset.c`

Classic userspace port-knocking daemons (`knockd`) depend on `libpcap` sniffing raw sockets in userspace, parsing packets asynchronously, and spawning external `iptables` or `nft` subprocesses per knock. Under even modest SYN/UDP scan noise, `libpcap` ring buffers drop packets, `fork()`/`exec()` spikes CPU latency, and a daemon crash silently freezes the state machine.

Since Linux 4.1+ (and significantly hardened with `delete` statements inside dynamic rules in Linux 5.10+), **`nf_tables` executes the entire port-knocking finite state machine synchronously inside the kernel softIRQ receive path** via `net/netfilter/nft_dynset.c`:

```text
+-----------------------------------------------------------------------------------+
|          KERNEL-NATIVE NFTABLES KNOCK AUTOMATON & DUAL-GATE ADMISSION             |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  WAN INGRESS (wan0)                                                               |
|  ├── Decoy / Sequential Probe (41822, 41824, 19306, 19308, 53910, 53912)          |
|  │     └──► update @knock_banlist (1h TTL) + delete S1/S2 ──► SILENT DROP         |
|  │                                                                                |
|  └── Valid Non-Monotonic Knock Sequence (UDP/41823 -> UDP/19307 -> UDP/53911)     |
|        ├── [1] UDP/41823 + per-IP rate meter ──► add @knock_stage1 (10s TTL)      |
|        ├── [2] UDP/19307 & saddr @knock_stage1 ─► del S1 + add @knock_stage2 (10s)|
|        └── [3] UDP/53911 & saddr @knock_stage2 ─► del S2 + update @knock_admitted |
|                                                       (60s sliding TTL)           |
|                                                               |                   |
|  CONTROL PLANE LEASE (@admit_window_ports)                    |                   |
|  └── `nft add element ... { 8443 timeout 900s }` ─────► [ DUAL-GATE AND ]         |
|      (Fail-closed in kernel RAM even if daemon crashes)       |                   |
|                                                               v                   |
|     tcp dport @admit_window_ports  AND  saddr @knock_admitted  AND  ct state new  |
|                     ├── TRUE  ──► ACCEPT (TLS / WireGuard Enroll / Break-Glass)   |
|                     └── FALSE ──► `policy drop` (Zero RST, Zero ICMP, Zero Leak)  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

![Kernel-Native nftables Dynamic Timeout Port Knocking State Machine and Dual-Gate Admission](/images/stealth-nftables-dynset-knock-automaton.jpg)
*Figure 1: Three-stage in-kernel `nf_tables` port-knocking automaton with honeyport decoy traps, bounded slab capacity (`size 4096`), IPv6 `/64` prefix masking, and intersection against an ephemeral `@admit_window_ports` kernel lease.*

### Comparing Linux Dark-Port Admission Architectures

| Architecture | Packet Processing Locus | Subprocess / Syscall Overhead | Replay & Sniffing Resistance | Flood Resilience (10+ Mpps) | Fail-Closed Kernel Expiry |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`knockd` + `libpcap`** | Userspace `AF_PACKET` | High (`fork/exec` per stage) | None (plaintext port sequence) | Poor (pcap ring drops) | **No** (depends on daemon timer) |
| **Pure `nftables` `nft_dynset`** | Kernel `NF_INET_LOCAL_IN` | **Zero** (100% Ring-0 softIRQ) | Behavioral only (non-monotonic + honeyport trap) | Good (`size` cap + per-IP meter) | **Yes** (`flags timeout` in kernel RAM) |
| **Cryptographic SPA + `NFT_MSG_NEWSETELEM`** | Userspace AEAD + Kernel `nf_tables` | Low (single Netlink datagram per admit) | **Strong** (`Noise_IK` X25519 + ChaCha20-Poly1305 + nonce) | Moderate (`sk_buff` + conntrack still allocated) | **Yes** (`NFTA_SET_ELEM_TIMEOUT`) |
| **Cryptographic SPA + `XDP_DRV` Gate** | NIC Driver RX Ring + Userspace AEAD | **Near-Zero** (`BPF_MAP_UPDATE_ELEM`) | **Strong** (replay-proof AEAD + time-windowed keys) | **Line-Rate (~14–24 Mpps/core)**, zero `sk_buff` | **Yes** (`CLOCK_BOOTTIME` deadline check) |

### Four `nft_dynset.c` Internals You Must Understand

Before writing a production ruleset, examine how `net/netfilter/nft_dynset.c` and `net/netfilter/nft_set_rbtree.c` / `nft_set_hash.c` (`nft_rhash`) behave inside the kernel:

1. **`add` (`NFT_DYNSET_OP_ADD`) vs. `update` (`NFT_DYNSET_OP_UPDATE`)**:
   - Calling **`add`** inserts the element only if it is absent; if the source IP is already in `@knock_stage1`, `add` returns `-EEXIST` internally (which `nft_dynset` ignores without resetting the expiration clock!). Use `add` on Stage 1 and Stage 2 so an attacker flooding port `41823` cannot pin a transient stage open indefinitely.
   - Calling **`update`** refreshes the element's `timeout` on every match. Use `update` on `@knock_admitted` (if you want active re-knocks to extend a session) and on `@knock_banlist` (so persistent scanners continuously reset their 1-hour ban penalty).
2. **Inline `delete` (`NFT_DYNSET_OP_DELETE`, Linux 5.10+) prevents double-traversal**:
   - Explicitly deleting the source IP from `@knock_stage1` at the exact instant it transitions into `@knock_stage2` enforces **strict sequential ordering**: a client cannot bounce backward or skip stages, and stale partial state disappears immediately instead of occupying slab slots.
3. **Always specify `size <N>` on `flags dynamic` sets**:
   - Dynamic sets default to `nft_rhash` (`rhashtable`) backed by slab allocations (`nft_set_elem`). Without `size 4096`, a spoofed-source UDP flood hitting your Stage 1 port causes unbounded kernel `kmalloc()` growth until `oom-killer` fires or slab memory exhausts! With `size 4096`, `nft_rhash_insert()` fails cleanly with `-ENOSPC` once full, bounded strictly to a few hundred kilobytes of kernel RAM.
4. **Synchronous expiry vs. asynchronous GC (`gc-interval`)**:
   - A common misconception is that an IP remains admitted until `gc-interval` runs. In reality, **`nft_rhash_lookup()` evaluates `nft_set_elem_expired(ext)` on the hot path**—so a packet arriving 1 millisecond after timeout expiry is immediately rejected, even if `nft_rhash_gc()` has not yet reaped the memory slot. Still, configure `gc-interval 10s;` (tighter than the default `60s`) so short 10-second stage sets free slab capacity promptly under flood pressure.

### Production Dual-Stack `nftables` Ruleset with Honeyport Traps & Ephemeral Lease Windows

Notice the architectural synergy when pairing port knocking with an **ephemeral control-plane lease set (`@admit_window_ports`)**: instead of opening a public HTTPS enrollment or break-glass port to the world whenever an admin triggers a temporary access window (or leaving a port knock open 24/7), **require both gates simultaneously**. Even if a control-plane daemon crashes with `SIGKILL`, the kernel expires the entry in `@admit_window_ports` automatically at `T=900s`:

```nft
#!/usr/sbin/nft -f
# /etc/nftables.d/stealth-gate.nft
# Requires Linux 5.10+ (for inline dynamic `delete` statements)

define WAN_IF        = "wan0"
define WG_IF         = "wg0"
define KNOCK_PORT_1  = 41823
define KNOCK_PORT_2  = 19307
define KNOCK_PORT_3  = 53911

# Non-sequential adjacent decoy ports to trap sequential Nmap/Masscan sweeps
define KNOCK_DECOYS  = { 41822, 41824, 19306, 19308, 53910, 53912 }

table inet stealth_gate {

    # ── Ephemeral Control-Plane Port Leases (populated by orchestrator via Netlink/nft) ──
    set admit_window_ports {
        type inet_service
        flags timeout
        timeout 900s
        gc-interval 15s
    }

    # ── IPv4 Dynamic State Sets (slab-bounded via `size`) ──
    set knock_rl_v4 {
        type ipv4_addr
        size 4096
        flags dynamic,timeout
        timeout 60s
        gc-interval 15s
    }

    set knock_stage1_v4 {
        type ipv4_addr
        size 4096
        flags dynamic,timeout
        timeout 10s
        gc-interval 10s
    }

    set knock_stage2_v4 {
        type ipv4_addr
        size 4096
        flags dynamic,timeout
        timeout 10s
        gc-interval 10s
    }

    set knock_admitted_v4 {
        type ipv4_addr
        size 2048
        flags dynamic,timeout
        timeout 60s
        gc-interval 10s
    }

    set knock_banlist_v4 {
        type ipv4_addr
        size 16384
        flags dynamic,timeout
        timeout 1h
        gc-interval 60s
    }

    # ── IPv6 Dynamic State Sets (keyed on /64 SLAAC prefix, NOT volatile /128) ──
    set knock_rl_v6 {
        type ipv6_addr
        size 4096
        flags dynamic,timeout
        timeout 60s
        gc-interval 15s
    }

    set knock_stage1_v6 {
        type ipv6_addr
        size 4096
        flags dynamic,timeout
        timeout 10s
        gc-interval 10s
    }

    set knock_stage2_v6 {
        type ipv6_addr
        size 4096
        flags dynamic,timeout
        timeout 10s
        gc-interval 10s
    }

    set knock_admitted_v6 {
        type ipv6_addr
        size 2048
        flags dynamic,timeout
        timeout 60s
        gc-interval 10s
    }

    set knock_banlist_v6 {
        type ipv6_addr
        size 16384
        flags dynamic,timeout
        timeout 1h
        gc-interval 60s
    }

    # ── Honeyport Trap & Penalty Chain ──
    chain trap_knock_scanner {
        meta nfproto ipv4 update @knock_banlist_v4 { ip saddr }
        meta nfproto ipv4 delete @knock_stage1_v4 { ip saddr }
        meta nfproto ipv4 delete @knock_stage2_v4 { ip saddr }

        meta nfproto ipv6 update @knock_banlist_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: }
        meta nfproto ipv6 delete @knock_stage1_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: }
        meta nfproto ipv6 delete @knock_stage2_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: }

        counter drop
    }

    # ── Kernel Knock Finite-State Automaton (UDP-only to prevent SYN retransmit traps) ──
    chain knock_fsm_v4 {
        # Short-circuit banned scanners immediately
        ip saddr @knock_banlist_v4 counter drop

        # Honeyport decoys (TCP or UDP probes on adjacent ports poison the whole sequence)
        th dport $KNOCK_DECOYS goto trap_knock_scanner

        # Ignore non-UDP knocks cleanly without poisoning valid stages
        meta l4proto != udp return

        # Stage 3 -> Admitted (requires Stage 2; clears S2; sets 60s sliding admission)
        udp dport $KNOCK_PORT_3 ip saddr @knock_stage2_v4 \
            delete @knock_stage2_v4 { ip saddr } \
            update @knock_admitted_v4 { ip saddr } \
            counter drop

        # Stage 2 -> Stage 2 Set (requires Stage 1; clears S1; strict `add` prevents TTL extend)
        udp dport $KNOCK_PORT_2 ip saddr @knock_stage1_v4 \
            delete @knock_stage1_v4 { ip saddr } \
            add @knock_stage2_v4 { ip saddr } \
            counter drop

        # Stage 1 -> Per-source rate meter prevents one flooder exhausting global stage limit
        udp dport $KNOCK_PORT_1 \
            add @knock_rl_v4 { ip saddr limit rate 5/minute burst 10 packets } \
            add @knock_stage1_v4 { ip saddr } \
            counter drop
    }

    chain knock_fsm_v6 {
        ip6 saddr & ffff:ffff:ffff:ffff:: @knock_banlist_v6 counter drop
        th dport $KNOCK_DECOYS goto trap_knock_scanner
        meta l4proto != udp return

        udp dport $KNOCK_PORT_3 ip6 saddr & ffff:ffff:ffff:ffff:: @knock_stage2_v6 \
            delete @knock_stage2_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: } \
            update @knock_admitted_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: } \
            counter drop

        udp dport $KNOCK_PORT_2 ip6 saddr & ffff:ffff:ffff:ffff:: @knock_stage1_v6 \
            delete @knock_stage1_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: } \
            add @knock_stage2_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: } \
            counter drop

        udp dport $KNOCK_PORT_1 \
            add @knock_rl_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: limit rate 5/minute burst 10 packets } \
            add @knock_stage1_v6 { ip6 saddr & ffff:ffff:ffff:ffff:: } \
            counter drop
    }

    chain input {
        type filter hook input priority filter; policy drop;

        iifname "lo" accept
        iifname $WG_IF accept

        ct state invalid drop
        ct state established,related accept

        # Essential L3/ICMPv6 neighbor discovery & PMTUD (never drop PTB!)
        ip protocol icmp icmp type { destination-unreachable, time-exceeded, parameter-problem, echo-request } limit rate 10/second accept
        ip6 nexthdr ipv6-icmp icmpv6 type { destination-unreachable, packet-too-big, time-exceeded, parameter-problem, nd-neighbor-solicit, nd-neighbor-advert, nd-router-advert, echo-request } limit rate 20/second accept

        # Run kernel knock FSM exclusively on WAN ingress
        iifname $WAN_IF meta nfproto ipv4 jump knock_fsm_v4
        iifname $WAN_IF meta nfproto ipv6 jump knock_fsm_v6

        # Dual-Gate Admission: port must be leased in @admit_window_ports AND source must hold knock lease
        iifname $WAN_IF tcp dport @admit_window_ports ip saddr @knock_admitted_v4 ct state new counter accept
        iifname $WAN_IF tcp dport @admit_window_ports ip6 saddr & ffff:ffff:ffff:ffff:: @knock_admitted_v6 ct state new counter accept

        # WireGuard UDP transport (authenticated natively via Noise_IKpsk2 inside kernel wireguard.ko)
        iifname $WAN_IF udp dport 51820 accept

        # Default policy is DROP: silent stealth blackhole (zero RST, zero ICMP unreachable)
    }
}
```

### Atomic Ephemeral Window Arming (`nft -f -`)

Notice one subtle trick: if a control plane arms port `8443` while an old `8443` element is already ticking, `nft add element` leaves the old TTL untouched unless updated or replaced atomically. Submitting an RCU batch over `stdin` resets the exact lease duration cleanly in one kernel generation flip:

```bash
# Arm ephemeral enrollment / break-glass window on TCP/8443 for exactly 900s
nft -f - <<'EOF'
delete element inet stealth_gate admit_window_ports { 8443 }
add element inet stealth_gate admit_window_ports { 8443 timeout 900s }
EOF

# Inspect live kernel countdown (expires timer ticks down inside Ring 0)
nft list set inet stealth_gate admit_window_ports
```

---

## 2. Six Adversarial Failure Modes That Break Naive Port Knocking

Even well-intentioned port-knocking deployments routinely lock out legitimate operators or leak silent backdoors under real-world WAN conditions. Every one of these six failure modes comes straight from Linux kernel and network-stack behavior:

### 1. TCP SYN Retransmission Self-Poisoning (`tcp_syn_retries`)
If you build your knock sequence out of **TCP SYN** packets (e.g., `nmap -Pn` or `nc -z`) against a `policy drop` firewall, the client kernel does not receive a `RST`. Per `net.ipv4.tcp_syn_retries` (default `6`), the client's TCP stack automatically retransmits that Stage 1 `SYN` at **`+1s`, `+3s`, `+7s`, `+15s`...** unless the client application closes the non-blocking socket within `<1s`!

Those zombie `SYN` retransmissions arrive *interleaved* with Stage 2 and Stage 3—corrupting strict order-checked automata or triggering out-of-order reset/ban rules right after the user unlocks Stage 3. **Always use single-shot UDP datagrams** for port knocking (and never use TCP `connect()` without an immediate `close()` sub-100ms timeout).

### 2. Passive Wire Sniffing & On-Path Replay
Plain port knocking transmits zero cryptographic authenticity—only a destination port tuple (`41823 -> 19307 -> 53911`). Any passive tap on coffee-shop Wi-Fi, ISP transit, or a compromised upstream router sees the exact three UDP ports and can replay them within seconds from another IP (or spoof the source IP if upstream lacks BCP 38 egress filtering). Pure `nftables` port knocking is therefore a **noise-suppression and scanner-shielding layer** (eliminating 99.99% of automated internet bots and pre-auth CVEs), *never* an authentication replacement—and why we upgrade to cryptographic SPA in Section 3.

### 3. WAN ECMP Packet Reordering & Inter-Packet Jitter
Firing three UDP knock packets in a tight zero-delay `for` loop causes consecutive packets to traverse different WAN ECMP paths, Wi-Fi TXOP queues, or cellular L2 ARQ retransmissions—frequently arriving at the edge firewall as `19307 -> 41823 -> 53911` and failing Stage 1. Clients must enforce a **`150ms`–`300ms` inter-packet pacing delay** (easily fitting inside the `10s` per-stage kernel TTL), or better yet, replace multi-packet sequences entirely with a **single atomic UDP SPA packet**.

### 4. Carrier-Grade NAT (CGNAT) & Corporate Egress Fan-In
Inside an enterprise proxy or mobile carrier NAT gateway (`RFC 6598` `100.64.0.0/10`), thousands of users share one public IPv4 egress address. When an operator knocks from behind CGNAT, every other host sharing that NAT IP temporarily gains TCP `SYN` reachability to the admitted port during the 60-second admission window.

This is why **defense in depth is non-negotiable**:
- Keep `@knock_admitted` TTL tiny (`30s`–`60s`) so the source IP only needs to remain open long enough to complete TLS/SSH handshake establishment.
- Pair it with `@admit_window_ports` so the port itself only exists during authorized business windows.
- Enforce strong application authentication (mTLS, SSH keys, or short-lived invite tokens) behind the gate.

### 5. The Conntrack Persistence Trap (`established,related` Outlives TTL)
Look back at our `input` chain:

```nft
ct state established,related accept
```

Because Linux evaluates stateful `nf_conntrack` *before* checking `@knock_admitted` or `@admit_window_ports` (which only gates `ct state new`), **expiring a kernel set element does NOT terminate an active connection!**
- For TCP, an open HTTP/2 keep-alive session or multiplexed SSH control master remains valid until closed or timed out (`net.netfilter.nf_conntrack_tcp_timeout_established`, default 5 days on Linux!).
- For UDP protocols like WireGuard or QUIC, continuous keepalives (`PersistentKeepalive = 25`) keep `nf_conntrack_udp_timeout_stream` (`120s`) alive indefinitely.

If your security contract requires **hard session eviction** when an invite is revoked or an emergency window closes, you must delete the matching entries from `nf_conntrack` via `NFNL_SUBSYS_CTNETLINK` (`IPCTNL_MSG_CT_DELETE` / `conntrack -D`) at revocation time.

### 6. IPv6 Privacy-Extension `/128` Address Churn (`RFC 8981`)
On modern macOS, iOS, Android, and `NetworkManager`/systemd Linux clients, **IPv6 Temporary Addresses (`RFC 8981`)** rotate every few hours—and worse, some mobile dual-stack Happy Eyeballs clients send UDP knocks from a different `/128` suffix (or over IPv4) than the `/128` selected for the subsequent TCP/TLS connection. Masking IPv6 dynamic sets to the **`/64` SLAAC prefix (`ip6 saddr & ffff:ffff:ffff:ffff::`)** solves temporary-address churn cleanly without over-broadening to `/48` ISP blocks.

---

## 3. Upgrading to Cryptographic Single Packet Authorization (SPA)

To defeat passive sniffers, replay attackers, and CGNAT spoofing completely, replace static port sequences with **Single Packet Authorization (SPA)**: a single, authenticated, encrypted UDP datagram carrying a cryptographic client identity, monotonic timestamp, random nonce, and exact requested admission tuple.

### Wire-Format Design: `< 200` Bytes, Zero Pre-Auth ASN.1/JSON Surface

A critical rule for stealth daemons: **never run a JSON, Protobuf, or ASN.1 parser on unauthenticated internet UDP packets**. Model your wire protocol after **WireGuard (`Noise_IK`)** with fixed offsets and zero heap allocations before AEAD verification succeeds:

```text
+-----------------------------------------------------------------------------------+
|               SPA UDP WIRE FORMAT (UDP/53421 — 126 BYTES TOTAL)                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  Offset  0..1   ( 1 B): Version Magic (`0x01`)                                    |
|  Offset  1..33  (32 B): Client Ephemeral X25519 Public Key (`E_pk`)               |
|  Offset 33..110 (77 B): ChaCha20-Poly1305 Ciphertext (AAD = Bytes[0..33]):        |
|                         ├── [ 0..32] Client Static X25519 Pubkey (`S_pk`, 32 B)   |
|                         ├── [32..40] Unix Epoch Nanoseconds (big-endian u64, 8 B) |
|                         ├── [40..56] CSPRNG Replay Nonce (16 B)                   |
|                         ├── [56..72] Requested Source IP (16 B, v4-mapped or v6)  |
|                         ├── [72..73] L4 Protocol (`6`=TCP, `17`=UDP, 1 B)         |
|                         ├── [73..75] Requested Destination Port (u16, 2 B)        |
|                         └── [75..77] Requested Lease TTL Seconds (u16, 2 B)       |
|  Offset 110..126(16 B): Poly1305 Authentication Tag                               |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

At **126 bytes**, the entire payload fits well inside the lowest real-world IPv4/IPv6 MTU (`576`/`1280` bytes)—guaranteeing zero IP fragmentation—and reveals zero plaintext metadata to passive observers (every byte after byte 33 looks indistinguishable from uniform noise, and the AEAD authentication tag fails fast in constant time before any payload field is trusted).

### Go SPA Verifier + Direct Netlink `NFT_MSG_NEWSETELEM` Actuator

Instead of spawning `exec.Command("nft", ...)` per verified packet—which forks a child process and opens a new Netlink socket every time—actuate the kernel set directly over **`NETLINK_NETFILTER`** using `google/nftables`:

```go
// spa_verifier.go — Constant-time X25519 + ChaCha20-Poly1305 SPA verifier & Netlink actuator
package main

import (
	"crypto/ecdh"
	"crypto/hkdf"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/binary"
	"errors"
	"net/netip"
	"sync"
	"time"

	"github.com/google/nftables"
	"golang.org/x/crypto/chacha20poly1305"
)

const (
	spaVersion    = 0x01
	spaPacketLen  = 1 + 32 + 77 + 16 // 126 bytes
	maxClockSkew  = 15 * time.Second
	maxAllowedTTL = 120 * time.Second
)

type AllowedPeer struct {
	StaticPub    [32]byte
	StaticShared [32]byte // Precomputed X25519(ServerSK, PeerStaticPK) ("ss" in Noise_IK)
	Role         string
}

type SPAVerifier struct {
	serverPriv *ecdh.PrivateKey
	serverPub  [32]byte
	peers      []AllowedPeer

	mu          sync.Mutex
	replayCache map[[16]byte]time.Time // bounded replay cache swept on skew expiry

	nfConn *nftables.Conn
	nfSet  *nftables.Set
}

// VerifyAndAdmit validates an incoming 126-byte UDP SPA datagram and injects
// an auto-expiring element directly into nf_tables via NETLINK_NETFILTER.
func (v *SPAVerifier) VerifyAndAdmit(pkt []byte, srcIP netip.Addr) error {
	if len(pkt) != spaPacketLen || pkt[0] != spaVersion {
		return errors.New("drop: invalid frame")
	}

	ephemPubBytes := pkt[1:33]
	ephemPub, err := ecdh.X25519().NewPublicKey(ephemPubBytes)
	if err != nil {
		return errors.New("drop: malformed x25519 key")
	}

	// 1. Ephemeral-Static DH ("es") + precomputed Static-Static DH ("ss") per peer:
	//    Mixing ss = X25519(ClientStaticSK, ServerPK) proves the sender actually holds
	//    ClientStaticSK, preventing public-key forgery against an allowlisted peer's S_pk.
	es, err := v.serverPriv.ECDH(ephemPub)
	if err != nil {
		return errors.New("drop: ecdh failed")
	}
	info := make([]byte, 0, 17+32+32)
	info = append(info, []byte("tekromancy-spa-v1")...)
	info = append(info, ephemPubBytes...)
	info = append(info, v.serverPub[:]...)

	var zeroNonce [chacha20poly1305.NonceSize]byte
	var plaintext []byte
	matched := 0
	for i := range v.peers {
		var ikm [64]byte
		copy(ikm[:32], es)
		copy(ikm[32:], v.peers[i].StaticShared[:])

		aeadKey, err := hkdf.Key(sha256.New, ikm[:], nil, string(info), chacha20poly1305.KeySize)
		if err != nil {
			continue
		}
		aead, err := chacha20poly1305.New(aeadKey)
		if err != nil {
			continue
		}
		// Single-use ephemeral key guarantees zero-nonce uniqueness; AAD authenticates header
		pt, openErr := aead.Open(nil, zeroNonce[:], pkt[33:], pkt[:33])
		if openErr == nil && len(pt) == 77 {
			if subtle.ConstantTimeCompare(pt[0:32], v.peers[i].StaticPub[:]) == 1 {
				plaintext = pt
				matched = 1
			}
		}
	}
	if matched != 1 {
		return errors.New("drop: aead tag mismatch or unauthorized peer")
	}

	// 2. Timestamp freshness check (+/-15s skew bounds replay cache lifetime)
	tsNs := int64(binary.BigEndian.Uint64(plaintext[32:40]))
	skew := time.Since(time.Unix(0, tsNs))
	if skew > maxClockSkew || skew < -maxClockSkew {
		return errors.New("drop: timestamp outside skew window")
	}

	// 3. Bounded nonce replay check
	var nonce [16]byte
	copy(nonce[:], plaintext[40:56])
	now := time.Now()
	v.mu.Lock()
	for k, exp := range v.replayCache {
		if now.After(exp) {
			delete(v.replayCache, k)
		}
	}
	if _, seen := v.replayCache[nonce]; seen {
		v.mu.Unlock()
		return errors.New("drop: replayed spa nonce")
	}
	if len(v.replayCache) >= 16384 {
		v.mu.Unlock()
		return errors.New("drop: replay cache saturated")
	}
	v.replayCache[nonce] = now.Add(2 * maxClockSkew)
	v.mu.Unlock()

	// 4. Bind admission IP to either cryptographically asserted IP or verified packet source
	reqAddr, ok := netip.AddrFromSlice(plaintext[56:72])
	if !ok {
		return errors.New("drop: invalid req ip")
	}
	reqAddr = reqAddr.Unmap()
	admitIP := srcIP.Unmap()
	if !reqAddr.IsUnspecified() && reqAddr != admitIP {
		// Prevent behind-NAT credential sharing unless explicitly delegated
		return errors.New("drop: source ip binding mismatch")
	}

	ttlSec := binary.BigEndian.Uint16(plaintext[75:77])
	ttl := time.Duration(ttlSec) * time.Second
	if ttl <= 0 || ttl > maxAllowedTTL {
		ttl = 60 * time.Second
	}

	// 5. Actuate kernel nf_tables set directly via Netlink (zero fork/exec)
	if admitIP.Is4() {
		v.mu.Lock()
		defer v.mu.Unlock()
		if err := v.nfConn.SetAddElements(v.nfSet, []nftables.SetElement{{
			Key:     admitIP.AsSlice(),
			Timeout: ttl,
		}}); err != nil {
			return err
		}
		return v.nfConn.Flush()
	}
	return nil
}
```

Notice two critical security properties here:
- **True `Noise_IK` static-key authentication (`es || ss`)**: Mixing precomputed `StaticShared = X25519(ServerSK, PeerStaticPK)` alongside ephemeral `es` ensures a passive attacker who merely knows an authorized operator's public key `S_pk` cannot forge an SPA packet—possession of `ClientStaticSK` is mathematically required. For small operator allowlists (`<= 256` peers), scanning `v.peers` inside the 126-byte wire format stays sub-millisecond; larger fleets (`> 256` peers) can adopt the full two-tag `Noise_IK` 142-byte layout (a 48-byte `es`-encrypted static pubkey block for `O(1)` map lookup followed by a 61-byte `es+ss`-encrypted payload).
- **IP binding (`reqAddr != admitIP`)**: binding the authorized client's public IP inside the encrypted payload blocks NAT-level hijacking *and* stops an attacker from stealing and re-sending a captured packet if they are off-path. (For roaming clients whose IP isn't pre-known via STUN/external lookup, set `reqAddr = ::` and fall back to `srcIP`—only *after* full AEAD + replay verification passes.)

---

## 4. Line-Rate Stealth at NIC Driver RX — eBPF `XDP_DRV` Admission Gate

When an adversarial botnet launches a **15 Mpps TCP SYN flood** at your protected TLS/SSH port—or hammers `UDP/53421` to exhaust your userspace X25519 CPU budget—`nftables` at `NF_INET_LOCAL_IN` still pays the full cost of NIC driver `sk_buff` allocation, NAPI GRO processing, IP routing lookup (`ip_route_input_noref`), and Netfilter hook traversal on every single junk frame.

Moving enforcement down into **eBPF `XDP_DRV`** intercepts every packet directly inside the NIC driver's RX ring **before `sk_buff` exists**, dropping unauthorized SYNs at ~14–24 Mpps per core while protecting the userspace SPA verifier behind an in-kernel **per-CPU token bucket**:

![Cryptographic SPA Noise_IK Verifier and Dual Kernel Actuation Across Netlink nftables and XDP_DRV](/images/stealth-spa-xdp-zero-exposure-pipeline.jpg)
*Figure 2: End-to-end Noise_IK Single Packet Authorization pipeline pairing a zero-allocation 126-byte UDP wire format, an `XDP_DRV` per-CPU token bucket, direct `NFT_MSG_NEWSETELEM` Netlink injection, and `CLOCK_BOOTTIME`-synchronized BPF map lookups.*

### Verifier-Safe `XDP_DRV` C Program (`xdp_stealth_gate.c`)

Notice three critical engineering details in this eBPF program:
1. **Strict bounded header parsing**: handles optional `802.1Q` / `802.1AD` VLAN tags in a 2-step unrolled loop and validates variable `ip->ihl` (`>= 20` and `<= 60` bytes) with explicit `(void *)ip + ihl_len > data_end` guards so the kernel eBPF verifier proves memory safety on all kernels.
2. **Per-CPU token bucket (`BPF_MAP_TYPE_PERCPU_ARRAY`) on `UDP/53421`**: prevents asymmetric crypto DoS by capping how many candidate SPA datagrams reach userspace per RX queue without cross-CPU spinlock contention.
3. **`bpf_ktime_get_boot_ns()` clock-domain invariant**: the allowlist stores a 64-bit nanosecond expiration timestamp evaluated against `bpf_ktime_get_boot_ns()`.

```c
// xdp_stealth_gate.c — Driver-level XDP dark-port admission + SPA flood throttle
// Compile: clang -O2 -g -target bpf -D__TARGET_ARCH_x86 -c xdp_stealth_gate.c -o xdp_stealth_gate.o

#include <linux/bpf.h>
#include <linux/if_ether.h>
#include <linux/if_vlan.h>
#include <linux/in.h>
#include <linux/ip.h>
#include <linux/tcp.h>
#include <linux/udp.h>
#include <bpf/bpf_helpers.h>
#include <bpf/bpf_endian.h>

#define SPA_UDP_PORT 53421
#define SPA_MAX_BURST 64ULL
#define SPA_REFILL_NS 10000000ULL // 1 token per 10ms = 100 pkt/s per CPU core

struct port_key {
    __be16 dport;
    __u8   proto;
    __u8   pad;
};

struct allow_key {
    __be32 src_ip;
    __be16 dport;
    __u8   proto;
    __u8   pad;
};

struct token_bucket {
    __u64 tokens;
    __u64 last_ns;
};

struct stats_val {
    __u64 dropped_stealth;
    __u64 dropped_spa_rl;
    __u64 passed_allowed;
};

// Ports gated in dark-port mode (populated by userspace: e.g. TCP/22, TCP/8443)
struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 256);
    __type(key, struct port_key);
    __type(value, __u8);
} protected_ports SEC(".maps");

// Authorized source leases: value is absolute CLOCK_BOOTTIME expiry in nanoseconds
struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 16384);
    __type(key, struct allow_key);
    __type(value, __u64);
} spa_allow_map SEC(".maps");

// Lockless per-CPU token bucket guarding userspace X25519 verifier
struct {
    __uint(type, BPF_MAP_TYPE_PERCPU_ARRAY);
    __uint(max_entries, 1);
    __type(key, __u32);
    __type(value, struct token_bucket);
} spa_rl_bucket SEC(".maps");

struct {
    __uint(type, BPF_MAP_TYPE_PERCPU_ARRAY);
    __uint(max_entries, 1);
    __type(key, __u32);
    __type(value, struct stats_val);
} xdp_stats SEC(".maps");

static __always_inline int spa_ratelimit_allow(__u64 now_ns) {
    __u32 idx = 0;
    struct token_bucket *tb = bpf_map_lookup_elem(&spa_rl_bucket, &idx);
    if (!tb) return 1;

    if (tb->last_ns == 0) {
        tb->tokens = SPA_MAX_BURST - 1;
        tb->last_ns = now_ns;
        return 1;
    }

    if (now_ns > tb->last_ns) {
        __u64 delta = now_ns - tb->last_ns;
        __u64 add = delta / SPA_REFILL_NS;
        if (add > 0) {
            tb->tokens += add;
            if (tb->tokens > SPA_MAX_BURST)
                tb->tokens = SPA_MAX_BURST;
            tb->last_ns += add * SPA_REFILL_NS;
        }
    }

    if (tb->tokens == 0)
        return 0;

    tb->tokens--;
    return 1;
}

SEC("xdp")
int xdp_stealth_gate(struct xdp_md *ctx) {
    void *data = (void *)(long)ctx->data;
    void *data_end = (void *)(long)ctx->data_end;

    struct ethhdr *eth = data;
    if ((void *)(eth + 1) > data_end)
        return XDP_PASS;

    __u16 h_proto = eth->h_proto;
    void *nh = (void *)(eth + 1);

    // Handle up to 2 stacked VLAN tags (802.1Q / QinQ)
    #pragma unroll
    for (int i = 0; i < 2; i++) {
        if (h_proto == bpf_htons(ETH_P_8021Q) || h_proto == bpf_htons(ETH_P_8021AD)) {
            struct vlan_hdr *vh = nh;
            if ((void *)(vh + 1) > data_end)
                return XDP_PASS;
            h_proto = vh->h_vlan_encapsulated_proto;
            nh = (void *)(vh + 1);
        }
    }

    if (h_proto != bpf_htons(ETH_P_IP))
        return XDP_PASS;

    struct iphdr *ip = nh;
    if ((void *)(ip + 1) > data_end)
        return XDP_PASS;

    __u32 ihl_len = (__u32)ip->ihl * 4;
    if (ihl_len < sizeof(*ip) || ihl_len > 60)
        return XDP_DROP;

    void *l4 = (void *)ip + ihl_len;
    if (l4 > data_end)
        return XDP_DROP;

    // Non-initial IPv4 fragments carry payload bytes, not L4 ports; never misparse as TCP/UDP headers
    if ((ip->frag_off & bpf_htons(0x1FFF)) != 0)
        return XDP_PASS;

    __be16 dport = 0;
    __u8 proto = ip->protocol;

    if (proto == IPPROTO_TCP) {
        struct tcphdr *tcp = l4;
        if ((void *)(tcp + 1) > data_end)
            return XDP_DROP;
        dport = tcp->dest;
    } else if (proto == IPPROTO_UDP) {
        struct udphdr *udp = l4;
        if ((void *)(udp + 1) > data_end)
            return XDP_DROP;
        dport = udp->dest;
    } else {
        return XDP_PASS;
    }

    __u32 stat_idx = 0;
    struct stats_val *st = bpf_map_lookup_elem(&xdp_stats, &stat_idx);
    __u64 now_ns = bpf_ktime_get_boot_ns();

    // 1. Protect userspace SPA verifier from UDP/53421 CPU exhaustion
    if (proto == IPPROTO_UDP && dport == bpf_htons(SPA_UDP_PORT)) {
        if (!spa_ratelimit_allow(now_ns)) {
            if (st) __sync_fetch_and_add(&st->dropped_spa_rl, 1);
            return XDP_DROP;
        }
        return XDP_PASS;
    }

    // 2. Pass unprotected traffic down to normal nftables policy
    struct port_key pk = { .dport = dport, .proto = proto, .pad = 0 };
    if (!bpf_map_lookup_elem(&protected_ports, &pk))
        return XDP_PASS;

    // 3. Enforce hard XDP_DROP unless active CLOCK_BOOTTIME lease exists
    struct allow_key ak = {
        .src_ip = ip->saddr,
        .dport  = dport,
        .proto  = proto,
        .pad    = 0,
    };
    __u64 *expire_boot_ns = bpf_map_lookup_elem(&spa_allow_map, &ak);
    if (!expire_boot_ns || now_ns >= *expire_boot_ns) {
        if (st) __sync_fetch_and_add(&st->dropped_stealth, 1);
        return XDP_DROP;
    }

    if (st) __sync_fetch_and_add(&st->passed_allowed, 1);
    return XDP_PASS;
}

char _license[] SEC("license") = "GPL";
```

### The `CLOCK_BOOTTIME` vs. `CLOCK_MONOTONIC` Clock-Domain Trap

One subtle eBPF bug silently ruins first-time XDP lease engines in production: **`bpf_ktime_get_boot_ns()` returns `CLOCK_BOOTTIME`**, whereas **`bpf_ktime_get_ns()` (and Go's default `time.Now()` monotonic clock on Linux) tracks `CLOCK_MONOTONIC`**, and `time.Now().UnixNano()` tracks **`CLOCK_REALTIME`**!

- If userspace writes `time.Now().UnixNano() + ttl.Nanoseconds()` (`1.79e18`) while XDP compares against `bpf_ktime_get_boot_ns()` (`uptime ~1e14`), every lease effectively becomes **permanent for 57 years**!
- Conversely, if the server ever suspended or hibernated, `CLOCK_MONOTONIC` freezes across suspend while `CLOCK_BOOTTIME` continues advancing—causing premature expiration or weird clock skew.

Userspace *must* sample the identical **`unix.CLOCK_BOOTTIME`** domain when computing `expire_boot_ns` for `BPF_MAP_UPDATE_ELEM`:

```go
// Compute exact CLOCK_BOOTTIME deadline matching bpf_ktime_get_boot_ns()
func bootTimeDeadlineNs(ttl time.Duration) (uint64, error) {
	var ts unix.Timespec
	if err := unix.ClockGettime(unix.CLOCK_BOOTTIME, &ts); err != nil {
		return 0, err
	}
	nowBootNs := uint64(ts.Sec)*1_000_000_000 + uint64(ts.Nsec)
	return nowBootNs + uint64(ttl.Nanoseconds()), nil
}
```

![Dark-Port Cyberpunk Edge Gateway Deflecting Scan Traffic Behind an XDP Optical Shield](/images/stealth-dark-port-cyberpunk-perimeter.jpg)
*Figure 3: Conceptual hardware-boundary view of an edge gateway running `XDP_DRV` in front of an encrypted kernel switchboard—dropping unauthorized SYN/UDP probes inside the NIC RX ring while admitting only AEAD-authenticated SPA leases.*

---

## 5. Operational Verification, Hard Cutoff Eviction & Stealth Auditing

Never trust a perimeter ruleset based on local `localhost` tests. Verify kernel syntax, external zero-response stealth, live dynamic set transitions, hard connection teardown, and XDP drop counters directly:

```bash
# 1. Dry-run ruleset compilation before loading into live nf_tables
nft -c -f /etc/nftables.d/stealth-gate.nft

# 2. Watch live knock & SPA set transitions in real time
nft monitor elements | grep -E 'knock_|admit_window_ports'

# 3. Inspect active leases and remaining kernel TTLs
nft list set inet stealth_gate admit_window_ports
nft list set inet stealth_gate knock_admitted_v4

# 4. External stealth verification (from a separate off-path vantage host)
#    Expected output: 100% "filtered" (NEVER "open" or "closed"!)
nmap -Pn -sS -T4 -p 22,8443 198.51.100.10

# 5. Prove zero TCP RST or ICMP leakage leaves WAN NIC during an active scan
tcpdump -ni wan0 'tcp[tcpflags] & tcp-rst != 0 or icmp[icmptype] == icmp-unreach'

# 6. Hard-evict an active session when a temporary invite or lease is revoked
#    (Clears nf_conntrack state so `ct state established` cannot outlive expiry)
conntrack -D -p tcp --dport 8443 -s 203.0.113.42 || true
ss -tn state established '( sport = :8443 and dst 203.0.113.42 )'

# 7. Inspect XDP attachment mode (`drv` vs `generic`) and per-CPU map telemetry
ip -d link show dev wan0 | grep -i xdp
bpftool prog show name xdp_stealth_gate
bpftool map dump name spa_allow_map
bpftool map dump name xdp_stats
```

> **Wait-free hardware check:** If `ip -d link show dev wan0` prints `prog/xdp` or `xdp/drv`, your NIC driver supports zero-copy native `XDP_DRV`. If it prints `xdpgeneric`, the kernel fell back to post-`sk_buff` `XDP_GENERIC`—which still enforces the exact same policy, but without the 14+ Mpps pre-allocation shield.

---

## 6. Production Threat & Failure-Mode Matrix

| Threat / Failure Scenario | Underlying Kernel / Network Root Cause | Why Naive Defenses Break | Hardened Dark-Port Mitigation |
| :--- | :--- | :--- | :--- |
| **Pre-auth SSH / TLS 0-day & bot noise** | Public socket completes TCP 3-way handshake and runs parser before auth | `fail2ban` reacts *after* exploit attempt; exposes open banner | `policy drop` + dual-gate `@admit_window_ports` ∩ `@knock_admitted` / SPA |
| **TCP SYN retransmit self-poisoning** | `tcp_syn_retries=6` emits stale SYNs at `+1s/+3s/+7s` into `DROP` rules | Stale SYNs interleave with Stage 2/3 and reset or ban legitimate clients | **Single-shot UDP knocks** (150–300ms pacing) or single-packet **SPA** |
| **Dynamic set slab memory DoS** | Unbounded `nft_rhash` allocates slab entries per spoofed source IP | Spoofed UDP flood triggers kernel slab OOM under `flags dynamic` | Explicit **`size 4096`** cap + per-IP **`limit rate`** meter + **`gc-interval 10s`** |
| **Control-plane crash leaves gate open** | Userspace daemon dies (`SIGKILL`/OOM) before running cleanup `nft delete` | Port stays permanently open until human notices | Kernel-enforced **`flags timeout`** in `@admit_window_ports` + `CLOCK_BOOTTIME` XDP TTL |
| **Passive sniffing & SPA replay** | Plaintext knock ports or unauthenticated payloads replayed off-path | Any wire observer immediately unlocks the perimeter | **126B `Noise_IK` AEAD** + `±15s` skew + nonce cache + payload IP binding |
| **Active flows outlive window revocation** | `ct state established,related accept` runs before new-flow checks | Long-lived HTTP/2, SSH, or WireGuard (`PersistentKeepalive`) sessions persist | Purge `nf_conntrack` flows via **`NFNL_SUBSYS_CTNETLINK`** (`conntrack -D`) |
| **IPv6 RFC 8981 privacy address churn** | Client sends knock/SPA from rotating temporary `/128`, opens TCP on new `/128` | Exact `/128` set key rejects the immediately following TCP `SYN` | Bitwise-mask dynamic IPv6 sets on **`/64` (`& ffff:ffff:ffff:ffff::`)** |
| **XDP lease instant-expiry / 57-yr bug** | `bpf_ktime_get_boot_ns()` (`CLOCK_BOOTTIME`) compared to `CLOCK_REALTIME` | Timestamp mismatch causes immediate drops or permanent zombie leases | Sample **`unix.CLOCK_BOOTTIME`** in userspace when updating `spa_allow_map` |

Leaving administrative sockets, break-glass portals, and overlay enrollment endpoints exposed to unsolicited WAN SYNs is an artifact of assuming TCP sockets have to be globally discoverable before authentication. When you lock the perimeter behind **`nft_dynset` ephemeral state machines**, **constant-time `Noise_IK` Single Packet Authorization**, and **`XDP_DRV` `CLOCK_BOOTTIME` admission gates**, every port scanner on the internet sees nothing but a silent obsidian wall—while authorized peers step cleanly through a sub-millisecond cryptographic iris that seals behind them automatically.
