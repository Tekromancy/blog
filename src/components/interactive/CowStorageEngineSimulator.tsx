import React, { useState, useMemo } from "react";

type EngineMode = "bcachefs_tiering" | "openzfs_draid";
type DriveType = "nvme_u3" | "hdd_sas_24tb";

export default function CowStorageEngineSimulator() {
	const [engine, setEngine] = useState<EngineMode>("openzfs_draid");
	const [driveType, setDriveType] = useState<DriveType>("nvme_u3");
	const [driveCount, setDriveCount] = useState<24 | 36 | 60>(24);
	const [poolLoadPct, setPoolLoadPct] = useState<number>(40);
	const [rebuildFailedDrives, setRebuildFailedDrives] = useState<number>(1);
	const [hasSpecialVdev, setHasSpecialVdev] = useState<boolean>(true);

	// Bcachefs specific states
	const [dirtyBsetRatio, setDirtyBsetRatio] = useState<number>(35);
	const [compressionCodec, setCompressionCodec] = useState<"zstd" | "lz4">("zstd");

	// Calculations for dRAID vs RAIDZ2 Rebuilds
	const rebuildMetrics = useMemo(() => {
		const isNvme = driveType === "nvme_u3";
		const driveCapTB = isNvme ? 15.36 : 24.0;
		// Usable single spindle sustained write speed under load (MB/s)
		const singleSpindleWriteMBps = isNvme ? 2400 : 250;
		// Degradation penalty from concurrent user pool load (40% load -> 25% write penalty)
		const loadPenalty = 1 - (poolLoadPct * 0.005);
		const effectiveSingleSpindleMBps = singleSpindleWriteMBps * Math.max(0.35, loadPenalty);

		// RAIDZ2 bottleneck: ALL reconstruction data is funneled onto 1 dedicated hot-spare drive
		// Total bytes to reconstruct per failed drive (assuming 75% full pool)
		const dataToReconstructGB = driveCapTB * 1024 * 0.75;
		const raidz2TimeHours = (dataToReconstructGB * 1024) / (effectiveSingleSpindleMBps * 3600);

		// dRAID declustered: rebuild writes fan out across (driveCount - failedDrives) disks simultaneously!
		// However, read aggregate is also shared, giving near-linear fanout
		const survivingDrives = driveCount - rebuildFailedDrives;
		// Effective declustered write throughput (bounded by read stripe reconstruction)
		const draidAggWriteMBps = effectiveSingleSpindleMBps * Math.min(survivingDrives * 0.85, survivingDrives - 2);
		const draidTimeMinutes = ((dataToReconstructGB * 1024) / (draidAggWriteMBps * 60));

		// Special vdev impact: eliminates metadata tree-walk random seeks on HDDs
		const specialBonus = (!isNvme && hasSpecialVdev) ? 0.75 : 1.0;
		const finalDraidMinutes = Math.max(12, Number((draidTimeMinutes * specialBonus).toFixed(1)));
		const finalRaidzHours = Number((raidz2TimeHours * (hasSpecialVdev ? 0.85 : 1.0)).toFixed(1));

		return {
			driveCapTB,
			dataToReconstructGB: Math.round(dataToReconstructGB),
			raidz2TimeHours: finalRaidzHours,
			draidTimeMinutes: finalDraidMinutes,
			speedupFactor: Number(((finalRaidzHours * 60) / finalDraidMinutes).toFixed(1)),
			survivingDrives
		};
	}, [driveType, driveCount, poolLoadPct, rebuildFailedDrives, hasSpecialVdev]);

	// Bcachefs Multi-Tiering & B-Tree Journal Metrics
	const bcachefsMetrics = useMemo(() => {
		const isNvme = driveType === "nvme_u3";
		// 4K random write IOPS at QD32
		const foregroundIops = isNvme ? 580000 : 420000;
		// 256 KB B-tree node with interior bset appends vs rewrite entire node
		const writeAmpWithBsets = 1.08 + (dirtyBsetRatio * 0.005);
		const writeAmpWithoutBsets = 8.4; // Rewriting 256 KB on 4 KB write = 64x worst case, ~8.4x amortized
		// Background mover throughput
		const bgMigrationMBps = compressionCodec === "zstd" ? 1850 : 3400;

		return {
			foregroundIops: Math.round(foregroundIops * (1 - (poolLoadPct * 0.002))),
			writeAmpWithBsets: Number(writeAmpWithBsets.toFixed(2)),
			writeAmpWithoutBsets,
			bgMigrationMBps,
			cacheHitRatePct: 94.8
		};
	}, [driveType, dirtyBsetRatio, compressionCodec, poolLoadPct]);

	return (
		<div className="w-full bg-[#0a0e17] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 text-gray-200 font-mono shadow-2xl">
			{/* Top HUD Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 mb-6 gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-wider mb-1">
						<span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
						<span>STORAGE LAB // LINUX 6.11+ COW STORAGE KERNEL SIMULATOR</span>
					</div>
					<h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
						Bcachefs B-Tree Tiering vs. OpenZFS dRAID Engine
					</h2>
				</div>
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs rounded">
						PCIE GEN5 NVME READY
					</span>
					<span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs rounded">
						DECLUSTERED RESILVER
					</span>
				</div>
			</div>

			{/* Engine Switcher Tabs */}
			<div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-3">
				<button
					type="button"
					onClick={() => setEngine("openzfs_draid")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						engine === "openzfs_draid"
							? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					1. OpenZFS dRAID vs. RAIDZ2 Declustered Rebuild Lab
				</button>
				<button
					type="button"
					onClick={() => setEngine("bcachefs_tiering")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						engine === "bcachefs_tiering"
							? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_rgba(34,238,68,0.3)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					2. Bcachefs B-Tree Journal &amp; 3-Tier Routing Lab
				</button>
			</div>

			{/* TAB 1: OPENZFS dRAID LAB */}
			{engine === "openzfs_draid" && (
				<div className="space-y-6">
					{/* Array Controls */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
						<div>
							<div className="text-xs text-gray-400 mb-1">Drive Spindle Media:</div>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => setDriveType("nvme_u3")}
									className={`flex-1 py-1 px-2 rounded text-xs font-bold transition-all ${
										driveType === "nvme_u3"
											? "bg-cyan-500/30 text-cyan-300 border border-cyan-500"
											: "bg-black/40 text-gray-400 border border-gray-800"
									}`}
								>
									15.36TB U.3 NVMe
								</button>
								<button
									type="button"
									onClick={() => setDriveType("hdd_sas_24tb")}
									className={`flex-1 py-1 px-2 rounded text-xs font-bold transition-all ${
										driveType === "hdd_sas_24tb"
											? "bg-amber-500/30 text-amber-300 border border-amber-500"
											: "bg-black/40 text-gray-400 border border-gray-800"
									}`}
								>
									24TB SAS HDD
								</button>
							</div>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1">Total Chassis Spindles:</div>
							<div className="flex gap-2">
								{([24, 36, 60] as const).map((cnt) => (
									<button
										key={cnt}
										type="button"
										onClick={() => setDriveCount(cnt)}
										className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
											driveCount === cnt
												? "bg-cyan-500/30 text-cyan-300 border border-cyan-500"
												: "bg-black/40 text-gray-400 border border-gray-800"
										}`}
									>
										{cnt} Bays
									</button>
								))}
							</div>
						</div>

						<div>
							<div className="flex justify-between text-xs text-gray-400 mb-1">
								<span>Live Pool I/O Load:</span>
								<span className="text-cyan-400 font-bold">{poolLoadPct}%</span>
							</div>
							<input
								type="range"
								min="0"
								max="90"
								step="10"
								value={poolLoadPct}
								onChange={(e) => setPoolLoadPct(Number(e.target.value))}
								className="w-full accent-cyan-400 cursor-pointer"
							/>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1">NVMe &apos;Special&apos; Class vdev:</div>
							<button
								type="button"
								onClick={() => setHasSpecialVdev(!hasSpecialVdev)}
								className={`w-full py-1.5 px-3 rounded text-xs font-bold transition-all ${
									hasSpecialVdev
										? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
										: "bg-black/40 text-gray-500 border border-gray-800"
								}`}
							>
								{hasSpecialVdev ? "ENABLED (3-Way Mirror Gen5)" : "DISABLED (Spindle Metadata)"}
							</button>
						</div>
					</div>

					{/* Rebuild Benchmark Head-to-Head */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Classic RAIDZ2 Bottleneck */}
						<div className="p-4 bg-red-950/20 border border-red-900/40 rounded-xl space-y-3">
							<div className="flex items-center justify-between border-b border-red-900/30 pb-2">
								<span className="font-bold text-red-400 text-xs">TRADITIONAL RAIDZ2 REBUILD</span>
								<span className="text-[10px] bg-red-900/40 text-red-300 px-1.5 py-0.5 rounded">Single Hot Spare</span>
							</div>
							<div className="text-2xl font-bold text-white">
								{rebuildMetrics.raidz2TimeHours} <span className="text-sm font-normal text-red-300">Hours</span>
							</div>
							<div className="text-xs text-gray-400 leading-relaxed">
								Rebuilding <span className="text-white font-bold">{rebuildMetrics.dataToReconstructGB.toLocaleString()} GB</span> requires writing through a single dedicated physical spare drive bottleneck. Rebuild leaves pool exposed to second-drive failure for days!
							</div>
							<div className="p-2.5 bg-black/50 rounded border border-red-900/30 text-[11px] font-mono text-red-300/90">
								Status: CRITICAL VULNERABILITY WINDOW (Single disk I/O saturated)
							</div>
						</div>

						{/* dRAID Declustered Resilver */}
						<div className="p-4 bg-cyan-950/30 border border-cyan-800/60 rounded-xl space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
							<div className="flex items-center justify-between border-b border-cyan-800/40 pb-2">
								<span className="font-bold text-cyan-300 text-xs">OPENZFS dRAID2 PARALLEL RESILVER</span>
								<span className="text-[10px] bg-cyan-900/50 text-cyan-300 px-1.5 py-0.5 rounded">
									{rebuildMetrics.survivingDrives}x Parallel Fanout
								</span>
							</div>
							<div className="text-2xl font-bold text-emerald-400">
								{rebuildMetrics.draidTimeMinutes} <span className="text-sm font-normal text-cyan-300">Minutes</span>
								<span className="ml-2 text-xs bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-2 py-0.5 rounded">
									{rebuildMetrics.speedupFactor}x Faster!
								</span>
							</div>
							<div className="text-xs text-gray-400 leading-relaxed">
								Virtual spare slices are striped across all {driveCount} disks. Reconstructed parity writes fan out across all {rebuildMetrics.survivingDrives} surviving drives simultaneously in sequential LBA order!
							</div>
							<div className="p-2.5 bg-black/50 rounded border border-cyan-800/40 text-[11px] font-mono text-cyan-300">
								Topology: draid2:8d:{driveCount}c:2s // Zero Merkle Tree Walks
							</div>
						</div>
					</div>

					{/* ASCII Drive Chassis Grid */}
					<div className="p-4 bg-black/70 border border-gray-800 rounded-xl space-y-2">
						<div className="flex justify-between items-center text-xs text-gray-400">
							<span className="font-bold text-gray-300">// {driveCount}-BAY CHASSIS PERMUTATION DRIVE MAP</span>
							<span className="text-cyan-400 text-[11px]">Drive D04: FAULTED // Reconstructing to Distributed Spare Slices</span>
						</div>
						<div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 pt-2">
							{Array.from({ length: driveCount }).map((_, i) => {
								const isFailed = i === 3;
								return (
									<div
										key={i}
										className={`p-2 rounded text-center text-[10px] font-bold border transition-all ${
											isFailed
												? "bg-red-950/80 border-red-500 text-red-300 animate-pulse"
												: "bg-gray-900/60 border-cyan-900/40 text-cyan-400 hover:border-cyan-400"
										}`}
									>
										<div>D{String(i).padStart(2, "0")}</div>
										<div className="text-[8px] text-gray-500 mt-0.5">
											{isFailed ? "FAULT" : "PARALLEL"}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{/* TAB 2: BCACHEFS TIERING & B-TREE JOURNAL LAB */}
			{engine === "bcachefs_tiering" && (
				<div className="space-y-6">
					{/* Bcachefs Controls */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
						<div>
							<div className="flex justify-between text-xs text-gray-400 mb-1">
								<span>Dirty B-Tree `bset` Log Ratio:</span>
								<span className="text-emerald-400 font-bold">{dirtyBsetRatio}%</span>
							</div>
							<input
								type="range"
								min="5"
								max="80"
								step="5"
								value={dirtyBsetRatio}
								onChange={(e) => setDirtyBsetRatio(Number(e.target.value))}
								className="w-full accent-emerald-400 cursor-pointer"
							/>
							<div className="text-[10px] text-gray-500 mt-1">
								Interior append log vs. node rewrite threshold
							</div>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1">Background Tier Compression:</div>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => setCompressionCodec("zstd")}
									className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${
										compressionCodec === "zstd"
											? "bg-emerald-500/30 text-emerald-300 border border-emerald-500"
											: "bg-black/40 text-gray-400 border border-gray-800"
									}`}
								>
									zstd:6 (Max Ratio)
								</button>
								<button
									type="button"
									onClick={() => setCompressionCodec("lz4")}
									className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${
										compressionCodec === "lz4"
											? "bg-cyan-500/30 text-cyan-300 border border-cyan-500"
											: "bg-black/40 text-gray-400 border border-gray-800"
									}`}
								>
									lz4 (High IOPS)
								</button>
							</div>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1">Target Tier Allocation:</div>
							<div className="p-2 bg-black/40 rounded border border-gray-800 text-[11px] text-emerald-400">
								foreground=nvme, background=archive, promote=nvme
							</div>
						</div>
					</div>

					{/* Metrics Grid */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">Foreground 4K Sync IOPS</div>
							<div className="text-lg font-bold text-emerald-400">{bcachefsMetrics.foregroundIops.toLocaleString()}</div>
							<div className="text-[10px] text-gray-400">Direct PCIe Gen5 NVMe</div>
						</div>
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">Write Amplification</div>
							<div className="text-lg font-bold text-cyan-400">{bcachefsMetrics.writeAmpWithBsets}x</div>
							<div className="text-[10px] text-gray-400">vs {bcachefsMetrics.writeAmpWithoutBsets}x on full rewrite</div>
						</div>
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">Async Background Mover</div>
							<div className="text-lg font-bold text-purple-400">{bcachefsMetrics.bgMigrationMBps} MB/s</div>
							<div className="text-[10px] text-gray-400">bch2_move_data kernel thread</div>
						</div>
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">Bucket Invalidation</div>
							<div className="text-lg font-bold text-amber-400">O(1)</div>
							<div className="text-[10px] text-gray-400">Monotonic bucket-&gt;gen</div>
						</div>
					</div>

					{/* Architecture Explainer */}
					<div className="p-4 bg-black/60 border border-gray-800 rounded-xl space-y-3 text-xs leading-relaxed text-gray-300">
						<div className="font-bold text-emerald-400">
							Why Bcachefs B-Tree Extents Eliminate Random 4K Fragmentation
						</div>
						<p>
							Traditional CoW systems (Btrfs, ZFS) allocate 4K metadata blocks individually for every file update. Bcachefs operates as a unified extent database: extents are represented as <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded">bkey</code> structs (<code className="text-gray-300">inode:offset -&gt; disk_ptr, checksum, compression</code>). A 256 KB B-tree node is updated by appending a 4K <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded">bset</code> without rewriting the full 256 KB block, reducing flash wear and write amplification by up to <strong>7x</strong> on transactional workloads.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
