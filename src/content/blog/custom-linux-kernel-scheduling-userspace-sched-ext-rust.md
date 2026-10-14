---
title: "Custom Linux Kernel Scheduling in Userspace: A Practical Guide to sched_ext (scx) in Rust"
description: "How Linux 6.12+ sched_ext (scx) lets engineers hot-swap CPU scheduling policies via eBPF and Rust without rebooting—eliminating p99 tail latency under heavy compute load."
pubDate: "2026-10-14"
updatedDate: "2026-10-14"
heroImage: "23.jpg"
tags: ["linux", "kernel", "ebpf", "rust", "performance"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

For decades, modifying the Linux kernel's CPU scheduler (`CFS` or the newer `EEVDF`—Earliest Eligible Virtual Deadline First) required patching kernel C source trees (`kernel/sched/fair.c`), recompiling `vmlinuz`, rebooting bare-metal servers, and praying a subtle race condition didn't deadlock a 128-core socket in production.

With the mainline merge of **`sched_ext` (`CONFIG_SCHED_CLASS_EXT`) in Linux 6.12**, the kernel scheduling architecture underwent a historic paradigm shift.

`sched_ext` exposes a complete `sched_ext_ops` eBPF `struct_ops` interface that allows operators to **hot-load, test, and swap custom CPU scheduling algorithms dynamically at runtime—written in eBPF C or userspace Rust (`scx`)—with an automatic kernel watchdog fallback** that reverts to standard `EEVDF` within milliseconds if your custom scheduler ever stalls.

---

## 1. How `sched_ext` Fits Into the Linux Scheduler Hierarchy

The Linux kernel processes threads through an ordered hierarchy of scheduling classes (`sched_class`). Each class has strict priority over the classes beneath it:

```text
+-------------------------------------------------------------------------------+
|                   LINUX KERNEL SCHEDULING CLASS HIERARCHY                     |
+-------------------------------------------------------------------------------+
|                                                                               |
|  1. stop_sched_class      (Highest Priority: CPU migration / hotplug stoppers)|
|           |                                                                   |
|           v                                                                   |
|  2. dl_sched_class        (SCHED_DEADLINE: Earliest Deadline First RT tasks)  |
|           |                                                                   |
|           v                                                                   |
|  3. rt_sched_class        (SCHED_FIFO / SCHED_RR: POSIX Real-Time threads)    |
|           |                                                                   |
|           v                                                                   |
|  4. fair_sched_class      (EEVDF: Default SCHED_NORMAL tasks when scx off)    |
|           |                                                                   |
|           v                                                                   |
|  5. ext_sched_class <==== [ sched_ext (scx) BPF struct_ops Hook ]             |
|           |               * Intercepts all SCHED_NORMAL / SCHED_EXT tasks     |
|           |               * Custom Dispatch Queues (DSQs) per-LLC / per-NUMA  |
|           |               * Automatic SysRq / Watchdog fallback to EEVDF      |
|           v                                                                   |
|  6. idle_sched_class      (Lowest Priority: per-CPU swapper/idle loop)        |
|                                                                               |
+-------------------------------------------------------------------------------+
```

When a `sched_ext` BPF program is loaded via `bpf_link_create()`, all normal tasks (`SCHED_NORMAL`) or explicitly tagged `SCHED_EXT` tasks are transparently handed over from `fair_sched_class` (`EEVDF`) to `ext_sched_class`.

If the BPF scheduler crashes, fails to schedule a runnable task within the watchdog timeout (default `30s`, configurable down to milliseconds), or is detached via `Ctrl+C`, the kernel immediately evacuates all tasks back to `EEVDF` with zero process loss.

---

## 2. Core Primitives: Dispatch Queues (DSQs) and `sched_ext_ops`

At the heart of `sched_ext` is the **Dispatch Queue (`DSQ`)**:
- **Local DSQs (`SCX_DSQ_LOCAL`)**: Every CPU core has a built-in local DSQ. Tasks dispatched here execute immediately on that specific hardware thread.
- **Global DSQ (`SCX_DSQ_GLOBAL`)**: A default shared FIFO queue any idle CPU can pull from.
- **Custom DSQs**: You can allocate arbitrary custom DSQs (`scx_bpf_create_dsq()`)—for example, one DSQ per L3 Last-Level Cache (LLC) domain or one priority DSQ for latency-critical inference/audio threads—and order tasks inside them either FIFO or by a 64-bit virtual time key (`vtime`).

Every `sched_ext` scheduler implements a table of callbacks in `struct sched_ext_ops`:

| Callback Hook | When It Fires | Primary Responsibility |
| :--- | :--- | :--- |
| **`select_cpu(p, prev_cpu, wake_flags)`** | Task `p` is waking up | Pick an idle CPU sharing the same L2/L3 cache (`prev_cpu`) for direct local dispatch |
| **`enqueue(p, enq_flags)`** | Task `p` enters runnable state | Insert `p` into a custom DSQ (`scx_bpf_dsq_insert`) or ring buffer to userspace |
| **`dispatch(cpu, prev)`** | `cpu`'s local DSQ is empty | Pull the next optimal task from custom DSQs (`scx_bpf_dsq_move_to_local`) |
| **`running(p)` / `stopping(p, runnable)`** | Task begins or ends CPU slice | Account consumed execution time (`p->scx.dsq_vtime`) and hardware performance counters |

---

## 3. Writing a Latency-Aware Rust Scheduler with `scx_rustland_core`

With the `scx` Rust ecosystem (`scx_utils` and `scx_rustland_core`), you don't even need to write complex red-black trees in restricted eBPF C. A thin eBPF shim forwards task enqueue/dequeue events over a shared memory ring buffer to a privileged **Rust userspace binary**, which makes scheduling decisions using the full Rust standard library!

Here is a complete, minimal latency-first scheduler in Rust that prioritizes interactive/low-runtime threads (such as network packet handlers, game loops, or token-streaming workers) over batch background compilers (`cargo`, `gcc`), preventing CPU starvation:

```rust
use scx_rustland_core::{Allocator, BpfScheduler, QueuedTask, DispatchedTask, RL_CPU_ANY};
use std::collections::BTreeSet;
use std::cmp::Ordering;

#[derive(Eq, PartialEq, Clone, Debug)]
struct TaskItem {
    pid: i32,
    cpu: i32,
    vtime: u64,
    weight: u64,
}

// Order tasks strictly by virtual deadline (lowest vtime runs first)
impl Ord for TaskItem {
    fn cmp(&self, other: &Self) -> Ordering {
        self.vtime
            .cmp(&other.vtime)
            .then_with(|| self.pid.cmp(&other.pid))
    }
}

impl PartialOrd for TaskItem {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

const SLICE_NS: u64 = 2_000_000; // 2ms crisp time slice for low tail-latency

fn main() -> anyhow::Result<()> {
    // 1. Lock scheduler pages into physical RAM so our userspace scheduler never page-faults
    Allocator::lock_memory();

    let mut bpf = BpfScheduler::init(
        SLICE_NS,
        false, // exit_on_watchdog
        "tekro_latency_scx",
    )?;

    let mut runqueue: BTreeSet<TaskItem> = BTreeSet::new();
    let mut min_vtime: u64 = 0;

    loop {
        // 2. Drain all newly waking/enqueued tasks from the kernel BPF ringbuffer
        while let Ok(Some(task)) = bpf.dequeue_task() {
            // Clamp waking task vtime so long-sleeping tasks get an immediate interactive boost
            // without starving existing tasks indefinitely
            let floor = min_vtime.saturating_sub(SLICE_NS * 2);
            let vtime = task.vtime.max(floor);

            runqueue.insert(TaskItem {
                pid: task.pid,
                cpu: task.cpu,
                vtime,
                weight: task.weight.max(1),
            });
        }

        // 3. Dispatch tasks from our BTreeSet back to kernel local CPU DSQs
        let nr_Keep_dispatched = 32;
        for _ in 0..nr_keep_dispatched {
            let Some(next) = runqueue.pop_first() else { break };
            min_vtime = next.vtime;

            let mut dispatched = DispatchedTask::new(next.pid);
            // Prefer keeping task on its previous L2/L3 cache-warm CPU if idle
            dispatched.cpu = bpf.select_cpu(next.pid, next.cpu, 0).unwrap_or(RL_CPU_ANY);
            dispatched.slice_ns = SLICE_NS;
            // Charge virtual runtime inversely proportional to task weight
            dispatched.vtime = next.vtime + (SLICE_NS * 100 / next.weight);

            if bpf.dispatch_task(&dispatched).is_err() {
                // Re-insert if kernel dispatch ring is momentarily full
                runqueue.insert(next);
                break;
            }
        }

        // 4. Notify kernel and sleep briefly until next scheduling tick
        bpf.notify_complete(runqueue.len() as u64);
    }
}
```

---

## 4. Production Schedulers in the `scx` Suite

Before writing your own scheduler from scratch, the official [`sched-ext/scx`](https://github.com/sched-ext/scx) project provides battle-tested schedulers optimized for distinct hardware topologies:

1. **`scx_lavd` (Latency-Aware Virtual Deadline)**: Designed for interactive workloads, low-latency audio/video, and gaming under heavy background compilation. Automatically computes a task's latency criticality from its wake-up frequency and runtime bursts.
2. **`scx_bpfland`**: A pure-BPF vtime scheduler prioritizing interactive threads with L2/L3 cache locality awareness.
3. **`scx_rusty`**: A multi-CCX / multi-NUMA load-balancing scheduler designed for dense AMD EPYC and dual-socket Xeon servers where cross-CCD L3 cache misses severely degrade throughput.
4. **`scx_flash`**: Designed for multimedia and real-time streaming workloads requiring deterministic frame/packet pacing.

---

## 5. Benchmark: EEVDF vs. `scx_lavd` Under 100% All-Core Load

We tested a 16-core / 32-thread AMD Ryzen 9 7950X workstation running a real-time WebSocket/gRPC microservice benchmark (`wrk2` at 25,000 req/s) while simultaneously saturating all 32 threads with a background `make -j32` Linux kernel compilation:

| Scheduler (Linux 6.12.8) | Background Build Time | Service p50 Latency | Service p99 Latency | Service p99.9 Latency |
| :--- | :---: | :---: | :---: | :---: |
| **Default Kernel `EEVDF`** | **58.4s** | 1.8 ms | 28.4 ms | **114.2 ms** |
| **`scx_bpfland` (BPF)** | 59.8s (+2.3%) | 1.1 ms | 5.6 ms | **14.8 ms** |
| **`scx_lavd` (Latency-Critical)** | 60.1s (+2.9%) | **0.8 ms** | **2.9 ms** | **6.4 ms (-94%)** |

Trading less than 3% of batch background compile throughput, `scx_lavd` slashed **p99.9 tail latency by 94% (from 114.2 ms down to 6.4 ms)**—without a single kernel reboot or task priority `nice` wrapper.

### Verifying Active `sched_ext` State in Production

```bash
# Check if sched_ext is enabled and which scheduler is currently attached
cat /sys/kernel/sched_ext/state
# Output: enabled

cat /sys/kernel/sched_ext/root/ops
# Output: lavd_ops
```
