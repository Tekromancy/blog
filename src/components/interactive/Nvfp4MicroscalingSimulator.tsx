import React, { useState, useMemo } from "react";

type QuantFormatId = "int4-g128" | "ocp-mxfp4" | "nvidia-nvfp4";
type ModelId = "llama-70b" | "qwen-72b" | "llama-405b" | "deepseek-r1-671b";

const E2M1_POSITIVE_LEVELS = [0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0];
const E2M1_BIT_STRINGS: Record<number, string> = {
	0.0: "000",
	0.5: "001 (sub)",
	1.0: "010",
	1.5: "011",
	2.0: "100",
	3.0: "101",
	4.0: "110",
	6.0: "111",
};

// Deterministic 15 normal activation channels (mean ~0, std ~0.85) + Channel 0 outlier
const BASE_ACTIVATIONS_16 = [
	1.0, // Channel 0: overridden by outlier slider
	-0.82,
	0.64,
	-1.15,
	0.43,
	0.91,
	-0.57,
	1.28,
	-0.38,
	0.76,
	-0.94,
	0.52,
	-0.69,
	1.05,
	-0.48,
	0.88,
];

function nearestE2M1(val: number): { level: number; bits4: string } {
	const sign = val < 0 ? -1 : 1;
	const signBit = val < 0 ? "1" : "0";
	const absVal = Math.abs(val);
	let best = 0.0;
	let bestDiff = Math.abs(absVal - 0.0);
	for (const lvl of E2M1_POSITIVE_LEVELS) {
		const d = Math.abs(absVal - lvl);
		if (d < bestDiff) {
			bestDiff = d;
			best = lvl;
		}
	}
	return {
		level: best === 0 ? 0 : sign * best,
		bits4: `${signBit}${E2M1_BIT_STRINGS[best] || "000"}`,
	};
}

// Quantize a positive float to nearest FP8 E4M3 representable value (1s, 4e, 3m)
function quantizeScaleToFP8E4M3(scale: number): number {
	if (scale <= 0) return 1e-6;
	const clamped = Math.min(448.0, Math.max(2 ** -9, scale));
	const exp = Math.floor(Math.log2(clamped));
	const mantissaStep = 2 ** (exp - 3); // 3 mantissa bits -> 8 steps per octave
	const quantized = Math.round(clamped / mantissaStep) * mantissaStep;
	return Math.max(mantissaStep, quantized);
}

// Fast Walsh-Hadamard Transform for N=16 (orthogonal, normalized by 1/sqrt(16) = 0.25)
function fwht16(input: number[]): number[] {
	const h = [...input];
	for (let step = 1; step < 16; step *= 2) {
		for (let i = 0; i < 16; i += step * 2) {
			for (let j = i; j < i + step; j++) {
				const a = h[j];
				const b = h[j + step];
				h[j] = a + b;
				h[j + step] = a - b;
			}
		}
	}
	return h.map((v) => v / 4.0); // 1 / sqrt(16) = 0.25 (since H_16 * H_16 = 16 * I)
}

interface ModelSpec {
	id: ModelId;
	name: string;
	paramsB: number;
	bf16Math500: number;
	int4AwqMath500: number;
	mxfp4NoRotMath500: number;
	nvfp4RotMath500: number;
}

