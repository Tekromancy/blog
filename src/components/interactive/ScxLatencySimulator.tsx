import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

type SchedulerPolicy = "eevdf" | "scx_bpfland" | "scx_lavd" | "scx_rustland";

interface PolicySpec {
  id: SchedulerPolicy;
  name: string;
  tag: string;
  description: string;
  defaultSliceMs: number;
  llcAffinityFactor: number;
  interactiveBoost: number;
  batchOverheadPct: number;
}

const POLICIES: PolicySpec[] = [
  {
    id: "eevdf",
    name: "Default Linux EEVDF",
    tag: "fair_sched_class",
    description:
      "Standard Earliest Eligible Virtual Deadline First kernel scheduler. Fair bandwidth sharing, but interactive wakes queue behind runnable batch compiler threads under 100% saturation.",
    defaultSliceMs: 4.0,
    llcAffinityFactor: 0.45,
    interactiveBoost: 1.0,
    batchOverheadPct: 0.0,
  },
  {
    id: "scx_bpfland",
    name: "scx_bpfland (Pure eBPF)",
    tag: "ext_sched_class",
    description:
      "In-kernel BPF vtime scheduler that classifies tasks by voluntary context switch frequency (nvcsw) and steers threads into per-L2/L3 cache Dispatch Queues.",
    defaultSliceMs: 2.5,
    llcAffinityFactor: 0.85,
    interactiveBoost: 4.8,
    batchOverheadPct: 2.1,
  },
  {
    id: "scx_lavd",
    name: "scx_lavd (Latency-Critical)",
    tag: "ext_sched_class",
    description:
      "Latency-Aware Virtual Deadline scheduler. Computes real-time task latency criticality from wakeup frequency and runtime burstiness, preempting batch builds immediately.",
    defaultSliceMs: 1.5,
    llcAffinityFactor: 0.94,
    interactiveBoost: 11.5,
    batchOverheadPct: 2.8,
  },
  {
    id: "scx_rustland",
    name: "Custom Rustland BTreeSet",
    tag: "scx_rustland_core",
    description:
      "Userspace Rust scheduler over BPF ring-buffer IPC. Uses mlockall(MCL_CURRENT | MCL_FUTURE) and strict vtime floor clamping for deterministic userspace policy control.",
    defaultSliceMs: 2.0,
    llcAffinityFactor: 0.88,
    interactiveBoost: 7.2,
    batchOverheadPct: 3.4,
  },
];

