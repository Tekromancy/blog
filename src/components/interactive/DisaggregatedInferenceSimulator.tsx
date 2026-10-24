import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

type ModelId = "llama3_70b_gqa" | "qwen25_72b_gqa" | "deepseek_v3_mla" | "llama31_405b_gqa";
type FabricId = "tcp_100g" | "roce_200g" | "roce_400g" | "ib_800g";

interface ModelSpec {
  id: ModelId;
  name: string;
  attentionType: string;
  layers: number;
  kvBytesPerTokenFp8: number; // Exact bytes per token at 1-byte FP8 (or MLA latent)
  prefillMsPer4k: number; // Approx prefill compute time on 4x H100 TP4 per 4k tokens
  baseDecodeItlMs: number;
}

const MODELS: ModelSpec[] = [
  {
    id: "llama3_70b_gqa",
    name: "Llama-3.3-70B-Instruct (GQA-8)",
    attentionType: "Grouped-Query Attention (80L, 8 KV Heads, 128d)",
    layers: 80,
    kvBytesPerTokenFp8: 163840, // 2 * 80 * 8 * 128 * 1B = 160 KiB/tok
    prefillMsPer4k: 135,
    baseDecodeItlMs: 18,
  },
  {
    id: "qwen25_72b_gqa",
    name: "Qwen-2.5-72B-Instruct (GQA-8)",
    attentionType: "Grouped-Query Attention (80L, 8 KV Heads, 128d)",
    layers: 80,
    kvBytesPerTokenFp8: 163840, // 160 KiB/tok
    prefillMsPer4k: 140,
    baseDecodeItlMs: 18.5,
  },
  {
    id: "deepseek_v3_mla",
    name: "DeepSeek-V3 / R1 671B (MLA Latent)",
    attentionType: "Multi-Head Latent Attention (61L, 512d c_KV + 64d k_R)",
    layers: 61,
    kvBytesPerTokenFp8: 35136, // 61 * (512 + 64) * 1B = ~34.3 KiB/tok in FP8 (~68.6 KiB in BF16)
    prefillMsPer4k: 195,
    baseDecodeItlMs: 21,
  },
  {
    id: "llama31_405b_gqa",
    name: "Llama-3.1-405B-Instruct (GQA-8)",
    attentionType: "Grouped-Query Attention (126L, 8 KV Heads, 128d)",
    layers: 126,
    kvBytesPerTokenFp8: 258048, // 2 * 126 * 8 * 128 * 1B = 252 KiB/tok
    prefillMsPer4k: 490,
    baseDecodeItlMs: 28,
  },
];

interface FabricSpec {
  id: FabricId;
  name: string;
  badge: string;
  effectiveGbps: number; // Realistic GPUDirect RDMA or TCP payload goodput
  effectiveGBps: number;
  overlapEfficiency: number; // Fraction of KV transfer overlapped with layer-by-layer prefill compute
  isRdma: boolean;
}

const FABRICS: FabricSpec[] = [
  {
    id: "tcp_100g",
    name: "100GbE Standard TCP/IP (No RDMA)",
    badge: "CPU BOUNCEBOTTLENECK",
    effectiveGbps: 68,
    effectiveGBps: 8.5,
    overlapEfficiency: 0.35,
    isRdma: false,
  },
  {
    id: "roce_200g",
    name: "200GbE RoCEv2 (ConnectX-6 Dx GPUDirect)",
    badge: "LOSSY / PFC REQUIRED",
    effectiveGbps: 180,
    effectiveGBps: 22.5,
    overlapEfficiency: 0.88,
    isRdma: true,
  },
  {
    id: "roce_400g",
    name: "400GbE RoCEv2 / NDR400 IB (ConnectX-7)",
    badge: "PRODUCTION STANDARD",
    effectiveGbps: 376,
    effectiveGBps: 47.0,
    overlapEfficiency: 0.96,
    isRdma: true,
  },
  {
    id: "ib_800g",
    name: "800GbE RoCEv2 / XDR800 IB (ConnectX-8)",
    badge: "ULTRA LOW-LATENCY",
    effectiveGbps: 752,
    effectiveGBps: 94.0,
    overlapEfficiency: 0.985,
    isRdma: true,
  },
];