const MODELS: Record<ModelId, ModelSpec> = {
	"llama-70b": {
		id: "llama-70b",
		name: "Llama-3.3-70B-Instruct (Dense GQA)",
		paramsB: 70.6,
		bf16Math500: 76.4,
		int4AwqMath500: 71.2,
		mxfp4NoRotMath500: 68.9,
		nvfp4RotMath500: 76.1,
	},
	"qwen-72b": {
		id: "qwen-72b",
		name: "Qwen-2.5-72B-Instruct (Dense GQA)",
		paramsB: 72.7,
		bf16Math500: 81.2,
		int4AwqMath500: 75.8,
		mxfp4NoRotMath500: 73.4,
		nvfp4RotMath500: 80.9,
	},
	"llama-405b": {
		id: "llama-405b",
		name: "Llama-3.1-405B-Instruct (Dense Flagship)",
		paramsB: 405.0,
		bf16Math500: 82.6,
		int4AwqMath500: 77.9,
		mxfp4NoRotMath500: 75.1,
		nvfp4RotMath500: 82.3,
	},
	"deepseek-r1-671b": {
		id: "deepseek-r1-671b",
		name: "DeepSeek-R1 / V3 (671B MoE, 37B Active)",
		paramsB: 671.0,
		bf16Math500: 97.3,
		int4AwqMath500: 92.4,
		mxfp4NoRotMath500: 90.1,
		nvfp4RotMath500: 97.0,
	},
};

