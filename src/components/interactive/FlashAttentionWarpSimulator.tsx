import React, { useState, useMemo } from "react";

type ArchMode = "sm90_hopper" | "sm100_blackwell";
type KernelSchedule = "fa2_sync" | "fa3_warp_spec" | "fa3_ping_pong";
type PrecisionMode = "bf16" | "fp8_e4m3";

export default function FlashAttentionWarpSimulator() {
	const [arch, setArch] = useState<ArchMode>("sm90_hopper");
	const [schedule, setSchedule] = useState<KernelSchedule>("fa3_ping_pong");
	const [precision, setPrecision] = useState<PrecisionMode>("fp8_e4m3");
	const [seqLen, setSeqLen] = useState<4096 | 8192 | 32768>(8192);
	const [smemStages, setSmemStages] = useState<2 | 3>(3);
	const [activeRingStep, setActiveRingStep] = useState<number>(0);

	// Compute hardware limits, register file allocation, and TFLOPS
	const metrics = useMemo(() => {
		const isBlackwell = arch === "sm100_blackwell";
		const isFp8 = precision === "fp8_e4m3";

		// Peak dense Tensor Core TFLOPS on H100 SXM5 (SM90) vs B200 SXM6 (SM100)
		const peakTflops = isBlackwell
			? isFp8
				? 4500
				: 2250
			: isFp8
				? 1979
				: 989;

		// Register pressure per thread (total 65,536 32-bit regs per SM)
		let producerRegs = 168;
		let consumerRegs = 168;
		let tmemUsedKB = 0;

		if (schedule === "fa2_sync") {
			producerRegs = 168;
			consumerRegs = 168;
		} else {
			producerRegs = isBlackwell ? 32 : 40;
			consumerRegs = isBlackwell ? 128 : 232;
			if (isBlackwell) {
				tmemUsedKB = 256; // Dedicated 256 KB Tensor Memory (TMEM) holds MMA accumulators!
			}
		}

		const totalRegsUsed =
			schedule === "fa2_sync"
				? 384 * 168
				: 128 * producerRegs + 256 * consumerRegs;

		// Tensor Core Utilization & Softmax Stall fraction
		let tcUtilPct = 35.0;
		let sfuOverlapPct = 0.0;
		if (schedule === "fa2_sync") {
			tcUtilPct = isFp8 ? 34.0 : 42.0;
			sfuOverlapPct = 0.0;
		} else if (schedule === "fa3_warp_spec") {
			tcUtilPct = isFp8 ? 52.5 : 64.0;
			sfuOverlapPct = 55.0;
		} else {
			// fa3_ping_pong
			tcUtilPct = isFp8 ? (isBlackwell ? 68.5 : 60.4) : isBlackwell ? 82.0 : 75.0;
			sfuOverlapPct = 94.0;
		}

		// Slight efficiency gain at longer sequence lengths due to amortized prologue/epilogue
		const seqMultiplier = seqLen === 32768 ? 1.03 : seqLen === 4096 ? 0.96 : 1.0;
		const stageMultiplier = smemStages === 3 ? 1.0 : 0.92;

		const finalUtilPct = Math.min(86.0, tcUtilPct * seqMultiplier * stageMultiplier);
		const achievedTflops = (peakTflops * finalUtilPct) / 100;

		// Attention FLOPs for Batch=16, Heads=64, HeadDim=128: 4 * B * H * N^2 * D
		const totalFlops = 4 * 16 * 64 * Math.pow(seqLen, 2) * 128;
		const latencyMs = (totalFlops / (achievedTflops * 1e12)) * 1000;

		return {
			peakTflops,
			achievedTflops,
			finalUtilPct,
			sfuOverlapPct,
			producerRegs,
			consumerRegs,
			totalRegsUsed,
			tmemUsedKB,
			latencyMs,
		};
	}, [arch, schedule, precision, seqLen, smemStages]);

	// Circular SMEM mbarrier state machine
	const ringSlotStates = useMemo(() => {
		const stage = activeRingStep % smemStages;
		const phase = Math.floor(activeRingStep / smemStages) % 2;

		return Array.from({ length: smemStages }, (_, idx) => {
			const isCurrentProducer = idx === stage;
			const isCurrentConsumer = idx === (stage + smemStages - 1) % smemStages;
			return {
				slotId: idx,
				smemOffsetKB: idx * 64,
				status: isCurrentProducer
					? "TMA DMA FILLING (mbarrier.expect_tx = 64KB)"
					: isCurrentConsumer
						? "WGMMA READING (128B XOR Swizzled)"
						: "READY / IDLE IN RING",
				parityBit: idx <= stage ? phase : phase ^ 1,
				roleColor: isCurrentProducer
					? "cyan"
					: isCurrentConsumer
						? "emerald"
						: "slate",
			};
		});
	}, [activeRingStep, smemStages]);

	return (
		<div className="space-y-6 font-mono text-xs sm:text-sm text-gray-200">
			{/* Top Configuration Controls */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
				{/* 1. GPU Architecture */}
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<label className="block text-[10px] uppercase tracking-wider text-emerald-400 mb-2">
						1. Silicon Architecture
					</label>
					<div className="space-y-1.5">
						{[
							{
								id: "sm90_hopper",
								title: "Hopper SM90 (H100/H200)",
								sub: "wgmma.mma_async + 255 RMEM Regs",
							},
							{
								id: "sm100_blackwell",
								title: "Blackwell SM100 (B200)",
								sub: "tcgen05.mma + 256 KB Dedicated TMEM",
							},
						].map((item) => (
							<button
								key={item.id}
								type="button"
								onClick={() => setArch(item.id as ArchMode)}
								className={`w-full text-left px-2.5 py-2 rounded-lg border transition-all ${
									arch === item.id
										? "border-emerald-500/80 bg-emerald-500/15 text-white"
										: "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
								}`}
							>
								<div className="font-bold text-[11px]">{item.title}</div>
								<div className="text-[10px] opacity-75">{item.sub}</div>
							</button>
						))}
					</div>
				</div>

				{/* 2. CTA Scheduling Strategy */}
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90 lg:col-span-2">
					<label className="block text-[10px] uppercase tracking-wider text-cyan-400 mb-2">
						2. CTA Warp Schedule &amp; Pipeline Overlap
					</label>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
						{[
							{
								id: "fa2_sync",
								title: "FlashAttention-2 (Sync SIMT)",
								desc: "Homogeneous warps; stalls on __syncthreads() & SFU exp2",
							},
							{
								id: "fa3_warp_spec",
								title: "FA-3 Warp-Specialized (TMA)",
								desc: "WG0 Producer (40 regs) + WG1/2 Consumers (232 regs)",
							},
							{
								id: "fa3_ping_pong",
								title: "FA-3 + Ping-Pong Overlap",
								desc: "WG1 WGMMA overlaps WG2 MUFU.EX2 Softmax 100%!",
							},
						].map((s) => (
							<button
								key={s.id}
								type="button"
								onClick={() => setSchedule(s.id as KernelSchedule)}
								className={`text-left p-2.5 rounded-lg border transition-all ${
									schedule === s.id
										? "border-cyan-400/80 bg-cyan-500/15 text-white"
										: "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
								}`}
							>
								<div className="font-bold text-[11px]">{s.title}</div>
								<div className="text-[10px] opacity-75 mt-0.5">{s.desc}</div>
							</button>
						))}
					</div>
				</div>

				{/* 3. Precision & Sequence Length */}
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90 flex flex-col justify-between gap-2">
					<div>
						<label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1.5">
							3. Precision &amp; Context Length
						</label>
						<div className="flex gap-1.5 mb-2">
							{[
								{ id: "bf16", label: "BF16" },
								{ id: "fp8_e4m3", label: "FP8 (E4M3)" },
							].map((p) => (
								<button
									key={p.id}
									type="button"
									onClick={() => setPrecision(p.id as PrecisionMode)}
									className={`flex-1 py-1 rounded border text-[11px] font-bold ${
										precision === p.id
											? "border-amber-400 bg-amber-500/20 text-amber-200"
											: "border-slate-800 bg-slate-900 text-slate-400"
									}`}
								>
									{p.label}
								</button>
							))}
						</div>
						<div className="flex gap-1">
							{([4096, 8192, 32768] as const).map((n) => (
								<button
									key={n}
									type="button"
									onClick={() => setSeqLen(n)}
									className={`flex-1 py-1 rounded border text-[10px] font-bold ${
										seqLen === n
											? "border-purple-400 bg-purple-500/20 text-purple-200"
											: "border-slate-800 bg-slate-900 text-slate-400"
									}`}
								>
									N={n / 1024}K
								</button>
							))}
						</div>
					</div>

					<div className="flex gap-1.5">
						{([2, 3] as const).map((st) => (
							<button
								key={st}
								type="button"
								onClick={() => setSmemStages(st)}
								className={`flex-1 py-1 rounded border text-[10px] font-bold ${
									smemStages === st
										? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
										: "border-slate-800 bg-slate-900 text-slate-400"
								}`}
							>
								{st}-Stage SMEM
							</button>
						))}
					</div>
				</div>
			</div>

			{/* KPI Telemetry Strip */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						Sustained Attention Throughput
					</div>
					<div className="text-xl sm:text-2xl font-bold mt-1 text-emerald-400">
						{metrics.achievedTflops >= 1000
							? `${(metrics.achievedTflops / 1000).toFixed(2)} PFLOPS`
							: `${metrics.achievedTflops.toFixed(0)} TFLOPS`}
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						{metrics.finalUtilPct.toFixed(1)}% of {metrics.peakTflops} TFLOPS Peak
					</div>
				</div>

				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						setmaxnreg Register Split
					</div>
					<div className="text-base sm:text-lg font-bold mt-1 text-cyan-300">
						{schedule === "fa2_sync"
							? "168 / 168 (Uniform)"
							: `WG0: ${metrics.producerRegs} | WG1/2: ${metrics.consumerRegs}`}
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						{metrics.tmemUsedKB > 0
							? `+ ${metrics.tmemUsedKB} KB Dedicated SM100 TMEM!`
							: `${metrics.totalRegsUsed.toLocaleString()} / 65,536 SM RMEM Regs`}
					</div>
				</div>

				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						SFU MUFU.EX2 Softmax Overlap
					</div>
					<div
						className={`text-xl sm:text-2xl font-bold mt-1 ${
							metrics.sfuOverlapPct >= 80
								? "text-emerald-400"
								: metrics.sfuOverlapPct > 0
									? "text-amber-400"
									: "text-rose-400"
						}`}
					>
						{metrics.sfuOverlapPct.toFixed(0)}% Hidden
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						{schedule === "fa3_ping_pong"
							? "Staggered via bar.sync 128 Ping-Pong"
							: "64:1 Tensor Core vs SFU asymmetry"}
					</div>
				</div>

				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						Forward Pass Latency (B=16, H=64)
					</div>
					<div className="text-xl sm:text-2xl font-bold mt-1 text-amber-300">
						{metrics.latencyMs.toFixed(2)} ms
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						Context N = {seqLen.toLocaleString()} tokens (D=128)
					</div>
				</div>
			</div>

			{/* Visual Warpgroup Execution Timeline (Ping-Pong Overlap Visualizer) */}
			<div className="p-4 rounded-xl border border-slate-800 bg-slate-950/95 space-y-3">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div>
						<h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
							SM Execution Pipeline Timeline (Producer WG0 vs. Consumer WG1 &amp; WG2)
						</h4>
						<p className="text-[11px] text-slate-400">
							{schedule === "fa2_sync"
								? "Under synchronous FlashAttention-2, all warps stall on __syncthreads() during HBM loads and SFU exp2 softmax."
								: schedule === "fa3_warp_spec"
									? "Producer WG0 streams tiles via TMA asynchronously, but Consumer WG1 & WG2 still contend for the Tensor Core and SFU pipes in-phase."
									: "With Ping-Pong staggering, WG1 runs wgmma.mma_async on Tensor Cores at the exact same cycle WG2 runs MUFU.EX2 softmax on the SFU!"}
						</p>
					</div>
					<span className="px-2.5 py-1 rounded text-[10px] font-bold border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
						{arch === "sm100_blackwell"
							? "BLACKWELL TCGEN05.MMA + TMEM"
							: "HOPPER WGMMA.MMA_ASYNC + RMEM"}
					</span>
				</div>

				<div className="space-y-2 text-[11px]">
					{/* Producer WG0 */}
					<div className="grid grid-cols-12 items-center gap-2">
						<div className="col-span-12 sm:col-span-3 font-bold text-cyan-300">
							WG0 (Producer, {metrics.producerRegs}r):
						</div>
						<div className="col-span-12 sm:col-span-9 grid grid-cols-4 gap-1.5">
							{schedule === "fa2_sync" ? (
								<>
									<div className="p-1.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-center">
										cp.async K0,V0
									</div>
									<div className="p-1.5 rounded bg-rose-500/20 border border-rose-500/40 text-center text-rose-300">
										__syncthreads()
									</div>
									<div className="p-1.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-center">
										mma.sync Q*K^T
									</div>
									<div className="p-1.5 rounded bg-amber-500/20 border border-amber-500/40 text-center">
										SFU exp2 (Stall!)
									</div>
								</>
							) : (
								<>
									<div className="p-1.5 rounded bg-cyan-500/25 border border-cyan-400/50 text-center text-cyan-200">
										TMA Bulk K0,V0
									</div>
									<div className="p-1.5 rounded bg-cyan-500/25 border border-cyan-400/50 text-center text-cyan-200">
										TMA Bulk K1,V1
									</div>
									<div className="p-1.5 rounded bg-cyan-500/25 border border-cyan-400/50 text-center text-cyan-200">
										TMA Bulk K2,V2
									</div>
									<div className="p-1.5 rounded bg-cyan-500/25 border border-cyan-400/50 text-center text-cyan-200">
										TMA Bulk K3,V3
									</div>
								</>
							)}
						</div>
					</div>

					{/* Consumer WG1 */}
					<div className="grid grid-cols-12 items-center gap-2">
						<div className="col-span-12 sm:col-span-3 font-bold text-emerald-300">
							WG1 (Consumer, {metrics.consumerRegs}r):
						</div>
						<div className="col-span-12 sm:col-span-9 grid grid-cols-4 gap-1.5">
							<div className="p-1.5 rounded bg-emerald-500/25 border border-emerald-400/60 text-center text-emerald-200 font-bold">
								GEMM0: S1 = Q1*K0^T
							</div>
							<div className="p-1.5 rounded bg-amber-500/25 border border-amber-400/60 text-center text-amber-200">
								SFU: Softmax(S1)
							</div>
							<div className="p-1.5 rounded bg-emerald-500/25 border border-emerald-400/60 text-center text-emerald-200 font-bold">
								GEMM1: O1 += P1*V0
							</div>
							<div className="p-1.5 rounded bg-amber-500/25 border border-amber-400/60 text-center text-amber-200">
								SFU: Softmax(S1&apos;)
							</div>
						</div>
					</div>

					{/* Consumer WG2 */}
					<div className="grid grid-cols-12 items-center gap-2">
						<div className="col-span-12 sm:col-span-3 font-bold text-amber-300">
							WG2 (Consumer, {metrics.consumerRegs}r):
						</div>
						<div className="col-span-12 sm:col-span-9 grid grid-cols-4 gap-1.5">
							{schedule === "fa3_ping_pong" ? (
								<>
									<div className="p-1.5 rounded bg-amber-500/25 border border-amber-400/60 text-center text-amber-200">
										SFU: Softmax(S2)
									</div>
									<div className="p-1.5 rounded bg-emerald-500/25 border border-emerald-400/60 text-center text-emerald-200 font-bold">
										GEMM0: S2 = Q2*K0^T
									</div>
									<div className="p-1.5 rounded bg-amber-500/25 border border-amber-400/60 text-center text-amber-200">
										SFU: Softmax(S2&apos;)
									</div>
									<div className="p-1.5 rounded bg-emerald-500/25 border border-emerald-400/60 text-center text-emerald-200 font-bold">
										GEMM1: O2 += P2*V0
									</div>
								</>
							) : (
								<>
									<div className="p-1.5 rounded bg-rose-500/20 border border-rose-500/40 text-center text-rose-300">
										Stalled on TensorPipe
									</div>
									<div className="p-1.5 rounded bg-rose-500/20 border border-rose-500/40 text-center text-rose-300">
										Stalled on SFU Pipe
									</div>
									<div className="p-1.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-center">
										GEMM1: O2 += P2*V0
									</div>
									<div className="p-1.5 rounded bg-amber-500/20 border border-amber-500/40 text-center">
										SFU: Softmax(S2)
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Interactive TMA + mbarrier Parity Ring Stepper */}
			<div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950/95 space-y-3">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div>
						<span className="text-[10px] uppercase tracking-widest text-cyan-400 block">
							// HARDWARE TMA + MBARRIER PARITY RING STEPPER
						</span>
						<h4 className="text-sm font-bold text-white">
							228 KB Shared Memory Circular Buffer (Iteration #{activeRingStep} | Phase Parity ={" "}
							{Math.floor(activeRingStep / smemStages) % 2})
						</h4>
					</div>
					<button
						type="button"
						onClick={() => setActiveRingStep((s) => s + 1)}
						className="px-3 py-1.5 rounded-lg border border-emerald-500/60 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-xs font-bold transition-all"
					>
						▶ Step KV Tile Iteration (+1)
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
					{ringSlotStates.map((slot) => (
						<div
							key={slot.slotId}
							className={`p-3 rounded-lg border ${
								slot.roleColor === "cyan"
									? "border-cyan-400/70 bg-cyan-950/25"
									: slot.roleColor === "emerald"
										? "border-emerald-400/70 bg-emerald-950/25"
										: "border-slate-800 bg-slate-900/60"
							}`}
						>
							<div className="flex items-center justify-between mb-1">
								<span className="font-bold text-xs text-white">
									SMEM Stage {slot.slotId} (+{slot.smemOffsetKB} KB)
								</span>
								<span className="text-[10px] px-1.5 py-0.5 rounded bg-black/60 border border-slate-700 text-amber-300">
									parity = {slot.parityBit}
								</span>
							</div>
							<div className="text-[11px] text-slate-300">{slot.status}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
