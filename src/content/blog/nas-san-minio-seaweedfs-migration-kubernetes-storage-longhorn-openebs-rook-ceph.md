---
title: "NAS, SAN & Cloud-Native Storage Wars: Escaping the MinIO Licensing Trap with SeaweedFS and Benchmarking Longhorn, OpenEBS & Rook-Ceph"
description: "A bare-metal systems engineering deep dive into SAN (NVMe-oF vs. iSCSI) and NAS (NFSv4.2/RDMA) internals, why MinIO's AGPLv3 relicensing and repository sunset triggered a mass exodus to Apache-2.0 SeaweedFS Haystack volumes, how Longhorn v2, OpenEBS Mayastor, Rook-Ceph, LINSTOR/DRBD, and Democratic-CSI compare on Kubernetes, and how Axonwall converges OpenZFS, hardened SeaweedFS WORM Vaults, and 2-node K3s OpenEBS."
pubDate: "2026-11-12"
updatedDate: "2026-11-12"
heroImage: "43.jpg"
tags: ["storage", "kubernetes", "linux", "infrastructure", "devops", "open-source", "axonwall"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

Storage is where stateless cloud-native abstractions collide head-first with kernel physics, network queue depths, and open-source licensing politics.

Over the past eighteen months, platform teams and bare-metal operators have been hit by two simultaneous shockwaves:
1. **The MinIO Implosion**: What began with MinIO's relicensing from `Apache 2.0` to `GNU AGPLv3` escalated rapidly—stripping administrative features out of the Community Edition web console in May 2025 behind a `\$96,000/year` **AIStor** enterprise paywall, halting official pre-built Docker images in October 2025, and archiving the upstream community repository into read-only maintenance by early 2026.
2. **The NVMe-oF & SPDK Revolution in Kubernetes Storage**: Legacy TCP/iSCSI and kernel-interrupt bottlenecks can no longer keep up with PCIe Gen4/Gen5 NVMe drives capable of `1.5M+` 4K random IOPS per spindle. A new wave of user-space poll-mode (`SPDK` + `NVMe-oF/TCP`) and in-kernel (`DRBD 9`) Container Storage Interface (`CSI`) engines has radically redrawn the trade-offs between **Longhorn**, **OpenEBS**, **Rook-Ceph**, **LINSTOR/Piraeus**, and external **NAS/SAN** arrays.

In this dispatch, we tear down the exact Linux I/O data paths separating **SAN (Block)**, **NAS (Shared File)**, and **Object (`S3`)** protocols, dissect why **SeaweedFS (`Apache 2.0`)** outperforms MinIO on small-file physics as well as open-source governance, and benchmark every major Kubernetes CSI engine so you can pick the right storage substrate without burning CPU cores or corrupting `XFS` journals. Use the interactive **Cloud-Native Storage Engine & SeaweedFS Migration Simulator** at the bottom of the article to test your exact cluster topology.

---

## 1. Storage First Principles: SAN (Block) vs. NAS (File) vs. Object (`S3`) on Modern Linux Fabrics

Before evaluating distributed storage operators, it helps to trace *who owns the inode table and block allocator* across the three fundamental storage planes. Nearly every production Kubernetes storage outage stems from treating a block SAN volume like a shared NAS filesystem—or running database random-write WAL journals over a high-latency POSIX FUSE mount.

![SAN Block vs. NAS Distributed File vs. Object S3 Data Planes on Linux](/images/nas-vs-san-vs-object-nvmeof-storage-stack.jpg)
*Figure 1: End-to-end Linux I/O stacks across SAN Block (`iSCSI` vs. `NVMe-oF/TCP` vs. `NVMe-oF/RDMA`), NAS Shared File (`NFSv4.2`, `SMB3 Direct`, `CephFS`, `SeaweedFS Filer`), and stateless HTTP/2 `S3` Object storage.*

### SAN (`Storage Area Network` — Disaggregated Block)
A SAN exports raw **Logical Block Addresses (`LBAs`)** over the network (`512B` or `4096B` sectors). The remote storage target knows nothing about files, directories, or permissions; **the client pod's Linux kernel formats the device (`XFS` or `ext4`) and caches metadata locally in its own page cache**.

- **Why `NVMe-oF` Obliterated `iSCSI`**: Classic `iSCSI` (`RFC 7143`) encapsulates `1980s` SCSI Command Descriptor Blocks (`CDBs`) inside a single serialized TCP stream, funneling multi-core NVMe concurrency through legacy SCSI LUN queue locks (`128–256` commands). **NVMe over Fabrics (`NVMe-oF`)** maps the native PCIe NVMe command set directly onto **`nvme-tcp`** (standard Ethernet) or **`nvme-rdma`** (`RoCEv2` / InfiniBand), exposing up to **64,000 parallel Submission/Completion Queue pairs with 64,000 commands each**—pinned 1:1 to host CPU cores via Linux `blk-mq` or user-space `SPDK` with zero lock contention!
- **The Multi-Mount Corruption Trap**: Because `XFS` and `ext4` assume exclusive ownership of their allocation groups and replay journals in local RAM, **mounting the same SAN block LUN read-write on two nodes simultaneously will shred the filesystem within seconds**. In Kubernetes, block SAN volumes map strictly to `ReadWriteOnce (RWO)` or `ReadWriteOncePod (RWOP)` (unless exposed as unformatted `volumeMode: Block` to a cluster-aware consumers like `KubeVirt` live migration or `OCFS2`/`GFS2` with `SCSI-3 Persistent Reservations` / `NVMe Reservations` fencing).

### NAS (`Network-Attached Storage` — Shared POSIX File)
A NAS shifts the filesystem, inode B-tree, and byte-range lock manager (`NLM` / `NFSv4` stateful leases) onto the **storage server** (or a distributed Metadata Server cluster like `CephFS MDS` or `SeaweedFS Filer`).

- **Modern High-Throughput Linux NAS (`NFSv4.2` + `nconnect` & `RDMA`)**: Historically, Linux `NFS` mounted a single TCP socket per server IP, bottlenecking 25GbE/100GbE links on single-core softirq serialization. Mounting **`NFSv4.2`** with `-o vers=4.2,nconnect=16,noatime` multiplexes RPCs across **16 parallel TCP connections**, unlocks server-side `copy_file_range()` cloning, sparse-file hole punching (`fallocate`), and POSIX ACLs—while **`proto=rdma,port=20049` (`NFSoRDMA`)** bypasses kernel socket copies entirely on ConnectX NICs.
- **When NAS Wins—and When It Hurts**: NAS natively satisfies Kubernetes **`ReadWriteMany (RWX)`** so dozens of pods can read and write a shared directory tree safely. However, every `open()`, `stat()`, and `unlink()` requires network metadata round-trips and distributed lock coordination—making NAS roughly `3x–8x` slower than raw `NVMe-oF` SAN on `fsync()`-heavy SQLite or PostgreSQL workloads.

### Object Storage (`S3` REST API)
Object engines discard hierarchical POSIX locking completely in favor of flat namespaces, immutable full-object writes (`PUT` / `Multipart Upload`), HTTP range reads (`GET Range: bytes=...`), rich HTTP headers, and wide **Reed-Solomon Erasure Coding (`EC 8+4` or `10+4`, only `1.4x–1.5x` raw disk overhead vs. `3.0x` for 3-way block replication)**.

| Architectural Dimension | SAN (Block: `NVMe-oF` / `iSCSI` / `RBD`) | NAS (File: `NFSv4.2` / `CephFS` / `Filer`) | Object (`S3`: `SeaweedFS` / `RGW` / `Garage`) |
| :--- | :---: | :---: | :---: |
| **Unit of I/O** | `4 KB` Logical Block (`LBA`) | POSIX File Descriptor + Byte Range | Immutable Key-Value Blob + Metadata |
| **K8s Access Modes** | `RWO`, `RWOP` (`RWX` only as raw `Block`) | Native `RWX`, `RWO`, `ROX` | Stateless HTTP/gRPC (or `RWX` via CSI/FUSE) |
| **Typical 4K Sync Latency** | **`50 µs` (`RDMA`) – `300 µs` (`TCP`)** | `350 µs` – `2.5 ms` | `2 ms` – `15 ms` (`TTFB`) |
| **Storage Efficiency** | `2x–3x` Replication (`200%–300%` raw) | `2x–3x` Rep or ZFS `dRAID`/`RAIDZ2` | **Reed-Solomon EC (`140%–150%` raw)** |
| **Ideal Workloads** | PostgreSQL, etcd, Kafka, ClickHouse, VMs | Shared media, CI caches, legacy CMS | AI checkpoints, Parquet/Iceberg, WORM backups |

---

## 2. The MinIO Licensing Fallout—and Why Everyone Is Migrating to SeaweedFS

For years, **MinIO** was the reflex answer whenever an engineer needed self-hosted S3 on Kubernetes or bare metal: drop a single Go binary into a container, point it at local drives, and enjoy an S3 endpoint with a slick web console.

Then came a five-year sequence of licensing and product contractions that left self-hosted infrastructure teams, SaaS builders, and homelabbers scrambling for the exits:

1. **The `Apache 2.0` $\rightarrow$ `GNU AGPLv3` Relicensing (`2021`)**: MinIO migrated its core server from permissive `Apache 2.0` to strong network-copyleft `AGPLv3`. Under `AGPLv3` Section 13, organizations embedding or exposing modified/integrated network services face severe legal compliance ambiguity unless they purchase a commercial license—triggering immediate de-adoption across corporate compliance teams and cloud appliance vendors.
2. **Gutting the Community Admin Console (`May 2025`)**: MinIO abruptly stripped IAM policy management, OIDC/LDAP configuration, bucket replication controls, lifecycle rules, and cluster diagnostics out of the open-source web console (`PR #21107`), relegating the free UI to a barebones object browser while locking administration behind **MinIO AIStor** (enterprise licensing starting around `\$96,000/year`).
3. **Pulling Official Binaries & Docker Images (`October 2025`)**: Public `minio/minio` container image releases were halted in favor of a source-only build model, breaking automated Helm/GitOps image-update pipelines overnight.
4. **Maintenance Mode & Upstream Archival (`Late 2025 – Early 2026`)**: The community `minio/minio` GitHub repository entered unmaintained status and was archived read-only—ending community pull requests and public open-source CVE patch releases.

![The MinIO Licensing Trap vs. SeaweedFS Apache 2.0 Haystack Engine](/images/minio-to-seaweedfs-architecture-migration.jpg)
*Figure 2: Timeline of the MinIO licensing & maintenance-mode crunch alongside the architectural leap from MinIO's per-object XFS `xl.meta` shard layout to SeaweedFS's Facebook-Haystack inspired `O(1)` 30 GB superblock volumes.*

### Why SeaweedFS (`Apache 2.0`) Isn't Just a License Escape Hatch—It Fixes MinIO's Worst Disk Bottleneck

When engineering teams audited replacements (**SeaweedFS**, **Ceph RGW**, **Garage**, and **Apache Ozone**), **SeaweedFS** surged to the top—not merely because Chris Lu and the SeaweedFS community maintain clean, permissive **`Apache 2.0`** licensing, a full built-in Admin UI, S3 IAM, and [S3 Object Lock Compliance Mode](/blog/immutable-backups-s3-object-lock-seaweedfs-kopia-restic), but because **SeaweedFS solves the small-file metadata storm that crippled large MinIO clusters**.

Look at what happens on disk when you store **100 million `16 KB` objects** (AI JSONL records, image tiles, build artifacts, or kopia/restic backup packs) across a 12-drive erasure set:

- **Inside MinIO (`xl.meta` Per-Object File Layout)**:
  MinIO maps every S3 object key directly onto the host's `XFS` directory tree. Even when MinIO inlines tiny payloads inside `xl.meta`, **a single S3 `PUT` creates a dedicated directory plus an `xl.meta` file across all 12 drives in the erasure stripe**!
  $$\text{Inodes}_{\text{MinIO}} \approx N_{\text{objects}} \times W_{\text{stripe}} \times 2 \implies 100\text{M} \times 12 \times 2 = 2.4\text{ Billion XFS Inodes!}$$
  Because `XFS` allocates a minimum `4 KB` block (or inode extent) per metadata file, disk space bloats dramatically, Linux VFS `dentry` and `inode` caches evict under pressure, `LIST` operations crawl, and drive rebuild ("healing") requires walking hundreds of millions of POSIX directories via `getdents64()` and `stat()`.

- **Inside SeaweedFS (Facebook `Haystack` $O(1)$ Superblock Volumes)**:
  SeaweedFS implements the architecture pioneered by Facebook's **Haystack** photo store:
  1. **Raft Master Cluster (Zero Per-Object Metadata)**: Masters *only* map `VolumeID -> VolumeServer` (`30 GB` chunks). Masters never touch individual object keys—meaning Master RAM stays tiny regardless of whether you store 1 million or 10 billion objects.
  2. **Volume Servers (`O(1)` Single-Seek `.dat` Superblocks)**: Instead of creating millions of `XFS` files, a Volume Server pre-allocates a handful of **`30 GB` `.dat` superblock files** and appends objects sequentially as **8-byte-aligned `Needles`** (`[Header | Key | Data | Checksum]`). An in-memory (or `LevelDB` NVMe-backed) `.idx` map stores just `24–40 bytes` per object (`NeedleId -> 8-byte Offset, Size`). Serving a `GET` requires **exactly 1 disk seek (`pread()` on an already-open file descriptor)**—zero directory traversal, zero `stat()`, zero `open()`!
  3. **Automatic Background Reed-Solomon Erasure Coding (`10+4`)**: Hot writes land fast on replicated active volumes (`-replication=001` or `010`). Once a `30 GB` volume fills up and goes cold, SeaweedFS automatically encodes it into **`10+4` Reed-Solomon `.ec00`–`.ec13` shards** (`1.4x` storage overhead) across racks while keeping `O(1)` random offset reads!
  4. **The Filer Superpower (Unified `S3` + `ReadWriteMany` POSIX + WebDAV)**: SeaweedFS's stateless **Filer** tier (backed by `Postgres`, `TiKV`, `Cassandra`, or local `LevelDB2`) maps human-readable directory paths and S3 buckets onto Volume `FileId`s. That means an ETL pipeline can ingest training shards over the **`S3` REST API (`port 8333`)**, and PyTorch GPU pods can immediately `mmap()` and read those *exact same files* via the **SeaweedFS Kubernetes `ReadWriteMany` CSI driver** with zero data copying!

> [!TIP]
> **When Should You Pick `Garage` Instead of `SeaweedFS`?** If you run a geo-distributed cluster across high-latency residential fiber or multi-region VPS nodes (`50–120 ms` WAN RTT) and *only* need lightweight S3 (no POSIX FUSE/CSI mounts), **[Garage](https://garagehq.deuxfleurs.fr/)** (written in Rust, Dynamo-inspired CRDT metadata without fragile WAN Raft consensus) runs in `< 256 MB` of RAM. Note that Garage is `AGPLv3` (stewarded by a non-profit French collective rather than a VC-backed single-vendor entity), whereas **SeaweedFS** is permissive `Apache 2.0`.

### Zero-Downtime Migration Blueprint: MinIO $\rightarrow$ SeaweedFS

Because SeaweedFS speaks native AWS Signature v4 S3 (`PutObject`, `Multipart`, `Versioning`, `Object Lock`, and IAM policies), migrating off a frozen MinIO deployment requires zero application code rewrites:

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Launch a high-concurrency rclone sync from legacy MinIO to SeaweedFS S3 Gateway
#    --checksum verifies MD5/ETag integrity; --s3-upload-concurrency saturates 25GbE links
rclone sync minio-legacy:prod-lakehouse seaweed-s3:prod-lakehouse \
  --checksum \
  --transfers=64 \
  --checkers=128 \
  --s3-chunk-size=64M \
  --s3-upload-concurrency=16 \
  --fast-list \
  --progress

# 2. Optional: Zero-Downtime Lazy Cutover via SeaweedFS Filer Remote Storage Mount!
#    SeaweedFS can mount the old MinIO bucket directly into its namespace, lazily caching
#    reads onto SeaweedFS Volume Servers while writing all new PUTs natively to SeaweedFS:
weed shell << 'EOF'
remote.configure -name=legacy_minio -type=s3 \
  -s3.access_key=MINIO_RO_KEY \
  -s3.secret_key=MINIO_RO_SECRET \
  -s3.endpoint=https://minio.internal.lan:9000
remote.mount -dir=/buckets/prod-lakehouse -remote=legacy_minio/prod-lakehouse
EOF
```

---

## 3. Benchmarking Kubernetes CSI Storage: Longhorn vs. OpenEBS vs. Rook-Ceph (and the Sleeper Contenders)

Once object storage is consolidated on SeaweedFS (or Ceph RGW), every Kubernetes architect faces the hardest infrastructure question in cluster design: **Which Container Storage Interface (`CSI`) engine should back our `PersistentVolumeClaims` (`PVCs`)?**

Let's compare the actual kernel and user-space data paths of the major contenders in 2026.

![Kubernetes CSI Storage Engines Data Plane Comparison](/images/kubernetes-csi-storage-engines-architecture.jpg)
*Figure 3: Kernel vs. User-Space (`SPDK`) I/O paths across Longhorn (`v1` iSCSI vs. `v2` SPDK NVMe-oF), OpenEBS (`LocalPV` vs. `Mayastor`), Rook-Ceph (`BlueStore`/`Crimson`), and LINSTOR/Piraeus (`DRBD 9`) + Democratic-CSI.*

### 1. Longhorn (`v1` Classic iSCSI vs. `v2` SPDK Data Engine)
Originally created by Rancher (now a CNCF Incubating project), **Longhorn** partitions storage so *each Kubernetes volume gets its own isolated controller and replica micro-engine*, preventing one noisy or rebuilding volume from taking down the rest of the cluster.

- **Longhorn `v1` Data Engine (`Go` + `tgtd` iSCSI)**:
  - *How it works*: Pod writes hit a Linux `iscsi_tcp` block device $\rightarrow$ `tgtd` target $\rightarrow$ Longhorn Engine (user-space Go process) $\rightarrow$ synchronous TCP fan-out to 3 Longhorn Replica processes backed by sparse `.img` files on host `XFS`/`ext4`.
  - *Strengths*: Effortless `helm install`, rock-solid rolling upgrades, built-in `RWX` helper pods (via automated NFSv4 server export), and **best-in-class incremental S3 volume backups & disaster-recovery standby volumes** (which point directly at your new SeaweedFS S3 cluster!).
  - *Bottleneck*: Context switching between kernel `iscsi_tcp`, `tgtd`, Go garbage-collected user space, and host `XFS` caps 4K synchronous writes around `15K–55K` IOPS with `1.5–3.5 ms` tail latency.
- **Longhorn `v2` Data Engine (`SPDK` + `NVMe-oF/TCP`)**:
  - *How it works*: Replaces `tgtd`/Go entirely with **Intel SPDK (`spdk_tgt`)**, `2 MiB` HugePages, SPDK RAID `bdev` + thin-provisioned `lvol` logical volumes (claiming raw disks via `vfio-pci` / `uio_pci_generic`), and exports volumes over **`NVMe-oF/TCP`**.
  - *Trade-off*: Vaults 4K performance past `250K+` IOPS at `< 0.5 ms` latency, **but** requires pre-allocating `2 GiB+` HugePages and dedicating pinned CPU cores that spin at `100%` poll-mode utilization on every storage node.

### 2. OpenEBS (`LocalPV` ZFS/LVM & `Mayastor` Rust SPDK)
OpenEBS (CNCF Incubating) splits cleanly into two philosophies—and knowing when to use each saves massive hardware spend:

- **Architectural Golden Rule: Never Replicate Twice (`OpenEBS LocalPV-ZFS` / `LocalPV-LVM` / `TopoLVM`)**:
  Suppose you deploy a 3-node **CloudNativePG** (PostgreSQL), **ClickHouse**, **TiKV**, **etcd**, or **Kafka** cluster. Those databases *already* replicate every transaction across 3 nodes at the application layer! If you place each database pod on a 3x-replicated Longhorn or Ceph RBD volume, **1 logical `WAL` write triggers $3 \times 3 = 9$ physical NVMe writes plus 6 east-west network traversals**!
  Using **`OpenEBS LocalPV-ZFS`** (or **`TopoLVM`**) provisions node-local NVMe volumes dynamically with **zero network hops**, delivering **`600,000+` 4K IOPS at `< 90 µs` latency**, native `BLAKE3`/`fletcher4` bit-rot protection, transparent `lz4`/`zstd` compression, and instant `VolumeSnapshot` clones.
- **`OpenEBS Mayastor` (Replicated `NVMe-oF` Engine in Rust)**:
  When running single-instance stateful workloads that lack built-in replication (e.g., Prometheus TSDB, Redis standalone, legacy apps, or `KubeVirt` VMs), **Mayastor** provides N-way synchronous block replication written from scratch in **Rust** over **SPDK + `NVMe-oF/TCP`**. It routinely tops Kubernetes storage benchmarks (`350K–500K+` 4K random IOPS, `~200 µs` latency), with the same SPDK caveat: every `io-engine` DaemonSet pod pins `1–2+` dedicated physical CPU cores at `100%` continuous polling.

### 3. Rook-Ceph (`BlueStore` & Next-Gen `Crimson / SeaStar` OSDs)
As we detailed in our [Bare-Metal Talos + Cilium + Rook-Ceph blueprint](/blog/bare-metal-kubernetes-talos-cilium-rook-ceph), **Rook-Ceph** (CNCF Graduated) is the undisputed sovereign heavyweight when you want **all three storage primitives unified under one self-healing `CRUSH` placement map**:
1. **`Ceph RBD` (SAN Block)**: Thin-provisioned `RWO`/`RWOP` block devices via kernel `krbd`—battle-tested at multi-petabyte scale.
2. **`CephFS` (NAS Shared File)**: True POSIX-compliant, high-availability **`ReadWriteMany (RWX)`** backed by active-active/standby Metadata Servers (`MDS`)—far faster and cleaner than bolting single-pod NFS-Ganesha shims onto block volumes.
3. **`Ceph RGW` (S3 Object)**: Enterprise `LGPLv2.1` S3/Swift gateway with multi-site federation and Object Lock.

- **What's New (`Crimson` OSDs)**: Classic Ceph `BlueStore` OSDs use multi-threaded C++ work queues that hit mutex/context-switch walls above `~150K–250K` IOPS per NVMe drive. The next-generation **`Crimson` OSD** (built on the **`SeaStar`** share-nothing, thread-per-core asynchronous framework) eliminates cross-core locking to unlock Gen5 NVMe scaling.
- **When Rook-Ceph Bites Back**: Never shoehorn Rook-Ceph onto 3 tiny mini-PCs with consumer QLC SSDs (lacking Power-Loss Protection `PLP` capacitors!) over a `1GbE` switch. When 1 node in a 3-node `size=3` Ceph cluster goes offline for maintenance, Ceph cannot re-replicate degraded Placement Groups (`PGs`) elsewhere—and consumer SSDs lacking `PLP` throttle `O_DSYNC` BlueStore RocksDB commits from `2,000 MB/s` down to `15 MB/s`. Budget **$\ge 4$ nodes, `25GbE+` networking, enterprise PLP NVMe drives, and `4–8 GiB` RAM per OSD**.

### 4. Three Underrated Kubernetes Storage Engines Every Architect Should Know

```text
+-----------------------------------------------------------------------------------+
|            THREE SLEEPER KUBERNETES CSI ARCHITECTURES WORTH DEPLOYING             |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  1. PIRAEUS DATASTORE / LINSTOR (Linux Kernel DRBD 9)                             |
|     Pod -> ext4/XFS -> Kernel DRBD 9 Module -> 25GbE TCP/RDMA -> Peer LVM/ZFS     |
|     [+] 300K+ 4K IOPS & sub-350us latency WITHOUT 100% SPDK CPU core polling!     |
|                                                                                   |
|  2. DEMOCRATIC-CSI (External TrueNAS OpenZFS SAN + NAS Disaggregation)            |
|     K8s CSI -> TrueNAS WebSocket API -> Dynamically creates ZFS zvol / dataset    |
|     [+] Exports RWO via NVMe-oF/TCP (or iSCSI) + RWX via NFSv4.2 from ZFS dRAID!  |
|                                                                                   |
|  3. JUICEFS / SEAWEEDFS CSI (Cloud-Native AI/ML ReadWriteMany)                    |
|     100x GPU Pods -> Local NVMe Cache -> Filer/TiKV Metadata + SeaweedFS S3 Blobs |
|     [+] Petabyte RWX checkpoints & datasets shared across clusters with S3 API!   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

1. **Piraeus Datastore / LINSTOR (`DRBD 9`, CNCF Sandbox)**:
   Want `Mayastor`-class synchronous block latency *without* sacrificing `2` CPU cores per node to `100%` SPDK polling? **Piraeus** orchestrates LINBIT's battle-hardened **`DRBD 9` Linux kernel module** atop local `LVM-Thin` or `ZFS` pools. Because replication happens entirely inside kernel interrupt/bio context (`Ring 0`), idle CPU usage sits near **`0.0%`** while active 4K transactional throughput rivals user-space SPDK!
2. **Democratic-CSI + TrueNAS (`Disaggregated SAN/NAS`)**:
   Hyperconverged storage (running storage daemons on compute nodes) isn't mandatory! If you already operate a dedicated 24-bay [OpenZFS `dRAID`](/blog/bcachefs-openzfs-raidz-draid-copy-on-write-nvme-storage-internals) storage appliance running **TrueNAS (`24.10+` / `25.x`)**, **`democratic-csi`** talks to the TrueNAS API to dynamically provision ZFS `zvols` over **`NVMe-oF/TCP`** (`RWO` SAN) and ZFS datasets over **`NFSv4.2`** (`RWX` NAS). Your Kubernetes worker nodes stay 100% stateless and disposable!
3. **JuiceFS & SeaweedFS CSI (AI/ML Scale-Out `RWX`)**:
   For GPU clusters streaming multi-terabyte SafeTensors weights and WebDataset tarballs across 64+ pods, **SeaweedFS CSI** (with local NVMe read cache) or **JuiceFS** (`Apache 2.0`, pairing a `TiKV`/`PostgreSQL` metadata engine with SeaweedFS S3 object storage) delivers massive parallel `ReadWriteMany` throughput without stateful SAN lock bottlenecks.

---

## 4. Production Head-to-Head Matrix & Deployment Configs

| Storage Engine | License | Data Plane | `RWO` Block | Native `RWX` | S3 API | 4K Rand IOPS | Idle CPU Tax | Min Nodes | Primary Sweet Spot |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **OpenEBS LocalPV-ZFS** | Apache 2.0 | Host Kernel ZFS | Yes (Local) | No | No | **`600K+`** | `~0%` | `1+` | CloudNativePG, ClickHouse, Kafka |
| **OpenEBS Mayastor** | Apache 2.0 | Rust SPDK `NVMe-oF` | Yes | No | No | **`380K–500K`** | **`1–2 Cores (100%)`** | `3+` | Ultra-low-latency replicated NVMe |
| **Piraeus / LINSTOR** | Apache 2.0 / GPLv2 | Kernel `DRBD 9` | Yes | Via HA NFS | No | **`300K–400K`** | `~0.1 Core` | `2–3+` | High-IOPS DBs without SPDK CPU burn |
| **Longhorn `v2`** | Apache 2.0 | C SPDK `lvol` `NVMe-oF` | Yes | `v1` NFS | Backup Client | `220K–300K` | **`1+ Core (100%)`** | `3+` | Fast block + turnkey S3 DR backups |
| **Longhorn `v1`** | Apache 2.0 | Go + `tgtd` `iSCSI` | Yes | Built-in NFS | Backup Client | `40K–80K` | `~0.2 Core` | `3+` | Homelabs, edge K8s, effortless UI |
| **Rook-Ceph** | Apache 2.0 / LGPL | `BlueStore` / `Crimson` | Yes (`RBD`) | **Yes (`CephFS`)** | **Yes (`RGW`)** | `150K–300K+` | `~0.6 Core` | **`4+` (Prod)** | Unified Enterprise Block + File + S3 |
| **SeaweedFS** | **Apache 2.0** | Haystack `O(1)` + Filer | No | **Yes (`CSI`)** | **Yes (Native)** | `80K+` (Meta) | `~0.2 Core` | `1–3+` | **#1 MinIO replacement + AI `RWX`** |
| **Democratic-CSI** | MIT | External ZFS `NVMe-oF`/`NFS` | Yes | **Yes (`NFSv4.2`)** | No | Array-bound | **`~0%` on K8s** | `1` Array | Disaggregated TrueNAS + Stateless K8s |
| **Axonwall (`core-nas` + `core-k3s` + `Vault`)** | **GPLv2+** | OpenZFS + Hardened SeaweedFS + OpenEBS | **Yes (`ZVOL` / `Mayastor`)** | **Yes (`SMB3` / `NFSv4`)** | **Yes (WORM `8333`)** | **`395K–600K+`** | `~0.15 Core` (Local) | **`1–2+` (HA)** | **Converged 1–2 Node ZFS NAS/SAN + WORM Vault + K3s** |

### Production Kernel Prep & `StorageClass` Manifests (`NVMe-oF` + `SeaweedFS` + `NFSv4.2 nconnect`)

Before enabling any `NVMe-oF` (`Mayastor`, `Longhorn v2`, or `Democratic-CSI nvmeof`) or high-bandwidth `NFSv4.2` storage classes on Linux worker nodes, load the required kernel modules and reserve `2 MiB` HugePages (only on nodes running `SPDK` daemons):

```yaml
# 1. Host Kernel Prep (e.g., Talos machineconfig or /etc/sysctl.d/90-storage.conf)
# Modules required: nvme_tcp, vfio_pci, uio_pci_generic, drbd (if using LINSTOR)
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-nvmeof-replicated
provisioner: io.openebs.csi-mayastor # Or driver.longhorn.io with dataEngine: "v2"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
parameters:
  protocol: nvmf
  ioTimeout: "30"
  repl: "3"
  fsType: xfs
---
# 2. High-Throughput Disaggregated NAS StorageClass (NFSv4.2 with 16x Session Trunking)
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nas-zfs-nfsv42-rwx
provisioner: org.democratic-csi.nfs
allowVolumeExpansion: true
mountOptions:
  - nfsvers=4.2
  - nconnect=16
  - noatime
  - nodiratime
  - rsize=1048576
  - wsize=1048576
  - hard
---
# 3. SeaweedFS Dual-Access RWX StorageClass (POSIX Mount Over Shared S3 Buckets!)
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: seaweedfs-ai-rwx
provisioner: seaweedfs-csi-driver
allowVolumeExpansion: true
parameters:
  chunkSizeMB: "16"
  collection: "ai-datasets"
  replication: "010"         # 2 copies across different racks; auto-tier cold volumes to EC
  cacheCapacityMB: "32768"   # 32 GiB local NVMe read-ahead cache per GPU worker node
  concurrentWriters: "32"
```

---

## 5. How Axonwall Converges OpenZFS NAS/SAN, Hardened SeaweedFS Vaults & 2-Node K3s OpenEBS

If you step back and look at the modern self-hosted or enterprise edge rack, an uncomfortable operational tax jumps out immediately: **appliance sprawl**. Stitching together best-of-breed sovereign storage typically forces you to deploy, patch, and monitor four completely disjoint control planes—a perimeter router/firewall, a dedicated TrueNAS OpenZFS array for `SMB3`/`NFSv4`/`iSCSI`, a standalone SeaweedFS backup target for immutable S3 snapshots, and a 3-to-4-node Kubernetes cluster running OpenEBS or Ceph CSI.

**[Axonwall](https://axonwall.com)** (`v0.11+`, licensed strictly under **`GPL-2.0-or-later`** with zero `AGPLv3` feature traps or console rug-pulls) takes a fundamentally converged approach on **Linux `6.12+` LTS**. Instead of bolting fragile scripts across four operating systems, Axonwall unifies **`core-nas`**, **`Vault Edition` (SeaweedFS WORM)**, and **`core-k3s` (OpenEBS CSI)** beneath a single declarative 12-file YAML control plane (`/etc/axonwall/*.yaml`) backed by Junos-style **Commit-Confirm automatic rollback**—and can even run with `core-firewall` disabled (`capabilities.firewallEnabled: false`) as a dedicated **Host-Mode ZFS & S3 Storage Vault**, complete with a deterministic **TrueNAS SCALE** configuration importer (`pools`, `datasets`, `zvols`, `SMB3`, `NFS`, `iSCSI`, and `rclone` tasks).

![Axonwall Sovereign Storage Convergence Architecture](/images/axonwall-converged-zfs-seaweedfs-k3s-storage.jpg)

### 1. Closing SeaweedFS's Three Upstream WORM Footguns (`Axonwall Vault Edition`)

Earlier in Section 2, we saw why teams are migrating backup repositories (`Kopia`, `Restic`, `Veeam`, `CloudNativePG` Barman WAL archives, `Longhorn` DR) from frozen MinIO builds to **SeaweedFS S3 Object Lock**. However, dropping a stock `weed server -s3` container onto a Linux host creates a dangerous illusion of ransomware immutability. During Phase 0 bench auditing for **Axonwall Vault Edition**, three severe upstream posture traps surfaced—all of which Axonwall closes automatically at provisioning and `Ring 0`:

1. **Trap #1 — Coarse `"Write"` Identities Silently Grant `DeleteObjectVersion`**:
   In upstream SeaweedFS (`4.48+`), configuring a backup client with the legacy coarse `"actions": ["Write"]` credential **silently grants `s3:DeleteObjectVersion`**, while per-object retention-header `PUT`s (required by Kopia and Veeam) demand full AWS IAM policy documents. Axonwall's provisioner (`axonwall-vault-provision`) rejects coarse actions entirely: it keeps `vault-admin` strictly bound to `127.0.0.1` (never leaving the appliance) and synthesizes a scoped `vault-writer` IAM policy allowing `s3:PutObject`, `s3:PutObjectRetention`, `s3:PutObjectLegalHold`, multipart uploads, and delete-marker `s3:DeleteObject`, while **explicitly omitting `s3:DeleteObjectVersion`**.
2. **Trap #2 — The Filer HTTP Surface & Non-Empty Bucket Deletion Bypass Object Lock**:
   Out of the box, SeaweedFS's Filer HTTP listener (`:8888`) exposes a namespace admin domain that **bypasses S3 Object Lock completely** and can wipe locked buckets, while `-s3.allowDeleteBucketNotEmpty` defaults to `true` (destroying non-empty buckets instead of enforcing AWS `BucketNotEmpty` semantics). Axonwall hardens `seaweedfs.service` with `-filer.disableHttp=true` (forcing S3-to-Filer traffic over internal gRPC), `-s3.allowDeleteBucketNotEmpty=false`, and `-s3.autoCreateBucket=false`, while enforcing a static kernel `nftables` drop table (`vault_filter`) that drops Master (`9333`), Volume (`8080`), and Filer (`8888`/`18888`) ports on the wire—exposing **only TLS S3 on TCP `8333`**.
3. **Trap #3 — Unverified WORM Claims & Root-Level Substrate Tampering**:
   Before stamping `/etc/axonwall/vault-provisioned-at`, `axonwall-vault-provision --ensure` executes **four live SigV4 cryptographic probes** against the bucket: verifying retention-header `PUT` acceptance, reading back `<Mode>COMPLIANCE</Mode>`, and proving that *both* `backup-writer` and `vault-admin` receive **`HTTP 403`** when attempting `DELETE ?versionId=...` on the locked probe object. Beneath SeaweedFS, Axonwall guards the host substrate with **`CO-RE BPF-LSM`** lockdown policies, `io_uring` restriction (`ioUringDisabledMode: "2"`), `drgn` `/proc/kcore` eBPF `prog_idr` rootkit auditing, and **`ZFSBootMenu` / Dual-Root A/B / `LUKS2 + TPM 2.0`** boot integrity—closing the exact root-SSH substrate hole that undermines bare Docker S3 deployments.

### 2. Solving the 2-Node Sovereign Edge Problem (`core-nas` + `core-k3s`)

Look back at the `Min Nodes` column in our Kubernetes CSI matrix: **Rook-Ceph requires `4+` production nodes**, and **Mayastor / Longhorn require `3+` nodes** for Raft/etcd quorum and 3-way replica placement. For edge sites, branch offices, clinics, defense kits, and serious homelabs, running four 25GbE servers just to survive a hardware failure is overkill—you want **two identical bare-metal appliances** in Active/Passive or 2-Node HA.

Axonwall bridges this gap by unifying SAN, NAS, and Kubernetes CSI across a **dedicated point-to-point HA sync link (`eth3`, `mTLS` TCP `9876`)**:
- **Declarative OpenZFS NAS + LIO SAN (`core-nas`)**: Compiles `/etc/axonwall/storage.yaml` directly into OpenZFS pools (`mirror`, `raidz1-3`, `draid`, `ashift=12`, `autotrim=on`, `lz4`/`zstd`) with mirrored NVMe **`special` VDEVs** (`special_small_blocks`), `SLOG`, `L2ARC`, native `AES-256-GCM` datasets/ZVOLs, **Samba `SMB3 Multichannel`** shares (auto-wired to `.zfs/snapshot` via `shadow_copy2` for Windows Previous Versions and `fruit` for macOS Time Machine), **`NFSv4`** exports, and kernel **Linux-IO (`LIO`) `iSCSI` SAN targets** backed by `16K`-block ZVOLs. Over `eth3`, the HA engine streams raw encrypted incremental **`zfs send -w -I`** snapshots while keeping standby pools mounted `readonly=on` until VRRP failover promotes `BACKUP` to `MASTER`.
- **Zero-Touch K3s + OpenEBS StorageClasses (`core-k3s`)**: Enabling `core-k3s` in `/etc/axonwall/k3s.yaml` automatically compiles and reconciles both **`axonwall-zfs-local`** (`zfs.csi.openebs.io` for `600K+` IOPS zero-hop transactional databases) and **`axonwall-replicated-ha`** (`io.openebs.csi-mayastor` over `nvmf` with automatic `repl: "2"` when 2-host HA is active), paired with `Cilium eBPF` (`kubeProxyReplacement: true`), automated S3 etcd snapshots, and unprivileged [Linux `6.12` `BPF Token`](/blog/linux-6-12-ebpf-token-delegation-user-namespaces-bpf-lsm-containers) container profiles (`hostUsers: false`).

```yaml
# /etc/axonwall/storage.yaml — Converged OpenZFS Pool, SMB3 VSS Share & LIO iSCSI SAN
nas:
  enabled: true
  workgroup: CORP
  smbMultichannel: true
  pools:
    - name: tank
      topology: raidz2
      dataDisks: [/dev/sda, /dev/sdb, /dev/sdc, /dev/sdd, /dev/sde, /dev/sdf]
      specialDisks: [/dev/nvme0n1, /dev/nvme1n1] # Mirrored NVMe metadata + small blocks!
      specialSmallBlocks: 32K
      compression: zstd
      autotrim: true
  datasets:
    - pool: tank
      name: shares/engineering
      type: filesystem
      recordSize: 128K
      encryption: aes-256-gcm
    - pool: tank
      name: san/proxmox-vmstore
      type: zvol
      volSizeGb: 2000
      compression: lz4
  smbShares:
    - name: engineering
      path: /mnt/tank/shares/engineering
      enabled: true
      shadowCopies: true   # Exposes .zfs/snapshot directly in Windows Explorer!
      timeMachine: true
  iscsiTargets:
    - iqn: iqn.2026-11.com.axonwall:tank.proxmox-san
      enabled: true
      portalIp: 10.0.10.1  # Floating VRRP LAN VIP for seamless HA SAN failover
      portalPort: 3260
      luns:
        - lunId: 0
          zvolPath: tank/san/proxmox-vmstore
          blockSize: "4096"
---
# /etc/axonwall/k3s.yaml — Embedded 2-Node HA K3s + OpenEBS ZFS-LocalPV & Mayastor NVMe-oF
k3s:
  enabled: true
  cniPlugin: cilium-ebpf
  ciliumKubeProxyReplacement: true
  autoJoinHaPeer: true
  enableUserNamespaces: true
  etcdSnapshots:
    enabled: true
    scheduleCron: "0 */6 * * *"
    s3Enabled: true
    s3Endpoint: "10.0.10.50:8333" # Streams straight to Axonwall SeaweedFS WORM Vault!
    s3Bucket: "backups"
  openEbs:
    enabled: true
    zfsLocalPvEnabled: true
    zfsLocalPvPool: tank
    replicatedStorageEnabled: true
    defaultReplicaCount: 2
    replicatedBackingPool: tank/openebs-replicated
```

### The Pragmatic 2026 Sovereign Storage Blueprint

If you are architecting a greenfield bare-metal storage and Kubernetes stack tomorrow without cloud lock-in or `AGPLv3` licensing landmines, match the physics of your data plane to the scale of your cluster:
- **For CloudNativePG, ClickHouse, and Kafka**: Deploy **`OpenEBS LocalPV-ZFS`** (or **`TopoLVM`**) on local PLP NVMe drives (`1x` storage layer, `3x` database replication) and stream WAL archives + basebackups into a hardened **SeaweedFS S3** bucket.
- **For Dedicated Scale-Out Kubernetes Clusters ($\ge 4$ Nodes)**: Deploy **`Rook-Ceph`** (`RBD` + `CephFS`) when you need unified multi-rack block and shared POSIX filesystems—or **`Piraeus / LINSTOR (DRBD 9)`** when you want `300K+` `RWO` transactional IOPS without burning dedicated cores on `SPDK` busy-polling.
- **For S3 Object Storage, Ransomware-Proof Backup Vaults, and AI/ML Datasets**: Replace frozen **MinIO** deployments with **`SeaweedFS` (`Apache 2.0`)**—and if you need verified `COMPLIANCE` WORM immutability without Filer HTTP or coarse-policy bypasses, deploy it via **Axonwall Vault Edition** (`port 8333` only, 4-probe SigV4 verification, and `BPF-LSM` Ring-0 lockdown).
- **For 1-to-2-Node Sovereign Edge, Branch, or Hyperconverged Racks**: Consolidate the entire stack onto **[Axonwall](https://axonwall.com)** (`GPL-2.0-or-later`)—combining OpenZFS `RAIDZ`/`dRAID` (`SMB3` + `NFSv4` + `LIO iSCSI`), incremental HA `zfs send -w -I`, `OpenEBS ZFS-LocalPV`/`Mayastor`, and a hardened SeaweedFS WORM Vault under a single Git-auditable `/etc/axonwall/*.yaml` control plane.
