import React, { useState, useMemo } from "react";

type SimTab = "csi_arena" | "minio_vs_seaweed" | "nas_vs_san";
type FabricSpeed = "10g_tcp" | "25g_tcp" | "100g_roce";
type WorkloadKind = "oltp_db" | "shared_rwx" | "ai_lakehouse" | "homelab_edge";

interface CsiEngineResult {
	id: string;
	name: string;
	plane: string;
	license: string;
	accessModes: string;
	iops4k: number;
	p99LatencyMs: number;
	idleCpuCoresPerNode: number;
	ramGbPerNode: number;
	fitScore: number;
	verdict: string;
}

export default function KubernetesStorageArchitectSimulator() {
	const [activeTab, setActiveTab] = useState<SimTab>("csi_arena");

	// Tab 1 state: K8s CSI Arena
	const [nodeCount, setNodeCount] = useState<2 | 3 | 6 | 12 | 32>(6);
	const [fabric, setFabric] = useState<FabricSpeed>("25g_tcp");
	const [workload, setWorkload] = useState<WorkloadKind>("oltp_db");

	// Tab 2 state: MinIO vs SeaweedFS
	const [objectMillions, setObjectMillions] = useState<number>(100); // 10M to 1000M
	const [avgObjKb, setAvgObjKb] = useState<16 | 128 | 1024 | 16384>(16);
	const [ecParityMode, setEcParityMode] = useState<"rep3" | "ec_8_4">("ec_8_4");

	// Tab 3 state: NAS vs SAN Inspector
	const [selectedProto, setSelectedProto] = useState<"iscsi" | "nvme_tcp" | "nvme_rdma" | "nfsv42" | "seaweed_filer">("nvme_tcp");

	const csiResults = useMemo<CsiEngineResult[]>(() => {
		const netMult = fabric === "100g_roce" ? 1.45 : fabric === "25g_tcp" ? 1.0 : 0.55;
		const latPenalty = fabric === "100g_roce" ? 0.65 : fabric === "25g_tcp" ? 1.0 : 1.85;

		const engines: CsiEngineResult[] = [
			{
				id: "mayastor",
				name: "OpenEBS Mayastor",
				plane: "User-Space Rust SPDK + NVMe-oF/TCP",
				license: "Apache 2.0",
				accessModes: "RWO / RWOP (Block)",
				iops4k: Math.round(380000 * netMult),
				p99LatencyMs: Number((0.24 * latPenalty).toFixed(2)),
				idleCpuCoresPerNode: 2.0,
				ramGbPerNode: 3.5,
				fitScore:
					workload === "oltp_db" ? 94 :
					workload === "homelab_edge" ? 32 :
					workload === "shared_rwx" ? 40 : 78,
				verdict:
					workload === "homelab_edge"
						? "Avoid on small nodes: SPDK reactor threads pin 1-2 cores at 100% CPU poll continuously + 2 GiB HugePages."
						: "Blazing sub-300us NVMe-oF tail latency; ideal when you can dedicate poll-mode cores to storage."
			},
			{
				id: "linstor",
				name: "Piraeus / LINSTOR (DRBD 9)",
				plane: "Linux Kernel DRBD 9 + LVM/ZFS",
				license: "Apache 2.0 / GPLv2",
				accessModes: "RWO / RWX (via NFS/HA)",
				iops4k: Math.round(310000 * netMult),
				p99LatencyMs: Number((0.35 * latPenalty).toFixed(2)),
				idleCpuCoresPerNode: 0.15,
				ramGbPerNode: 0.8,
				fitScore:
					workload === "oltp_db" ? 96 :
					workload === "homelab_edge" ? 88 :
					workload === "shared_rwx" ? 68 : 76,
				verdict: "Sleeper champion for relational DBs: kernel-space DRBD 9 delivers near-SPDK IOPS with ~0% idle CPU burn."
			},
			{
				id: "longhorn_v2",
				name: "Longhorn v2 Data Engine",
				plane: "SPDK lvol + RAID bdev + NVMe-oF/TCP",
				license: "Apache 2.0",
				accessModes: "RWO (v2) / RWX (v1 NFS)",
				iops4k: Math.round(265000 * netMult),
				p99LatencyMs: Number((0.42 * latPenalty).toFixed(2)),
				idleCpuCoresPerNode: 1.0,
				ramGbPerNode: 2.8,
				fitScore:
					workload === "oltp_db" ? 86 :
					workload === "homelab_edge" ? 55 :
					workload === "shared_rwx" ? 65 : 74,
				verdict: "Massive leap over Longhorn v1 iSCSI via SPDK lvol snapshots + S3 delta backups, at the cost of HugePages & SPDK CPU polling."
			},
			{
				id: "longhorn_v1",
				name: "Longhorn v1 (Classic)",
				plane: "Go Controller + Linux tgtd iSCSI",
				license: "Apache 2.0",
				accessModes: "RWO / RWX (Built-in NFS)",
				iops4k: Math.round(52000 * netMult),
				p99LatencyMs: Number((2.45 * latPenalty).toFixed(2)),
				idleCpuCoresPerNode: 0.25,
				ramGbPerNode: 1.2,
				fitScore:
					workload === "homelab_edge" ? 95 :
					workload === "shared_rwx" ? 78 :
					workload === "oltp_db" ? 52 : 60,
				verdict: "Best-in-class UI, effortless upgrades, and turnkey S3 DR backups, but user-space Go + iSCSI limits heavy 4K DB IOPS."
			},
			{
				id: "rook_ceph",
				name: "Rook-Ceph (BlueStore / Crimson)",
				plane: "CRUSH OSDs: RBD + CephFS + RGW S3",
				license: "Apache 2.0 / LGPLv2.1",
				accessModes: "RWO + Native RWX + S3",
				iops4k: Math.round((nodeCount >= 6 ? 195000 : 115000) * netMult),
				p99LatencyMs: Number(((nodeCount >= 6 ? 0.85 : 1.35) * latPenalty).toFixed(2)),
				idleCpuCoresPerNode: 0.65,
				ramGbPerNode: 5.0,
				fitScore:
					nodeCount <= 2 ? 15 :
					nodeCount < 4 ? 45 :
					workload === "shared_rwx" ? 96 :
					workload === "ai_lakehouse" ? 92 :
					workload === "oltp_db" ? 82 : 50,
				verdict:
					nodeCount <= 2
						? "Cannot satisfy 3-MON quorum or 3-replica host failure domains on 2 nodes without an external arbiter."
						: nodeCount < 4
						? "Under-provisioned at 3 nodes: single node maintenance leaves minimal failure domains for OSD rebuilds."
						: "The sovereign enterprise standard when you need unified Block (RBD), POSIX Shared File (CephFS), and Object (RGW) in one cluster."
			},
			{
				id: "localpv_zfs",
				name: "OpenEBS LocalPV-ZFS / TopoLVM",
				plane: "Direct Local NVMe (0 Network Hops)",
				license: "Apache 2.0",
				accessModes: "RWO (Node-Pinned)",
				iops4k: 640000,
				p99LatencyMs: 0.09,
				idleCpuCoresPerNode: 0.05,
				ramGbPerNode: 1.0,
				fitScore:
					workload === "oltp_db" ? 98 :
					workload === "homelab_edge" ? 90 :
					workload === "shared_rwx" ? 15 : 70,
				verdict: "Why replicate twice? Pair CloudNativePG, Patroni, ClickHouse, or TiKV app-level replication with 0-hop local NVMe speed."
			},
			{
				id: "seaweed_csi",
				name: "SeaweedFS CSI + S3 + Filer",
				plane: "Haystack O(1) Volumes + Filer POSIX/S3",
				license: "Apache 2.0",
				accessModes: "Native RWX + S3 API",
				iops4k: Math.round(88000 * netMult),
				p99LatencyMs: Number((1.15 * latPenalty).toFixed(2)),
				idleCpuCoresPerNode: 0.2,
				ramGbPerNode: 1.5,
				fitScore:
					workload === "ai_lakehouse" ? 98 :
					workload === "shared_rwx" ? 93 :
					workload === "homelab_edge" ? 86 : 42,
				verdict: "Unbeatable MinIO replacement & AI/ML RWX engine: write via S3 API and mount the exact same namespace via POSIX CSI!"
			},
			{
				id: "axonwall_converged",
				name: "Axonwall (core-nas ZFS + SeaweedFS Vault + core-k3s OpenEBS)",
				plane: "OpenZFS + BPF-LSM SeaweedFS WORM + ZFS-LocalPV / 2x Mayastor",
				license: "GPL-2.0-or-later",
				accessModes: "RWO + SMB3/NFSv4 RWX + iSCSI + WORM S3",
				iops4k: nodeCount <= 2 ? 580000 : Math.round(395000 * netMult),
				p99LatencyMs: nodeCount <= 2 ? 0.11 : Number((0.22 * latPenalty).toFixed(2)),
				idleCpuCoresPerNode: workload === "homelab_edge" || nodeCount <= 2 ? 0.15 : 1.1,
				ramGbPerNode: 2.2,
				fitScore:
					nodeCount === 2 ? 99 :
					workload === "homelab_edge" ? 97 :
					workload === "oltp_db" ? 95 :
					workload === "ai_lakehouse" ? 94 : 91,
				verdict:
					nodeCount === 2
						? "Purpose-built 2-host sovereign HA: VRRP + incremental zfs send -w -I + OpenEBS ZFS-LocalPV/Mayastor + BPF-LSM SeaweedFS WORM Vault—zero 4-node Ceph tax."
						: "Converges OpenZFS NAS/SAN, hardened SeaweedFS COMPLIANCE Vault (port 8333 only, Filer HTTP disabled), and K3s OpenEBS under declarative /etc/axonwall/*.yaml."
			}
		];

		return engines.sort((a, b) => b.fitScore - a.fitScore);
	}, [nodeCount, fabric, workload]);

	const objectMetrics = useMemo(() => {
		const totalObjs = objectMillions * 1_000_000;
		const rawLogicalTB = (totalObjs * avgObjKb) / (1024 * 1024 * 1024);
		const overheadFactor = ecParityMode === "rep3" ? 3.0 : 1.5; // 8+4 Reed-Solomon = 1.5x

		// MinIO: Every object creates a directory + xl.meta + shard file across all 12 erasure stripe drives!
		// Even with inline small-object optimization in xl.meta, each drive still creates a directory + xl.meta inode per object!
		const minioInodesMillions = Math.round(objectMillions * 12 * 1.4);
		const minioDiskSeeksPerRead = avgObjKb <= 16 ? 3.2 : 4.6; // dir dentry + xl.meta stat/read + shard read
		const minioPhysicalTB = Number((rawLogicalTB * overheadFactor + (totalObjs * 4.5 * 12) / 1e12).toFixed(2)); // 4KB XFS block min per xl.meta across shards!

		// SeaweedFS: Packs objects into 30 GB Volume .dat superblocks!
		// 1 Volume = 30 GB -> total .dat files on XFS is tiny!
		const seaweedPhysicalTB = Number((rawLogicalTB * overheadFactor).toFixed(2));
		const seaweedVolumeCount = Math.max(12, Math.ceil((seaweedPhysicalTB * 1024) / 30));
		// Needle index memory: ~16 bytes (offset+size+key) to 40 bytes per needle across cluster (or LevelDB disk index mode!)
		const seaweedRamIndexGB = Number(((totalObjs * 24) / (1024 * 1024 * 1024)).toFixed(1));

		return {
			rawLogicalTB: Number(rawLogicalTB.toFixed(2)),
			minioInodesMillions,
			minioDiskSeeksPerRead,
			minioPhysicalTB,
			seaweedPhysicalTB,
			seaweedVolumeCount,
			seaweedRamIndexGB,
			smallFileAmpRatio: Number((minioPhysicalTB / Math.max(0.01, seaweedPhysicalTB)).toFixed(2))
		};
	}, [objectMillions, avgObjKb, ecParityMode]);

	const protoDetails: Record<typeof selectedProto, {
		title: string;
		category: "SAN (Block)" | "NAS (File)";
		queues: string;
		kernelPath: string;
		typicalLat: string;
		multiMount: string;
		bestFor: string;
	}> = {
		iscsi: {
			title: "iSCSI (RFC 7143 SCSI-over-TCP)",
			category: "SAN (Block)",
			queues: "Single SCSI LUN queue depth bottleneck (typically 128-256 cmds)",
			kernelPath: "Filesystem -> blk-mq -> SCSI Midlayer -> iscsi_tcp -> TCP/IP Socket",
			typicalLat: "450 us - 2,200 us",
			multiMount: "DANGER: Mounting XFS/ext4 on 2 nodes corrupts journal unless using OCFS2/GFS2 or raw block!",
			bestFor: "Legacy Enterprise SANs, Proxmox/VMware datastores over 10GbE, Longhorn v1"
		},
		nvme_tcp: {
			title: "NVMe-oF / TCP (Linux nvme-tcp / SPDK)",
			category: "SAN (Block)",
			queues: "Up to 64,000 parallel I/O queues x 64K commands (1 queue per CPU core!)",
			kernelPath: "Filesystem -> nvme-core (blk-mq per-CPU) -> nvme-tcp (or User-Space SPDK) -> NIC",
			typicalLat: "110 us - 320 us",
			multiMount: "RWO / RWOP standard; supports NVMe Reservations for fencing stateful pods",
			bestFor: "Modern bare-metal K8s SANs (Mayastor, Longhorn v2, TrueNAS 25+ democratic-csi) on standard Ethernet"
		},
		nvme_rdma: {
			title: "NVMe-oF / RDMA (RoCEv2 / InfiniBand)",
			category: "SAN (Block)",
			queues: "64K Hardware Queue Pairs (Zero-Copy NIC DMA bypasses host CPU TCP stack)",
			kernelPath: "App O_DIRECT -> nvme-rdma -> ConnectX NIC RoCEv2 Verbs -> Remote NVMe",
			typicalLat: "25 us - 75 us",
			multiMount: "RWO ultra-low jitter; pairs with GPUDirect Storage (GDS) & lossless PFC/ECN",
			bestFor: "Dedicated 100G/400G storage fabrics, HFT/OLTP clusters, disaggregated NVMe JBOFs"
		},
		nfsv42: {
			title: "NFSv4.2 + nconnect=16 / NFS-over-RDMA",
			category: "NAS (File)",
			queues: "Up to 16 multiplexed TCP streams (nconnect=16) or pNFS / RPC-over-RDMA",
			kernelPath: "VFS POSIX -> nfs4 client -> sunrpc (nconnect) -> Remote ZFS / Ceph NFS-Ganesha",
			typicalLat: "350 us - 1,800 us",
			multiMount: "SAFE RWX: Stateful server-side byte-range leases, server-side copy, sparse files",
			bestFor: "Shared Kubernetes RWX PVCs, TrueNAS ZFS datasets, media pipelines, home directories"
		},
		seaweed_filer: {
			title: "SeaweedFS Filer CSI + S3 Dual-Protocol",
			category: "NAS (File)",
			queues: "Parallel gRPC Chunk Streams directly to Volume Servers + Local Metadata Cache",
			kernelPath: "Pod VFS -> weed mount FUSE / CSI -> gRPC to Volume (.dat O(1)) + Filer KV",
			typicalLat: "550 us - 2,500 us (Streaming: Multi-GB/s)",
			multiMount: "SAFE RWX + S3: Pods mount POSIX directory while external apps query via S3 API!",
			bestFor: "AI/ML training datasets, multimodal pipelines, unified NAS + Object consolidation"
		}
	};

	const activeProto = protoDetails[selectedProto];

	return (
		<div className="w-full bg-[#0a0e17] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 text-gray-200 font-mono shadow-2xl">
			{/* Top HUD Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 mb-6 gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs text-emerald-400 uppercase tracking-wider mb-1">
						<span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
						<span>STORAGE ARCHITECT // SAN · NAS · OBJECT · K8S CSI DECISION LAB</span>
					</div>
					<h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
						Cloud-Native Storage Engine &amp; SeaweedFS Migration Simulator
					</h2>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs rounded">
						APACHE 2.0 SOVEREIGN
					</span>
					<span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs rounded">
						NVME-OF / HAYSTACK O(1)
					</span>
				</div>
			</div>

			{/* Mode Switcher */}
			<div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-3">
				<button
					type="button"
					onClick={() => setActiveTab("csi_arena")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						activeTab === "csi_arena"
							? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					1. Kubernetes CSI Engine Benchmark Matrix
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("minio_vs_seaweed")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						activeTab === "minio_vs_seaweed"
							? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_rgba(34,238,68,0.25)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					2. MinIO (xl.meta) vs. SeaweedFS O(1) Volume Analyzer
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("nas_vs_san")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						activeTab === "nas_vs_san"
							? "bg-purple-500/20 text-purple-300 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					3. SAN vs. NAS Wire Protocol Inspector
				</button>
			</div>

			{/* TAB 1: KUBERNETES CSI ARENA */}
			{activeTab === "csi_arena" && (
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
						<div>
							<div className="text-xs text-gray-400 mb-1.5">Cluster Node Count:</div>
							<div className="grid grid-cols-5 gap-1.5">
								{([2, 3, 6, 12, 32] as const).map((n) => (
									<button
										key={n}
										type="button"
										onClick={() => setNodeCount(n)}
										className={`py-1.5 rounded text-xs font-bold transition-all ${
											nodeCount === n
												? "bg-cyan-500/30 text-cyan-300 border border-cyan-500"
												: "bg-black/40 text-gray-400 border border-gray-800 hover:text-gray-200"
										}`}
									>
										{n}n
									</button>
								))}
							</div>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1.5">Storage Network Fabric:</div>
							<div className="grid grid-cols-3 gap-1.5">
								{[
									{ id: "10g_tcp", label: "10GbE" },
									{ id: "25g_tcp", label: "25GbE" },
									{ id: "100g_roce", label: "100G RoCE" }
								].map((f) => (
									<button
										key={f.id}
										type="button"
										onClick={() => setFabric(f.id as FabricSpeed)}
										className={`py-1.5 rounded text-xs font-bold transition-all ${
											fabric === f.id
												? "bg-emerald-500/30 text-emerald-300 border border-emerald-500"
												: "bg-black/40 text-gray-400 border border-gray-800 hover:text-gray-200"
										}`}
									>
										{f.label}
									</button>
								))}
							</div>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1.5">Primary Workload Target:</div>
							<select
								value={workload}
								onChange={(e) => setWorkload(e.target.value as WorkloadKind)}
								className="w-full bg-black/70 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
							>
								<option value="oltp_db">PostgreSQL / etcd OLTP (4K Sync RWO)</option>
								<option value="shared_rwx">Multi-Pod Shared POSIX (RWX)</option>
								<option value="ai_lakehouse">AI Checkpoints &amp; Lakehouse (RWX + S3)</option>
								<option value="homelab_edge">Compact / Homelab Edge (&lt;32GB RAM)</option>
							</select>
						</div>
					</div>

					{/* Ranked Engine Cards */}
					<div className="space-y-3">
						{csiResults.map((eng, idx) => (
							<div
								key={eng.id}
								className={`p-4 rounded-xl border transition-all ${
									idx === 0
										? "bg-emerald-950/25 border-emerald-500/60 shadow-[0_0_18px_rgba(34,238,68,0.12)]"
										: "bg-gray-950/60 border-gray-800"
								}`}
							>
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
									<div className="flex items-center gap-2 flex-wrap">
										<span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
											idx === 0 ? "bg-emerald-500 text-black" : "bg-gray-800 text-gray-300"
										}`}>
											#{idx + 1} FIT ({eng.fitScore}/100)
										</span>
										<span className="font-bold text-sm text-white">{eng.name}</span>
										<span className="text-[11px] text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2 py-0.5 rounded">
											{eng.accessModes}
										</span>
									</div>
									<span className="text-[11px] text-gray-400">{eng.plane}</span>
								</div>

								<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 text-xs">
									<div className="bg-black/50 border border-gray-800/80 rounded p-2">
										<div className="text-[10px] text-gray-500">4K RAND IOPS (3x Rep)</div>
										<div className="font-bold text-cyan-300">{eng.iops4k.toLocaleString()}</div>
									</div>
									<div className="bg-black/50 border border-gray-800/80 rounded p-2">
										<div className="text-[10px] text-gray-500">P99 WRITE LATENCY</div>
										<div className="font-bold text-emerald-300">{eng.p99LatencyMs} ms</div>
									</div>
									<div className="bg-black/50 border border-gray-800/80 rounded p-2">
										<div className="text-[10px] text-gray-500">IDLE CPU TAX / NODE</div>
										<div className={`font-bold ${eng.idleCpuCoresPerNode >= 1 ? "text-amber-400" : "text-gray-200"}`}>
											{eng.idleCpuCoresPerNode} Cores {eng.idleCpuCoresPerNode >= 1 ? "(SPDK Poll)" : "(Interrupt)"}
										</div>
									</div>
									<div className="bg-black/50 border border-gray-800/80 rounded p-2">
										<div className="text-[10px] text-gray-500">BASE RAM / NODE</div>
										<div className="font-bold text-purple-300">{eng.ramGbPerNode} GiB</div>
									</div>
								</div>

								<div className="text-xs text-gray-300 leading-relaxed">
									<span className="text-emerald-400 font-semibold">Architect Note: </span>
									{eng.verdict}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* TAB 2: MINIO VS SEAWEEDFS OBJECT ANALYZER */}
			{activeTab === "minio_vs_seaweed" && (
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
						<div>
							<div className="flex justify-between text-xs text-gray-400 mb-1">
								<span>Total Object Count:</span>
								<span className="text-emerald-400 font-bold">{objectMillions} Million</span>
							</div>
							<input
								type="range"
								min="10"
								max="1000"
								step="10"
								value={objectMillions}
								onChange={(e) => setObjectMillions(Number(e.target.value))}
								className="w-full accent-emerald-400 cursor-pointer"
							/>
							<div className="flex justify-between text-[10px] text-gray-500 mt-1">
								<span>10M</span>
								<span>500M</span>
								<span>1 Billion</span>
							</div>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1.5">Average Object Size:</div>
							<div className="grid grid-cols-4 gap-1.5">
								{([
									{ kb: 16, label: "16 KB" },
									{ kb: 128, label: "128 KB" },
									{ kb: 1024, label: "1 MB" },
									{ kb: 16384, label: "16 MB" }
								] as const).map((item) => (
									<button
										key={item.kb}
										type="button"
										onClick={() => setAvgObjKb(item.kb)}
										className={`py-1.5 rounded text-xs font-bold transition-all ${
											avgObjKb === item.kb
												? "bg-cyan-500/30 text-cyan-300 border border-cyan-500"
												: "bg-black/40 text-gray-400 border border-gray-800"
										}`}
									>
										{item.label}
									</button>
								))}
							</div>
						</div>

						<div>
							<div className="text-xs text-gray-400 mb-1.5">Durability Layout:</div>
							<div className="grid grid-cols-2 gap-2">
								<button
									type="button"
									onClick={() => setEcParityMode("ec_8_4")}
									className={`py-1.5 rounded text-xs font-bold transition-all ${
										ecParityMode === "ec_8_4"
											? "bg-emerald-500/30 text-emerald-300 border border-emerald-500"
											: "bg-black/40 text-gray-400 border border-gray-800"
									}`}
								>
									EC 8+4 (1.5x)
								</button>
								<button
									type="button"
									onClick={() => setEcParityMode("rep3")}
									className={`py-1.5 rounded text-xs font-bold transition-all ${
										ecParityMode === "rep3"
											? "bg-purple-500/30 text-purple-300 border border-purple-500"
											: "bg-black/40 text-gray-400 border border-gray-800"
									}`}
								>
									3x Replica (3.0x)
								</button>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* MinIO Legacy Column */}
						<div className="p-4 bg-red-950/20 border border-red-800/50 rounded-xl space-y-3">
							<div className="flex items-center justify-between border-b border-red-900/40 pb-2">
								<span className="font-bold text-red-400 text-xs">LEGACY MINIO (12-DRIVE ERASURE SET)</span>
								<span className="text-[10px] bg-red-900/50 text-red-200 px-2 py-0.5 rounded">
									AGPLv3 / Repo Archived
								</span>
							</div>

							<div className="grid grid-cols-2 gap-2 text-xs">
								<div className="p-2.5 bg-black/50 rounded border border-red-900/30">
									<div className="text-[10px] text-gray-400">XFS Inodes Created</div>
									<div className="text-lg font-bold text-red-300">
										{objectMetrics.minioInodesMillions.toLocaleString()}M
									</div>
									<div className="text-[10px] text-gray-500">xl.meta + dir per shard</div>
								</div>
								<div className="p-2.5 bg-black/50 rounded border border-red-900/30">
									<div className="text-[10px] text-gray-400">Physical Footprint</div>
									<div className="text-lg font-bold text-amber-300">
										{objectMetrics.minioPhysicalTB} TB
									</div>
									<div className="text-[10px] text-gray-500">Logical: {objectMetrics.rawLogicalTB} TB</div>
								</div>
							</div>

							<ul className="text-xs text-gray-300 space-y-1.5 list-disc pl-4 leading-relaxed">
								<li>
									<strong>Small-File Inode Amplification ({objectMetrics.smallFileAmpRatio}x):</strong> Every object spawns per-drive XFS directories + 4 KB minimum <code className="text-red-300">xl.meta</code> files across the 12-drive erasure stripe.
								</li>
								<li>
									<strong>Reads (~{objectMetrics.minioDiskSeeksPerRead} ops/shard):</strong> Path traversal + <code className="text-red-300">stat()</code> + <code className="text-red-300">xl.meta</code> parse thrash Linux dentry caches during deep bucket listings or healing.
								</li>
								<li>
									<strong>Governance Hazard:</strong> Admin Console stripped (May 2025), official Docker Hub images pulled (Oct 2025), community repo archived into AIStor enterprise paywall.
								</li>
							</ul>
						</div>

						{/* SeaweedFS Column */}
						<div className="p-4 bg-emerald-950/20 border border-emerald-500/50 rounded-xl space-y-3 shadow-[0_0_20px_rgba(34,238,68,0.1)]">
							<div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
								<span className="font-bold text-emerald-400 text-xs">SEAWEEDFS (HAYSTACK SUPERBLOCK ENGINE)</span>
								<span className="text-[10px] bg-emerald-900/50 text-emerald-200 px-2 py-0.5 rounded">
									Apache 2.0 Permissive
								</span>
							</div>

							<div className="grid grid-cols-2 gap-2 text-xs">
								<div className="p-2.5 bg-black/50 rounded border border-emerald-900/40">
									<div className="text-[10px] text-gray-400">XFS Volume Files Total</div>
									<div className="text-lg font-bold text-emerald-300">
										{objectMetrics.seaweedVolumeCount.toLocaleString()} files
									</div>
									<div className="text-[10px] text-gray-500">30 GB .dat superblocks!</div>
								</div>
								<div className="p-2.5 bg-black/50 rounded border border-emerald-900/40">
									<div className="text-[10px] text-gray-400">Physical Footprint</div>
									<div className="text-lg font-bold text-cyan-300">
										{objectMetrics.seaweedPhysicalTB} TB
									</div>
									<div className="text-[10px] text-gray-500">8-byte Needle alignment</div>
								</div>
							</div>

							<ul className="text-xs text-gray-300 space-y-1.5 list-disc pl-4 leading-relaxed">
								<li>
									<strong>True O(1) Disk Seek:</strong> Volume servers hold open file descriptors to 30 GB <code className="text-emerald-300">.dat</code> superblocks; reading any needle is a single <code className="text-cyan-300">pread(fd, buf, size, offset * 8)</code> syscall!
								</li>
								<li>
									<strong>Index Footprint:</strong> ~{objectMetrics.seaweedRamIndexGB} GB total RAM across all Volume Servers (or near-zero RAM using <code className="text-cyan-300">-index=leveldb</code> on NVMe).
								</li>
								<li>
									<strong>Unified S3 + Filer POSIX + Web UI:</strong> Drop-in S3 IAM &amp; Object Lock Compliance Mode, built-in Admin GUI, plus Kubernetes <code className="text-emerald-300">ReadWriteMany</code> CSI mounts.
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}

			{/* TAB 3: SAN VS NAS WIRE PROTOCOL INSPECTOR */}
			{activeTab === "nas_vs_san" && (
				<div className="space-y-5">
					<div className="flex flex-wrap gap-2">
						{([
							{ id: "iscsi", label: "SAN: iSCSI" },
							{ id: "nvme_tcp", label: "SAN: NVMe-oF / TCP" },
							{ id: "nvme_rdma", label: "SAN: NVMe-oF / RoCEv2" },
							{ id: "nfsv42", label: "NAS: NFSv4.2 (nconnect)" },
							{ id: "seaweed_filer", label: "NAS+S3: SeaweedFS Filer" }
						] as const).map((p) => (
							<button
								key={p.id}
								type="button"
								onClick={() => setSelectedProto(p.id)}
								className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
									selectedProto === p.id
										? "bg-purple-500/30 text-purple-200 border border-purple-400"
										: "bg-gray-900/70 text-gray-400 border border-gray-800 hover:text-gray-200"
								}`}
							>
								{p.label}
							</button>
						))}
					</div>

					<div className="p-4 bg-black/60 border border-purple-500/30 rounded-xl space-y-3 text-xs">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-2">
							<span className="text-sm font-bold text-white">{activeProto.title}</span>
							<span className={`px-2.5 py-0.5 rounded font-bold text-[11px] ${
								activeProto.category.startsWith("SAN")
									? "bg-cyan-950 text-cyan-300 border border-cyan-700"
									: "bg-emerald-950 text-emerald-300 border border-emerald-700"
							}`}>
								{activeProto.category}
							</span>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
								<div className="text-[10px] text-gray-500 uppercase mb-1">Hardware / Kernel Queue Parallelism</div>
								<div className="text-cyan-300">{activeProto.queues}</div>
							</div>
							<div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
								<div className="text-[10px] text-gray-500 uppercase mb-1">Typical 4K Network Round-Trip Latency</div>
								<div className="text-emerald-300 font-bold">{activeProto.typicalLat}</div>
							</div>
						</div>

						<div className="p-3 bg-gray-950 rounded-lg border border-gray-800">
							<div className="text-[10px] text-gray-500 uppercase mb-1">Linux Kernel / User-Space I/O Data Path</div>
							<div className="text-purple-300 font-mono">{activeProto.kernelPath}</div>
						</div>

						<div className="p-3 bg-gray-900/40 rounded-lg border border-gray-800 space-y-1">
							<div>
								<span className="text-amber-400 font-bold">Multi-Node Concurrency Rule: </span>
								<span className="text-gray-300">{activeProto.multiMount}</span>
							</div>
							<div>
								<span className="text-cyan-400 font-bold">Sweet Spot: </span>
								<span className="text-gray-300">{activeProto.bestFor}</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
