import React, { useState, useMemo } from "react";

type AttackId =
	| "io-uring-sqpoll"
	| "ebpf-getdents-sysbpf"
	| "xdp-magic-packet"
	| "uprobe-pam-override";

type SensorId =
	| "legacy_sys_enter"
	| "io_uring_tracepoints"
	| "bpftool_userspace"
	| "bpf_lsm_lockdown"
	| "kcore_prog_idr"
	| "hw_pmu_lbr";

interface AttackSpec {
	id: AttackId;
	name: string;
	implantExample: string;
	ringMechanism: string;
	syscallCount: string;
	summary: string;
	kernelPath: string[];
	sensorOutcomes: Record<
		SensorId,
		{
			verdict: "BLIND" | "SPOOFED" | "DETECTED" | "BLOCKED";
			reason: string;
		}
	>;
}

const ATTACK_SPECS: Record<AttackId, AttackSpec> = {
	"io-uring-sqpoll": {
		id: "io-uring-sqpoll",
		name: "1. io_uring SQPOLL Syscall-Less Implant",
		implantExample: "Curing / RingReaper Archetype",
		ringMechanism: "mmap() Shared SQ/CQ Ring + Kernel `iou-sqp-<pid>` Polling Thread",
		syscallCount: "0 Syscalls During File & C2 I/O",
		summary:
			"After a single `io_uring_setup(entries, IORING_SETUP_SQPOLL)` call at startup, the implant writes `IORING_OP_OPENAT`, `IORING_OP_CONNECT`, and `IORING_OP_SEND` SQEs directly into shared userspace RAM. The kernel `iou-sqp` thread drains and executes them in Ring-0 without a single `syscall` instruction.",
		kernelPath: [
			"Userspace writes SQE (`IORING_OP_CONNECT`) to mmap'd ring buffer (0 syscalls)",
			"Kernel thread `iou-sqp-4191` wakes in `io_sq_thread()`",
			"`io_submit_sqes()` -> `io_issue_sqe()` -> `io_connect()`",
			"`__sys_connect_file()` -> `security_socket_connect()` (LSM Layer)",
		],
		sensorOutcomes: {
			legacy_sys_enter: {
				verdict: "BLIND",
				reason:
					"`tracepoint/raw_syscalls/sys_enter` and `auditd` never fire because no `syscall` instruction is executed for `openat`, `connect`, or `send`.",
			},
			io_uring_tracepoints: {
				verdict: "DETECTED",
				reason:
					"`tracepoint:io_uring:io_uring_submit_req` fires inside `io_submit_sqes()` for every SQE opcode even under `SQPOLL`!",
			},
			bpftool_userspace: {
				verdict: "BLIND",
				reason:
					"`bpftool` only inspects eBPF programs, not `anon_inode:[io_uring]` descriptors (requires `/proc/<pid>/fdinfo` inspection).",
			},
			bpf_lsm_lockdown: {
				verdict: "BLOCKED",
				reason:
					"`SEC(\"lsm/uring_sqpoll\")` blocks `SQPOLL` thread creation outright (`-EPERM`), and `lsm/socket_connect` intercepts the C2 socket inside `io_connect()`.",
			},
			kcore_prog_idr: {
				verdict: "DETECTED",
				reason:
					"Walking `task->files->fdt` or `/proc/[pid]/fdinfo` exposes `anon_inode:[io_uring]` and active `SqThread` PIDs.",
			},
			hw_pmu_lbr: {
				verdict: "DETECTED",
				reason:
					"Hardware PMU (`branches:k`) records kernel branch edges through `io_sq_thread -> io_issue_sqe` on the dedicated polling core.",
			},
		},
	},
	"ebpf-getdents-sysbpf": {
		id: "ebpf-getdents-sysbpf",
		name: "2. Self-Hiding eBPF Rootkit (`sys_bpf` + `getdents64`)",
		implantExample: "TripleCross / BadBPF Archetype",
		ringMechanism: "`fexit/__x64_sys_getdents64` + `fexit/__x64_sys_bpf` + Helper #36",
		syscallCount: "Hijacks Victim Syscall Return Buffers",
		summary:
			"Attacker loads an eBPF program invoking `bpf_probe_write_user()` (Helper #36) to unlink hidden `/proc/<pid>` entries from `ps`/`ls` AND overwrites `bpf_attr` during `BPF_PROG_GET_NEXT_ID` so the rootkit hides its own BPF program ID from `bpftool`!",
		kernelPath: [
			"Defender runs `bpftool prog show` -> invokes `sys_bpf(BPF_PROG_GET_NEXT_ID)`",
			"Kernel executes `bpf_prog_get_curr_or_next()` on `prog_idr`",
			"5-byte `__fentry__` NOP sled jumps into `bpf_trampoline` -> `fexit/__x64_sys_bpf`",
			"Rootkit calls `bpf_probe_write_user(&uattr->next_id, &spoofed_id, 4)`",
		],
		sensorOutcomes: {
			legacy_sys_enter: {
				verdict: "BLIND",
				reason:
					"Syscall entry hooks see normal `getdents64` args; the buffer tampering happens on syscall exit (`fexit`) after the kernel populates `linux_dirent64`.",
			},
			io_uring_tracepoints: {
				verdict: "BLIND",
				reason: "Does not use `io_uring`; operates via eBPF `fexit` trampolines.",
			},
			bpftool_userspace: {
				verdict: "SPOOFED",
				reason:
					"Because `bpftool` relies on the `bpf(BPF_PROG_GET_NEXT_ID)` syscall in userspace, the rootkit's `fexit/__x64_sys_bpf` hook skips its own Program ID!",
			},
			bpf_lsm_lockdown: {
				verdict: "BLOCKED",
				reason:
					"If `lsm/bpf` + `lockdown=confidentiality` is loaded at boot, unauthorized `BPF_PROG_LOAD` calls and `bpf_probe_write_user` helpers are rejected with `-EPERM`.",
			},
			kcore_prog_idr: {
				verdict: "DETECTED",
				reason:
					"`bpf_probe_write_user` cannot modify Ring-0 kernel memory! Reading `prog_idr` XArray directly from `/proc/kcore` via `drgn` immediately exposes the hidden `bpf_prog` struct.",
			},
			hw_pmu_lbr: {
				verdict: "DETECTED",
				reason:
					"Intel LBR / PMU `branches:k` captures the CPU jumping from `__x64_sys_bpf+0x0` into `bpf_trampoline_*` inside the BPF JIT address space.",
			},
		},
	},
	"xdp-magic-packet": {
		id: "xdp-magic-packet",
		name: "3. XDP Pre-Stack Covert C2 Trigger (`XDP_DROP`)",
		implantExample: "Boopkit / eBPF Network Backdoor",
		ringMechanism: "`BPF_PROG_TYPE_XDP` in NIC Driver RX Ring (Pre-`sk_buff`)",
		syscallCount: "0 Syscalls (Executes in NAPI Softirq Context)",
		summary:
			"Attaches an XDP program directly to the NIC driver's RX ring buffer. When a magic TCP SYN/ACK or UDP payload arrives, the XDP hook extracts the C2 command into a BPF map and returns `XDP_DROP`—making the packet 100% invisible to `tcpdump`, `libpcap`, `iptables`, and `nftables`!",
		kernelPath: [
			"NIC DMA writes incoming Ethernet frame into RX ring buffer",
			"NAPI poll invokes driver XDP hook BEFORE `sk_buff` allocation",
			"Rootkit XDP program parses magic C2 key -> writes payload to `BPF_MAP_TYPE_RINGBUF`",
			"Returns `XDP_DROP`: packet never reaches `netif_receive_skb()` or `tcpdump`!",
		],
		sensorOutcomes: {
			legacy_sys_enter: {
				verdict: "BLIND",
				reason:
					"Executes entirely inside `NET_RX_SOFTIRQ` interrupt context; no socket syscall is ever invoked.",
			},
			io_uring_tracepoints: {
				verdict: "BLIND",
				reason: "Packet is processed and dropped at the XDP driver layer.",
			},
			bpftool_userspace: {
				verdict: "DETECTED",
				reason:
					"`bpftool net show` and `ip link show` reveal the attached `xdp` prog ID (unless `sys_bpf` and netlink are also hooked).",
			},
			bpf_lsm_lockdown: {
				verdict: "BLOCKED",
				reason:
					"`lsm/bpf` prevents unauthorized binaries from loading `BPF_PROG_TYPE_XDP` programs.",
			},
			kcore_prog_idr: {
				verdict: "DETECTED",
				reason:
					"Inspecting `dev->xdp_prog` and `prog_idr` in `/proc/kcore` reveals the active XDP bytecode and its attached net_device.",
			},
			hw_pmu_lbr: {
				verdict: "DETECTED",
				reason:
					"PMU branch profiling shows NAPI poll jumping into a JIT-compiled `bpf_prog_<tag>` page on every RX frame.",
			},
		},
	},
	"uprobe-pam-override": {
		id: "uprobe-pam-override",
		name: "4. Uretprobe PAM Auth & `bpf_override_return` Bypass",
		implantExample: "SSH / Sudo In-Memory Credential Backdoor",
		ringMechanism: "`uretprobe:/lib/x86_64-linux-gnu/libpam.so.0:pam_authenticate`",
		syscallCount: "0 Disk Writes (`/etc/shadow` & `libpam.so` Untouched on Disk)",
		summary:
			"Attaches a uretprobe to `pam_authenticate()` in `libpam.so` (or `bpf_override_return` on error-injectable kernel paths). When `sshd` or `sudo` checks a password, the eBPF probe overwrites register `%rax = PAM_SUCCESS (0)` or mutates the userspace buffer in RAM—leaving `/etc/shadow` and `sha256sum /lib/*/libpam.so*` 100% clean!",
		kernelPath: [
			"`sshd` calls `pam_authenticate()` in `libpam.so.0`",
			"Kernel uprobe replaces instruction in page-cache RAM with `int3` (`0xcc`)",
			"On function return, `uretprobe` handler fires in Ring-0",
			"Rootkit mutates userspace auth state via `bpf_probe_write_user()`",
		],
		sensorOutcomes: {
			legacy_sys_enter: {
				verdict: "BLIND",
				reason:
					"File integrity monitoring (`AIDE`/`FIM`) and syscall hooks see normal `openat(\"/etc/shadow\")` and clean on-disk ELF hashes.",
			},
			io_uring_tracepoints: {
				verdict: "BLIND",
				reason: "Operates via `uprobe_events` / perf_event uretprobes.",
			},
			bpftool_userspace: {
				verdict: "DETECTED",
				reason:
					"Visible in `/sys/kernel/debug/tracing/uprobe_events` and `bpftool link show` (unless hidden by a companion `sys_bpf` hook).",
			},
			bpf_lsm_lockdown: {
				verdict: "BLOCKED",
				reason:
					"`lockdown=confidentiality` disables `bpf_probe_write_user` and `bpf_override_return` kernel-wide.",
			},
			kcore_prog_idr: {
				verdict: "DETECTED",
				reason:
					"`prog_idr` walk + scanning `uprobes_tree` rb-tree in `/proc/kcore` pinpoints the exact inode and offset hooked in `libpam.so`.",
			},
			hw_pmu_lbr: {
				verdict: "DETECTED",
				reason:
					"PMU exception & branch counters detect `int3` (`#BP`) trap spikes inside `sshd` / `sudo` address spaces.",
			},
		},
	},
};

