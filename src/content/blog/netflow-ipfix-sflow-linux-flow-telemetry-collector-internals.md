---
title: "Flow Telemetry Under Fire: NetFlow v5/v9, IPFIX (RFC 7011), and sFlow v5 Collector Internals on Linux"
description: "Inside wire-speed UDP flow telemetry collectors: Linux SO_REUSEPORT and recvmmsg() socket batching, stateful IPFIX/NetFlow v9 template decoding, sFlow raw-header dissection, and eBPF inner-overlay flow export in Kubernetes."
pubDate: "2026-11-22"
updatedDate: "2026-11-27"
heroImage: "48.jpg"
tags: ["linux", "networking", "ebpf", "kubernetes", "observability"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

When a 400GbE spine switch or a fleet of Cilium-routed Kubernetes nodes starts exporting network telemetry, naive flow collectors do not fail loudly—they **drop packets silently inside the Linux kernel**, misalign variable-length IPFIX records on cold starts, or turn 50 Gbps of intra-cluster East–West traffic into an opaque blob of `UDP/4789` VXLAN node-to-node envelopes.

Building (or debugging) a production flow collector requires mastering three distinct layers simultaneously:
1. **Three radically different binary wire protocols**: fixed-offset **NetFlow v5**, stateful template-graph **NetFlow v9 (`RFC 3954`) / IPFIX (`RFC 7011`)**, and stateless raw-header **sFlow v5**.
2. **The Linux kernel UDP receive path**: eliminating `sk_receive_queue` lock contention and silent `UdpRcvbufErrors` during exporter active-timeout flush storms via `SO_REUSEPORT` sharding and batched `recvmmsg()`.
3. **Encapsulation-aware telemetry**: bridging the blind spot between top-of-rack hardware switches (which only see outer VXLAN/Geneve/WireGuard headers) and **eBPF `tcx`/`XDP` flow meters** running directly inside the Linux kernel.

---

## 1. Wire-Protocol Anatomy: Fixed Offsets vs. Stateful Templates vs. Raw Headers

Every flow protocol makes a fundamentally different trade-off between **exporter CPU/TCAM budget** and **collector parser complexity**:

```text
+-----------------------------------------------------------------------------------+
|               FLOW TELEMETRY WIRE FRAMING: THREE PARSER PARADIGMS                 |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [1] NETFLOW v5 (Stateless Fixed Offsets — IPv4 Only)                             |
|  +---------------------------+------------------------+------------------------+  |
|  | 24B Header (ver=5, count) | 48B Flow Record #1     | 48B Flow Record #N     |  |
|  | sys_uptime, unix_secs     | src_ip, dst_ip, ports, | (Max 30 records fit in |  |
|  | flow_seq, engine_id       | proto, pkts, bytes     |  standard 1500B MTU)   |  |
|  +---------------------------+------------------------+------------------------+  |
|                                                                                   |
|  [2] IPFIX / RFC 7011 (Stateful Self-Describing Sets)                             |
|  +---------------------------+-------------------------------------------------+  |
|  | 16B Header (ver=10, len)  | Set ID = 2 (Template Set):                      |  |
|  | export_time, seq_num,     |   TemplateID=256 -> [(IE=8, 4B), (IE=12, 4B),   |  |
|  | ObservationDomainID       |   (IE=0x8000|101, PEN=..., len=0xFFFF varlen)]  |  |
|  +---------------------------+-------------------------------------------------+  |
|  | Set ID >= 256 (Data Set): | Raw Packed Bytes (MUST look up TemplateID=256    |  |
|  |   SetID=256, SetLen=148   | in (ExporterIP, DomainID) cache to decode!)     |  |
|  +---------------------------+-------------------------------------------------+  |
|                                                                                   |
|  [3] sFLOW v5 (Stateless 1-in-N Packet Header + Counter Samples)                  |
|  +---------------------------+-------------------------------------------------+  |
|  | Datagram Header (ver=5)   | Flow Sample (enterprise=0, format=1):           |  |
|  | agent_ip, sub_agent_id,   |   sampling_rate=1024, sample_pool, drops        |  |
|  | seq_num, uptime_ms        |   Raw Packet Header (proto=1 Ethernet):         |  |
|  |                           |   [14B Eth | 20B/40B IP | 20B TCP | VXLAN...]   |  |
|  +---------------------------+-------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

![Wire-Protocol Framing Across NetFlow v5, IPFIX, and sFlow v5 with Linux SO_REUSEPORT and recvmmsg Batching](/images/flow-telemetry-wire-framing-reuseport.jpg)
*Figure 1: Binary framing differences across NetFlow v5, stateful IPFIX (`RFC 7011`), and stateless sFlow v5 paired with Linux per-core `SO_REUSEPORT` sharding and `recvmmsg(MSG_WAITFORONE)` batching.*

### Protocol Comparison Matrix

| Dimension | NetFlow v5 | NetFlow v9 (`RFC 3954`) | IPFIX (`RFC 7011 / 7012`) | sFlow v5 (`sFlow.org v5 / RFC 3176 lineage`) |
| :--- | :--- | :--- | :--- | :--- |
| **Default Transport** | UDP (`2055`) | UDP (`2055` / `9995`) | UDP (`4739`), TCP, or SCTP | UDP (`6343`) |
| **Header Length Field** | `count` (record count) | `count` (record count across FlowSets) | `length` (**total bytes**) | `num_samples` (sample count) |
| **Collector State** | **Stateless** | **Stateful** (`SourceID` + `TemplateID`) | **Stateful** (`ObservationDomainID` + `TemplateID`) | **Stateless** (per-datagram L2–L7 parse) |
| **IPv6 / MPLS / VXLAN** | **No** (IPv4 32-bit fields only) | Yes (via standard IEs) | Yes (IANA IEs + Private Enterprise `PEN` IEs) | Yes (carries first 128–256B of raw frame) |
| **Variable-Length Fields** | No | No (fixed template lengths) | **Yes** (`field_length == 0xFFFF`) | Yes (XDR-aligned byte arrays) |
| **Aggregation Locus** | Exporter maintains flow cache | Exporter maintains flow cache | Exporter (or eBPF probe) maintains flow cache | **Collector** aggregates sampled headers |
| **Primary Failure Mode** | 32-bit `sysUpTime` 49.7-day wrap | Cold-start Data FlowSet loss before Template Refresh | Variable-length misparse or Template ID poisoning | Microburst estimation error under `1:N` sampling |

Two subtleties trip up almost every first-time implementation:
1. **NetFlow v9 `count` vs. IPFIX `length`**: In NetFlow v9, the 16-bit header field after `version` is the **total number of exported records** (Template, Options Template, and Data records combined across all FlowSets in the packet), whereas in IPFIX (`version = 10`) it is the **total byte length of the IPFIX Message including the 16-byte header**. Treating IPFIX's length field as a record count causes immediate out-of-bounds panics or silent tail truncation.
2. **4-Byte Padding & Multiple Records per Set**: Both NetFlow v9 and IPFIX allow an exporter to pad the end of a FlowSet/Set to a 32-bit boundary (`0`–`3` trailing zero bytes). A Data Set parser **must** check `remaining_bytes_in_set < template_min_record_bytes` as its loop termination condition rather than assuming `remaining_bytes_in_set == 0`!

---

## 2. Eliminating Silent Kernel Drops: `SO_REUSEPORT` & `recvmmsg()` on Linux

Flow exporters—especially hardware routers configured with `cache timeout active 60`—do not emit smooth Poisson traffic. At timer boundaries, dozens of routers flush thousands of UDP datagrams in a few milliseconds.

On a single-threaded collector calling `recvfrom()`, packets pile up in the socket's receive buffer (`sk->sk_receive_queue`) faster than userspace can drain one datagram per syscall. Once `sk_rmem_alloc` exceeds `SO_RCVBUF`, `udp_rcv()` increments **`UdpInErrors` / `UdpRcvbufErrors`** and drops the packet silently before userspace ever sees it—meaning **dropped IPFIX Template Sets that blind the collector for another 60 seconds**.

### Diagnosing Silent Drops Live

Before changing application code, inspect the kernel counters directly:

```bash
# 1. Watch per-socket receive queue depth (Recv-Q) and kernel drop counter (drops=N)
ss -ulnmp 'sport = :4739 or sport = :2055 or sport = :6343'

# 2. Check cumulative UDP receive buffer overflows across the host
nstat -az UdpRcvbufErrors UdpInErrors UdpInDatagrams

# 3. Inspect raw /proc/net/udp (hex local_address:port and final 'drops' column)
awk 'NR==1 || $2 ~ /:1283$|:0807$|:18C7$/ {print}' /proc/net/udp
```

### Kernel Sysctl Baseline for High-Rate Collectors

By default, Linux caps `SO_RCVBUF` requests at `net.core.rmem_max` (often only `212992` bytes—barely ~140 full-MTU NetFlow packets!). Raise the ceiling and NIC ring backlog before starting your collector workers:

```bash
# /etc/sysctl.d/99-flow-collector.conf
# Allow up to 64 MiB per UDP socket receive buffer (remember Linux doubles setsockopt value for skb overhead)
net.core.rmem_max = 67108864
net.core.rmem_default = 16777216

# Prevent SoftIRQ NET_RX backlog drops between NIC DMA ring and UDP socket queue
net.core.netdev_max_backlog = 250000
net.core.netdev_budget = 600
net.core.netdev_budget_usecs = 8000
```

### Multi-Worker `SO_REUSEPORT` + `recvmmsg()` Ingestion Loop

Why **`SO_REUSEPORT`** instead of sharing one UDP file descriptor across threads?
- Sharing one socket across `N` worker threads serializes every `recvmsg()` on a single `sk_receive_queue` spinlock.
- Binding `N` separate sockets (one per CPU core) with `SO_REUSEPORT` instructs the Linux kernel (`inet_lookup_reuseport`) to hash the incoming packet's `(src_ip, src_port, dst_ip, dst_port)` **to the exact same worker socket every time**.
- Bonus invariant: **all IPFIX Template Sets and Data Sets from a given exporter `(src_ip, src_port)` automatically land on the exact same worker thread**, eliminating cross-thread mutex contention on the IPFIX template cache!

```c
// flow_ingest_worker.c — Pin 1 thread per core with SO_REUSEPORT + recvmmsg() batching
#define _GNU_SOURCE
#include <arpa/inet.h>
#include <errno.h>
#include <netinet/in.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define BATCH_SIZE 64
#define MAX_DGRAM_LEN 9000 // Supports jumbo-frame IPFIX/sFlow exports

int open_reuseport_udp(uint16_t port, int rcvbuf_bytes) {
    int fd = socket(AF_INET6, SOCK_DGRAM | SOCK_CLOEXEC, 0);
    if (fd < 0) return -1;

    int off = 0, on = 1;
    // Dual-stack IPv4 + IPv6 listener
    setsockopt(fd, IPPROTO_IPV6, IPV6_V6ONLY, &off, sizeof(off));
    // Hash (src_ip, src_port, dst_ip, dst_port) deterministically per worker socket
    if (setsockopt(fd, SOL_SOCKET, SO_REUSEPORT, &on, sizeof(on)) < 0) {
        close(fd);
        return -1;
    }
    if (setsockopt(fd, SOL_SOCKET, SO_RCVBUF, &rcvbuf_bytes, sizeof(rcvbuf_bytes)) < 0) {
        perror("setsockopt(SO_RCVBUF)");
    }

    struct sockaddr_in6 addr = {0};
    addr.sin6_family = AF_INET6;
    addr.sin6_addr = in6addr_any;
    addr.sin6_port = htons(port);

    if (bind(fd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        close(fd);
        return -1;
    }
    return fd;
}

void run_worker_loop(int fd, void (*decode_datagram)(const struct sockaddr_storage *, const uint8_t *, size_t)) {
    struct mmsghdr msgs[BATCH_SIZE];
    struct iovec iovecs[BATCH_SIZE];
    struct sockaddr_storage addrs[BATCH_SIZE];
    uint8_t *slab = aligned_alloc(64, (size_t)BATCH_SIZE * MAX_DGRAM_LEN);
    if (!slab) abort();

    for (int i = 0; i < BATCH_SIZE; i++) {
        memset(&msgs[i], 0, sizeof(msgs[i]));
        iovecs[i].iov_base = slab + ((size_t)i * MAX_DGRAM_LEN);
        iovecs[i].iov_len = MAX_DGRAM_LEN;
        msgs[i].msg_hdr.msg_iov = &iovecs[i];
        msgs[i].msg_hdr.msg_iovlen = 1;
        msgs[i].msg_hdr.msg_name = &addrs[i];
        msgs[i].msg_hdr.msg_namelen = sizeof(addrs[i]);
    }

    for (;;) {
        // Amortizes syscall + Spectre/Meltdown entry cost across up to 64 packets
        int n = recvmmsg(fd, msgs, BATCH_SIZE, MSG_WAITFORONE, NULL);
        if (n < 0) {
            if (errno == EINTR) continue;
            perror("recvmmsg");
            break;
        }
        for (int i = 0; i < n; i++) {
            decode_datagram(&addrs[i], (const uint8_t *)iovecs[i].iov_base, msgs[i].msg_len);
            // Reset namelen before next recvmmsg() call!
            msgs[i].msg_hdr.msg_namelen = sizeof(addrs[i]);
        }
    }
    free(slab);
}
```

> **Watch out for two subtle `recvmmsg()` traps:**
> 1. Always pass `MSG_WAITFORONE` (not `0`). Without `MSG_WAITFORONE`, `recvmmsg()` blocks until all `BATCH_SIZE` slots fill—adding unbounded tail latency during low-traffic intervals!
> 2. Reset `msgs[i].msg_hdr.msg_namelen = sizeof(addrs[i])` after every batch; the kernel overwrites `msg_namelen` with `16` (`sizeof(sockaddr_in)`) on IPv4 packets, which silently truncates subsequent IPv6 sender addresses (`28` bytes) if left unreset.

---

## 3. Writing a Bounded, Zero-Copy IPFIX (`RFC 7011`) Template Engine in Rust

Because `SO_REUSEPORT` pins each exporter `(src_ip, src_port)` to a single worker, that worker can own a **lock-free, thread-local IPFIX template cache** keyed by `(IpAddr, u32 /* ObservationDomainID */, u16 /* TemplateID */)`.

A production IPFIX decoder must handle three tricky RFC 7011 constructs cleanly without risking panic or OOM on malformed inputs:
1. **Enterprise Information Elements**: If the MSB (`0x8000`) of the 16-bit `ie_id` is set, the next **4 bytes** in the Template Record are the `enterprise_number` (PEN)—such as Cisco (`9`), VMware (`6876`), or Cilium/custom eBPF probes.
2. **Variable-Length Fields (`field_length == 0xFFFF`)**: In Data Records, a `0xFFFF` template field begins with a 1-byte length prefix (`L`). If `L < 255`, `L` bytes follow immediately. If `L == 255`, a **2-byte big-endian `u16`** follows specifying the true byte length!
3. **Template Withdrawal & Cache Bounding**: RFC 7011 Section 8.1 defines `field_count == 0` in a Template Set as a **template withdrawal** over reliable transports such as SCTP or TCP (over UDP, exporters simply stop refreshing unused templates and let them expire via timeout), and an untrusted UDP sender can spoof random Template IDs (`256..65535`). Cap the per-worker template table size with LRU/FIFO eviction.

```rust
use std::collections::{HashMap, VecDeque};
use std::net::IpAddr;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct TemplateKey {
    pub exporter: IpAddr,
    pub domain_id: u32,
    pub template_id: u16,
}

#[derive(Debug, Clone, Copy)]
pub struct FieldSpec {
    pub ie_id: u16,
    pub enterprise_id: Option<u32>,
    pub length: u16, // 0xFFFF => variable-length IE per RFC 7011 Section 7
}

#[derive(Debug, Clone)]
pub struct IpfixTemplate {
    pub fields: Vec<FieldSpec>,
    pub min_record_len: usize,
}

pub struct TemplateCache {
    entries: HashMap<TemplateKey, IpfixTemplate>,
    lru_order: VecDeque<TemplateKey>,
    max_entries: usize,
}

impl TemplateCache {
    pub fn new(max_entries: usize) -> Self {
        Self {
            entries: HashMap::with_capacity(max_entries.min(4096)),
            lru_order: VecDeque::with_capacity(max_entries.min(4096)),
            max_entries,
        }
    }

    pub fn upsert(&mut self, key: TemplateKey, tmpl: IpfixTemplate) {
        if !self.entries.contains_key(&key) {
            while self.entries.len() >= self.max_entries {
                if let Some(oldest) = self.lru_order.pop_front() {
                    self.entries.remove(&oldest);
                } else {
                    break;
                }
            }
            self.lru_order.push_back(key);
        }
        self.entries.insert(key, tmpl);
    }

    pub fn withdraw(&mut self, key: &TemplateKey) {
        self.entries.remove(key);
    }
}

pub struct Cursor<'a> {
    buf: &'a [u8],
    pos: usize,
}

impl<'a> Cursor<'a> {
    pub fn new(buf: &'a [u8]) -> Self { Self { buf, pos: 0 } }
    pub fn remaining(&self) -> usize { self.buf.len().saturating_sub(self.pos) }

    pub fn read_u8(&mut self) -> Option<u8> {
        let b = *self.buf.get(self.pos)?;
        self.pos += 1;
        Some(b)
    }

    pub fn read_u16(&mut self) -> Option<u16> {
        let s = self.buf.get(self.pos..self.pos + 2)?;
        self.pos += 2;
        Some(u16::from_be_bytes([s[0], s[1]]))
    }

    pub fn read_u32(&mut self) -> Option<u32> {
        let s = self.buf.get(self.pos..self.pos + 4)?;
        self.pos += 4;
        Some(u32::from_be_bytes([s[0], s[1], s[2], s[3]]))
    }

    pub fn read_bytes(&mut self, len: usize) -> Option<&'a [u8]> {
        let s = self.buf.get(self.pos..self.pos + len)?;
        self.pos += len;
        Some(s)
    }
}

pub fn decode_ipfix_packet(
    exporter: IpAddr,
    pkt: &[u8],
    cache: &mut TemplateCache,
) -> Result<usize, &'static str> {
    let mut cur = Cursor::new(pkt);
    let version = cur.read_u16().ok_or("truncated header")?;
    if version != 10 {
        return Err("not IPFIX v10");
    }
    let msg_len = cur.read_u16().ok_or("truncated length")? as usize;
    if msg_len < 16 || msg_len > pkt.len() {
        return Err("invalid IPFIX message length");
    }
    let _export_time = cur.read_u32().ok_or("truncated export_time")?;
    let _seq_num = cur.read_u32().ok_or("truncated sequence_number")?;
    let domain_id = cur.read_u32().ok_or("truncated observation_domain_id")?;

    // Restrict view strictly to declared message length
    let mut sets = Cursor::new(&pkt[16..msg_len]);
    let mut decoded_records = 0usize;

    while sets.remaining() >= 4 {
        let set_id = sets.read_u16().ok_or("truncated set_id")?;
        let set_len = sets.read_u16().ok_or("truncated set_len")? as usize;
        if set_len < 4 || set_len - 4 > sets.remaining() {
            return Err("malformed set length");
        }
        let body = sets.read_bytes(set_len - 4).ok_or("truncated set body")?;
        let mut sc = Cursor::new(body);

        match set_id {
            2 => {
                // Template Set (RFC 7011 Section 3.4.1)
                while sc.remaining() >= 4 {
                    let template_id = sc.read_u16().ok_or("truncated template_id")?;
                    let field_count = sc.read_u16().ok_or("truncated field_count")?;
                    let key = TemplateKey { exporter, domain_id, template_id };

                    if field_count == 0 {
                        cache.withdraw(&key);
                        continue;
                    }

                    let mut fields = Vec::with_capacity(field_count as usize);
                    let mut min_record_len = 0usize;
                    for _ in 0..field_count {
                        let raw_ie = sc.read_u16().ok_or("truncated IE id")?;
                        let length = sc.read_u16().ok_or("truncated IE length")?;
                        let enterprise_id = if (raw_ie & 0x8000) != 0 {
                            Some(sc.read_u32().ok_or("truncated PEN")?)
                        } else {
                            None
                        };
                        min_record_len = min_record_len.saturating_add(
                            if length == 0xFFFF { 1 } else { length as usize }
                        );
                        fields.push(FieldSpec {
                            ie_id: raw_ie & 0x7FFF,
                            enterprise_id,
                            length,
                        });
                    }
                    cache.upsert(key, IpfixTemplate { fields, min_record_len });
                }
            }
            3 => {
                // Options Template Set: parse scope_field_count similarly (omitted for brevity)
            }
            id if id >= 256 => {
                let key = TemplateKey { exporter, domain_id, template_id: id };
                let Some(tmpl) = cache.entries.get(&key) else {
                    // Cold-start template miss: buffer or emit telemetry metric
                    continue;
                };
                // Must allow up to 3 trailing padding bytes at end of Set!
                while sc.remaining() >= tmpl.min_record_len.max(1) {
                    for f in &tmpl.fields {
                        let val_len = if f.length == 0xFFFF {
                            let b0 = sc.read_u8().ok_or("truncated varlen")? as usize;
                            if b0 == 255 {
                                sc.read_u16().ok_or("truncated ext varlen")? as usize
                            } else {
                                b0
                            }
                        } else {
                            f.length as usize
                        };
                        let _field_slice = sc.read_bytes(val_len).ok_or("truncated data field")?;
                    }
                    decoded_records += 1;
                }
            }
            _ => {}
        }
    }
    Ok(decoded_records)
}
```

---

## 4. Production Traps: Cold Starts, 49.7-Day Rollovers, and Kubernetes Overlay Blind Spots

Even when your socket ring and binary parser are rock-solid, four real-world telemetry anomalies will corrupt your analytics unless handled explicitly:

### Trap 1: The Cold-Start & Exporter-Reboot Template Blackout
When you restart a collector (or deploy a new Pod), Data Sets (`SetID >= 256`) begin arriving immediately while Template Sets (`SetID == 2`) are only retransmitted every 60–300 seconds (or every `N` packets) over UDP.
- **Fix**: Maintain a **bounded ring buffer (`pending_data_sets`) per `TemplateKey`** (for example, holding up to 128 KB or 5 minutes of raw unparsed Data Set payloads per exporter) and replay them the instant the matching Template Set arrives—while exporting a Prometheus `flow_collector_template_misses_total` counter so ops knows if a firewall is stripping templates.

### Trap 2: 32-Bit `sysUpTime` 49.7-Day Wraparound & Active-Timeout Spikes
In NetFlow v5 and NetFlow v9, `flowStartSysUpTime` and `flowEndSysUpTime` are **32-bit unsigned millisecond offsets** since chassis boot. After `2^32 ms` (~49.71 days), the counter wraps back to `0`.
- If your collector computes `duration_ms = end_uptime - start_uptime` using signed integers without wrapping arithmetic (`u32::wrapping_sub`), every flow crossing the 49.7-day mark produces negative durations or `4.29e9 ms` phantom multi-month sessions!
- Likewise, a single long-lived 10 Gbps backup stream exported with `active_timeout = 60s` dumps 75 GB into **a single 1-second timestamp bucket** (`flowEndSeconds`) unless the collector distributes bytes evenly across `[flowStart, flowEnd]` intervals before writing to ClickHouse or Prometheus/VictoriaMetrics.

### Trap 3: sFlow v5 `sample_pool` Verification & Microburst Variance
Unlike NetFlow/IPFIX, sFlow v5 does **not** aggregate flows on the switch—it ships a `1-in-N` sampled Ethernet frame header alongside two crucial monotonicity counters:
- `sample_pool`: cumulative total packets eligible for sampling since agent reset.
- `drops`: packets the switch's sampling ASIC failed to hand to the sFlow agent.
Never blindly multiply `sampled_bytes * sampling_rate` without checking `delta(sample_pool) / delta(observed_samples)`. If UDP loss between the leaf switch and your collector ate 30% of datagrams, your `sample_pool` jump proves the missing volume even though `drops` on the switch itself remained `0`!

### Trap 4: Kubernetes Overlay Blindness (`VXLAN` / `Geneve` / `WireGuard`) & eBPF Flow Export
Look at what happens when a hardware ToR switch exports NetFlow/IPFIX for a Kubernetes cluster running Cilium, Flannel, or Calico with overlay encapsulation:

![Resilient IPFIX Template Replay, 49.7-Day Rollover Protection, and Pre-Encapsulation eBPF Overlay Telemetry](/images/flow-telemetry-ipfix-ebpf-overlay.jpg)
*Figure 2: Handling cold-start IPFIX template blackouts, `u32::wrapping_sub` uptime rollover safety, sFlow UDP loss detection, and pre-encapsulation eBPF `tcx` telemetry export for Kubernetes overlays.*

```text
  Hardware Switch Sees:     [ Outer Eth | Node-A -> Node-B | UDP/4789 VXLAN ]  (Pod identity LOST!)
  Linux Kernel `tcx` Sees:  [ Outer Eth | VXLAN/Geneve | Inner Eth | Pod-A:44192 -> Pod-B:5432 ]
