---
title: "Linux cgroups v2 and the Silent OOM Killer: Taming Runaway Memory in Production Containers"
description: "How the Linux kernel handles page cache reclaim, memory.max vs memory.high throttling, swap accounting, and debugging Exit Code 137 container crashes with eBPF."
pubDate: "2026-09-22"
heroImage: "7.jpg"
tags: ["linux", "kernel", "kubernetes", "sre", "performance"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

Every Site Reliability Engineer and DevOps practitioner has faced the dreaded Kubernetes diagnosis:

```text
Status:      Failed
Reason:      OOMKilled
Exit Code:   137
```

In modern cloud environments, memory is the most fragile resource. When a CPU is exhausted, your application merely runs slower. When memory is exhausted, the Linux kernel invokes the **Out-Of-Memory (OOM) Killer** to instantly terminate processes with extreme prejudice.

Yet, most engineers don't realize that their containers are frequently killed not because their application has a memory leak, but because of a misunderstanding of how **cgroups v2**, page cache buffers, and kernel direct reclaim interact under load.

---

## 1. The Paradigm Shift: cgroups v1 vs cgroups v2

Under legacy `cgroups v1`, resource controllers (CPU, memory, blkio, network) were separate hierarchies. A container could have memory limits assigned in one path, but its block I/O writebacks were accounted to the root cgroup, making fair memory reclaim impossible.

In **cgroups v2** (unified hierarchy), all controllers attach to a single tree. Crucially, memory accounting reflects:

- **Anonymous Memory (`anon`)**: Heap, stack, and mmap allocations directly controlled by code. This memory _cannot_ be dropped without swapping.
- **File Page Cache (`file`)**: Cached disk blocks from reading or writing files. The kernel can evict this memory instantly if physical space is needed.

```
cgroup memory usage = anon + file (active/inactive) + sock + kernel
```

If your pod reads large logs, serves static assets, or interacts with SQLite/RocksDB, your `file` page cache will naturally rise to 100% of your container's memory limit. **This is healthy behavior!**

The trouble begins when memory allocations surge, and the kernel cannot reclaim page cache fast enough.

---

## 2. The Knobs: `memory.max` vs `memory.high`

In `cgroups v2`, the memory controller introduces critical multi-level pressure boundaries:

```
+-------------------------------------------------------------+
|                     CGROUP V2 MEMORY BOUNDARIES             |
+-------------------------------------------------------------+
|                                                             |
|  [ memory.max ]  <--- Hard limit: OOM Killer executes       |
|         ^                                                   |
|         |                                                   |
|  [ memory.high ] <--- Soft limit: Throttles threads & forces|
|         ^                 synchronous memory reclaim        |
|         |                                                   |
|  [ memory.low ]  <--- Protected memory: Never reclaimed     |
|                       unless system-wide emergency          |
|                                                             |
+-------------------------------------------------------------+
```

### Why Relying Only on `memory.max` (Kubernetes `limits.memory`) Kills Pods

Kubernetes maps `resources.limits.memory` directly to `memory.max`.

When an application thread attempts to allocate 1 byte over `memory.max`:

1. The kernel pauses the thread.
2. It attempts **Direct Reclaim**: synchronously scanning and evicting clean page cache.
3. If clean pages cannot be evicted fast enough (e.g. dirty writebacks are pending), direct reclaim fails.
4. **The OOM Killer strikes.** The process dies immediately with `SIGKILL`.

### The Solution: Proactive Throttling with `memory.high`

With `memory.high`, the kernel does not kill the process. Instead, it places the allocating thread into an artificial sleep (throttling), giving the kernel's background reclaim daemons (`kswapd`) time to free file pages without terminating the service:

```bash
# Set soft throttle at 3.5GB, hard kill at 4.0GB
echo 3758096384 > /sys/fs/cgroup/system.slice/docker-mycontainer/memory.high
echo 4294967296 > /sys/fs/cgroup/system.slice/docker-mycontainer/memory.max
```

---

## 3. Real-Time OOM Diagnostics with eBPF (`bpftrace`)

Instead of waiting for Prometheus alerts or inspecting post-mortem exit codes, we can trace the exact kernel function calls that decide a process's demise in real time:

```bash
# Capture every OOM kill event, target PID, and memory cgroup path
sudo bpftrace -e '
tracepoint:oom:mark_victim {
    printf("[CRITICAL] OOM Killer invoked! PID: %-6d Comm: %-16s\n", args->pid, comm);
}

kprobe:mem_cgroup_out_of_memory {
    printf("[PRESSURE] cgroup OOM reached in memcg struct: %p\n", arg0);
}'
```

Sample output during a traffic spike:

```text
[PRESSURE] cgroup OOM reached in memcg struct: 0xffff888124b89000
[CRITICAL] OOM Killer invoked! PID: 928412 Comm: node-worker
```

---

## 4. Monitoring Memory Pressure Stalls (PSI)

Linux kernels 4.20+ include **Pressure Stall Information (PSI)**. PSI measures the percentage of wall-clock time that tasks were delayed waiting for available memory.

Inspect the container's memory pressure:

```bash
cat /sys/fs/cgroup/system.slice/docker-mycontainer/memory.pressure
```

Output:

```text
some avg10=4.12 avg60=2.30 avg300=0.85 total=12849102
full avg10=1.45 avg60=0.80 avg300=0.20 total=4120912
```

- **`some`**: The percentage of time at least one thread was stalled on memory allocation.
- **`full`**: The percentage of time _all_ threads in the cgroup were completely stalled (dead time).

If your `full` metric exceeds 1.00 for more than 10 seconds, your application is experiencing severe memory starvation and will soon trip `OOMKilled`.

---

## 5. Kubernetes Production Recommendations

1. **Never set Memory Limit equal to Request for Java/Node/Python apps**: Give pods a buffer between request and limit so garbage collection can catch up.
2. **Enable Node-Level Swap on cgroups v2**: In modern Kubernetes (v1.28+), enabling limited swap on fast NVMe drives provides the kernel with the headroom needed to swap dormant anonymous pages during burst memory spikes.
3. **Tune `vm.dirty_ratio` and `vm.dirty_background_ratio`**:
   ```ini
   # Flush dirty pages to disk aggressively so they are clean and instantly reclaimable
   vm.dirty_background_ratio = 5
   vm.dirty_ratio = 10
   ```

By tuning `memory.high` and monitoring PSI metrics, you can transform catastrophic application crashes into graceful micro-throttles—keeping your production services resilient and online.