const SENSORS: { id: SensorId; label: string; layer: string }[] = [
	{
		id: "legacy_sys_enter",
		label: "Legacy Syscall EDR (`sys_enter` / `auditd`)",
		layer: "Syscall Entry Boundary",
	},
	{
		id: "bpftool_userspace",
		label: "Standard `bpftool prog show` (`sys_bpf`)",
		layer: "Userspace BPF Syscall API",
	},
	{
		id: "io_uring_tracepoints",
		label: "`tracepoint:io_uring:io_uring_submit_req`",
		layer: "Ring-0 `io_uring` Engine",
	},
	{
		id: "bpf_lsm_lockdown",
		label: "`BPF_LSM` (`lsm/bpf` + `lsm/uring_sqpoll`) + Lockdown",
		layer: "Mandatory Access Control Gate",
	},
	{
		id: "kcore_prog_idr",
		label: "Out-of-Band `/proc/kcore` `prog_idr` XArray Walk (`drgn`)",
		layer: "Direct Ring-0 Memory Forensics",
	},
	{
		id: "hw_pmu_lbr",
		label: "Hardware PMU Branch Trace (`Intel LBR` / `branches:k`)",
		layer: "Silicon Performance Monitoring Unit",
	},
];

type ForensicLogId = "fdinfo-sqpoll" | "drgn-prog-idr" | "pmu-lbr-trampoline";

