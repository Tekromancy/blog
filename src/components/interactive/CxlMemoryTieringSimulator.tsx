import React, { useState, useMemo } from "react";

type WorkloadId = "llm-kv-cache" | "vector-db-hnsw" | "in-memory-kv" | "olap-analytics";
type TopologyId = "cxl2-pcie5" | "cxl3-pcie6-direct" | "cxl3-pbr-switch";
type PolicyId = "naive-first-touch" | "numa-balancing-tpp" | "damon-damos" | "weighted-interleave";
type TraceScenarioId = "local-ddr5" | "cxl-read-flit" | "cxl-bisnp-coherency" | "zone-movable-fault";

interface WorkloadSpec {
	id: WorkloadId;
	name: string;
	subtitle: string;
	hotWorkingSetPct: number; // % of footprint accessed frequently
	bandwidthSensitivity: number; // 0..1
	latencySensitivity: number; // 0..1
	recommendedPolicy: PolicyId;
}

const WORKLOADS: Record<WorkloadId, WorkloadSpec> = {
	"llm-kv-cache": {
		id: "llm-kv-cache",
		name: "LLM Prefix & KV-Cache Pool (vLLM / SGLang)",
		subtitle: "Multi-turn agentic KV blocks & shared read-only model weights",
		hotWorkingSetPct: 28,
		bandwidthSensitivity: 0.75,
		latencySensitivity: 0.55,
		recommendedPolicy: "damon-damos",
	},
	"vector-db-hnsw": {
		id: "vector-db-hnsw",
		name: "Vector DB HNSW Graph (Milvus / Qdrant 1B)",
		subtitle: "Pointer-chasing upper HNSW layers (hot) + dense float32/int8 payloads (warm/cold)",
		hotWorkingSetPct: 22,
		bandwidthSensitivity: 0.45,
		latencySensitivity: 0.9,
		recommendedPolicy: "damon-damos",
	},
	"in-memory-kv": {
		id: "in-memory-kv",
		name: "In-Memory Key-Value Store (Valkey / Dragonfly)",
		subtitle: "Strict Zipfian (80/20) key popularity across multi-terabyte session state",
		hotWorkingSetPct: 20,
		bandwidthSensitivity: 0.35,
		latencySensitivity: 0.85,
		recommendedPolicy: "damon-damos",
	},
	"olap-analytics": {
		id: "olap-analytics",
		name: "Columnar OLAP Scan Engine (DuckDB / Velox / Arrow)",
		subtitle: "Sequential SIMD vectorized table scans starving socket DDR5 channels",
		hotWorkingSetPct: 60,
		bandwidthSensitivity: 0.95,
		latencySensitivity: 0.25,
		recommendedPolicy: "weighted-interleave",
	},
};

interface TopologySpec {
	id: TopologyId;
	name: string;
	flitFormat: string;
	linkSpec: string;
	idleLatencyNs: number;
	cxlBandwidthGBs: number; // Assuming 2x x16 CXL links interleaved
	adistance: number;
	tierName: string;
}

const TOPOLOGIES: Record<TopologyId, TopologySpec> = {
	"cxl2-pcie5": {
		id: "cxl2-pcie5",
		name: "CXL 2.0 Direct-Attach (2x PCIe 5.0 x16)",
		flitFormat: "68-Byte FLIT (128b/130b NRZ, 16-bit CRC)",
		linkSpec: "32 GT/s PCIe 5.0 (2x x16 = 124 GB/s peak)",
		idleLatencyNs: 180,
		cxlBandwidthGBs: 112,
		adistance: 2176,
		tierName: "memory_tier22",
	},
	"cxl3-pcie6-direct": {
		id: "cxl3-pcie6-direct",
		name: "CXL 3.1 Direct-Attach (2x PCIe 6.0 x16)",
		flitFormat: "256-Byte LO-Flit (2x 128B Sub-Flits, PAM4 + Lightweight FEC)",
		linkSpec: "64 GT/s PCIe 6.0 (2x x16 = 256 GB/s peak)",
		idleLatencyNs: 158,
		cxlBandwidthGBs: 228,
		adistance: 1792,
		tierName: "memory_tier18",
	},
	"cxl3-pbr-switch": {
		id: "cxl3-pbr-switch",
		name: "CXL 3.1 Switched PBR Pool (1 Switch Hop + HDM-DB)",
		flitFormat: "256-Byte PBR FLIT + Device Snoop Filter (S2M BISnp)",
		linkSpec: "64 GT/s PCIe 6.0 Fabric (Multi-Host Coherent Pool)",
		idleLatencyNs: 235,
		cxlBandwidthGBs: 195,
		adistance: 2688,
		tierName: "memory_tier26",
	},
};