export default function Nvfp4MicroscalingSimulator() {
	const [activeTab, setActiveTab] = useState<"quant-lab" | "cluster-sizer">("quant-lab");
	const [outlierSpike, setOutlierSpike] = useState<number>(64.0);
	const [hadamardEnabled, setHadamardEnabled] = useState<boolean>(true);
	const [formatId, setFormatId] = useState<QuantFormatId>("nvidia-nvfp4");
	const [selectedModelId, setSelectedModelId] = useState<ModelId>("llama-70b");

	const simResult = useMemo(() => {
		const rawVec = [...BASE_ACTIVATIONS_16];
		rawVec[0] = outlierSpike;

		// Step 1: Optional Orthogonal Walsh-Hadamard Rotation (X_tilde = X * H_16)
		const targetVec = hadamardEnabled ? fwht16(rawVec) : rawVec;
		const maxAbs = Math.max(...targetVec.map((v) => Math.abs(v)), 1e-6);

		// Step 2: Compute block scale S depending on format
		let scaleFactor = 1.0;
		let scaleDesc = "";
		if (formatId === "int4-g128") {
			// Symmetric INT4 [-7..7] uniform step size (dominated by outlier across 128 elements)
			scaleFactor = maxAbs / 7.0;
			scaleDesc = `FP16 Uniform Step Δ = ${scaleFactor.toFixed(4)} (Max/7.0)`;
		} else if (formatId === "ocp-mxfp4") {
			// E8M0 power-of-two scale: smallest power of 2 such that maxAbs / (2^exp) <= 6.0
			// Wait: in MXFP4, shared scale is 2^exp. Often ceil(log2(maxAbs / 6.0))
			const exp = Math.ceil(Math.log2(maxAbs / 6.0));
			scaleFactor = 2 ** exp;
			scaleDesc = `E8M0 Power-of-2 Scale = 2^${exp} (${scaleFactor.toFixed(4)})`;
		} else {
			// NVIDIA NVFP4: Fractional FP8 E4M3 micro-block scale + FP32 tensor scale
			const idealScale = maxAbs / 6.0;
			scaleFactor = quantizeScaleToFP8E4M3(idealScale);
			scaleDesc = `FP8 (E4M3) Fractional Scale = ${scaleFactor.toFixed(4)} (Ideal: ${idealScale.toFixed(4)})`;
		}

		// Step 3: Quantize each of the 16 elements and dequantize in the rotated/raw space
		const elements = targetVec.map((v, idx) => {
			const scaled = v / scaleFactor;
			if (formatId === "int4-g128") {
				const qInt = Math.max(-8, Math.min(7, Math.round(scaled)));
				const deq = qInt * scaleFactor;
				return {
					idx,
					rawVal: rawVec[idx],
					preQuantVal: v,
					qLevel: qInt,
					bits4: (qInt < 0 ? 16 + qInt : qInt).toString(2).padStart(4, "0"),
					deqVal: deq,
				};
			} else {
				const { level, bits4 } = nearestE2M1(scaled);
				const deq = level * scaleFactor;
				return {
					idx,
					rawVal: rawVec[idx],
					preQuantVal: v,
					qLevel: level,
					bits4,
					deqVal: deq,
				};
			}
		});

		// Step 4: If Hadamard was applied, inverse-rotate (since H_16 is symmetric orthogonal, H_16^-1 = H_16)
		// to compare reconstructed signal directly against rawVec!
		const deqInTargetSpace = elements.map((e) => e.deqVal);
		const reconstructedRaw = hadamardEnabled ? fwht16(deqInTargetSpace) : deqInTargetSpace;

		// Compute MSE, SQNR (dB), Cosine Similarity, and Underflow count on the 15 normal channels (1..15)
		let signalPowerNormal = 0;
		let noisePowerNormal = 0;
		let zeroClampedNormalCount = 0;

		for (let i = 1; i < 16; i++) {
			const orig = rawVec[i];
			const rec = reconstructedRaw[i];
			signalPowerNormal += orig * orig;
			noisePowerNormal += (orig - rec) * (orig - rec);
			if (!hadamardEnabled && elements[i].qLevel === 0) {
				zeroClampedNormalCount++;
			} else if (hadamardEnabled && Math.abs(rec) < 0.05) {
				zeroClampedNormalCount++;
			}
		}

		const mseNormal = noisePowerNormal / 15;
		const sqnrDb =
			noisePowerNormal > 1e-9
				? +(10 * Math.log10(signalPowerNormal / noisePowerNormal)).toFixed(1)
				: 42.0;

		// Cosine similarity on full 16-element vector
		let dot = 0;
		let normA = 0;
		let normB = 0;
		for (let i = 0; i < 16; i++) {
			dot += rawVec[i] * reconstructedRaw[i];
			normA += rawVec[i] * rawVec[i];
			normB += reconstructedRaw[i] * reconstructedRaw[i];
		}
		const cosineSim =
			normA > 0 && normB > 0 ? +(dot / (Math.sqrt(normA) * Math.sqrt(normB))).toFixed(5) : 0;

		const peakBeforeQuant = Math.max(...targetVec.map((v) => Math.abs(v)));
		const medianBeforeQuant = [...targetVec]
			.map((v) => Math.abs(v))
			.sort((a, b) => a - b)[8];

		return {
			elements: elements.map((e, i) => ({
				...e,
				reconstructedOrigSpace: reconstructedRaw[i],
			})),
			scaleDesc,
			mseNormal: +mseNormal.toFixed(5),
			sqnrDb,
			cosineSim,
			zeroClampedNormalCount,
			peakBeforeQuant: +peakBeforeQuant.toFixed(2),
			crestRatio: +(peakBeforeQuant / Math.max(0.01, medianBeforeQuant)).toFixed(1),
		};
	}, [outlierSpike, hadamardEnabled, formatId]);

	const model = MODELS[selectedModelId];
	const clusterMetrics = useMemo(() => {
		const bf16GB = +(model.paramsB * 2.0).toFixed(1);
		const fp8GB = +(model.paramsB * 1.0).toFixed(1);
		const mxfp4GB = +(model.paramsB * (4.25 / 8)).toFixed(1);
		const nvfp4GB = +(model.paramsB * (4.5 / 8)).toFixed(1);

		// Blackwell B200 has 192 GB HBM3e (usable ~176 GB at 0.92 utilization)
		const b200UsableGB = 176;
		const gpusBf16 = Math.pow(2, Math.ceil(Math.log2(Math.max(1, bf16GB / b200UsableGB))));
		const gpusFp8 = Math.pow(2, Math.ceil(Math.log2(Math.max(1, fp8GB / b200UsableGB))));
		const gpusNvfp4 = Math.pow(2, Math.ceil(Math.log2(Math.max(1, nvfp4GB / b200UsableGB))));

		return {
			bf16GB,
			fp8GB,
			mxfp4GB,
			nvfp4GB,
			gpusBf16,
			gpusFp8,
			gpusNvfp4,
			kvCacheHeadroomGB: +(gpusNvfp4 * b200UsableGB - nvfp4GB).toFixed(1),
		};
	}, [model]);

	return (
		<div className="w-full rounded-xl border border-cyan-500/30 bg-[#070b12] p-5 sm:p-6 text-gray-200 font-mono text-xs shadow-2xl">
			{/* Top Header & Tab Switcher */}
			<div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
						W4A4 // NVFP4 &amp; QUAROT LAB
					</span>
					<span className="text-gray-400 hidden sm:inline">
						Real-Time 16-Element E2M1 Quantizer &amp; Fast Walsh-Hadamard Transform
					</span>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setActiveTab("quant-lab")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "quant-lab"
								? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						01. Hadamard + E2M1 Quantizer
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("cluster-sizer")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "cluster-sizer"
								? "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						02. 70B–671B Blackwell Sizer
					</button>
				</div>
			</div>

			{activeTab === "quant-lab" ? (
				<div className="space-y-5">
					{/* Controls Row */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
						{/* Outlier Spike Slider & Hadamard Toggle */}
						<div className="lg:col-span-6 p-4 rounded-xl border border-white/10 bg-black/50 space-y-4">
							<div>
								<div className="flex justify-between text-[11px] mb-1">
									<span className="text-amber-300 uppercase font-bold">
										// 1. Channel 0 Activation Outlier Spike (SiLU_and_Mul)
									</span>
									<span className="text-white font-bold">
										{outlierSpike.toFixed(1)} ({Math.round(outlierSpike / 0.8)}x Median)
									</span>
								</div>
								<input
									type="range"
									min={1.5}
									max={120.0}
									step={0.5}
									value={outlierSpike}
									onChange={(e) => setOutlierSpike(Number(e.target.value))}
									className="w-full accent-amber-400 cursor-pointer"
								/>
								<div className="flex justify-between text-[10px] text-gray-500">
									<span>1.5 (Benign)</span>
									<span>32.0 (7B Spike)</span>
									<span>64.0 (70B Spike)</span>
									<span>120.0 (Extreme Outlier)</span>
								</div>
							</div>

							<div>
								<label className="block text-[11px] uppercase text-cyan-400 font-bold mb-2">
									// 2. Walsh-Hadamard Orthogonal Rotation (X_tilde = X * H_16)
								</label>
								<div className="grid grid-cols-2 gap-2">
									<button
										type="button"
										onClick={() => setHadamardEnabled(true)}
										className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
											hadamardEnabled
												? "bg-emerald-950/60 border-emerald-400 text-white"
												: "bg-black/40 border-white/10 text-gray-400"
										}`}
									>
										<div className="font-bold text-emerald-300">
											ENABLED (QuaRot / SpinQuant)
										</div>
										<div className="text-[10px] text-gray-400 mt-0.5">
											Smears spike across all 16 channels by 1/√d
										</div>
									</button>
									<button
										type="button"
										onClick={() => setHadamardEnabled(false)}
										className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
											!hadamardEnabled
												? "bg-red-950/50 border-red-400 text-white"
												: "bg-black/40 border-white/10 text-gray-400"
										}`}
									>
										<div className="font-bold text-red-300">
											DISABLED (Raw Outliers)
										</div>
										<div className="text-[10px] text-gray-400 mt-0.5">
											Outlier stretches block scale &amp; underflows neighbors
										</div>
									</button>
								</div>
							</div>
						</div>

						{/* Format Selector */}
						<div className="lg:col-span-6 p-4 rounded-xl border border-white/10 bg-black/50 space-y-2">
							<label className="block text-[11px] uppercase text-cyan-400 font-bold mb-1">
								// 3. 4-Bit Microscaling Hardware Format
							</label>
							{[
								{
									id: "nvidia-nvfp4" as QuantFormatId,
									title: "NVIDIA Blackwell NVFP4 (16-Elem E2M1 + FP8 E4M3 Scale)",
									desc: "4.50 bits/elem | Fractional E4M3 scale avoids power-of-2 sawtooth jumps",
								},
								{
									id: "ocp-mxfp4" as QuantFormatId,
									title: "OCP Standard MXFP4 (32-Elem E2M1 + E8M0 Power-of-2 Scale)",
									desc: "4.25 bits/elem | Shared 8-bit E8M0 scale rounds up to next 2^k",
								},
								{
									id: "int4-g128" as QuantFormatId,
									title: "Legacy Per-Group INT4 ([-8..7] Uniform Integer Grid)",
									desc: "4.125 bits/elem | Uniform linear steps collapse under high dynamic range",
								},
							].map((fmt) => (
								<button
									key={fmt.id}
									type="button"
									onClick={() => setFormatId(fmt.id)}
									className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
										formatId === fmt.id
											? "bg-cyan-950/60 border-cyan-400 text-white"
											: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
									}`}
								>
									<div className="font-bold text-cyan-200 text-xs">{fmt.title}</div>
									<div className="text-[10px] text-gray-400 mt-0.5">{fmt.desc}</div>
								</button>
							))}
						</div>
					</div>

					{/* Telemetry KPI Cards */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">
								Normal-Channel SQNR (dB)
							</div>
							<div
								className={`text-xl font-bold mt-1 ${
									simResult.sqnrDb >= 13
										? "text-emerald-400"
										: simResult.sqnrDb >= 6
										? "text-amber-300"
										: "text-red-400"
								}`}
							>
								{simResult.sqnrDb} dB
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								MSE (Ch 1..15): <span className="text-white">{simResult.mseNormal}</span>
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">
								Destroyed (Underflowed) Channels
							</div>
							<div
								className={`text-xl font-bold mt-1 ${
									simResult.zeroClampedNormalCount === 0
										? "text-emerald-400"
										: "text-red-400"
								}`}
							>
								{simResult.zeroClampedNormalCount} / 15 Channels
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								{simResult.zeroClampedNormalCount === 0
									? "100% of non-outlier signals preserved!"
									: `${Math.round((simResult.zeroClampedNormalCount / 15) * 100)}% of normal channels squashed to 0.0!`}
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">
								Pre-Quant Crest Ratio (Max/Med)
							</div>
							<div className="text-xl font-bold text-cyan-300 mt-1">
								{simResult.crestRatio}x
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								Peak Magnitude: <span className="text-white">{simResult.peakBeforeQuant}</span>
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">
								Vector Cosine Fidelity
							</div>
							<div className="text-xl font-bold text-emerald-300 mt-1">
								{(simResult.cosineSim * 100).toFixed(2)}%
							</div>
							<div className="text-[10px] text-gray-400 mt-1 truncate">
								{simResult.scaleDesc}
							</div>
						</div>
					</div>

					{/* 16-Element Bit-Level Table Inspector */}
					<div className="p-4 rounded-xl border border-white/10 bg-[#05080f] overflow-x-auto">
						<div className="flex flex-wrap items-center justify-between gap-2 mb-3">
							<span className="text-[11px] font-bold text-cyan-300 uppercase">
								// Live 16-Element Micro-Block Bit-Level Quantization Trace ({simResult.scaleDesc})
							</span>
							<span className="text-[10px] text-gray-400">
								E2M1 Levels: ±&#123;0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0&#125;
							</span>
						</div>
						<table className="w-full text-left border-collapse text-[11px]">
							<thead>
								<tr className="border-b border-white/10 text-gray-400">
									<th className="py-1.5 pr-3">Ch#</th>
									<th className="py-1.5 pr-3">Raw Activation (X)</th>
									<th className="py-1.5 pr-3">
										{hadamardEnabled ? "Hadamard (X·H_16)" : "Pre-Quant (Unrotated)"}
									</th>
									<th className="py-1.5 pr-3">4-Bit Code</th>
									<th className="py-1.5 pr-3">Quantized Level</th>
									<th className="py-1.5 pr-3">Reconstructed (X̂)</th>
									<th className="py-1.5">Channel Status</th>
								</tr>
							</thead>
							<tbody>
								{simResult.elements.slice(0, 8).map((el) => {
									const err = Math.abs(el.rawVal - el.reconstructedOrigSpace);
									const isSquashed =
										el.idx > 0 && !hadamardEnabled && el.qLevel === 0;
									return (
										<tr
											key={el.idx}
											className={`border-b border-white/5 ${
												el.idx === 0
													? "bg-amber-500/10"
													: isSquashed
													? "bg-red-950/30"
													: ""
											}`}
										>
											<td className="py-1.5 pr-3 font-bold text-gray-300">
												ch[{el.idx}] {el.idx === 0 ? "⚡" : ""}
											</td>
											<td className="py-1.5 pr-3 text-white font-bold">
												{el.rawVal >= 0 ? `+${el.rawVal.toFixed(2)}` : el.rawVal.toFixed(2)}
											</td>
											<td className="py-1.5 pr-3 text-cyan-300">
												{el.preQuantVal >= 0
													? `+${el.preQuantVal.toFixed(2)}`
													: el.preQuantVal.toFixed(2)}
											</td>
											<td className="py-1.5 pr-3 font-mono text-purple-300">
												0b{el.bits4}
											</td>
											<td className="py-1.5 pr-3 text-emerald-300 font-bold">
												{el.qLevel}
											</td>
											<td className="py-1.5 pr-3 text-white">
												{el.reconstructedOrigSpace >= 0
													? `+${el.reconstructedOrigSpace.toFixed(2)}`
													: el.reconstructedOrigSpace.toFixed(2)}{" "}
												<span className="text-gray-500 text-[10px]">
													(Δ={err.toFixed(2)})
												</span>
											</td>
											<td className="py-1.5">
												{isSquashed ? (
													<span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold">
														UNDERFLOW -&gt; 0.0!
													</span>
												) : (
													<span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
														PRESERVED
													</span>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				/* Tab 2: 70B–671B Blackwell Cluster Sizer */
				<div className="space-y-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
						{(Object.values(MODELS) as ModelSpec[]).map((m) => (
							<button
								key={m.id}
								type="button"
								onClick={() => setSelectedModelId(m.id)}
								className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
									selectedModelId === m.id
										? "bg-emerald-950/50 border-emerald-400 text-white"
										: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
								}`}
							>
								<div className="font-bold text-emerald-300 text-xs">{m.name}</div>
								<div className="text-[10px] text-gray-400 mt-1">
									Parameters: {m.paramsB}B | BF16 MATH-500: {m.bf16Math500}%
								</div>
							</button>
						))}
					</div>

					<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">BF16 Weight Memory</div>
							<div className="text-xl font-bold text-gray-300 mt-1">
								{clusterMetrics.bf16GB} GB
							</div>
							<div className="text-[10px] text-gray-500 mt-1">
								Min B200 GPUs: TP={clusterMetrics.gpusBf16}
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">FP8 (E4M3) Memory</div>
							<div className="text-xl font-bold text-cyan-300 mt-1">
								{clusterMetrics.fp8GB} GB
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								Min B200 GPUs: TP={clusterMetrics.gpusFp8}
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
							<div className="text-[10px] text-emerald-300 uppercase font-bold">
								NVFP4 Weight Memory (4.5 bpw)
							</div>
							<div className="text-xl font-bold text-emerald-300 mt-1">
								{clusterMetrics.nvfp4GB} GB
							</div>
							<div className="text-[10px] text-emerald-200 mt-1">
								Min B200 GPUs: TP={clusterMetrics.gpusNvfp4} ({clusterMetrics.kvCacheHeadroomGB} GB free for KV!)
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">
								MATH-500 Reasoning Accuracy
							</div>
							<div className="text-xl font-bold text-amber-300 mt-1">
								{model.nvfp4RotMath500}% (NVFP4+H)
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								vs {model.bf16Math500}% BF16 | {model.mxfp4NoRotMath500}% Naive MXFP4
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