export default function ScxLatencySimulator() {
  const [policyId, setPolicyId] = useState<SchedulerPolicy>("scx_lavd");
  const [batchThreads, setBatchThreads] = useState<number>(32);
  const [sliceMs, setSliceMs] = useState<number>(2.0);
  const [llcPinning, setLlcPinning] = useState<boolean>(true);
  const [watchdogStall, setWatchdogStall] = useState<boolean>(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const activePolicy =
    POLICIES.find((p) => p.id === policyId) || POLICIES[2];

  const handleSelectPolicy = (p: PolicySpec) => {
    setPolicyId(p.id);
    setSliceMs(p.defaultSliceMs);
    setWatchdogStall(false);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "ScxLatencySimulator",
        action_type: "configure_scheduler",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `policy:${policyId}_threads:${batchThreads}_slice:${sliceMs}_llc:${llcPinning}_wd:${watchdogStall}`,
      });
    }, 900);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [policyId, batchThreads, sliceMs, llcPinning, watchdogStall]);

  // If watchdog triggers, kernel auto-evacuates tasks back to EEVDF
  const effectivePolicy = watchdogStall ? POLICIES[0] : activePolicy;
  const loadRatio = batchThreads / 32;
  const crossCcdPenaltyMs = llcPinning ? 0.35 : 4.8;

  // Compute simulated latency percentiles (ms)
  const rawP50 =
    0.55 +
    (loadRatio * 1.45 * (sliceMs / 2.5)) /
      Math.sqrt(effectivePolicy.interactiveBoost) +
    (llcPinning ? 0.05 : 0.65);

  const rawP99 =
    1.8 +
    (loadRatio * 29.5 * (sliceMs / 2.5)) / effectivePolicy.interactiveBoost +
    crossCcdPenaltyMs * 1.4;

  const rawP999 =
    4.1 +
    (loadRatio * 116.0 * (sliceMs / 2.5)) / effectivePolicy.interactiveBoost +
    crossCcdPenaltyMs * 3.1;

  const p50 = Number(rawP50.toFixed(2));
  const p99 = Number(rawP99.toFixed(1));
  const p999 = Number(rawP999.toFixed(1));

  // Baseline EEVDF p99.9 under current load for comparison
  const baselineEevdfP999 = Number(
    (
      4.1 +
      loadRatio * 116.0 * (4.0 / 2.5) +
      (llcPinning ? 0.35 : 4.8) * 3.1
    ).toFixed(1)
  );

  const reductionPct = Math.max(
    0,
    Math.round(((baselineEevdfP999 - p999) / baselineEevdfP999) * 100)
  );

  const buildTimeSec = Number(
    (
      58.4 *
      (32 / Math.max(8, batchThreads)) *
      (1 + effectivePolicy.batchOverheadPct / 100) *
      (llcPinning ? 0.98 : 1.07)
    ).toFixed(1)
  );

  const l3HitRate = Math.min(
    99.4,
    Number(
      (
        (llcPinning ? 89.0 : 62.0) +
        effectivePolicy.llcAffinityFactor * 9.5 -
        loadRatio * 3.2
      ).toFixed(1)
    )
  );

  return (
    <div className="space-y-6 font-mono text-xs sm:text-sm">
      {/* Scheduler Policy Selector */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2.5 flex items-center justify-between">
          <span>1. Select Active Kernel Scheduling Policy (struct_ops)</span>
          <span className="text-emerald-400">
            /sys/kernel/sched_ext/state:{" "}
            {watchdogStall || policyId === "eevdf" ? "disabled" : "enabled"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {POLICIES.map((p) => {
            const active = policyId === p.id && !watchdogStall;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPolicy(p)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  active
                    ? "bg-emerald-950/40 border-emerald-500/70 text-white shadow-lg"
                    : "bg-slate-950/70 border-slate-800 text-gray-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs sm:text-sm">{p.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      active
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-700 text-gray-400"
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hardware & Runtime Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">Background Load (make -j):</span>
            <span className="text-cyan-400 font-bold">{batchThreads} Threads</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            step={4}
            value={batchThreads}
            onChange={(e) => setBatchThreads(Number(e.target.value))}
            aria-label="Background Load Threads"
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>4 (Light)</span>
            <span>32 (100% Core Sat)</span>
            <span>64 (2x Oversub)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">DSQ Time Slice (SLICE_NS):</span>
            <span className="text-emerald-400 font-bold">{sliceMs.toFixed(1)} ms</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={6.0}
            step={0.5}
            value={sliceMs}
            onChange={(e) => setSliceMs(Number(e.target.value))}
            aria-label="DSQ Time Slice in milliseconds"
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>0.5ms (Ultra-Crisp)</span>
            <span>2.0ms (Default)</span>
            <span>6.0ms (Batch)</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">Per-CCX L3 Cache DSQs</span>
            <input
              type="checkbox"
              checked={llcPinning}
              onChange={(e) => setLlcPinning(e.target.checked)}
              className="accent-emerald-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-amber-500/30 bg-amber-950/20 cursor-pointer">
            <span className="text-xs text-amber-300">Inject BPF Watchdog Stall</span>
            <input
              type="checkbox"
              checked={watchdogStall}
              onChange={(e) => setWatchdogStall(e.target.checked)}
              className="accent-amber-500 w-4 h-4"
            />
          </label>
        </div>
      </div>

      {/* Watchdog Alert Banner */}
      {watchdogStall && (
        <div className="p-3.5 rounded-xl border border-amber-500/60 bg-amber-500/10 text-amber-300 text-xs flex items-center justify-between gap-3">
          <div>
            <strong>KERNEL WATCHDOG TRIGGERED (scx_ops_error):</strong> Runnable task stalled &gt;30s. Kernel automatically detached{" "}
            <code className="text-white">{activePolicy.name}</code> and evacuated all threads back to{" "}
            <code className="text-white">fair_sched_class (EEVDF)</code> with zero process loss.
          </div>
          <button
            type="button"
            onClick={() => setWatchdogStall(false)}
            className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/50 text-amber-200 hover:bg-amber-500/30 shrink-0"
          >
            Reload BPF
          </button>
        </div>
      )}

      {/* Telemetry Readout Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            Service p50 Latency
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {p50} <span className="text-xs font-normal text-gray-400">ms</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">
            Interactive Wakeup Path
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            Service p99 Latency
          </div>
          <div className="text-xl sm:text-2xl font-bold text-cyan-400">
            {p99} <span className="text-xs font-normal text-gray-400">ms</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Slice: {(sliceMs * 1_000_000).toLocaleString()} ns
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
          <div className="text-[10px] uppercase text-emerald-300 mb-1">
            Service p99.9 Tail
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400">
            {p999} <span className="text-xs font-normal text-gray-400">ms</span>
          </div>
          <div className="text-[10px] text-emerald-300 mt-1">
            {reductionPct > 0
              ? `-${reductionPct}% vs Default EEVDF`
              : "Baseline EEVDF Queueing"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            L3 Cache Hit / Build
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {l3HitRate}%{" "}
            <span className="text-xs font-normal text-gray-400">
              ({buildTimeSec}s)
            </span>
          </div>
          <div className="text-[10px] text-cyan-400 mt-1">
            {llcPinning ? "CCD Local DSQ Pinned" : "Cross-CCD Hop Penalty"}
          </div>
        </div>
      </div>
    </div>
  );
}