```

A hardware switch's L3/L4 flow table terminates at the outer node IP and `UDP/4789` (VXLAN) or `UDP/6081` (Geneve) port—making every tenant Pod look identical. You have two clean ways to recover inner East–West visibility:
1. **sFlow Raw Header Inner Dissection**: Because sFlow copies the first 128–256 bytes of the raw frame, a Linux collector can peel outer UDP (`4789` VXLAN, `6081` Geneve, `47` GRE) directly in userspace to extract the inner Pod 5-tuple! (Note: encrypted `WireGuard` `UDP/51820` overlays still hide inner L3/L4 headers on the wire.)
2. **Kernel eBPF `tcx` / `XDP` Flow Metering**: Attach a tiny eBPF program directly on each node's `eth0` and `lxc*` / `veth*` interfaces (before encryption/encapsulation) that hashes the inner 5-tuple into a per-CPU `BPF_MAP_TYPE_LRU_HASH` flow table, periodically sweeps expired buckets or flushes events over `BPF_MAP_TYPE_RINGBUF`, enriches them with `kubelet` / containerd Pod labels in userspace, and emits **RFC 7011 IPFIX** (with Private Enterprise Information Elements for `pod_name`, `namespace`, and `cgroup_id`) to your central collector.

---

## 5. Quick Verification & Lab Validation Checklist

Before deploying a custom collector or eBPF IPFIX exporter into production, validate the wire path locally on Linux:

```bash
# 1. Inspect live IPFIX templates & data records on loopback/capture interface with tshark
tshark -i lo -f "udp port 4739" -d udp.port==4739,cflow -V -c 5

