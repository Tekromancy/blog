import React, { useState, useMemo } from "react";

type FaultPreset = "none" | "torn_nvme_dma" | "asymmetric_split" | "clock_drift" | "gray_loss" | "worst_case_cascade";

interface NodeState {
	id: number;
	role: "Leader" | "Follower" | "Candidate" | "Isolated";
	term: number;
	commitIndex: number;
	votedFor: number | null;
	clockDriftMs: number;
	diskTornSectors: number;
	unflushedBytesKB: number;
	status: "healthy" | "delayed" | "corrupt" | "partitioned";
}

export default function DeterministicSimulationTestingSimulator() {
	const [seed, setSeed] = useState<string>("0x9F4A2C01");
	const [speedMultiplier, setSpeedMultiplier] = useState<number>(100000);
	const [simVirtualSeconds, setSimVirtualSeconds] = useState<number>(1800); // 30 virtual minutes
	const [activePreset, setActivePreset] = useState<FaultPreset>("torn_nvme_dma");

	// Fault Injection Toggles
	const [packetLossPct, setPacketLossPct] = useState<number>(8);
	const [injectTornWrites, setInjectTornWrites] = useState<boolean>(true);
	const [injectMisdirectedDma, setInjectMisdirectedDma] = useState<boolean>(false);
	const [asymmetricPartition, setAsymmetricPartition] = useState<boolean>(false);
	const [clockDriftPpm, setClockDriftPpm] = useState<number>(350);

	// Simulation Execution State
	const [stepIndex, setStepIndex] = useState<number>(0);

	// Compute Node States & Verification
	const simulationMetrics = useMemo(() => {
		// Calculate wall clock execution time in milliseconds
		const wallClockMs = Number(((simVirtualSeconds * 1000) / speedMultiplier).toFixed(2));
		const totalEventsProcessed = Math.round(simVirtualSeconds * 420);
		const consensusRounds = Math.round(simVirtualSeconds * 8.5);

		// Dynamic nodes state
		const nodes: NodeState[] = [
			{
				id: 1,
				role: "Leader",
				term: 4,
				commitIndex: 124800 + stepIndex * 240,
				votedFor: 1,
				clockDriftMs: Number(((clockDriftPpm * simVirtualSeconds) / 100000).toFixed(1)),
				diskTornSectors: 0,
				unflushedBytesKB: 64,
				status: "healthy"
			},
			{
				id: 2,
				role: "Follower",
				term: 4,
				commitIndex: 124800 + stepIndex * 240,
				votedFor: 1,
				clockDriftMs: Number((((clockDriftPpm * 0.4) * simVirtualSeconds) / 100000).toFixed(1)),
				diskTornSectors: 0,
				unflushedBytesKB: 32,
				status: "healthy"
			},
			{
				id: 3,
				role: asymmetricPartition ? "Isolated" : (injectTornWrites ? "Follower" : "Follower"),
				term: asymmetricPartition ? 3 : 4,
				commitIndex: asymmetricPartition ? 124650 : (124800 + stepIndex * 240),
				votedFor: asymmetricPartition ? null : 1,
				clockDriftMs: Number((((clockDriftPpm * -0.8) * simVirtualSeconds) / 100000).toFixed(1)),
				diskTornSectors: injectTornWrites ? (activePreset === "torn_nvme_dma" ? 2 : 1) : 0,
				unflushedBytesKB: 0,
				status: asymmetricPartition ? "partitioned" : (injectTornWrites ? "corrupt" : "healthy")
			},
			{
				id: 4,
				role: "Follower",
				term: 4,
				commitIndex: 124800 + stepIndex * 240 - 1,
				votedFor: 1,
				clockDriftMs: Number((((clockDriftPpm * 0.1) * simVirtualSeconds) / 100000).toFixed(1)),
				diskTornSectors: 0,
				unflushedBytesKB: 16,
				status: packetLossPct > 20 ? "delayed" : "healthy"
			},
			{
				id: 5,
				role: "Follower",
				term: 4,
				commitIndex: 124800 + stepIndex * 240,
				votedFor: 1,
				clockDriftMs: Number((((clockDriftPpm * -0.2) * simVirtualSeconds) / 100000).toFixed(1)),
				diskTornSectors: 0,
				unflushedBytesKB: 48,
				status: "healthy"
			}
		];

		// Linearizability Oracle verdict
		let linearizabilityVerdict = "PASS (Strict Serializable)";
		let failureMessage = "";
		let isViolation = false;

		if (activePreset === "worst_case_cascade" && packetLossPct > 25 && injectTornWrites) {
			// Trigger an interesting near-miss or caught split-brain
			linearizabilityVerdict = "TRAPPED (Invariant Caught by Oracle)";
			failureMessage = "Oracle intercepted uncommitted index rollback before client ACK. Zero data loss.";
		} else if (asymmetricPartition) {
			failureMessage = "Node 3 isolated by asymmetric drop filter. Quorum 4/5 maintained leadership.";
		} else if (injectTornWrites) {
			failureMessage = "Node 3 encountered torn 512B WAL sector on LBA 0x0E40. xxHash64 CRC trap triggered truncated log replay.";
		} else {
			failureMessage = "All consensus invariants hold bit-for-bit across simulated timeline.";
		}

		return {
			wallClockMs,
			totalEventsProcessed,
			consensusRounds,
			nodes,
			linearizabilityVerdict,
			failureMessage,
			isViolation
		};
	}, [seed, speedMultiplier, simVirtualSeconds, activePreset, packetLossPct, injectTornWrites, injectMisdirectedDma, asymmetricPartition, clockDriftPpm, stepIndex]);

	const applyPreset = (preset: FaultPreset) => {
		setActivePreset(preset);
		switch (preset) {
			case "none":
				setPacketLossPct(0);
				setInjectTornWrites(false);
				setInjectMisdirectedDma(false);
				setAsymmetricPartition(false);
				setClockDriftPpm(0);
				break;
			case "torn_nvme_dma":
				setPacketLossPct(5);
				setInjectTornWrites(true);
				setInjectMisdirectedDma(false);
				setAsymmetricPartition(false);
				setClockDriftPpm(100);
				break;
			case "asymmetric_split":
				setPacketLossPct(15);
				setInjectTornWrites(false);
				setInjectMisdirectedDma(false);
				setAsymmetricPartition(true);
				setClockDriftPpm(250);
				break;
			case "clock_drift":
				setPacketLossPct(5);
				setInjectTornWrites(false);
				setInjectMisdirectedDma(false);
				setAsymmetricPartition(false);
				setClockDriftPpm(850);
				break;
			case "gray_loss":
				setPacketLossPct(22);
				setInjectTornWrites(false);
				setInjectMisdirectedDma(true);
				setAsymmetricPartition(false);
				setClockDriftPpm(200);
				break;
			case "worst_case_cascade":
				setPacketLossPct(30);
				setInjectTornWrites(true);
				setInjectMisdirectedDma(true);
				setAsymmetricPartition(true);
				setClockDriftPpm(950);
				break;
		}
	};

	const generateNewSeed = () => {
		const newSeedVal = "0x" + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, "0");
		setSeed(newSeedVal);
		setStepIndex(0);
	};

	return (
		<div className="w-full bg-[#0a0e17] border border-emerald-500/30 rounded-2xl p-4 sm:p-6 text-gray-200 font-mono shadow-2xl">
			{/* Top HUD Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 mb-6 gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs text-emerald-400 uppercase tracking-wider mb-1">
						<span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
						<span>DISTRIBUTED SYSTEMS LAB // DETERMINISTIC SIMULATION TESTING</span>
					</div>
					<h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
						Raft / Paxos Consensus Hypervisor Simulator
					</h2>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={generateNewSeed}
						className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/50 hover:bg-emerald-900 text-emerald-300 text-xs rounded transition flex items-center gap-1.5 shadow"
					>
						<span>🎲 RE-SEED:</span>
						<span className="font-bold text-white">{seed}</span>
					</button>
					<span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs rounded">
						{speedMultiplier.toLocaleString()}x REALTIME
					</span>
				</div>
			</div>

			{/* Presets Navigation */}
			<div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-3">
				<span className="text-xs text-gray-400 self-center mr-2">FAULT SCENARIOS:</span>
				<button
					onClick={() => applyPreset("torn_nvme_dma")}
					className={`px-3 py-1.5 rounded text-xs transition ${
						activePreset === "torn_nvme_dma"
							? "bg-red-500/20 text-red-300 border border-red-500/50"
							: "bg-gray-900 text-gray-400 border border-gray-800 hover:text-white"
					}`}
				>
					Torn 512B NVMe DMA
				</button>
				<button
					onClick={() => applyPreset("asymmetric_split")}
					className={`px-3 py-1.5 rounded text-xs transition ${
						activePreset === "asymmetric_split"
							? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
							: "bg-gray-900 text-gray-400 border border-gray-800 hover:text-white"
					}`}
				>
					Asymmetric Network Partition
				</button>
				<button
					onClick={() => applyPreset("gray_loss")}
					className={`px-3 py-1.5 rounded text-xs transition ${
						activePreset === "gray_loss"
							? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
							: "bg-gray-900 text-gray-400 border border-gray-800 hover:text-white"
					}`}
				>
					Gray Packet Loss &amp; Jitter
				</button>
				<button
					onClick={() => applyPreset("clock_drift")}
					className={`px-3 py-1.5 rounded text-xs transition ${
						activePreset === "clock_drift"
							? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
							: "bg-gray-900 text-gray-400 border border-gray-800 hover:text-white"
					}`}
				>
					Monotonic Clock Drift
				</button>
				<button
					onClick={() => applyPreset("worst_case_cascade")}
					className={`px-3 py-1.5 rounded text-xs transition ${
						activePreset === "worst_case_cascade"
							? "bg-rose-500/20 text-rose-300 border border-rose-500/50 font-bold"
							: "bg-gray-900 text-gray-400 border border-gray-800 hover:text-white"
					}`}
				>
					Worst-Case Combinatorial Cascade
				</button>
			</div>

			{/* Configuration Sliders & Knobs */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-black/40 border border-gray-800/80 p-4 rounded-xl">
				<div>
					<div className="flex justify-between text-xs mb-1.5">
						<span className="text-gray-400">Virtual Simulation Span:</span>
						<span className="text-emerald-400 font-bold">
							{(simVirtualSeconds / 60).toFixed(1)} Virtual Mins
						</span>
					</div>
					<input
						type="range"
						min={60}
						max={7200}
						step={60}
						value={simVirtualSeconds}
						onChange={(e) => setSimVirtualSeconds(Number(e.target.value))}
						className="w-full accent-emerald-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
					/>
				</div>

				<div>
					<div className="flex justify-between text-xs mb-1.5">
						<span className="text-gray-400">Network Packet Drop Rate:</span>
						<span className="text-red-400 font-bold">{packetLossPct}%</span>
					</div>
					<input
						type="range"
						min={0}
						max={40}
						value={packetLossPct}
						onChange={(e) => setPacketLossPct(Number(e.target.value))}
						className="w-full accent-red-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
					/>
				</div>

				<div>
					<div className="flex justify-between text-xs mb-1.5">
						<span className="text-gray-400">Clock Skew Injection:</span>
						<span className="text-cyan-400 font-bold">±{clockDriftPpm} ppm</span>
					</div>
					<input
						type="range"
						min={0}
						max={1000}
						step={50}
						value={clockDriftPpm}
						onChange={(e) => setClockDriftPpm(Number(e.target.value))}
						className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
					/>
				</div>
			</div>

			{/* Telemetry HUD Cards */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
				<div className="bg-[#0f172a] border border-gray-800 p-3 rounded-xl">
					<div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Execution Speed</div>
					<div className="text-lg font-bold text-emerald-400">{speedMultiplier.toLocaleString()}x</div>
					<div className="text-[11px] text-gray-500">Zero sleep() calls</div>
				</div>

				<div className="bg-[#0f172a] border border-gray-800 p-3 rounded-xl">
					<div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Host CPU Wall Time</div>
					<div className="text-lg font-bold text-cyan-400">{simulationMetrics.wallClockMs} ms</div>
					<div className="text-[11px] text-gray-500">Single thread CPU</div>
				</div>

				<div className="bg-[#0f172a] border border-gray-800 p-3 rounded-xl">
					<div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Discrete Events</div>
					<div className="text-lg font-bold text-purple-400">{simulationMetrics.totalEventsProcessed.toLocaleString()}</div>
					<div className="text-[11px] text-gray-500">Min-heap ticks</div>
				</div>

				<div className="bg-[#0f172a] border border-gray-800 p-3 rounded-xl">
					<div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Consensus Rounds</div>
					<div className="text-lg font-bold text-amber-400">{simulationMetrics.consensusRounds.toLocaleString()}</div>
					<div className="text-[11px] text-gray-500">Committed batches</div>
				</div>
			</div>

			{/* Cluster Topology View: 5 Simulated Nodes */}
			<div className="mb-6">
				<div className="flex items-center justify-between mb-3">
					<div className="text-xs text-gray-300 font-bold uppercase tracking-wider flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-cyan-400"></span>
						<span>5-Node Consensus Cluster Topology &amp; Physical Sector Health</span>
					</div>
					<button
						onClick={() => setStepIndex((prev) => prev + 1)}
						className="px-2.5 py-1 bg-gray-900 border border-gray-700 hover:border-gray-500 text-xs text-white rounded transition flex items-center gap-1"
					>
						<span>Step Event Queue ⏭</span>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
					{simulationMetrics.nodes.map((node) => {
						const isLeader = node.role === "Leader";
						const isIsolated = node.status === "partitioned";
						const isCorrupt = node.status === "corrupt";

						return (
							<div
								key={node.id}
								className={`p-3 rounded-xl border transition ${
									isLeader
										? "bg-emerald-950/20 border-emerald-500/60 shadow-lg shadow-emerald-950/30"
										: isIsolated
										? "bg-red-950/20 border-red-500/60"
										: isCorrupt
										? "bg-amber-950/20 border-amber-500/60"
										: "bg-gray-900/60 border-gray-800"
								}`}
							>
								<div className="flex items-center justify-between mb-2">
									<span className="font-bold text-white text-sm">Node {node.id}</span>
									<span
										className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
											isLeader
												? "bg-emerald-500/20 text-emerald-400"
												: isIsolated
												? "bg-red-500/20 text-red-400"
												: isCorrupt
												? "bg-amber-500/20 text-amber-400"
												: "bg-blue-500/20 text-blue-400"
										}`}
									>
										{node.role}
									</span>
								</div>

								<div className="space-y-1 text-[11px] text-gray-400">
									<div className="flex justify-between">
										<span>Term:</span>
										<span className="text-white font-mono">{node.term}</span>
									</div>
									<div className="flex justify-between">
										<span>Commit LBA:</span>
										<span className="text-white font-mono">{node.commitIndex}</span>
									</div>
									<div className="flex justify-between">
										<span>Clock Drift:</span>
										<span className={node.clockDriftMs !== 0 ? "text-cyan-400 font-mono" : "text-gray-500"}>
											{node.clockDriftMs > 0 ? `+${node.clockDriftMs}` : node.clockDriftMs} ms
										</span>
									</div>
									<div className="flex justify-between">
										<span>Torn Sectors:</span>
										<span className={node.diskTornSectors > 0 ? "text-red-400 font-bold" : "text-gray-500"}>
											{node.diskTornSectors}
										</span>
									</div>
									<div className="flex justify-between">
										<span>Volatile Tail:</span>
										<span className="text-gray-400 font-mono">{node.unflushedBytesKB} KB</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Linearizability Oracle Verdict Console */}
			<div className="bg-[#050914] border border-gray-800 rounded-xl p-4">
				<div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-800/80">
					<div className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-purple-400"></span>
						<span>Linearizability Verifier &amp; Failure Trace</span>
					</div>
					<span
						className={`text-xs px-2 py-0.5 rounded font-bold ${
							simulationMetrics.linearizabilityVerdict.includes("PASS")
								? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
								: "bg-amber-500/20 text-amber-400 border border-amber-500/40"
						}`}
					>
						{simulationMetrics.linearizabilityVerdict}
					</span>
				</div>
				<p className="text-xs text-gray-300 font-mono mb-2">
					{simulationMetrics.failureMessage}
				</p>
				<div className="text-[11px] text-gray-500 font-mono">
					SEED REPLAY COMMAND: <code className="text-emerald-400">cargo test --test dst_raft -- --seed {seed}</code> (100% Bit-for-Bit Deterministic)
				</div>
			</div>
		</div>
	);
}
