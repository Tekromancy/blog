import React, { useState, useMemo } from "react";

type CollectiveType = "allreduce" | "alltoall_pod" | "alltoall_global";
type FabricMode =
	| "tor_ecmp"
	| "rail_pxn_ecmp"
	| "rail_srv6_usid"
	| "rail_dlb_oooddp";

interface SpineLinkState {
	id: number;
	uSidHex: string;
	assignedFlows: number[];
	utilizationPct: number;
	oversubscribed: boolean;
	pfcPaused: boolean;
}

// Deterministic pseudo-hash for static 5-tuple ECMP simulation
function hashFlowToLink(flowIdx: number, salt: number, numLinks: number): number {
	const h = ((flowIdx + 1) * 2654435761 + salt * 1597334677) >>> 0;
	return h % numLinks;
}

function factorial(n: number): number {
	let res = 1;
	for (let i = 2; i <= n; i++) res *= i;
	return res;
}

export default function RailOptimizedFabricSimulator() {
	const [collective, setCollective] = useState<CollectiveType>("alltoall_global");
	const [fabricMode, setFabricMode] = useState<FabricMode>("rail_dlb_oooddp");
	const [linkSpeedGbps, setLinkSpeedGbps] = useState<400 | 800>(800);
	const [qpsPerFlow, setQpsPerFlow] = useState<1 | 4>(1);
	const [hashSeed, setHashSeed] = useState<number>(7);
	const [selectedSpineId, setSelectedSpineId] = useState<number>(2);
	const [selectedLeafId, setSelectedLeafId] = useState<number>(4);
	const [vrfId, setVrfId] = useState<number>(64);
	const [activeHop, setActiveHop] = useState<0 | 1 | 2>(0);

	const numLinks = 8;
	const numFlows = 8;

	// Combinatorial Balls-into-Bins metrics for M=8 flows * qpsPerFlow subflows across K=8 links
	const totalSubFlows = numFlows * qpsPerFlow;

	const zeroCollisionProbPct = useMemo(() => {
		if (totalSubFlows > numLinks) return 0;
		const perm = factorial(numLinks) / factorial(numLinks - totalSubFlows);
		return (perm / Math.pow(numLinks, totalSubFlows)) * 100;
	}, [totalSubFlows]);

	const expectedIdleLinksPct = useMemo(() => {
		return Math.pow(1 - 1 / numLinks, totalSubFlows) * 100;
	}, [totalSubFlows]);

	// Compute Spine link states & cluster performance metrics
	const simulation = useMemo(() => {
		// If Rail-Optimized + AllReduce or Intra-Pod AllToAll with PxN:
		// 100% of traffic stays on the 1-Hop Rail Leaf Switch (0% Spine traversal!)
		const bypassesSpineViaRailOrPxn =
			fabricMode !== "tor_ecmp" &&
			(collective === "allreduce" || collective === "alltoall_pod");

		const links: SpineLinkState[] = Array.from({ length: numLinks }, (_, idx) => ({
			id: idx + 1,
			uSidHex: `020${idx + 1}`,
			assignedFlows: [],
			utilizationPct: 0,
			oversubscribed: false,
			pfcPaused: false,
		}));

		if (bypassesSpineViaRailOrPxn) {
			const singleHopEfficiency = collective === "allreduce" ? 0.978 : 0.955;
			const maxPerGpuGBps = linkSpeedGbps / 8; // 50 GB/s at 400G, 100 GB/s at 800G
			const aggregateMaxGBps = maxPerGpuGBps * 8; // 8-rail node bus BW
			return {
				links,
				bypassesSpine: true,
				effectiveEfficiencyPct: singleHopEfficiency * 100,
				busBandwidthGBps: aggregateMaxGBps * singleHopEfficiency,
				maxBottleneckLoadPct: 100,
				pfcStormCount: 0,
				nvlinkPxnActive: collective === "alltoall_pod",
			};
		}

		// Traffic crosses the Spine layer
		if (fabricMode === "tor_ecmp" || fabricMode === "rail_pxn_ecmp") {
			// Static 5-tuple ECMP hashing across K=8 spine links
			const subFlowWeight = 100 / qpsPerFlow; // each subflow is 100% / qpsPerFlow of a NIC line rate
			for (let f = 0; f < numFlows; f++) {
				for (let q = 0; q < qpsPerFlow; q++) {
					const subIdx = f * qpsPerFlow + q;
					const targetLink = hashFlowToLink(subIdx, hashSeed, numLinks);
					if (!links[targetLink].assignedFlows.includes(f)) {
						links[targetLink].assignedFlows.push(f);
					}
					links[targetLink].utilizationPct += subFlowWeight;
				}
			}

			let maxLoad = 0;
			let pfcStorms = 0;
			links.forEach((l) => {
				if (l.utilizationPct > maxLoad) maxLoad = l.utilizationPct;
				if (l.utilizationPct > 100) {
					l.oversubscribed = true;
					l.pfcPaused = true;
					pfcStorms++;
				}
			});

			// Synchronous collective runs at the speed of the most oversubscribed link
			const bottleneckRatio = maxLoad > 0 ? 100 / maxLoad : 1;
			const protocolOverhead = 0.96;
			const effectiveEfficiency = Math.min(0.96, bottleneckRatio * protocolOverhead);
			const aggregateMaxGBps = (linkSpeedGbps / 8) * 8;

			return {
				links,
				bypassesSpine: false,
				effectiveEfficiencyPct: effectiveEfficiency * 100,
				busBandwidthGBps: aggregateMaxGBps * effectiveEfficiency,
				maxBottleneckLoadPct: maxLoad,
				pfcStormCount: pfcStorms,
				nvlinkPxnActive: false,
			};
		}

		if (fabricMode === "rail_srv6_usid") {
			// Deterministic 1:1 uSID Spine assignment (Flow i -> Spine i+1)
			links.forEach((l, idx) => {
				l.assignedFlows = [idx];
				l.utilizationPct = 94.8;
				l.oversubscribed = false;
				l.pfcPaused = false;
			});
			const aggregateMaxGBps = (linkSpeedGbps / 8) * 8;
			return {
				links,
				bypassesSpine: false,
				effectiveEfficiencyPct: 94.8,
				busBandwidthGBps: aggregateMaxGBps * 0.948,
				maxBottleneckLoadPct: 94.8,
				pfcStormCount: 0,
				nvlinkPxnActive: true,
			};
		}

		// rail_dlb_oooddp: Switch hardware Dynamic Load Balancing sprays packets across all 8 spines
		links.forEach((l) => {
			l.assignedFlows = [0, 1, 2, 3, 4, 5, 6, 7];
			l.utilizationPct = 97.8;
			l.oversubscribed = false;
			l.pfcPaused = false;
		});
		const aggregateMaxGBps = (linkSpeedGbps / 8) * 8;
		return {
			links,
			bypassesSpine: false,
			effectiveEfficiencyPct: 97.8,
			busBandwidthGBps: aggregateMaxGBps * 0.978,
			maxBottleneckLoadPct: 97.8,
			pfcStormCount: 0,
			nvlinkPxnActive: true,
		};
	}, [collective, fabricMode, linkSpeedGbps, qpsPerFlow, hashSeed]);

	// SRv6 uSID Carrier computation
	const spineUsid = `020${selectedSpineId}`;
	const leafUsid = `010${selectedLeafId}`;
	const vrfUsid = vrfId.toString(16).padStart(4, "0");

	const carrierAddressByHop = useMemo(() => {
		if (activeHop === 0) {
			return {
				da: `fcbb:bb00:${spineUsid}:${leafUsid}:${vrfUsid}::`,
				stageLabel: "Hop 0: Ingress Host / Source Leaf Encapsulation (H.Encaps.Red)",
				actionDesc: `Host or Ingress Leaf encapsulates RoCEv2 UDP packet into standard 128-bit IPv6 header (0-byte SRH overhead). Active uSID [bits 32..47] = ${spineUsid} (Spine-${selectedSpineId}).`,
			};
		}
		if (activeHop === 1) {
			return {
				da: `fcbb:bb00:${leafUsid}:${vrfUsid}:0000::`,
				stageLabel: `Hop 1: Spine-${selectedSpineId} ASIC Hardware Shift-Left (End.uN)`,
				actionDesc: `Spine-${selectedSpineId} matches fcbb:bb00:${spineUsid}::/48 in TCAM, shifts bits [32..127] left by 16 bits in 8 ns, promoting ${leafUsid} (Pod2-Leaf-${selectedLeafId}) to Active uSID!`,
			};
		}
		return {
			da: `fcbb:bb00:${vrfUsid}:0000:0000::`,
			stageLabel: `Hop 2: Egress Leaf-${selectedLeafId} Decapsulation (End.uDT4)`,
			actionDesc: `Leaf-${selectedLeafId} matches ${vrfUsid} (GPU RDMA VRF ${vrfId}), strips outer IPv6 header, and delivers RoCEv2 payload to ConnectX-7/8 OOO-DDP engine.`,
		};
	}, [activeHop, spineUsid, leafUsid, vrfUsid, selectedSpineId, selectedLeafId, vrfId]);

	return (
		<div className="space-y-6 font-mono text-xs sm:text-sm text-gray-200">
			{/* Top Configuration Controls */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
				{/* Collective Workload Selector */}
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<label className="block text-[10px] uppercase tracking-wider text-emerald-400 mb-2">
						1. NCCL Collective Pattern
					</label>
					<div className="space-y-1.5">
						{[
							{
								id: "allreduce",
								label: "Ring/Tree AllReduce (Same-Rank)",
								sub: "Node A GPU i <-> Node B GPU i",
							},
							{
								id: "alltoall_pod",
								label: "Intra-Pod MoE AllToAll (Cross-Rail)",
								sub: "Node A GPU 0 -> Node B GPU 7",
							},
							{
								id: "alltoall_global",
								label: "Multi-Pod Global MoE AllToAll",
								sub: "Must Traverse Spine Layer",
							},
						].map((item) => (
							<button
								key={item.id}
								type="button"
								onClick={() => setCollective(item.id as CollectiveType)}
								className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition-all ${
									collective === item.id
										? "border-emerald-500/80 bg-emerald-500/15 text-white"
										: "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
								}`}
							>
								<div className="font-bold text-[11px]">{item.label}</div>
								<div className="text-[10px] opacity-75">{item.sub}</div>
							</button>
						))}
					</div>
				</div>

				{/* Fabric Architecture Mode */}
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90 lg:col-span-2">
					<label className="block text-[10px] uppercase tracking-wider text-cyan-400 mb-2">
						2. Clos Fabric &amp; Routing Architecture
					</label>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
						{[
							{
								id: "tor_ecmp",
								title: "Legacy ToR + Static 5-Tuple ECMP",
								desc: "All 8 NICs per node in 1 ToR; hairpins Spine",
							},
							{
								id: "rail_pxn_ecmp",
								title: "8-Rail Clos + NCCL PxN + Static ECMP",
								desc: "1-Hop Rail switch + NVSwitch PxN; ECMP on Spine",
							},
							{
								id: "rail_srv6_usid",
								title: "8-Rail + SRv6 uSID Deterministic",
								desc: "Explicit fcbb:bb00::/32 uSID Spine assignment",
							},
							{
								id: "rail_dlb_oooddp",
								title: "8-Rail + Switch DLB + NIC OOO-DDP",
								desc: "Per-packet spraying + ConnectX-7/8 RETH placement",
							},
						].map((mode) => (
							<button
								key={mode.id}
								type="button"
								onClick={() => setFabricMode(mode.id as FabricMode)}
								className={`text-left px-2.5 py-2 rounded-lg border transition-all ${
									fabricMode === mode.id
										? "border-cyan-400/80 bg-cyan-500/15 text-white"
										: "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
								}`}
							>
								<div className="font-bold text-[11px]">{mode.title}</div>
								<div className="text-[10px] opacity-75">{mode.desc}</div>
							</button>
						))}
					</div>
				</div>

				{/* Speed & Multi-QP Controls */}
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90 flex flex-col justify-between gap-2">
					<div>
						<label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1.5">
							3. Port Speed &amp; Multi-QP
						</label>
						<div className="flex gap-1.5 mb-2">
							{([400, 800] as const).map((spd) => (
								<button
									key={spd}
									type="button"
									onClick={() => setLinkSpeedGbps(spd)}
									className={`flex-1 py-1 rounded border text-[11px] font-bold ${
										linkSpeedGbps === spd
											? "border-amber-400 bg-amber-500/20 text-amber-200"
											: "border-slate-800 bg-slate-900 text-slate-400"
									}`}
								>
									{spd}GbE
								</button>
							))}
						</div>
						<div className="flex gap-1.5">
							{([1, 4] as const).map((qps) => (
								<button
									key={qps}
									type="button"
									onClick={() => setQpsPerFlow(qps)}
									className={`flex-1 py-1 rounded border text-[11px] font-bold ${
										qpsPerFlow === qps
											? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
											: "border-slate-800 bg-slate-900 text-slate-400"
									}`}
								>
									{qps} QP/Peer
								</button>
							))}
						</div>
					</div>

					<button
						type="button"
						onClick={() => setHashSeed((s) => (s + 1) % 99)}
						className="w-full py-1.5 px-2 rounded-lg border border-purple-500/50 bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 text-[11px] font-bold transition-all"
					>
						🎲 Re-Roll 5-Tuple UDP Ports (Seed #{hashSeed})
					</button>
				</div>
			</div>

			{/* KPI Telemetry Strip */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						Effective Node BusBW (8x {linkSpeedGbps}G)
					</div>
					<div
						className={`text-xl sm:text-2xl font-bold mt-1 ${
							simulation.effectiveEfficiencyPct >= 90
								? "text-emerald-400"
								: simulation.effectiveEfficiencyPct >= 75
									? "text-amber-400"
									: "text-rose-400"
						}`}
					>
						{simulation.busBandwidthGBps.toFixed(1)} GB/s
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						{simulation.effectiveEfficiencyPct.toFixed(1)}% of{" "}
						{linkSpeedGbps} GB/s Line Rate
					</div>
				</div>

				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						Spine Traversal Status
					</div>
					<div className="text-base sm:text-lg font-bold mt-1 text-cyan-300">
						{simulation.bypassesSpine
							? simulation.nvlinkPxnActive
								? "0% Spine (NVLink PxN + 1-Hop Rail)"
								: "0% Spine (1-Hop Rail Leaf Only)"
							: "100% Spine Clos Traversal"}
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						{simulation.bypassesSpine
							? "Cut-through 380 ns Rail Leaf switch"
							: `Max Spine Port Load: ${simulation.maxBottleneckLoadPct.toFixed(0)}%`}
					</div>
				</div>

				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						Balls-into-Bins 0-Collision Prob
					</div>
					<div className="text-xl sm:text-2xl font-bold mt-1 text-purple-300">
						{fabricMode === "rail_dlb_oooddp" || fabricMode === "rail_srv6_usid"
							? "100.0% (Guaranteed)"
							: `${zeroCollisionProbPct.toFixed(2)}%`}
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						Static ECMP Expected Idle Links: {expectedIdleLinksPct.toFixed(1)}%
					</div>
				</div>

				<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
					<div className="text-[10px] uppercase text-slate-400">
						PFC Pause Storms &amp; OOO-DDP
					</div>
					<div
						className={`text-xl sm:text-2xl font-bold mt-1 ${
							simulation.pfcStormCount === 0 ? "text-emerald-400" : "text-rose-400"
						}`}
					>
						{simulation.pfcStormCount === 0
							? "0 PFC Stalls"
							: `${simulation.pfcStormCount} Links Paused!`}
					</div>
					<div className="text-[10px] text-slate-400 mt-0.5">
						{fabricMode === "rail_dlb_oooddp"
							? "ConnectX-7/8 OO_RECV_WR_EN=1 Active"
							: simulation.pfcStormCount > 0
								? "Head-of-Line DCQCN throttling active"
								: "Lossless zero-congestion transfer"}
					</div>
				</div>
			</div>

			{/* Spine Link Load Visualizer */}
			<div className="p-4 rounded-xl border border-slate-800 bg-slate-950/95">
				<div className="flex flex-wrap items-center justify-between gap-2 mb-3">
					<div>
						<h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
							8-Way Spine Uplink Load Distribution ({linkSpeedGbps}GbE Ports 1..8)
						</h4>
						<p className="text-[11px] text-slate-400">
							{simulation.bypassesSpine
								? "All 8 Spine Uplinks sit at 0% collective load because Rail-Optimized Leaf + NCCL PxN switches traffic in a single hop at the Rail Leaf layer!"
								: fabricMode === "rail_dlb_oooddp"
									? "Switch Hardware DLB sprays flowlets/packets across all 8 Spine uplinks while ConnectX-7/8 OOO-DDP places out-of-order packets directly into GPU HBM via RETH offset."
									: fabricMode === "rail_srv6_usid"
										? "SRv6 uSID carrier addresses deterministically pin each GPU rail flow i to Spine uSID 020(i+1) with zero collisions."
										: "Static 5-tuple ECMP hashes elephant flows onto random Spine links—causing 200%+ oversubscription on collided links while leaving other links 0% idle."}
						</p>
					</div>
					<span className="px-2.5 py-1 rounded text-[10px] font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
						{simulation.bypassesSpine
							? "1-HOP RAIL SHORT-CIRCUIT"
							: fabricMode === "rail_dlb_oooddp"
								? "DLB PACKET SPRAYING"
								: fabricMode === "rail_srv6_usid"
									? "SRv6 uSID PINNED"
									: "STATIC CRC32 5-TUPLE HASH"}
					</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
					{simulation.links.map((link) => {
						const barWidth = Math.min(100, (link.utilizationPct / 200) * 100);
						const isOver = link.oversubscribed;
						const isIdle = !simulation.bypassesSpine && link.utilizationPct === 0;

						return (
							<div
								key={link.id}
								className={`p-3 rounded-lg border transition-all ${
									isOver
										? "border-rose-500/70 bg-rose-950/25"
										: isIdle
											? "border-amber-500/40 bg-amber-950/15"
											: "border-slate-800 bg-slate-900/70"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<span className="font-bold text-xs text-white">
										Spine-{link.id}{" "}
										<span className="text-[10px] text-cyan-400">
											(:{link.uSidHex})
										</span>
									</span>
									<span
										className={`text-xs font-bold ${
											isOver
												? "text-rose-400"
												: isIdle
													? "text-amber-400"
													: "text-emerald-400"
										}`}
									>
										{link.utilizationPct.toFixed(0)}% Load
									</span>
								</div>

								{/* Progress Bar (0..200% scale) */}
								<div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative mb-2">
									<div
										className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30 z-10"
										title="100% Line Rate Capacity"
									/>
									<div
										className={`h-full transition-all duration-300 ${
											isOver
												? "bg-gradient-to-r from-amber-500 to-rose-500"
												: simulation.bypassesSpine
													? "bg-cyan-500/40"
													: "bg-gradient-to-r from-emerald-500 to-cyan-400"
										}`}
										style={{ width: `${barWidth}%` }}
									/>
								</div>

								<div className="text-[10px] text-slate-400 flex items-center justify-between">
									<span>
										{simulation.bypassesSpine
											? "Bypassed (1-Hop Rail)"
											: fabricMode === "rail_dlb_oooddp"
												? "Sprayed: All 8 GPU Flows"
												: link.assignedFlows.length > 0
													? `Flows: GPU [${link.assignedFlows.join(", ")}]`
													: "0 Flows (Stranded BW!)"}
									</span>
									{isOver && (
										<span className="text-rose-400 font-bold">PFC PAUSE!</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Interactive SRv6 uSID 128-Bit Carrier Address Encoder & Hop Stepper */}
			<div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950/95 space-y-3">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div>
						<div className="text-[10px] uppercase tracking-widest text-cyan-400">
							// RFC 8986 SRv6 MICRO-SID (uSID) HARDWARE SHIFT INSPECTOR
						</div>
						<h4 className="text-sm font-bold text-white">
							128-Bit IPv6 Destination Address uSID Carrier (Zero SRH Overhead)
						</h4>
					</div>
					<div className="flex gap-1.5">
						{([0, 1, 2] as const).map((hop) => (
							<button
								key={hop}
								type="button"
								onClick={() => setActiveHop(hop)}
								className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all ${
									activeHop === hop
										? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
										: "border-slate-800 bg-slate-900 text-slate-400"
								}`}
							>
								Hop {hop}:{" "}
								{hop === 0
									? "Encap"
									: hop === 1
										? "Spine End.uN"
										: "Leaf End.uDT4"}
							</button>
						))}
					</div>
				</div>

				{/* Selectors for Target Spine, Egress Leaf, and VRF */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
					<div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between">
						<span className="text-[11px] text-slate-400">Target Spine uSID:</span>
						<select
							aria-label="Target Spine uSID"
							value={selectedSpineId}
							onChange={(e) => setSelectedSpineId(Number(e.target.value))}
							className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-cyan-300 font-bold"
						>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
								<option key={id} value={id}>
									Spine-{id} (020{id})
								</option>
							))}
						</select>
					</div>

					<div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between">
						<span className="text-[11px] text-slate-400">Egress Leaf uSID:</span>
						<select
							aria-label="Egress Leaf uSID"
							value={selectedLeafId}
							onChange={(e) => setSelectedLeafId(Number(e.target.value))}
							className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-emerald-300 font-bold"
						>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
								<option key={id} value={id}>
									Pod2-Leaf-{id} (010{id})
								</option>
							))}
						</select>
					</div>

					<div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between">
						<span className="text-[11px] text-slate-400">End.uDT4 VRF ID:</span>
						<select
							aria-label="End.uDT4 VRF ID"
							value={vrfId}
							onChange={(e) => setVrfId(Number(e.target.value))}
							className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-purple-300 font-bold"
						>
							<option value={64}>VRF 64 (:0040)</option>
							<option value={100}>VRF 100 (:0064)</option>
							<option value={256}>VRF 256 (:0100)</option>
						</select>
					</div>
				</div>

				{/* 128-Bit Carrier Bitfield Breakdown */}
				<div className="p-3 rounded-lg border border-slate-800 bg-black/80">
					<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
						<span className="text-[11px] font-bold text-cyan-300">
							{carrierAddressByHop.stageLabel}
						</span>
						<code className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-200 text-xs font-bold">
							DA = {carrierAddressByHop.da}
						</code>
					</div>
					<p className="text-[11px] text-slate-300 mb-2">
						{carrierAddressByHop.actionDesc}
					</p>
					<div className="text-[11px] text-emerald-400/90 bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto">
						<code>
							$ ip route add 10.100.{selectedLeafId}.0/24 encap seg6 mode encap.red
							segs fcbb:bb00:{spineUsid}:{leafUsid}:{vrfUsid}:: dev eth0
						</code>
					</div>
				</div>
			</div>
		</div>
	);
}