# 2. Verify sFlow v5 raw packet header decoding & sample_pool counters
tshark -i eth0 -f "udp port 6343" -d udp.port==6343,sflow -V -c 3

# 3. Stress-test socket drops during burst replay (watch Recv-Q & UdpRcvbufErrors)
watch -n 1 'ss -ulnmp sport = :4739; nstat -az UdpRcvbufErrors UdpInDatagrams'
```

---

## Summary: Designing a Collector That Never Goes Blind

| Failure Surface | Naive Implementation | Production Linux Architecture |
| :--- | :--- | :--- |
| **UDP Burst Ingestion** | Single socket `recvfrom()` with default `212 KB` `rmem_max` | `SO_REUSEPORT` per CPU core + `recvmmsg(MSG_WAITFORONE)` + `64 MB` `rmem_max` |
| **Template State Machine** | Unbounded map + crashes on `0xFFFF` varlen or 4B Set padding | Bounded LRU `(ExporterIP, DomainID, TemplateID)` + `pending_data_sets` replay ring |
| **Clock & Rollover Math** | Signed `end - start` on 32-bit `sysUpTime` | `wrapping_sub` on `u32` ms + active-timeout bucket interpolation |
| **K8s Overlay Visibility** | Outer-header ToR NetFlow (`UDP/4789` VXLAN blob) | sFlow outer-header peeling + pre-encap eBPF `tcx` IPFIX exporter with Pod metadata |

If you pair `SO_REUSEPORT`-sharded `recvmmsg()` loops with bounded RFC 7011 template caching and pre-encapsulation eBPF flow metering, your telemetry pipeline handles microbursts, router reboots, and overlay-heavy Kubernetes clusters without silent packet loss.