const FORENSIC_LOGS: Record<ForensicLogId, { title: string; subtitle: string; cmd: string; output: string }> = {
	"fdinfo-sqpoll": {
		title: "1. Hunting Syscall-Less `io_uring` SQPOLL via `/proc/<pid>/fdinfo`",
		subtitle: "Exposing `anon_inode:[io_uring]` and active `SqThread` kernel workers with zero syscalls",
		cmd: "sudo ./hunt-io-uring-implants.sh && sudo bpftrace -e 'tracepoint:io_uring:io_uring_submit_req { ... }'",
		output: `================================================================
[!] ACTIVE IO_URING DETECTED: PID=4191 (kworker-syncd) FD=3
    Binary:  /dev/shm/.ringreaper (deleted)
    Syscalls in last 60s (/proc/4191/status voluntary_ctxt_switches): 0
----------------------------------------------------------------
/proc/4191/fdinfo/3:
SqMask: 0x0000003f (64 entries)
SqHead: 14892
SqTail: 14892
CachedSqHead: 14892
CqMask: 0x0000007f (128 entries)
CqHead: 14890
CqTail: 14892
SqThread: 4192          <-- DEDICATED RING-0 SQPOLL WORKER (iou-sqp-4191)
SqThreadCpu: 3          <-- Pinned to Core 3 polling shared mmap ring!
UserFiles: 4            <-- Pre-registered fixed FDs bypassing fdtable!

[LIVE TRACEPOINT: tracepoint:io_uring:io_uring_submit_req]
[IO_URING SQE] pid=4192 comm=iou-sqp-4191 opcode=19 (IORING_OP_OPENAT)  flags=0x1 (IOSQE_FIXED_FILE)
[IO_URING SQE] pid=4192 comm=iou-sqp-4191 opcode=22 (IORING_OP_READ)    flags=0x1
[IO_URING SQE] pid=4192 comm=iou-sqp-4191 opcode=45 (IORING_OP_SOCKET)  flags=0x0
[IO_URING SQE] pid=4192 comm=iou-sqp-4191 opcode=16 (IORING_OP_CONNECT) flags=0x0 -> 198.51.100.44:443
[IO_URING SQE] pid=4192 comm=iou-sqp-4191 opcode=26 (IORING_OP_SEND)    flags=0x0 (4096 bytes exfiltrated)`,
	},
	"drgn-prog-idr": {
		title: "2. Defeating `sys_bpf` Rootkit Spoofing via `/proc/kcore` `prog_idr` Walk",
		subtitle: "Comparing spoofed `bpftool prog show` output against ground-truth kernel `prog_idr` radix tree",
		cmd: "sudo drgn -k audit_hidden_bpf_prog_idr.py",
		output: `[STEP 1] Querying userspace sys_bpf(BPF_PROG_GET_NEXT_ID) (what bpftool sees):
  Visible BPF Prog IDs: [12, 18, 24]
    ID 12: cgroup_skb      name=systemd_fw
    ID 18: tracepoint      name=falco_sys_enter
    ID 24: lsm             name=cilium_socket

[STEP 2] Walking ground-truth kernel XArray 'prog_idr' directly in /proc/kcore:
  Kernel prog_idr IDs:  [12, 18, 24, 47, 48]

❌ CRITICAL ROOTKIT ALERT: 2 HIDDEN EBPF PROGRAMS FOUND IN KERNEL MEMORY!
--------------------------------------------------------------------------------
  [HIDDEN PROG ID 47] struct bpf_prog *0xffff888119c4e000
    type            : BPF_PROG_TYPE_TRACING (26)
    expected_attach : BPF_TRACE_FEXIT (25)
    name            : "hide_bpf_and_p"
    attach_func_name: "__x64_sys_bpf"
    jit_func        : 0xffffffffc0018340 (len: 412 bytes)
    taint_helpers   :Calls Helper #36 (bpf_probe_write_user) -> Mutates bpf_attr!

  [HIDDEN PROG ID 48] struct bpf_prog *0xffff888119c4f800
    type            : BPF_PROG_TYPE_TRACING (26)
    expected_attach : BPF_TRACE_FEXIT (25)
    name            : "redact_getdent"
    attach_func_name: "__x64_sys_getdents64"
    jit_func        : 0xffffffffc0019100 (len: 528 bytes)`,
	},
	"pmu-lbr-trampoline": {
		title: "3. Silicon PMU Last Branch Record (`Intel LBR`) `__fentry__` Trampoline Audit",
		subtitle: "Detecting patched 5-byte kernel function prologues jumping into BPF JIT memory",
		cmd: "sudo perf record -e branches:k -j any,k -a -- sleep 1 && sudo perf script --fields brstack",
		output: `[SILICON PMU LBR AUDIT] Scanning kernel .text (0xffffffff81000000..0xffffffff82400000)
for modified 5-byte __fentry__ NOP sleds (0f 1f 44 00 00 -> e8 <rel32>):

[1] Symbol: __x64_sys_getdents64 (0xffffffff81421a10)
    Expected Prologue : 0f 1f 44 00 00          (nopl 0x0(%rax,%rax,1))
    Live RAM Prologue : e8 2b 69 bf 3e          (callq 0xffffffffc0018340)
    PMU LBR Branch Hit: 0xffffffff81421a10 -> 0xffffffffc0018340 [bpf_trampoline_6442450949+0x0]
    JIT Target        : 0xffffffffc0018340 -> 0xffffffffc0019100 [bpf_prog_a8f91c2b_redact_getdent]

[2] Symbol: __x64_sys_bpf (0xffffffff81398c40)
    Expected Prologue : 0f 1f 44 00 00          (nopl 0x0(%rax,%rax,1))
    Live RAM Prologue : e8 fb f6 c7 3e          (callq 0xffffffffc0018340)
    PMU LBR Branch Hit: 0xffffffff81398c40 -> 0xffffffffc0018340 [bpf_trampoline_6442450951+0x0]
    Verdict           : UNAUTHORIZED FEXIT TRAMPOLINE ACTIVE IN BPF JIT REGION!`,
	},
};