interface TraceScenario {
	id: TraceScenarioId;
	title: string;
	badge: string;
	totalLatency: string;
	summary: string;
	steps: {
		stage: string;
		actor: string;
		protocol: string;
		latencyDelta: string;
		detail: string;
		status: "ok" | "warn" | "danger";
	}[];
}

const TRACE_SCENARIOS: Record<TraceScenarioId, TraceScenario> = {
	"local-ddr5": {
		id: "local-ddr5",
		title: "1. Local DDR5-6400 Cache Miss (NUMA Node 0)",
		badge: "BASELINE // ~85 ns",
		totalLatency: "85 ns",
		summary:
			"Standard single-socket L3 miss resolved directly by the CPU's local Integrated Memory Controller (iMC) across 12 DDR5-6400 channels.",
		steps: [
			{
				stage: "01. L3 (LLC) Cache Miss",
				actor: "CPU Core -> CHA / Home Agent",
				protocol: "Internal Mesh / Infinity Fabric",
				latencyDelta: "+18 ns",
				detail:
					"Load instruction misses L1/L2/L3; Home Agent checks System Address Decoder (SAD) and matches Local Node 0 HPA range.",
				status: "ok",
			},
			{
				stage: "02. DDR5 Bank Activate & Read",
				actor: "Integrated Memory Controller (iMC)",
				protocol: "JEDEC DDR5-6400 (ACT -> RD)",
				latencyDelta: "+52 ns",
				detail:
					"iMC issues Row Activate (tRCD) and Column Read (tCL) across local DDR5 RDIMM rank.",
				status: "ok",
			},
			{
				stage: "03. 64B Cacheline Fill",
				actor: "Home Agent -> Core L1D/L2",
				protocol: "Coherent Mesh Fill",
				latencyDelta: "+15 ns",
				detail:
					"64-byte cacheline is returned in Exclusive (E) or Shared (S) state to the requesting hardware thread.",
				status: "ok",
			},
		],
	},
	"cxl-read-flit": {
		id: "cxl-read-flit",
		title: "2. CXL 3.1 Cacheline Read (M2S Req -> S2M DRS)",
		badge: "LO-FLIT // ~158 ns",
		totalLatency: "158 ns",
		summary:
			"Zero-driver hardware load instruction to a CPU-less CXL Type-3 NUMA Node 2 using CXL 3.1 Latency-Optimized 256-Byte FLITs (LO-Flit).",
		steps: [
			{
				stage: "01. CFMWS Address Match",
				actor: "CPU Home Agent",
				protocol: "ACPI CEDT / CFMWS Lookup",
				latencyDelta: "+20 ns",
				detail:
					"L3 miss hits a Host Physical Address (HPA) inside the CXL Fixed Memory Window. No OS interrupt or PCIe DMA driver is invoked.",
				status: "ok",
			},
			{
				stage: "02. M2S Req Encapsulation",
				actor: "CXL Root Port -> PCIe 6.0 PHY",
				protocol: "CXL.mem M2S Req (256B LO-Flit)",
				latencyDelta: "+28 ns",
				detail:
					"Home Agent packs `MemRd` into a 128B half-flit with independent CRC (Latency-Optimized Flit) over 64 GT/s PAM4 lanes.",
				status: "ok",
			},
			{
				stage: "03. CXL Controller HPA->DPA & DDR5 Read",
				actor: "CXL Type-3 ASIC Memory Controller",
				protocol: "Device DDR5-6400 Channels",
				latencyDelta: "+78 ns",
				detail:
					"External CXL ASIC decodes Device Physical Address (DPA), checks ECC/metadata, and fetches the 64B line from attached DRAM.",
				status: "ok",
			},
			{
				stage: "04. S2M DRS Cacheline Return",
				actor: "CXL Endpoint -> CPU L3/L1D",
				protocol: "CXL.mem S2M DRS (MemData)",
				latencyDelta: "+32 ns",
				detail:
					"Subordinate-to-Master Data Response returns the 64B cacheline directly into CPU cache hierarchy.",
				status: "ok",
			},
		],
	},
	"cxl-bisnp-coherency": {
		id: "cxl-bisnp-coherency",
		title: "3. Multi-Host Shared Memory Write (HDM-DB S2M BISnp)",
		badge: "COHERENT POOL // ~265 ns",
		totalLatency: "265 ns",
		summary:
			"CXL 3.1 hardware coherency across multiple hosts sharing a single memory appliance via Device Snoop Filter (DSF) Back-Invalidation.",
		steps: [
			{
				stage: "01. Host A Issues Exclusive Write",
				actor: "Host A -> CXL 3.1 PBR Switch",
				protocol: "CXL.mem M2S RwD / MemRdData (Exclusive)",
				latencyDelta: "+45 ns",
				detail:
					"Host A requests exclusive ownership of physical address 0x180_4000_0040 routed via Port-Based Routing (PBR) ID.",
				status: "ok",
			},
			{
				stage: "02. Device Snoop Filter (DSF) Lookup",
				actor: "CXL 3.1 Multi-Headed Pool Controller",
				protocol: "HDM-DB Directory Hit (Host B = Shared)",
				latencyDelta: "+30 ns",
				detail:
					"Appliance directory detects Host B currently caches 0x180_4000_0040 in Shared (S) state.",
				status: "warn",
			},
			{
				stage: "03. Hardware Back-Invalidation Snoop",
				actor: "CXL Pool -> Host B Root Port",
				protocol: "CXL.mem S2M BISnp (Snoop Invalidate)",
				latencyDelta: "+115 ns",
				detail:
					"Device sends `S2M BISnp` across the switch fabric to Host B. Host B Home Agent invalidates its local L1/L2/L3 copy and replies `M2S BIRsp (I)`.",
				status: "warn",
			},
			{
				stage: "04. Exclusive Grant & Write Completion",
				actor: "CXL Pool -> Host A",
				protocol: "CXL.mem S2M NDR (Cmp-E)",
				latencyDelta: "+75 ns",
				detail:
					"Once all sharers confirm invalidation, the CXL controller updates directory state to Host A = Exclusive and completes the store.",
				status: "ok",
			},
		],
	},
	"zone-movable-fault": {
		id: "zone-movable-fault",
		title: "4. CXL Link Poison / Hot-Unplug: ZONE_NORMAL vs. ZONE_MOVABLE",
		badge: "RAS CONTAINMENT // CRITICAL",
		totalLatency: "0 msDowntime (ZONE_MOVABLE)",
		summary:
			"Why placing unmovable kernel slab allocations (`ZONE_NORMAL`) on CXL causes fatal host Machine Check Exceptions (MCE) during fabric faults.",
		steps: [
			{
				stage: "01. Dynamic Capacity Extent Release or Link Fault",
				actor: "CXL Fabric Manager / Switch Port",
				protocol: "CXL DCD Release / CXL.mem Poison Bit",
				latencyDelta: "Event Trigger",
				detail:
					"Fabric Manager requests hot-release of a 256 GB CXL memory extent, OR an uncorrectable multi-bit DRAM error asserts CXL Poison.",
				status: "warn",
			},
			{
				stage: "02A. [FAILURE PATH] If Onlined in ZONE_NORMAL",
				actor: "Linux Kernel Slab (`kmalloc` / `task_struct`)",
				protocol: "Unpinned Kernel Pointer Dereference -> MCE",
				latencyDelta: "KERNEL PANIC",
				detail:
					"Kernel page tables and slab objects cannot be migrated (`!__GFP_MOVABLE`). Offlining fails (`-EBUSY`), and a Poison read in Ring 0 triggers a fatal Machine Check Exception!",
				status: "danger",
			},
			{
				stage: "02B. [SAFE PATH] Onlined via `daxctl --movable`",
				actor: "Linux mm (`ZONE_MOVABLE` + `memory-failure.c`)",
				protocol: "Page Migration / `SIGBUS` (`BUS_MCEERR_AR`)",
				latencyDelta: "< 120 ms",
				detail:
					"Kernel guarantees 0 Ring-0 slab objects reside on Node 2. Clean pages migrate transparently to Node 0; poisoned user pages send recoverable `SIGBUS` only to the affected process.",
				status: "ok",
			},
		],
	},
};

