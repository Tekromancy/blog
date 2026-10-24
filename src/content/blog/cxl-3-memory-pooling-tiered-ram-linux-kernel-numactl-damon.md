---
title: "Breaking the PCIe Memory Wall: CXL 3.0/3.1 Memory Pooling, Cache-Coherent Switch Fabrics, and Linux DAMON Tiering"
description: "How Compute Express Link (CXL.mem and CXL.cache over PCIe 6.0 PAM4) decouples memory capacity from CPU sockets—and how to orchestrate zero-CPU NUMA nodes and automated hot/cold page promotion with Linux DAMON."
pubDate: "2026-10-26"
updatedDate: "2026-10-26"
heroImage: "29.jpg"
tags: ["hardware", "linux", "kernel", "performance", "infrastructure", "ai-ml"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

For two decades, datacenter server architecture has been held hostage by **DIMM-Slot Stranding**: if a workload needs 4 TB of DRAM, you are forced to buy a dual-socket 192-core CPU server populated with expensive 128 GB or 256 GB DDR5 RDIMMs—even if your application only uses 25% of the CPU cores. Worse, once those 24 DDR5 channels per socket are populated, memory bandwidth and capacity hit a hard physical wall.

**Compute Express Link (`CXL 2.0 / 3.0 / 3.1`)** shatters this coupling. Built on top of the physical PCIe 5.0 (32 GT/s NRZ) and **PCIe 6.0 (64 GT/s PAM4)** electrical layers, CXL introduces three multiplexed, hardware-coherent sub-protocols (`CXL.io`, `CXL.cache`, and `CXL.mem`) that allow CPUs and accelerators to address petabyte-scale external memory pools using standard load/store (`MOV`) instructions with **cacheline-level (64-byte) hardware coherency**.

Here is the systems engineering breakdown of CXL Type-3 Memory Expanders, CXL 3.1 Port-Based Routing (`PBR`) switch fabrics, the real nanosecond latency math, and how to configure the Linux kernel (`dax_kmem`, `ZONE_MOVABLE`, and **DAMON**—Data Access Monitor) to automatically promote hot pages to local DDR5 and demote cold pages to pooled CXL memory.

---

## 1. Inside the CXL Protocol Stack: Why `CXL.mem` Is Not PCIe DMA

Standard NVMe SSDs and PCIe network cards transfer data in 4 KB+ blocks over `PCIe TLP` transactions, requiring device drivers, ring buffers, interrupts, and DMA page pinning.

**CXL Type-3 (`CXL.io` + `CXL.mem`)** operates inside the CPU's coherent **Home Agent / Memory Controller** pipeline:
1. When a CPU thread suffers an L3 (Last-Level Cache) miss on a physical address mapped to a **CXL Fixed Memory Window (`CFMW`)**, the CPU's Home Agent does *not* invoke an OS driver.
2. Instead, it encapsulates the 64-byte cacheline read/write request into a low-overhead **256-byte FLIT (Flow Control Unit)** over `CXL.mem` (`M2S Req` / `M2S RwD` — Master-to-Subordinate Request/Write-with-Data).
3. The CXL Type-3 controller on the PCIe 5.0/6.0 bus translates that FLIT directly into DDR5 rank/bank commands (`ACT`, `RD`, `PRE`) and returns the 64-byte cacheline (`S2M DRS` — Subordinate-to-Master Data Response) straight into the CPU's L3/L2/L1 cache hierarchy.

```text
+-------------------------------------------------------------------------------+
|          CXL 3.1 SWITCHED MEMORY POOL & LINUX KERNEL NUMA TOPOLOGY            |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ Host Node 0 (AMD EPYC / Intel Xeon) ]                                      |
|    ├── NUMA Node 0 (Local 12-Ch DDR5-6400)  ---> Latency: ~85 ns  (Hot Tier)  |
|    └── CPU Home Agent / CXL Root Port (x16 PCIe 6.0 PAM4 @ 64 GT/s = 128 GB/s)|
|                                       |                                       |
|                   [ 256B FLITs: CXL.mem + Back-Invalidation ]                 |
|                                       |                                       |
|  [ CXL 3.1 Hardware PBR (Port-Based Routing) Switch Fabric ]                  |
|    ├── Dynamic Capacity Device (DCD) Extent Management                        |
|    └── Hardware Back-Invalidation (`S2M BISnp`) for Shared Coherent Regions   |
|           +---------------------------+---------------------------+           |
|           v                                                       v           |
|  +---------------------------------+     +---------------------------------+  |
|  | CXL Type-3 Pool Appliance A     |     | CXL Type-3 Pool Appliance B     |  |
|  | Exposed as Zero-CPU NUMA Node 2 |     | Exposed as Zero-CPU NUMA Node 3 |  |
|  | Latency: ~210-260 ns (Warm/Cold)|     | Shared Read-Only LLM Weights    |  |
|  +---------------------------------+     +---------------------------------+  |
+-------------------------------------------------------------------------------+
```

### What Changed in CXL 3.0 & 3.1?
- **Doubled Bandwidth (`128 GB/s` Bidirectional per `x16` Link)**: By adopting PCIe 6.0 PAM4 signaling at 64 GT/s with lightweight forward error correction (`FEC`) and 256B FLIT packing, a single `x16` CXL 3.0/3.1 link delivers **64 GB/s per direction**—matching the bandwidth of an entire dual-channel DDR5-6400 controller.
- **Port-Based Routing (`PBR`) & Multi-Headed Shared Memory**: CXL 2.0 allowed pooling (assigning different slices of a memory box to different hosts), but CXL 3.0/3.1 introduces **true hardware-coherent memory sharing** across up to 4,096 endpoints via **Back-Invalidation Snoops (`S2M BISnp`)**. Multiple hosts can mount the *exact same physical RAM pages* containing a 405B LLM weight matrix without duplicating weights in every server's local DRAM!
- **Dynamic Capacity Devices (`DCD`)**: Hosts can hot-attach and release physical memory extents dynamically at runtime via CXL Fabric Manager APIs without rebooting.

---

## 2. The Real Latency & Bandwidth Math: Local DDR5 vs. CXL Type-3

Because a `CXL.mem` access still traverses the PCIe PHY serialization/deserialization (`SerDes`), link layer, and external CXL ASIC memory controller, it behaves strictly like a **1-hop or 2-hop remote NUMA node**:

| Memory Tier | Idle Load-to-Use Latency | Peak Read Bandwidth (per `x16` / Socket) | Ideal Workload Placement |
| :--- | :---: | :---: | :--- |
| **Local CPU Socket DDR5-6400 (12-Channel)** | **~82–90 ns** | ~460 GB/s | Hot working sets, kernel stacks, active DB indexes |
| **Remote CPU Socket DDR5 (1-Hop UPI/xGMI)** | **~135–150 ns** | ~150–200 GB/s | Cross-socket thread allocations |
| **Direct-Attach CXL 2.0/3.0 Card (`x16`)** | **~170–195 ns** | ~60–64 GB/s (PCIe 5) / ~120 GB/s (PCIe 6) | Warm in-memory caches (`Redis`/`Valkey`), JVM heaps, KV-cache offload |
| **Switched CXL 3.1 Pooled Fabric (1 Switch Hop)** | **~230–270 ns** | Shared up to 128 GB/s per host port | Cold memory pages, vector DB embeddings, shared LLM weights |
| **Local NVMe SSD (`PCIe 5.0` Swap / `io_uring`)** | **~12,000–65,000 ns** | ~14 GB/s | Persistent block storage ($50\times\text{–}250\times$ slower than CXL!) |

Notice the crucial insight: while switched CXL memory (~240 ns) is **$2.7\times$ slower in point-latency than local DDR5** (~85 ns), it is still **$50\times\text{ to }250\times$ faster than NVMe flash** and is addressable at 64-byte granularity without page-fault context switches.

---

## 3. Configuring Linux Zero-CPU NUMA Nodes (`cxl-cli` & `dax_kmem`)

When the Linux kernel (`6.8+` / `6.12+`) boots on a system with ACPI `CEDT` (CXL Early Discovery Table) and `SRAT` tables enabled, CXL Type-3 memory devices are enumerated and surfaced as **CPU-less NUMA nodes** (e.g., `NUMA Node 2`).

### Step 1: Provision a CXL Region and Online It into `ZONE_MOVABLE`

To prevent the Linux kernel from placing unmovable kernel slab allocations (`kmalloc`, page tables, or `sk_buff` structures) onto hot-pluggable CXL memory—which would block CXL Dynamic Capacity release—always online CXL memory into **`ZONE_MOVABLE`**:

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Inspect discovered CXL memdevs and ACPI Root Bridges (CFMW)
cxl list -M -D -R

# 2. Create an interleaved CXL RAM region across two x16 CXL endpoints (mem0, mem1)
cxl create-region -m -d decoder0.0 -w 2 -g 4096 mem0 mem1

# 3. Reconfigure the resulting DAX device (dax0.0) into system-ram mode (kmem driver)
#    --no-online lets us force ZONE_MOVABLE before onlining blocks
daxctl reconfigure-device --mode=system-ram --no-online dax0.0

# 4. Online all memory blocks into ZONE_MOVABLE (safe for hot-unplug & page migration)
daxctl online-memory dax0.0 --movable

# 5. Verify the new CPU-less NUMA node (Node 2 has 512 GB RAM and 0 CPUs)
numactl --hardware
```

### Step 2: Enable Kernel NUMA Demotion & Weighted Interleaving

Linux `6.9+` introduced **Weighted Memory Interleaving** (`/sys/kernel/mm/mempolicy/weighted_interleave`), allowing bandwidth-hungry workloads (like CPU-assisted LLM inference or Apache Arrow analytics) to stripe page allocations across local DDR5 (`Node 0`) and CXL (`Node 2`) in exact proportion to their hardware memory bandwidth ratio (e.g., `4:1`):

```bash
# 1. Enable automatic kernel page demotion from Local DDR5 (Node 0) -> CXL (Node 2) under memory pressure
sysctl -w vm.zone_reclaim_mode=0
echo 1 > /sys/kernel/mm/numa/demotion_enabled
sysctl -w kernel.numa_balancing=2  # NUMA_BALANCING_MEMORY_TIERING

# 2. Configure 4:1 bandwidth-weighted interleaving (360 GB/s DDR5 : 90 GB/s CXL)
echo 4 > /sys/kernel/mm/mempolicy/weighted_interleave/node0
echo 1 > /sys/kernel/mm/mempolicy/weighted_interleave/node2

# 3. Launch a bandwidth-bound analytics/inference process across the weighted pool
numactl --weighted-interleave=0,2 ./vllm-cpu-kv-cache-engine
```

---

## 4. Autonomous Hot/Cold Page Tiering with Linux `DAMON` (`DAMOS`)

While `kernel.numa_balancing=2` handles reactive demotion during `kswapd` memory pressure, production clusters achieve far tighter p99 latency by running **DAMON (Data Access Monitor)**—the Linux kernel's sampling-based virtual/physical address monitoring subsystem that tracks page access frequencies with **<1% CPU overhead** by sampling PTE `Accessed` bits across adaptive regions.

Using the `damo` userspace controller (or `/sys/kernel/mm/damon/admin`), we can define two **DAMOS (DAMON-based Operation Schemes)** watermarks:
1. **Scheme 1 (`migrate_hot`)**: Any page residing on CXL (`NUMA Node 2`) accessed with frequency $\ge 5\%$ over a 100 ms window is immediately **promoted (`migrate_hot`)** to fast local DDR5 (`NUMA Node 0`).
2. **Scheme 2 (`migrate_cold`)**: Any page residing on local DDR5 (`NUMA Node 0`) untouched for $\ge 30\text{ seconds}$ is proactively **demoted (`migrate_cold`)** to CXL (`NUMA Node 2`) whenever local DDR5 free memory drops below 15%.

```yaml
# /etc/damon/cxl-tiering-policy.yaml — Apply via: damo start /etc/damon/cxl-tiering-policy.yaml
kdamonds:
  - state: on
    contexts:
      - name: cxl_tiered_ram
        ops: paddr
        monitoring_attrs:
          intervals:
            sample_us: 5000       # 5ms PTE sampling interval
            aggr_us: 100000       # 100ms aggregation window
            ops_update_us: 1000000
          nr_regions:
            min: 10
            max: 1000
        targets:
          - phys_addr_node: 0     # Monitor Local DDR5 (Node 0)
          - phys_addr_node: 2     # Monitor Pooled CXL.mem (Node 2)
        schemes:
          # Scheme A: Demote cold pages from Local DDR5 (Node 0) -> CXL (Node 2)
          - name: demote_cold_to_cxl
            access_pattern:
              sz_bytes: { min: 4096, max: max }
              nr_accesses: { min: 0, max: 0 }
              age_us: { min: 30000000, max: max } # Cold for >= 30 seconds
            action: migrate_cold
            target_nid: 2
            quotas:
              time_ms: 50
              sz_bytes: 268435456 # Max 256 MB/sec migration rate
              reset_interval_ms: 1000
          # Scheme B: Promote hot pages from CXL (Node 2) -> Local DDR5 (Node 0)
          - name: promote_hot_to_ddr5
            access_pattern:
              sz_bytes: { min: 4096, max: max }
              nr_accesses: { min: 5, max: max }
              age_us: { min: 100000, max: max }
            action: migrate_hot
            target_nid: 0
            quotas:
              time_ms: 100
              sz_bytes: 536870912 # Max 512 MB/sec promotion rate
              reset_interval_ms: 1000
```

With **CXL 3.1 + DAMON**, servers run with 60%–75% of their total memory footprint on pooled CXL expanders (reclaiming recycled DDR5 or lower-cost CXL AICs) while keeping p99 application latency within **3.8%** of an all-local DDR5 configuration.
