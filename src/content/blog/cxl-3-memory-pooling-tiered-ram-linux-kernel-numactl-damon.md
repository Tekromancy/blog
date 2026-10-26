---
title: "Breaking the PCIe Memory Wall: CXL 3.0/3.1 Memory Pooling, Cache-Coherent Switch Fabrics, and Linux DAMON Tiering"
description: "How Compute Express Link (CXL.mem and CXL.cache over PCIe 6.0 PAM4) decouples memory capacity from CPU sockets—and how to orchestrate zero-CPU NUMA nodes, bandwidth-weighted interleaving, and automated hot/cold page migration with Linux DAMON."
pubDate: "2026-10-26"
updatedDate: "2026-10-26"
heroImage: "29.jpg"
tags: ["hardware", "linux", "kernel", "performance", "infrastructure", "ai-ml"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

For two decades, datacenter server architecture has been held hostage by **DIMM-Slot Stranding** and the **CPU Pin-Count Wall**: if a workload requires 4 TB of DRAM, you are forced to purchase a dual-socket 192-core server populated with high-density 128 GB or 256 GB DDR5 RDIMMs—even if your service only utilizes 25% of the CPU cores. Worse, once all 12 DDR5 channels per socket are populated, both memory capacity and memory bandwidth hit an immovable physical ceiling dictated by socket package pins.

**Compute Express Link (`CXL 2.0 / 3.0 / 3.1`)** breaks this coupling. Built atop the physical **PCIe 5.0 (32 GT/s NRZ)** and **PCIe 6.0 (64 GT/s PAM4)** electrical layers, CXL multiplexes three hardware-coherent protocols (`CXL.io`, `CXL.cache`, and `CXL.mem`) that allow CPUs and accelerators to address external memory expanders and multi-rack memory pools using standard load/store (`MOV`) instructions with **64-byte cacheline granularity**.

Here is the systems engineering breakdown of CXL Type-3 Memory Expanders, CXL 3.0/3.1 **256-Byte Latency-Optimized FLITs (`LO-Flit`)**, **Port-Based Routing (`PBR`)** switch fabrics with hardware **Back-Invalidation (`HDM-DB`)**, the real nanosecond latency math, and how to configure the Linux kernel (`dax_kmem`, `ZONE_MOVABLE`, `weighted_interleave`, and **DAMON** `DAMOS_MIGRATE_HOT`/`COLD`) to run tiered memory in production without p99 tail-latency cliffs or Ring-0 Machine Check panics.

---

## 1. Inside the CXL Protocol Stack: Why `CXL.mem` Is Not PCIe DMA

Standard NVMe SSDs and PCIe NICs transfer data in 4 KB+ pages over `PCIe TLP` (Transaction Layer Packet) streams, requiring kernel device drivers, submission/completion ring buffers, interrupts, and DMA page pinning.

**CXL Type-3 (`CXL.io` + `CXL.mem`)** bypasses the OS I/O stack entirely and executes directly inside the CPU's coherent **Home Agent / Integrated Memory Controller (`iMC` / `CHA`)** pipeline:

1. **System Address Decoder (`SAD`) & `CFMWS` Lookup**: When a CPU thread suffers a Last-Level Cache (L3) miss on a Host Physical Address (`HPA`) mapped to an ACPI **CXL Fixed Memory Window Structure (`CFMWS`)**, the CPU's Home Agent intercepts the miss in silicon—no kernel driver or page fault is invoked.
2. **Low-Latency FLIT Encapsulation**: Instead of variable-length PCIe TLPs, the Home Agent packs the 64-byte cacheline request into a fixed-size **Flow Control Unit (`FLIT`)**:
   - **CXL 1.1 / 2.0 (PCIe 5.0 @ 32 GT/s NRZ)**: Uses a **68-byte FLIT** (528-bit payload + 16-bit CRC with 128b/130b encoding).
   - **CXL 3.0 / 3.1 (PCIe 6.0 @ 64 GT/s PAM4)**: Introduces the **Standard 256-Byte FLIT** and the **Latency-Optimized 256-Byte FLIT (`LO-Flit`)**, which splits each 256B transfer into two 128B sub-flits with independent CRCs—shaving **3 to 5 ns** off serialization/deserialization latency so the memory controller can begin decoding the address before the second half of the flit even arrives.
3. **Six Asymmetric `CXL.mem` Channels**: `CXL.mem` separates traffic into **Master-to-Subordinate (`M2S`, CPU $\to$ Device)** and **Subordinate-to-Master (`S2M`, Device $\to$ CPU)** channels to prevent protocol deadlocks:
   - **`M2S Req`**: Address-only requests (`MemRd`, `MemInv`).
   - **`M2S RwD`**: Requests with Data (`MemWr`, `MemWrPtl` 64B cacheline evictions).
   - **`M2S BIRsp`**: Back-Invalidation Response (added in CXL 3.0; CPU confirms local cacheline invalidation).
   - **`S2M NDR`**: No-Data Response (`Cmp`, `Cmp-E` write/exclusivity completions).
   - **`S2M DRS`**: Data Response (`MemData` returning the 64-byte cacheline into CPU L3/L2/L1D).
   - **`S2M BISnp`**: Back-Invalidation Snoop (added in CXL 3.0; allows the CXL memory controller to snoop and invalidate host CPU caches).

![CXL 3.1 Coherent Memory Pooling & 256B FLIT Architecture](/images/cxl-3-protocol-flit-switch-architecture.jpg)

```text
+-------------------------------------------------------------------------------+
|          CXL 3.1 SWITCHED MEMORY POOL & LINUX KERNEL NUMA TOPOLOGY            |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ Host Node 0 (AMD EPYC / Intel Xeon) ]                                      |
|    ├── NUMA Node 0 (Local 12-Ch DDR5-6400)  ---> Latency: ~85 ns  (Hot Tier)  |
|    └── CPU Home Agent / CXL Root Port (x16 PCIe 6.0 PAM4 @ 64 GT/s = 128 GB/s)|
|                                       |                                       |
|             [ 256B LO-Flits: M2S Req/RwD/BIRsp <-> S2M DRS/NDR/BISnp ]        |
|                                       |                                       |
|  [ CXL 3.1 Hardware PBR (Port-Based Routing) Switch Fabric ]                  |
|    ├── Dynamic Capacity Device (DCD) Extent Management                        |
|    └── Device Snoop Filter (HDM-DB) Issuing `S2M BISnp` Across Sharers        |
|           +---------------------------+---------------------------+           |
|           v                                                       v           |
|  +---------------------------------+     +---------------------------------+  |
|  | CXL Type-3 Pool Appliance A     |     | CXL Type-3 Pool Appliance B     |  |
|  | Exposed as Zero-CPU NUMA Node 2 |     | Exposed as Zero-CPU NUMA Node 3 |  |
|  | Latency: ~210-250 ns (Warm/Cold)|     | Shared Read-Only LLM Weights    |  |
|  +---------------------------------+     +---------------------------------+  |
+-------------------------------------------------------------------------------+
```

### Coherency Models: `HDM-H` (CXL 2.0) vs. `HDM-DB` (CXL 3.0/3.1)

A common misconception is that CXL 2.0 and CXL 3.0 treat multi-host memory the same way. They do not:
- **CXL 2.0 Memory Pooling (`HDM-H` — Host-Only Coherent)**: A Multi-Logical Device (`MLD`) can slice a 2 TB memory appliance into four isolated 512 GB logical devices assigned to four different servers. Each slice is coherent only within its single owning host.
- **CXL 3.0/3.1 True Memory Sharing (`HDM-DB` — Device Back-Invalidation Coherent)**: Combined with **Port-Based Routing (`PBR`)** switches scaling up to 4,096 ports, CXL 3.0/3.1 embeds a hardware **Device Snoop Filter (`DSF`)** directory inside the Type-3 memory controller. Multiple servers can map the *exact same physical DRAM pages* simultaneously. If Host A writes to a shared cacheline that Host B holds in `Shared (S)` state, the CXL controller transmits an `S2M BISnp` snoop across the switch to Host B, waits for `M2S BIRsp`, and guarantees strict hardware cache coherency across nodes—enabling zero-copy shared LLM weight pools and lock-free distributed in-memory tables.

---

## 2. The Real Latency & Bandwidth Math: Local DDR5 vs. CXL Type-3

Because every `CXL.mem` access traverses the CPU Root Port, PCIe PHY Serializer/Deserializer (`SerDes`), link layer, and external CXL ASIC memory controller before reaching DRAM ranks, CXL Type-3 memory behaves architecturally like a **1-hop or 2-hop CPU-less remote NUMA node**:

| Memory Tier | Idle Load-to-Use Latency | Peak Read Bandwidth (per `x16` / Socket) | Linux Kernel `memory_tier` (`adistance`) | Ideal Workload Placement |
| :--- | :---: | :---: | :---: | :--- |
| **Local CPU Socket DDR5-6400 (12-Channel)** | **~82–90 ns** | ~460 GB/s | `memory_tier4` (`576`) | Hot working sets, kernel stacks (`ZONE_NORMAL`), HNSW entry layers |
| **Remote CPU Socket DDR5 (1-Hop UPI/xGMI)** | **~135–150 ns** | ~150–200 GB/s | `memory_tier4` (NUMA distance `21`) | Cross-socket thread allocations |
| **Direct-Attach CXL 2.0 AIC (`PCIe 5.0 x16`, 68B Flit)** | **~170–195 ns** | ~60–62 GB/s per `x16` | `memory_tier22` (`~2176`) | Warm in-memory caches (`Valkey`), JVM heaps, KV-cache offload |
| **Direct-Attach CXL 3.1 AIC (`PCIe 6.0 x16`, 256B LO-Flit)** | **~150–168 ns** | ~118–124 GB/s per `x16` | `memory_tier18` (`~1792`) | Bandwidth expansion (`weighted_interleave`), OLAP scans |
| **Switched CXL 3.1 PBR Fabric (1 Switch Hop)** | **~220–265 ns** | Shared up to 128 GB/s / port | `memory_tier26` (`~2688`) | Cold memory pages, vector DB payload blocks, shared LLM weights |
| **Local NVMe SSD (`PCIe 5.0` Swap / `io_uring`)** | **~12,000–65,000 ns** | ~14 GB/s | Block Swap (`zswap` / `swap`) | Persistent block storage ($50\times\text{–}250\times$ slower than CXL!) |

### The Bandwidth Pinhole Insight
While switched CXL memory (~235 ns) is **$2.6\times$ slower in point-latency than local DDR5** (~85 ns), it is still **$50\times\text{ to }250\times$ faster than NVMe flash** and is directly addressable at 64-byte granularity without page-fault context switches. Furthermore, adding four `x16` CXL 3.0/3.1 links to a single-socket server injects up to **480 GB/s of additional read bandwidth** on top of the CPU's native 460 GB/s DDR5 channels—nearly **doubling single-socket memory bandwidth** (`~940 GB/s` aggregate) when striped via Linux 6.9+ weighted interleaving.

---

## 3. Configuring Linux Zero-CPU NUMA Nodes (`cxl-cli`, `CDAT`, & `ZONE_MOVABLE`)

When the Linux kernel (`6.8+` / `6.12+`) boots on a platform with CXL memory, it combines firmware tables with hardware device telemetry to build its memory tier hierarchy:
1. **ACPI `CEDT` (CXL Early Discovery Table) & `SRAT` / `HMAT`**: Describes the host bridge (`CHBS`) and fixed memory windows (`CFMWS`).
2. **PCIe DOE & `CDAT` (Coherent Device Attribute Table)**: The Linux `cxl_core` driver queries the CXL Type-3 device's internal `CDAT` table over the PCIe **Data Object Exchange (`DOE`)** mailbox (`drivers/cxl/core/cdat.c`), combining link and device latency/bandwidth metrics to compute an **abstract distance (`adistance`)** and place the CPU-less NUMA node into a lower kernel memory tier (e.g., `/sys/devices/virtual/memory_tiering/memory_tier22`).

![Linux Kernel CXL Tiered Memory & DAMON Autonomous Page Migration](/images/cxl-linux-numa-tiering-damon-pipeline.jpg)

### Step 1: Provision a CXL Region and Online It into `ZONE_MOVABLE`

> **CRITICAL PRODUCTION RAS RULE**: Never allow the Linux kernel to place unmovable Ring-0 slab allocations (`kmalloc`, kernel stacks, `task_struct`, or radix page tables) onto CXL memory (`ZONE_NORMAL`). If a CXL switch port resets, a Dynamic Capacity (`DCD`) extent is released, or an uncorrectable DRAM error returns a `CXL.mem Poison` bit during a kernel pointer dereference, the host CPU raises a fatal Ring-0 **Machine Check Exception (`MCE`)** and panics the entire server.
>
> Always online CXL memory exclusively into **`ZONE_MOVABLE`** so all pages on the CXL NUMA node remain 100% migratable (`__GFP_MOVABLE`) and any uncorrectable poison error is contained to a recoverable userspace `SIGBUS` (`BUS_MCEERR_AR`).

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Inspect discovered CXL memdevs, endpoints, and ACPI Root Bridges (CFMWS decoders)
cxl list -M -D -R

# 2. Create a 2-way hardware-interleaved CXL RAM region across two x16 endpoints (mem0, mem1)
#    4096-byte interleave granularity (-g 4096) maximizes multi-link bandwidth
cxl create-region -m -d decoder0.0 -w 2 -g 4096 mem0 mem1

# 3. Reconfigure the resulting DAX device (dax0.0) into system-ram mode (dax_kmem driver)
#    --no-online prevents udev from defaulting blocks into ZONE_NORMAL
daxctl reconfigure-device --mode=system-ram --no-online dax0.0

# 4. Online all CXL memory blocks strictly into ZONE_MOVABLE (safe for hot-unplug & migration)
daxctl online-memory dax0.0 --movable

# 5. Verify the CPU-less NUMA node (Node 2) and its assigned kernel memory_tier
numactl --hardware
grep -H . /sys/devices/virtual/memory_tiering/memory_tier*/nodelist
# Output:
# /sys/devices/virtual/memory_tiering/memory_tier4/nodelist:0-1   (Local DDR5)
# /sys/devices/virtual/memory_tiering/memory_tier22/nodelist:2    (Pooled CXL.mem)
```

### Step 2: Bandwidth-Weighted Interleaving (`Linux 6.9+` & `numactl 2.0.18+`)

Standard round-robin `numactl --interleave=0,2` sends 50% of traffic to Node 0 (`460 GB/s`) and 50% to Node 2 (`115 GB/s`), starving the fast DDR5 channels while saturating the CXL link.

Linux `6.9+` introduced **Weighted Memory Interleaving** (`/sys/kernel/mm/mempolicy/weighted_interleave/`), which reads `HMAT`/`CDAT` bandwidth attributes (or accepts explicit administrator ratios) to stripe page allocations across Local DDR5 and CXL in exact proportion to their sustained bandwidth (`4:1` or `2:1`):

```bash
# 1. Enable automatic kernel page demotion from Local DDR5 (Tier 4) -> CXL (Tier 22) during kswapd pressure
sysctl -w vm.zone_reclaim_mode=0
echo 1 > /sys/kernel/mm/numa/demotion_enabled

# 2. Configure 4:1 bandwidth-weighted interleaving (e.g., 460 GB/s Local DDR5 : 115 GB/s CXL)
echo 4 > /sys/kernel/mm/mempolicy/weighted_interleave/node0
echo 1 > /sys/kernel/mm/mempolicy/weighted_interleave/node2

# 3. Launch a bandwidth-bound analytics or LLM CPU KV-cache offload engine across the weighted pool
numactl --weighted-interleave=0,2 ./vllm-kv-offload-worker --kv-cache-dtype fp8
```

---

## 4. Autonomous Hot/Cold Page Tiering with Linux `DAMON` (`DAMOS_MIGRATE_HOT` / `COLD`)

Linux provides two mechanisms for promoting hot pages from CXL back to local DDR5:
1. **Reactive Hinting Faults (`kernel.numa_balancing=2`, Transparent Page Placement / `TPP`)**: Periodically unmaps pages (`PROT_NONE`) so the next CPU access triggers a minor page fault into the kernel, which measures access recency and promotes the page. While easy to enable, heavy pointer-chasing workloads (like HNSW vector search or Redis/Valkey) can suffer **minor page-fault storms** that inflate p99 tail latency by 3%–8%.
2. **Proactive Sampling with Linux `DAMON` (`Linux 6.11+` `DAMOS_MIGRATE_HOT` / `DAMOS_MIGRATE_COLD`)**: Instead of trapping threads with page faults, the `kdamond` kernel thread samples hardware Page Table Entry (`PTE`) `Accessed` bits across dynamically split/merged physical address regions (`ops: paddr`), bounding monitoring CPU overhead to **<1% regardless of RAM size**.

In **Linux 6.11+**, **DAMOS (DAMON-based Operation Schemes)** gained native `migrate_hot` and `migrate_cold` actions (`mm/damon/paddr.c`), enabling direct page migration between NUMA nodes based on exact access frequency and idle age watermarks.

### Discovering Physical Address Ranges & Applying the `damo` Policy

First, inspect `/proc/iomem` (or `damo args damon --ops paddr`) to confirm the Host Physical Address (`HPA`) boundaries of `Node 0` (Local DDR5) and `Node 2` (`hmem` / `kmem` CXL region):

```bash
# Inspect physical address ranges for Local DDR5 (Node 0) and CXL System RAM (Node 2)
grep -E "System RAM|hmem" /proc/iomem
# 100000000-807fffffff : System RAM          (Node 0: 512 GB Local DDR5)
# 10000000000-1ffffffffff : System RAM (kmem) (Node 2: 1024 GB CXL Type-3 Pool)
```

Next, deploy the bi-directional tiering policy via `damo`:

```yaml
# /etc/damon/cxl-tiering-policy.yaml — Apply via: sudo damo start /etc/damon/cxl-tiering-policy.yaml
kdamonds:
  - state: on
    contexts:
      - name: cxl_tiered_ram
        ops: paddr
        monitoring_attrs:
          intervals:
            sample_us: 5000       # 5ms PTE Accessed-bit sampling interval
            aggr_us: 100000       # 100ms aggregation window (20 samples/window)
            ops_update_us: 1000000
          nr_regions:
            min: 32
            max: 2048
        targets:
          - regions:
              # Region 0: Local DDR5 (NUMA Node 0 HPA range)
              - start: 0x100000000
                end:   0x8080000000
              # Region 1: Pooled CXL.mem (NUMA Node 2 HPA range)
              - start: 0x10000000000
                end:   0x20000000000
        schemes:
          # Scheme A: Demote cold pages from Local DDR5 (Node 0) -> CXL (Node 2)
          - name: demote_cold_to_cxl
            access_pattern:
              sz_bytes: { min: 4096, max: max }
              nr_accesses: { min: 0, max: 0 }
              age_us: { min: 30000000, max: max } # Untouched for >= 30 seconds
            action: migrate_cold
            target_nid: 2
            quotas:
              time_ms: 50
              sz_bytes: 268435456 # Rate-limit demotion to 256 MB/sec
              reset_interval_ms: 1000
            watermarks:
              metric: free_mem_rate
              interval_us: 5000000
              high: 200           # Pause demotion when >20.0% free RAM
              mid: 150            # Trigger demotion when <15.0% free RAM
              low: 50

          # Scheme B: Immediately promote hot pages from CXL (Node 2) -> Local DDR5 (Node 0)
          - name: promote_hot_to_ddr5
            access_pattern:
              sz_bytes: { min: 4096, max: max }
              nr_accesses: { min: 5, max: max }   # Accessed in >=25% of samples (5/20)
              age_us: { min: 100000, max: max }
            action: migrate_hot
            target_nid: 0
            quotas:
              time_ms: 100
              sz_bytes: 536870912 # Allow fast 512 MB/sec promotion bursts
              reset_interval_ms: 1000
```

---

## 5. Production Architecture: Where CXL 3.1 Wins (and Where to Guard It)

### 1. LLM Prefix-Cache Offloading & Multi-Host Weight Sharing (`vLLM` / `SGLang`)
In multi-turn agentic workloads, GPU HBM3e (`80–192 GB`) fills up rapidly with KV-cache tensors. Evicting warm KV-cache blocks to NVMe SSD (`~25,000 ns`) stalls Time-To-First-Token (`TTFT`) on subsequent turns, whereas offloading warm KV blocks to a 4 TB **CXL 3.1 Type-3 pool (`~160–220 ns`)** delivers **$8\times\text{ to }14\times$ higher prefix-cache restoration throughput**. With CXL 3.1 `HDM-DB` shared memory regions, multiple inference hosts can also memory-map (`mmap` over `/dev/dax0.0`) a single read-only copy of 405B/671B model weights during cold container startup in milliseconds.

### 2. Vector Databases (`Milvus` / `Qdrant` HNSW Graphs)
Hierarchical Navigable Small World (`HNSW`) indexes exhibit a bimodal memory access pattern:
- **Upper Graph Layers (0–15% of footprint)**: Extremely hot, random 64-byte pointer-chasing reads. Must remain pinned in **Local DDR5 (`Node 0`, ~85 ns)**.
- **Bottom Layer & Raw Vector Payloads (85% of footprint)**: Scanned only for candidate re-ranking. Placed on **CXL (`Node 2`, ~180 ns)** via `DAMON`, cutting total DRAM hardware CAPEX by **40%–48%** while keeping p99 recall latency within **3.2%** of an all-local DDR5 cluster.

### 3. Production Readiness Checklist
Before shifting production workloads onto CXL 3.0/3.1 memory pools, enforce these four invariants:
1. **`ZONE_MOVABLE` Enforcement**: Verify `cat /proc/buddyinfo` shows zero allocations in `Node 2, zone Normal` and all CXL capacity in `Node 2, zone Movable`.
2. **Interleave Granularity Alignment**: Match ACPI `CFMWS` and `cxl create-region -g` interleave granularity (`256B` or `4096B`) to your CPU Home Agent's native hashing mode so multi-port CXL cards do not suffer single-link hot-spotting.
3. **Disable `zone_reclaim_mode`**: Set `vm.zone_reclaim_mode=0` so the kernel demotes cold pages from Node 0 to Node 2 rather than prematurely reclaiming page cache on Node 0.
4. **CXL RAS & Post-Package Repair (`sPPR`) Monitoring**: Run `rasdaemon` (`--enable-cxl`) to monitor `cxl_poison` and `cxl_aer_ue` tracepoints, proactively retiring degraded device DRAM rows before multi-bit ECC errors occur.