export default function CxlMemoryTieringSimulator() {
	const [activeTab, setActiveTab] = useState<"calculator" | "protocol">("calculator");
	const [workloadId, setWorkloadId] = useState<WorkloadId>("llm-kv-cache");
	const [totalFootprintTB, setTotalFootprintTB] = useState<number>(4);
	const [cxlRatioPct, setCxlRatioPct] = useState<number>(60);
	const [topologyId, setTopologyId] = useState<TopologyId>("cxl3-pcie6-direct");
	const [policyId, setPolicyId] = useState<PolicyId>("damon-damos");
	const [traceId, setTraceId] = useState<TraceScenarioId>("cxl-read-flit");

	const workload = WORKLOADS[workloadId];
	const topology = TOPOLOGIES[topologyId];
	const trace = TRACE_SCENARIOS[traceId];

	const metrics = useMemo(() => {
		const localDDR5LatencyNs = 85;
		const localDDR5BandwidthGBs = 460; // 12-channel DDR5-6400

		const cxlFraction = cxlRatioPct / 100;
		const localFraction = 1 - cxlFraction;

		const localFootprintTB = +(totalFootprintTB * localFraction).toFixed(2);
		const cxlFootprintTB = +(totalFootprintTB * cxlFraction).toFixed(2);

		// Determine what fraction of actual memory accesses hit Local DDR5 vs CXL
		let localHitRate = localFraction;
		if (cxlRatioPct === 0) {
			localHitRate = 1.0;
		} else if (policyId === "naive-first-touch") {
			// Unmanaged placement: accesses roughly proportional to capacity split
			localHitRate = localFraction;
		} else if (policyId === "numa-balancing-tpp") {
			// Kernel TPP promotes hot pages via PROT_NONE faults, captures ~82% of hot working set if local capacity permits
			const hotFitsRatio = Math.min(1, (localFraction * 100) / Math.max(10, workload.hotWorkingSetPct));
			localHitRate = Math.min(0.96, 0.55 * hotFitsRatio + 0.35 * localFraction);
		} else if (policyId === "damon-damos") {
			// Proactive DAMON PTE sampling keeps virtually all hot pages in local DDR5 as long as local DDR5 >= hotWorkingSetPct
			const hotFitsRatio = Math.min(1, (localFraction * 100) / Math.max(10, workload.hotWorkingSetPct));
			localHitRate = Math.min(0.985, 0.78 * hotFitsRatio + 0.2 * localFraction);
		} else if (policyId === "weighted-interleave") {
			// Weighted interleave stripes allocations proportional to bandwidth ratio
			const bwWeightLocal = localDDR5BandwidthGBs;
			const bwWeightCxl = topology.cxlBandwidthGBs;
			localHitRate = bwWeightLocal / (bwWeightLocal + bwWeightCxl);
		}

		const cxlHitRate = 1 - localHitRate;

		// Effective composite point latency
		const effectiveLatencyNs = Math.round(
			localHitRate * localDDR5LatencyNs + cxlHitRate * topology.idleLatencyNs
		);

		// Effective aggregate bandwidth
		let aggregateBandwidthGBs = localDDR5BandwidthGBs;
		if (cxlRatioPct > 0) {
			if (policyId === "weighted-interleave") {
				// Bandwidth striping combines local iMC + CXL root ports!
				aggregateBandwidthGBs = Math.round(
					localDDR5BandwidthGBs + topology.cxlBandwidthGBs * 0.92
				);
			} else if (policyId === "damon-damos") {
				aggregateBandwidthGBs = Math.round(
					localDDR5BandwidthGBs * 0.96 + topology.cxlBandwidthGBs * 0.35
				);
			} else if (policyId === "numa-balancing-tpp") {
				aggregateBandwidthGBs = Math.round(
					localDDR5BandwidthGBs * 0.88 + topology.cxlBandwidthGBs * 0.25
				);
			} else {
				// Naive first touch gets bottlenecked by CXL link when hot pages land on CXL
				aggregateBandwidthGBs = Math.round(
					localFraction * localDDR5BandwidthGBs + cxlFraction * topology.cxlBandwidthGBs
				);
			}
		}

		// p99 application tail impact vs All-Local DDR5 baseline
		const latencyRatio = (effectiveLatencyNs - localDDR5LatencyNs) / localDDR5LatencyNs;
		const bwGainRatio = (aggregateBandwidthGBs - localDDR5BandwidthGBs) / localDDR5BandwidthGBs;

		let p99DeltaPct =
			latencyRatio * 100 * workload.latencySensitivity * 0.65 -
			bwGainRatio * 100 * workload.bandwidthSensitivity * 0.55;

		if (policyId === "numa-balancing-tpp" && cxlRatioPct > 0) {
			p99DeltaPct += 3.2; // Minor page fault storm overhead from PROT_NONE hinting
		}
		if (cxlRatioPct === 0) {
			p99DeltaPct = 0;
		}
		p99DeltaPct = +p99DeltaPct.toFixed(1);

		// Hardware CAPEX calculation:
		// All-local 4TB+ requires high-density 128GB/256GB DDR5 RDIMMs (~$14,500/TB + extra CPU socket tax)
		// CXL Tiered uses sweet-spot 64GB DDR5 RDIMMs ($6,800/TB) + CXL AIC/Pool DDR5 ($4,200/TB)
		const baselineCostPerTB = totalFootprintTB >= 4 ? 14800 : 10500;
		const baselineSocketTax = totalFootprintTB >= 4 ? 12000 : 0;
		const baselineTotalCost = totalFootprintTB * baselineCostPerTB + baselineSocketTax;

		const tieredLocalCost = localFootprintTB * 7200;
		const tieredCxlCost = cxlFootprintTB * 4400 + (cxlFootprintTB > 0 ? 2800 : 0); // CXL controller/switch port amortization
		const tieredTotalCost =
			cxlRatioPct === 0 ? baselineTotalCost : Math.round(tieredLocalCost + tieredCxlCost);

		const capexSavingsUSD = Math.max(0, baselineTotalCost - tieredTotalCost);
		const capexSavingsPct =
			baselineTotalCost > 0 ? Math.round((capexSavingsUSD / baselineTotalCost) * 100) : 0;

		const weightLocal = Math.max(1, Math.round(localDDR5BandwidthGBs / 60));
		const weightCxl = Math.max(1, Math.round(topology.cxlBandwidthGBs / 60));

		return {
			localFootprintTB,
			cxlFootprintTB,
			localHitRatePct: Math.round(localHitRate * 100),
			cxlHitRatePct: Math.round(cxlHitRate * 100),
			effectiveLatencyNs,
			aggregateBandwidthGBs,
			p99DeltaPct,
			baselineTotalCost,
			tieredTotalCost,
			capexSavingsUSD,
			capexSavingsPct,
			weightLocal,
			weightCxl,
		};
	}, [workload, totalFootprintTB, cxlRatioPct, topology, policyId]);

	return (
		<div className="w-full rounded-xl border border-cyan-500/30 bg-[#070b12] p-5 sm:p-6 text-gray-200 font-mono text-xs shadow-2xl">
			{/* Top Mode Switcher */}
			<div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
				<div className="flex items-center gap-2">
					<span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
						CXL 3.1 // DAMON LAB
					</span>
					<span className="text-gray-400 hidden sm:inline">
						Coherent Memory Pooling &amp; Kernel Tiering Telemetry
					</span>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setActiveTab("calculator")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "calculator"
								? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						01. Tiering &amp; Bandwidth Modeler
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("protocol")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "protocol"
								? "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						02. CXL.mem FLIT &amp; BISnp Trace
					</button>
				</div>
			</div>

			{activeTab === "calculator" ? (
				<div className="space-y-6">
					{/* Controls Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
						{/* Left Column: Workload & Hardware Topology */}
						<div className="p-4 rounded-xl border border-white/10 bg-black/50 space-y-4">
							<div>
								<label className="block text-[11px] uppercase tracking-wider text-cyan-400 mb-2">
									// 1. Target Datacenter Workload Profile
								</label>
								<div className="grid grid-cols-1 gap-2">
									{(Object.values(WORKLOADS) as WorkloadSpec[]).map((w) => (
										<button
											key={w.id}
											type="button"
											onClick={() => {
												setWorkloadId(w.id);
												setPolicyId(w.recommendedPolicy);
											}}
											className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
												workloadId === w.id
													? "bg-cyan-950/60 border-cyan-400 text-white"
													: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
											}`}
										>
											<div className="flex items-center justify-between">
												<span className="font-bold text-cyan-200">{w.name}</span>
												<span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300">
													Hot Set: ~{w.hotWorkingSetPct}%
												</span>
											</div>
											<div className="text-[11px] text-gray-400 mt-0.5">{w.subtitle}</div>
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="block text-[11px] uppercase tracking-wider text-cyan-400 mb-2">
									// 2. CXL Hardware Interconnect &amp; Switch Topology
								</label>
								<div className="grid grid-cols-1 gap-2">
									{(Object.values(TOPOLOGIES) as TopologySpec[]).map((t) => (
										<button
											key={t.id}
											type="button"
											onClick={() => setTopologyId(t.id)}
											className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
												topologyId === t.id
													? "bg-emerald-950/50 border-emerald-400 text-white"
													: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
											}`}
										>
											<div className="flex items-center justify-between">
												<span className="font-bold text-emerald-300">{t.name}</span>
												<span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-200">
													~{t.idleLatencyNs} ns | {t.cxlBandwidthGBs} GB/s
												</span>
											</div>
											<div className="text-[10px] text-gray-400 mt-0.5">{t.flitFormat}</div>
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Right Column: Sliders & Linux Kernel Policy */}
						<div className="p-4 rounded-xl border border-white/10 bg-black/50 space-y-4">
							<div>
								<div className="flex justify-between text-[11px] mb-1">
									<span className="text-cyan-400 uppercase">
										// 3. Total Server Memory Footprint
									</span>
									<span className="text-white font-bold">{totalFootprintTB} TB RAM</span>
								</div>
								<input
									type="range"
									min={1}
									max={8}
									step={1}
									value={totalFootprintTB}
									onChange={(e) => setTotalFootprintTB(Number(e.target.value))}
									className="w-full accent-cyan-400 cursor-pointer"
								/>
								<div className="flex justify-between text-[10px] text-gray-500">
									<span>1 TB</span>
									<span>2 TB</span>
									<span>4 TB</span>
									<span>8 TB (Pooled)</span>
								</div>
							</div>

							<div>
								<div className="flex justify-between text-[11px] mb-1">
									<span className="text-cyan-400 uppercase">
										// 4. Pooled CXL.mem Allocation Ratio (NUMA Node 2)
									</span>
									<span className="text-emerald-300 font-bold">
										{cxlRatioPct}% CXL ({metrics.cxlFootprintTB} TB) / {100 - cxlRatioPct}% Local DDR5 ({metrics.localFootprintTB} TB)
									</span>
								</div>
								<input
									type="range"
									min={0}
									max={80}
									step={5}
									value={cxlRatioPct}
									onChange={(e) => setCxlRatioPct(Number(e.target.value))}
									className="w-full accent-emerald-400 cursor-pointer"
								/>
								<div className="flex justify-between text-[10px] text-gray-500">
									<span>0% (All Local DDR5)</span>
									<span>40% CXL</span>
									<span>60% CXL (Sweet Spot)</span>
									<span>80% CXL</span>
								</div>
							</div>

							<div>
								<label className="block text-[11px] uppercase tracking-wider text-cyan-400 mb-2">
									// 5. Linux Kernel Memory Tiering &amp; Interleave Policy
								</label>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
									{[
										{
											id: "damon-damos" as PolicyId,
											label: "DAMON (DAMOS_MIGRATE_HOT/COLD)",
											desc: "Linux 6.11+ PTE sampling (<1% CPU)",
										},
										{
											id: "weighted-interleave" as PolicyId,
											label: "Weighted Interleave (Linux 6.9+)",
											desc: `Stripes pages ${metrics.weightLocal}:${metrics.weightCxl} for peak BW`,
										},
										{
											id: "numa-balancing-tpp" as PolicyId,
											label: "Kernel TPP (numa_balancing=2)",
											desc: "Reactive PROT_NONE hinting faults",
										},
										{
											id: "naive-first-touch" as PolicyId,
											label: "Naive First-Touch (No Tiering)",
											desc: "Unmanaged page placement",
										},
									].map((p) => (
										<button
											key={p.id}
											type="button"
											onClick={() => setPolicyId(p.id)}
											className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
												policyId === p.id
													? "bg-purple-950/50 border-purple-400 text-white"
													: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
											}`}
										>
											<div className="font-bold text-purple-200 text-[11px]">{p.label}</div>
											<div className="text-[10px] text-gray-400 mt-0.5">{p.desc}</div>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Telemetry Output Cards */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">Composite Read Latency</div>
							<div className="text-xl font-bold text-cyan-300 mt-1">
								{metrics.effectiveLatencyNs} ns
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								Local Hits: <span className="text-emerald-300">{metrics.localHitRatePct}%</span> | CXL Hits:{" "}
								<span className="text-amber-300">{metrics.cxlHitRatePct}%</span>
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">Sustained Read Bandwidth</div>
							<div className="text-xl font-bold text-emerald-300 mt-1">
								{metrics.aggregateBandwidthGBs} GB/s
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								{metrics.aggregateBandwidthGBs > 460
									? `+${Math.round(((metrics.aggregateBandwidthGBs - 460) / 460) * 100)}% over 12-Ch DDR5 alone!`
									: "Socket 12-Ch DDR5 baseline: 460 GB/s"}
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">p99 Tail Latency Impact</div>
							<div
								className={`text-xl font-bold mt-1 ${
									metrics.p99DeltaPct <= 0
										? "text-emerald-400"
										: metrics.p99DeltaPct <= 5
										? "text-cyan-300"
										: "text-amber-400"
								}`}
							>
								{metrics.p99DeltaPct > 0 ? `+${metrics.p99DeltaPct}%` : `${metrics.p99DeltaPct}%`}
							</div>
							<div className="text-[10px] text-gray-400 mt-1">
								{metrics.p99DeltaPct < 0
									? "Net speedup via CXL BW striping!"
									: metrics.p99DeltaPct <= 5
									? "Within production SLA (<5%)"
									: "High CXL tail stall — enable DAMON"}
							</div>
						</div>

						<div className="p-3.5 rounded-xl border border-white/10 bg-black/60">
							<div className="text-[10px] text-gray-400 uppercase">Estimated Hardware CAPEX</div>
							<div className="text-xl font-bold text-amber-300 mt-1">
								${metrics.tieredTotalCost.toLocaleString()}
							</div>
							<div className="text-[10px] text-emerald-400 mt-1">
								Saves ${metrics.capexSavingsUSD.toLocaleString()} ({metrics.capexSavingsPct}% vs All-DDR5)
							</div>
						</div>
					</div>

					{/* Dynamic Kernel Config Prescription */}
					<div className="p-4 rounded-xl border border-cyan-500/30 bg-[#05080f]">
						<div className="flex items-center justify-between mb-2">
							<span className="text-[11px] font-bold text-cyan-300 uppercase">
								// Generated Linux Kernel CXL Configuration ({topology.tierName}, adistance={topology.adistance})
							</span>
							<span className="text-[10px] text-gray-400">
								Node 0: {metrics.localFootprintTB} TB DDR5 | Node 2: {metrics.cxlFootprintTB} TB CXL (ZONE_MOVABLE)
							</span>
						</div>
						<pre className="text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
							{policyId === "weighted-interleave"
								? `# 1. Online CXL DAX region into ZONE_MOVABLE (prevents unmovable kernel slab on CXL)
daxctl reconfigure-device --mode=system-ram --no-online dax0.0
daxctl online-memory dax0.0 --movable

# 2. Configure Linux 6.9+ Bandwidth-Weighted Interleaving (${metrics.weightLocal}:${metrics.weightCxl} DDR5:CXL ratio)
echo ${metrics.weightLocal} > /sys/kernel/mm/mempolicy/weighted_interleave/node0
echo ${metrics.weightCxl} > /sys/kernel/mm/mempolicy/weighted_interleave/node2
numactl --weighted-interleave=0,2 ./workload-engine`
								: policyId === "damon-damos"
								? `# 1. Online CXL region into ZONE_MOVABLE & verify memory_tier assignment
daxctl reconfigure-device --mode=system-ram --no-online dax0.0
daxctl online-memory dax0.0 --movable
cat /sys/devices/virtual/memory_tiering/${topology.tierName}/nodelist  # Output: 2

# 2. Launch Linux 6.11+ DAMON autonomous hot/cold migration (DAMOS_MIGRATE_HOT / COLD)
damo start --ops paddr --sample 5ms --aggr 100ms \\
  --damos_action migrate_hot --damos_Access_rate 5% 100% --damos_quota_space 512M \\
  --damos_action migrate_cold --damos_age 30s max --damos_quota_space 256M`
								: policyId === "numa-balancing-tpp"
								? `# Enable reactive Linux Transparent Page Placement (TPP) Hinting Faults
echo 1 > /sys/kernel/mm/numa/demotion_enabled
sysctl -w kernel.numa_balancing=2  # NUMA_BALANCING_MEMORY_TIERING (Note: incurs minor page-fault overhead)`
								: `# WARNING: Unmanaged CXL allocation risks hot working-set stalls and ZONE_NORMAL MCE hazards!
# Always online CXL Type-3 devices with --movable:
daxctl online-memory dax0.0 --movable`}
						</pre>
					</div>
				</div>
			) : (
				/* Tab 2: Protocol & Coherency Trace Inspector */
				<div className="space-y-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
						{(Object.values(TRACE_SCENARIOS) as TraceScenario[]).map((s) => (
							<button
								key={s.id}
								type="button"
								onClick={() => setTraceId(s.id)}
								className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
									traceId === s.id
										? "bg-emerald-950/50 border-emerald-400 text-white"
										: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
								}`}
							>
								<div className="text-[10px] font-bold text-emerald-300 mb-1">{s.badge}</div>
								<div className="font-bold text-xs text-white leading-snug">{s.title}</div>
							</button>
						))}
					</div>

					<div className="p-4 rounded-xl border border-white/10 bg-black/50">
						<div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
							<div>
								<h4 className="text-sm font-bold text-white">{trace.title}</h4>
								<p className="text-[11px] text-gray-400 mt-0.5">{trace.summary}</p>
							</div>
							<div className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-200 font-bold">
								Total Path: {trace.totalLatency}
							</div>
						</div>

						<div className="space-y-3">
							{trace.steps.map((step, idx) => (
								<div
									key={idx}
									className={`p-3.5 rounded-lg border ${
										step.status === "danger"
											? "bg-red-950/30 border-red-500/50"
											: step.status === "warn"
											? "bg-amber-950/25 border-amber-500/40"
											: "bg-white/[0.02] border-white/10"
									}`}
								>
									<div className="flex flex-wrap items-center justify-between gap-2 mb-1">
										<span className="font-bold text-white">{step.stage}</span>
										<div className="flex items-center gap-2">
											<span className="px-2 py-0.5 rounded bg-white/5 text-cyan-300 text-[10px]">
												{step.protocol}
											</span>
											<span
												className={`px-2 py-0.5 rounded text-[10px] font-bold ${
													step.status === "danger"
														? "bg-red-500/20 text-red-300"
														: step.status === "warn"
														? "bg-amber-500/20 text-amber-300"
														: "bg-emerald-500/20 text-emerald-300"
												}`}
											>
												{step.latencyDelta}
											</span>
										</div>
									</div>
									<div className="text-[11px] text-gray-400 mb-1">
										Hardware Actor: <span className="text-gray-200">{step.actor}</span>
									</div>
									<div className="text-[11px] text-gray-300 leading-relaxed">{step.detail}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