export default function EbpfIoUringRootkitSimulator() {
	const [activeTab, setActiveTab] = useState<"matrix" | "forensics">("matrix");
	const [selectedAttackId, setSelectedAttackId] = useState<AttackId>("io-uring-sqpoll");
	const [selectedLogId, setSelectedLogId] = useState<ForensicLogId>("fdinfo-sqpoll");

	const attack = ATTACK_SPECS[selectedAttackId];
	const forensicLog = FORENSIC_LOGS[selectedLogId];

	const summaryCounts = useMemo(() => {
		const outcomes = Object.values(attack.sensorOutcomes);
		return {
			blindOrSpoofed: outcomes.filter(
				(o) => o.verdict === "BLIND" || o.verdict === "SPOOFED"
			).length,
			detectedOrBlocked: outcomes.filter(
				(o) => o.verdict === "DETECTED" || o.verdict === "BLOCKED"
			).length,
		};
	}, [attack]);

	return (
		<div className="w-full rounded-xl border border-emerald-500/30 bg-[#070b12] p-5 sm:p-6 text-gray-200 font-mono text-xs shadow-2xl">
			{/* Header & Mode Switcher */}
			<div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
						RING-0 // ROOTKIT LAB
					</span>
					<span className="text-gray-400 hidden sm:inline">
						io_uring SQPOLL, eBPF `sys_bpf` Spoofing &amp; PMU Forensics
					</span>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setActiveTab("matrix")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "matrix"
								? "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						01. Evasion vs. Sensor Matrix
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("forensics")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "forensics"
								? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						02. Live `prog_idr` &amp; PMU Forensics
					</button>
				</div>
			</div>

			{activeTab === "matrix" ? (
				<div className="space-y-5">
					{/* Attack Selector */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
						{(Object.values(ATTACK_SPECS) as AttackSpec[]).map((a) => (
							<button
								key={a.id}
								type="button"
								onClick={() => setSelectedAttackId(a.id)}
								className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
									selectedAttackId === a.id
										? "bg-red-950/40 border-red-400 text-white shadow-lg"
										: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
								}`}
							>
								<div className="flex items-center justify-between gap-2 mb-1">
									<span className="font-bold text-red-300 text-xs">{a.name}</span>
									<span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300">
										{a.implantExample}
									</span>
								</div>
								<div className="text-[11px] text-gray-400">{a.ringMechanism}</div>
							</button>
						))}
					</div>

					{/* Attack Execution Path & Summary */}
					<div className="p-4 rounded-xl border border-white/10 bg-black/50 space-y-3">
						<div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
							<div>
								<h4 className="text-sm font-bold text-white">{attack.name}</h4>
								<p className="text-[11px] text-gray-400 mt-0.5">{attack.summary}</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="px-2.5 py-1 rounded bg-red-500/20 border border-red-500/40 text-red-300 font-bold">
									{summaryCounts.blindOrSpoofed} Sensors Blind/Spoofed
								</span>
								<span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
									{summaryCounts.detectedOrBlocked} Sensors Catch It
								</span>
							</div>
						</div>

						<div>
							<div className="text-[10px] uppercase text-cyan-400 font-bold mb-1.5">
								// Ring-0 Kernel Execution Path ({attack.syscallCount})
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
								{attack.kernelPath.map((step, i) => (
									<div
										key={i}
										className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-gray-300"
									>
										<span className="text-cyan-400 font-bold mr-1">0{i + 1}.</span>
										{step}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Sensor Outcomes Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{SENSORS.map((sensor) => {
							const outcome = attack.sensorOutcomes[sensor.id];
							const isBad =
								outcome.verdict === "BLIND" || outcome.verdict === "SPOOFED";
							return (
								<div
									key={sensor.id}
									className={`p-3.5 rounded-xl border ${
										isBad
											? "bg-red-950/20 border-red-500/40"
											: outcome.verdict === "BLOCKED"
											? "bg-emerald-950/30 border-emerald-400/50"
											: "bg-cyan-950/25 border-cyan-400/40"
									}`}
								>
									<div className="flex items-center justify-between gap-2 mb-1.5">
										<div>
											<div className="font-bold text-white text-xs">
												{sensor.label}
											</div>
											<div className="text-[10px] text-gray-400">
												Layer: {sensor.layer}
											</div>
										</div>
										<span
											className={`px-2 py-0.5 rounded text-[10px] font-bold ${
												isBad
													? "bg-red-500/25 text-red-300 border border-red-500/40"
													: outcome.verdict === "BLOCKED"
													? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
													: "bg-cyan-500/25 text-cyan-200 border border-cyan-500/40"
											}`}
										>
											{outcome.verdict}
										</span>
									</div>
									<p className="text-[11px] text-gray-300 leading-relaxed">
										{outcome.reason}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				/* Tab 2: Live Forensics Console */
				<div className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
						{(Object.entries(FORENSIC_LOGS) as [ForensicLogId, typeof FORENSIC_LOGS[ForensicLogId]][]).map(
							([id, item]) => (
								<button
									key={id}
									type="button"
									onClick={() => setSelectedLogId(id)}
									className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
										selectedLogId === id
											? "bg-cyan-950/50 border-cyan-400 text-white"
											: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
									}`}
								>
									<div className="font-bold text-cyan-300 text-xs">{item.title}</div>
									<div className="text-[10px] text-gray-400 mt-1">{item.subtitle}</div>
								</button>
							)
						)}
					</div>

					<div className="p-4 rounded-xl border border-cyan-500/40 bg-[#04070d]">
						<div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10 text-[11px] text-gray-400">
							<span>RING-0 FORENSIC TRIAGE CONSOLE // LINUX 6.12 LTS</span>
							<span className="text-emerald-400 font-bold">
								CAP_SYS_RAWIO + /proc/kcore + PERF_PMU
							</span>
						</div>
						<div className="text-amber-300 font-bold mb-2"># {forensicLog.cmd}</div>
						<pre className="text-[11px] text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
							{forensicLog.output}
						</pre>
					</div>
				</div>
			)}
		</div>
	);
}