export default function DisaggregatedInferenceSimulator() {
  const [modelId, setModelId] = useState<ModelId>("llama3_70b_gqa");
  const [fabricId, setFabricId] = useState<FabricId>("roce_400g");
  const [kvPrecision, setKvPrecision] = useState<"fp8" | "bf16">("fp8");
  const [promptTokens, setPromptTokens] = useState<number>(16384);
  const [chunkedPrefillSize, setChunkedPrefillSize] = useState<number>(2048);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const model = MODELS.find((m) => m.id === modelId) || MODELS[0];
  const fabric = FABRICS.find((f) => f.id === fabricId) || FABRICS[2];

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "DisaggregatedInferenceSimulator",
        action_type: "simulate_pd_rdma_transfer",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `model:${modelId}_fabric:${fabricId}_prec:${kvPrecision}_tok:${promptTokens}`,
      });
    }, 850);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [modelId, fabricId, kvPrecision, promptTokens, chunkedPrefillSize]);

  const bytesMultiplier = kvPrecision === "fp8" ? 1 : 2;
  const kvBytesPerToken = model.kvBytesPerTokenFp8 * bytesMultiplier;
  const kvKiBPerToken = (kvBytesPerToken / 1024).toFixed(1);

  const totalKvBytes = promptTokens * kvBytesPerToken;
  const totalKvMiB = (totalKvBytes / (1024 * 1024)).toFixed(1);
  const totalKvMBDecimal = (totalKvBytes / 1e6).toFixed(1);

  // Prefill compute duration (scales slightly super-linearly with attention length)
  const scaleFactor =
    (promptTokens / 4096) * (1 + Math.max(0, promptTokens - 8192) / 98304);
  const prefillComputeMs = Math.round(model.prefillMsPer4k * scaleFactor);

  // Raw wire transfer time in ms
  const rawWireTransferMs = Number(
    ((totalKvBytes / (fabric.effectiveGBps * 1e9)) * 1000).toFixed(1)
  );

  // Pipelined layer-by-layer exposed transfer tail (only final layer + un-overlapped excess)
  const overlappedMs = prefillComputeMs * fabric.overlapEfficiency;
  const exposedTransferOverheadMs = Number(
    Math.max(
      rawWireTransferMs / model.layers + (fabric.isRdma ? 0.8 : 14.0),
      rawWireTransferMs - overlappedMs
    ).toFixed(1)
  );

  // Co-located p99 ITL stall vs Disaggregated p99 ITL
  const coLocatedChunkStallMs = Math.round(
    model.baseDecodeItlMs +
      (model.prefillMsPer4k * (chunkedPrefillSize / 4096)) * 1.45
  );
  const coLocatedUnchunkedStallMs = Math.round(
    model.baseDecodeItlMs + prefillComputeMs
  );
  const disaggregatedP99ItlMs = Number(
    (model.baseDecodeItlMs + (fabric.isRdma ? 3.5 : 19.0)).toFixed(1)
  );

  const slaMetDisagg = disaggregatedP99ItlMs <= 30;
  const slaMetColocated = coLocatedChunkStallMs <= 30;

  return (
    <div className="space-y-6 font-mono text-xs sm:text-sm">
      {/* Model & Precision Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">
            1. Select Model &amp; KV-Cache Attention Architecture
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MODELS.map((m) => {
              const active = modelId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModelId(m.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    active
                      ? "bg-cyan-950/40 border-cyan-500/70 text-white shadow-lg"
                      : "bg-slate-950/70 border-slate-800 text-gray-300 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold text-xs mb-0.5">{m.name}</div>
                  <div className="text-[10px] text-gray-400">
                    {m.attentionType}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">
            2. KV-Cache Precision
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setKvPrecision("fp8")}
              className={`p-3 rounded-xl border text-left transition-all ${
                kvPrecision === "fp8"
                  ? "bg-emerald-950/40 border-emerald-500/70 text-white"
                  : "bg-slate-950/70 border-slate-800 text-gray-300"
              }`}
            >
              <div className="flex justify-between items-center font-bold text-xs">
                <span>FP8 E4M3 (1 Byte)</span>
                <span className="text-[10px] text-emerald-400">50% BW SAVED</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                --kv-cache-dtype fp8_e4m3
              </div>
            </button>
            <button
              type="button"
              onClick={() => setKvPrecision("bf16")}
              className={`p-3 rounded-xl border text-left transition-all ${
                kvPrecision === "bf16"
                  ? "bg-amber-950/40 border-amber-500/70 text-white"
                  : "bg-slate-950/70 border-slate-800 text-gray-300"
              }`}
            >
              <div className="flex justify-between items-center font-bold text-xs">
                <span>BF16 / FP16 (2 Bytes)</span>
                <span className="text-[10px] text-amber-400">2X PAYLOAD</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                Standard 16-bit KV precision
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Network Fabric Selector */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">
          3. Select Prefill-to-Decode Network Interconnect
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {FABRICS.map((f) => {
            const active = fabricId === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFabricId(f.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  active
                    ? "bg-emerald-950/40 border-emerald-500/70 text-white shadow-lg"
                    : "bg-slate-950/70 border-slate-800 text-gray-300 hover:border-slate-700"
                }`}
              >
                <div className="text-[10px] font-bold text-emerald-400 mb-0.5">
                  {f.badge}
                </div>
                <div className="font-bold text-xs mb-1">{f.name}</div>
                <div className="text-[10px] text-gray-400">
                  Payload Goodput: ~{f.effectiveGBps} GB/s
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt & Chunk Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">Incoming Prompt Length:</span>
            <span className="text-cyan-400 font-bold">
              {promptTokens.toLocaleString()} tokens
            </span>
          </div>
          <input
            type="range"
            min={1024}
            max={65536}
            step={1024}
            value={promptTokens}
            onChange={(e) => setPromptTokens(Number(e.target.value))}
            aria-label="Incoming Prompt Length in Tokens"
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>1K</span>
            <span>4K</span>
            <span>16K (RAG)</span>
            <span>32K (Agent)</span>
            <span>64K</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">Co-Located Chunked Prefill Size:</span>
            <span className="text-amber-400 font-bold">
              {chunkedPrefillSize.toLocaleString()} tokens
            </span>
          </div>
          <input
            type="range"
            min={512}
            max={8192}
            step={512}
            value={chunkedPrefillSize}
            onChange={(e) => setChunkedPrefillSize(Number(e.target.value))}
            aria-label="Co-Located Chunked Prefill Size"
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>512</span>
            <span>2048 (vLLM Default)</span>
            <span>4096</span>
            <span>8192</span>
          </div>
        </div>
      </div>

      {/* Telemetry Readout Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            KV-Cache Payload Size
          </div>
          <div className="text-lg font-bold text-cyan-400">
            {totalKvMiB} MiB
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            {totalKvMBDecimal} MB ({kvKiBPerToken} KiB/tok)
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            Raw Wire Transfer vs. Overlapped
          </div>
          <div className="text-lg font-bold text-emerald-400">
            +{exposedTransferOverheadMs} ms{" "}
            <span className="text-xs font-normal text-gray-400">exposed</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Raw Wire: {rawWireTransferMs} ms (Prefill: {prefillComputeMs} ms)
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-red-500/40 bg-red-950/20">
          <div className="text-[10px] uppercase text-red-300 mb-1">
            Co-Located p99 ITL (Stall)
          </div>
          <div className="text-lg font-bold text-red-400">
            {coLocatedChunkStallMs} ms / tok
          </div>
          <div className="text-[10px] text-gray-300 mt-1">
            Unchunked spike: {coLocatedUnchunkedStallMs} ms (
            {slaMetColocated ? "SLA OK" : "VIOLATES 30ms SLA"})
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
          <div className="text-[10px] uppercase text-emerald-300 mb-1">
            Disaggregated p99 ITL
          </div>
          <div className="text-lg font-bold text-emerald-400">
            {disaggregatedP99ItlMs} ms / tok
          </div>
          <div className="text-[10px] text-gray-300 mt-1">
            {slaMetDisagg
              ? "Zero Prefill Interference (30ms SLA Met)"
              : "TCP Socket Bottleneck — Enable RoCEv2!"}
          </div>
        </div>
      </div>
    </div>
  );
}
