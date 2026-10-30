import React, { useState, useMemo } from "react";

type UniverseState = "OLD" | "NEW";

interface SimTask {
	pid: number;
	comm: string;
	kind: "user" | "kthread";
	tifPatchPending: boolean;
	universe: UniverseState;
	onStackVulnFunc: boolean;
	stateDesc: string;
	clearedVia: string;
}

const INITIAL_TASKS: SimTask[] = [
	{
		pid: 1,
		comm: "systemd",
		kind: "user",
		tifPatchPending: false,
		universe: "OLD",
		onStackVulnFunc: false,
		stateDesc: "Sleeping in epoll_wait()",
		clearedVia: "Not yet in transition",
	},
	{
		pid: 892,
		comm: "kworker/u128:2",
		kind: "kthread",
		tifPatchPending: false,
		universe: "OLD",
		onStackVulnFunc: false,
		stateDesc: "Idle worker thread",
		clearedVia: "Not yet in transition",
	},
	{
		pid: 4120,
		comm: "nccl-allreduce",
		kind: "user",
		tifPatchPending: false,
		universe: "OLD",
		onStackVulnFunc: false,
		stateDesc: "Running in userspace (CUDA ring)",
		clearedVia: "Not yet in transition",
	},
	{
		pid: 9314,
		comm: "nft-daemon",
		kind: "user",
		tifPatchPending: false,
		universe: "OLD",
		onStackVulnFunc: true,
		stateDesc: "Blocked on mutex inside nf_tables_newrule()!",
		clearedVia: "Pinned on stack! Waiting for mutex / force",
	},
	{
		pid: 14022,
		comm: "vhost-net-14018",
		kind: "kthread",
		tifPatchPending: false,
		universe: "OLD",
		onStackVulnFunc: true,
		stateDesc: "Tight ring-0 polling loop inside vhost_worker()",
		clearedVia: "Pinned in kthread loop! Needs klp signal / exit",
	},
	{
		pid: 28410,
		comm: "envoy-proxy",
		kind: "user",
		tifPatchPending: false,
		universe: "OLD",
		onStackVulnFunc: false,
		stateDesc: "Active syscall read() -> returning to Ring-3",
		clearedVia: "Not yet in transition",
	},
];

export default function KernelLivepatchSimulator() {
	const [patchLoaded, setPatchLoaded] = useState<boolean>(false);
	const [replaceAllActive, setReplaceAllActive] = useState<boolean>(true);
	const [tasks, setTasks] = useState<SimTask[]>(INITIAL_TASKS);
	const [shadowAttached, setShadowAttached] = useState<boolean>(true);
	const [exploitAttempts, setExploitAttempts] = useState<number>(0);
	const [lastAuditLog, setLastAuditLog] = useState<string>(
		"[klp] Ready: 5-byte NOP (0f 1f 44 00 00) at nf_tables_newrule+0x0/0x580",
	);

	// Derived sysfs metrics
	const pendingCount = useMemo(
		() => tasks.filter((t) => t.tifPatchPending).length,
		[tasks],
	);

	const transitionActive = patchLoaded && pendingCount > 0;
	const fullyPatched = patchLoaded && pendingCount === 0;

	// Step 1: Load livepatch module (insmod livepatch-cve-2026-nft.ko)
	const handleLoadPatch = () => {
		setPatchLoaded(true);
		setTasks(
			INITIAL_TASKS.map((t) => ({
				...t,
				tifPatchPending: true,
				universe: "OLD",
				clearedVia: "TIF_PATCH_PENDING = 1 (Awaiting safe boundary)",
			})),
		);
		setLastAuditLog(
			"[klp] enabling patch 'livepatch_cve_2026_nft': ftrace armed (e8 7b d4 e2 3e -> call klp_ftrace_handler), TIF_PATCH_PENDING set on all 6 tasks.",
		);
	};

	// Step 2: Advance Syscall Return Boundary (clears user tasks not blocked in target func)
	const handleSyscallBoundary = () => {
		if (!patchLoaded) return;
		setTasks((prev) =>
			prev.map((t) => {
				if (t.kind === "user" && !t.onStackVulnFunc && t.tifPatchPending) {
					return {
						...t,
						tifPatchPending: false,
						universe: "NEW",
						clearedVia: "Cleared at Ring-0 -> Ring-3 syscall exit!",
					};
				}
				return t;
			}),
		);
		setLastAuditLog(
			"[klp] exit_to_user_mode_loop(): Cleared TIF_PATCH_PENDING on userspace threads with empty Ring-0 stacks (systemd, nccl-allreduce, envoy-proxy).",
		);
	};

	// Step 3: Run ORC Reliable Stack Unwinder (clears idle/sleeping tasks whose stack doesn't contain patched func)
	const handleOrcStackUnwind = () => {
		if (!patchLoaded) return;
		setTasks((prev) =>
			prev.map((t) => {
				if (!t.onStackVulnFunc && t.tifPatchPending) {
					return {
						...t,
						tifPatchPending: false,
						universe: "NEW",
						clearedVia: "Cleared by arch_stack_walk_reliable() (ORC unwinder)",
					};
				}
				return t;
			}),
		);
		setLastAuditLog(
			"[klp] klp_check_stack(): ORC unwinder verified kworker/u128:2 call stack has 0 frames in nf_tables_newrule(). Cleared TIF_PATCH_PENDING!",
		);
	};

	// Step 4: Wake/Unblock mutex & send fake signal (klp_send_signals)
	const handleSendSignalsAndUnblock = () => {
		if (!patchLoaded) return;
		setTasks((prev) =>
			prev.map((t) => {
				if (t.onStackVulnFunc && t.tifPatchPending) {
					return {
						...t,
						onStackVulnFunc: false,
						stateDesc:
							t.kind === "user"
								? "Exited nf_tables_newrule() after mutex release"
								: "Yielded at cond_resched() / klp_try_switch_task()",
						tifPatchPending: false,
						universe: "NEW",
						clearedVia:
							"Unblocked via klp_send_signals() + ORC stack check -> NEW Universe!",
					};
				}
				return t;
			}),
		);
		setLastAuditLog(
			"[klp] 'livepatch_cve_2026_nft': All tasks cleared TIF_PATCH_PENDING! Transition complete (transition=0). Atomic replace repealed obsolete patches.",
		);
	};

	// Step 5: Emergency Force Transition (echo 1 > /sys/kernel/livepatch/.../force)
	const handleForceTransition = () => {
		if (!patchLoaded) return;
		setTasks((prev) =>
			prev.map((t) => ({
				...t,
				onStackVulnFunc: false,
				tifPatchPending: false,
				universe: "NEW",
				clearedVia: "FORCED via /sys/kernel/livepatch/.../force (TAINT_LIVEPATCH)",
			})),
		);
		setLastAuditLog(
			"[klp] WARNING: forced transition of 'livepatch_cve_2026_nft'! Cleared TIF_PATCH_PENDING unconditionally across all tasks.",
		);
	};

	// Reset simulation
	const handleReset = () => {
		setPatchLoaded(false);
		setTasks(INITIAL_TASKS);
		setExploitAttempts(0);
		setLastAuditLog(
			"[klp] Reset to unpatched vmlinux: 5-byte NOP (0f 1f 44 00 00) restored at nf_tables_newrule+0x0.",
		);
	};

	// Trigger double-free CVE exploit test against `struct nft_rule`
	const handleTriggerCveTest = () => {
		setExploitAttempts((c) => c + 1);
		if (!patchLoaded) {
			setLastAuditLog(
				"[BUG: KASAN: slab-use-after-free in nf_tables_newrule+0x314] Unpatched kernel executed vulnerable code path!",
			);
		} else if (!shadowAttached) {
			setLastAuditLog(
				"[klp] Patched function executed, but klp_shadow variable (KLP_SHADOW_NFT_RULE_GEN) was disabled—missing double-free guard!",
			);
		} else {
			setLastAuditLog(
				"[klp_shadow] BLOCKED CVE-2026-NFT double-free! klp_shadow_get(rule, 0x20261030) detected shadow->freed_once == true; returned -EEXIST safely.",
			);
		}
	};

	return (
		<div className="space-y-6 font-mono text-xs sm:text-sm text-gray-200">
			{/* Top Action Bar: Livepatch Lifecycle Controls */}
			<div className="p-4 rounded-xl border border-slate-800 bg-slate-950/90 space-y-3">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div>
						<span className="text-[10px] uppercase tracking-widest text-emerald-400 block">
							// RING-0 KLP TRANSITION CONTROLLER
						</span>
						<h4 className="text-sm font-bold text-white">
							Step Through `klp_enable_patch()` &amp; Per-Task Consistency Convergence
						</h4>
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setReplaceAllActive((v) => !v)}
							className={`px-2.5 py-1 rounded border text-[11px] font-bold transition-all ${
								replaceAllActive
									? "border-cyan-400/70 bg-cyan-500/15 text-cyan-200"
									: "border-slate-700 bg-slate-900 text-slate-400"
							}`}
						>
							.replace = {replaceAllActive ? "true (Cumulative)" : "false (Stacked)"}
						</button>
						<button
							type="button"
							onClick={handleReset}
							className="px-2.5 py-1 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px]"
						>
							Reset Kernel
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
					<button
						type="button"
						onClick={handleLoadPatch}
						disabled={patchLoaded}
						className={`p-2.5 rounded-lg border text-left transition-all ${
							!patchLoaded
								? "border-emerald-500/80 bg-emerald-500/20 hover:bg-emerald-500/30 text-white"
								: "border-slate-800 bg-slate-900/40 text-slate-500 cursor-not-allowed"
						}`}
					>
						<div className="font-bold text-[11px] text-emerald-300">
							1. insmod livepatch-cve.ko
						</div>
						<div className="text-[10px] opacity-80">
							Arm ftrace trampoline &amp; set TIF_PATCH_PENDING
						</div>
					</button>

					<button
						type="button"
						onClick={handleSyscallBoundary}
						disabled={!transitionActive}
						className={`p-2.5 rounded-lg border text-left transition-all ${
							transitionActive
								? "border-cyan-500/80 bg-cyan-500/15 hover:bg-cyan-500/25 text-white"
								: "border-slate-800 bg-slate-900/40 text-slate-500 cursor-not-allowed"
						}`}
					>
						<div className="font-bold text-[11px] text-cyan-300">
							2. Syscall Return Boundary
						</div>
						<div className="text-[10px] opacity-80">
							Transition user tasks exiting Ring-0 -&gt; Ring-3
						</div>
					</button>

					<button
						type="button"
						onClick={handleOrcStackUnwind}
						disabled={!transitionActive}
						className={`p-2.5 rounded-lg border text-left transition-all ${
							transitionActive
								? "border-purple-500/80 bg-purple-500/15 hover:bg-purple-500/25 text-white"
								: "border-slate-800 bg-slate-900/40 text-slate-500 cursor-not-allowed"
						}`}
					>
						<div className="font-bold text-[11px] text-purple-300">
							3. ORC Stack Unwind Check
						</div>
						<div className="text-[10px] opacity-80">
							Run arch_stack_walk_reliable() on kthreads
						</div>
					</button>

					<button
						type="button"
						onClick={handleSendSignalsAndUnblock}
						disabled={!transitionActive}
						className={`p-2.5 rounded-lg border text-left transition-all ${
							transitionActive
								? "border-amber-500/80 bg-amber-500/15 hover:bg-amber-500/25 text-white"
								: "border-slate-800 bg-slate-900/40 text-slate-500 cursor-not-allowed"
						}`}
					>
						<div className="font-bold text-[11px] text-amber-300">
							4. klp_send_signals() / Wake
						</div>
						<div className="text-[10px] opacity-80">
							Flush pinned mutex &amp; kthread sleepers
						</div>
					</button>
				</div>
			</div>

			{/* 2-Column Inspector: ftrace Prologue Bytes + sysfs Telemetry */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
				{/* Left: 5-Byte Function Prologue Disassembly */}
				<div className="p-4 rounded-xl border border-slate-800 bg-slate-950/95 space-y-2.5">
					<div className="flex items-center justify-between">
						<span className="text-[10px] uppercase tracking-wider text-cyan-400">
							x86_64 Function Prologue (__fentry__ 5-Byte Slot)
						</span>
						<span
							className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
								patchLoaded
									? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
									: "border-slate-700 bg-slate-900 text-slate-400"
							}`}
						>
							{patchLoaded ? "FTRACE TRAMPOLINE ARMED" : "5-BYTE HARDWARE NOP"}
						</span>
					</div>

					<div className="p-3 rounded-lg bg-black/90 border border-slate-800 text-[11px] space-y-1.5 overflow-x-auto">
						<div className="text-slate-500">
							{"// Symbol: nf_tables_newrule (0xffffffff8194a200)"}
						</div>
						{!patchLoaded ? (
							<div className="text-amber-300 font-bold">
								0xffffffff8194a200: 0f 1f 44 00 00 &nbsp;&nbsp;nopl 0x0(%rax,%rax,1)
							</div>
						) : (
							<div className="text-emerald-400 font-bold">
								0xffffffff8194a200: e8 7b d4 e2 3e &nbsp;&nbsp;call
								klp_ftrace_handler
							</div>
						)}
						<div className="text-slate-400">
							0xffffffff8194a205: 55 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;push
							%rbp
						</div>
						<div className="text-slate-400">
							0xffffffff8194a206: 48 89 e5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mov
							%rsp,%rbp
						</div>
						{patchLoaded && (
							<div className="pt-1.5 mt-1.5 border-t border-slate-800 text-cyan-300">
								↳ klp_ftrace_handler: checks current-&gt;patch_state &rarr; sets{" "}
								<span className="text-white font-bold">
									regs-&gt;ip = klp_nf_tables_newrule
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Right: /sys/kernel/livepatch/ Telemetry & Shadow Variable Control */}
				<div className="p-4 rounded-xl border border-slate-800 bg-slate-950/95 flex flex-col justify-between gap-2.5">
					<div>
						<div className="flex items-center justify-between mb-2">
							<span className="text-[10px] uppercase tracking-wider text-emerald-400">
								/sys/kernel/livepatch/livepatch_cve_2026_nft/
							</span>
							{transitionActive && (
								<button
									type="button"
									onClick={handleForceTransition}
									className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300 text-[10px] font-bold hover:bg-rose-500/30"
								>
									echo 1 &gt; force
								</button>
							)}
						</div>

						<div className="grid grid-cols-3 gap-2">
							<div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70">
								<div className="text-[10px] text-slate-400">sysfs: enabled</div>
								<div
									className={`text-lg font-bold ${
										patchLoaded ? "text-emerald-400" : "text-slate-500"
									}`}
								>
									{patchLoaded ? "1" : "0"}
								</div>
							</div>
							<div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70">
								<div className="text-[10px] text-slate-400">sysfs: transition</div>
								<div
									className={`text-lg font-bold ${
										transitionActive
											? "text-amber-400 animate-pulse"
											: "text-emerald-400"
									}`}
								>
									{transitionActive ? "1 (In-Flight)" : "0 (Converged)"}
								</div>
							</div>
							<div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70">
								<div className="text-[10px] text-slate-400">Pending Tasks</div>
								<div
									className={`text-lg font-bold ${
										pendingCount === 0 ? "text-emerald-400" : "text-amber-400"
									}`}
								>
									{pendingCount} / {tasks.length}
								</div>
							</div>
						</div>
					</div>

					{/* Shadow Variable + CVE Trigger Bar */}
					<div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
						<button
							type="button"
							onClick={() => setShadowAttached((v) => !v)}
							className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
								shadowAttached
									? "border-emerald-500/60 bg-emerald-500/15 text-emerald-200"
									: "border-rose-500/60 bg-rose-500/15 text-rose-200"
							}`}
						>
							klp_shadow_alloc(nft_rule): {shadowAttached ? "ENABLED" : "DISABLED"}
						</button>

						<button
							type="button"
							onClick={handleTriggerCveTest}
							className="px-3 py-1.5 rounded-lg border border-amber-500/60 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold transition-all"
						>
							⚡ Test CVE-2026 Double-Free Exploit ({exploitAttempts})
						</button>
					</div>
				</div>
			</div>

			{/* Per-Task Consistency Table (`task_struct` Universe Tracker) */}
			<div className="p-4 rounded-xl border border-slate-800 bg-slate-950/95">
				<div className="flex flex-wrap items-center justify-between gap-2 mb-3">
					<div>
						<h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
							Per-Task Consistency Matrix (`task_struct-&gt;patch_state`)
						</h4>
						<p className="text-[11px] text-slate-400">
							Each task switches independently from the OLD to the NEW function universe once its Ring-0 stack is proven free of patched functions.
						</p>
					</div>
					<span
						className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
							fullyPatched
								? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
								: transitionActive
									? "border-amber-500/50 bg-amber-500/15 text-amber-300"
									: "border-slate-700 bg-slate-900 text-slate-400"
						}`}
					>
						{fullyPatched
							? "ALL TASKS IN NEW UNIVERSE (100% CONVERGED)"
							: transitionActive
								? "HYBRID TRANSITION IN PROGRESS"
								: "UNPATCHED BASELINE"}
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
					{tasks.map((t) => (
						<div
							key={t.pid}
							className={`p-3 rounded-lg border transition-all ${
								t.universe === "NEW"
									? "border-emerald-500/50 bg-emerald-950/20"
									: t.tifPatchPending
										? "border-amber-500/60 bg-amber-950/20"
										: "border-slate-800 bg-slate-900/60"
							}`}
						>
							<div className="flex items-center justify-between mb-1">
								<span className="font-bold text-xs text-white">
									PID {t.pid}: <span className="text-cyan-300">{t.comm}</span>
								</span>
								<span
									className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
										t.universe === "NEW"
											? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
											: "bg-amber-500/20 text-amber-300 border border-amber-500/40"
									}`}
								>
									{t.universe} UNIVERSE
								</span>
							</div>
							<div className="text-[10px] text-slate-300 mb-1">{t.stateDesc}</div>
							<div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
								<span>
									TIF_PATCH_PENDING:{" "}
									<strong
										className={
											t.tifPatchPending ? "text-amber-400" : "text-emerald-400"
										}
									>
										{t.tifPatchPending ? "1" : "0"}
									</strong>
								</span>
								<span className="truncate max-w-[160px]" title={t.clearedVia}>
									{t.clearedVia}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Ring-0 dmesg Telemetry Console */}
			<div className="p-3 rounded-xl border border-slate-800 bg-black/90 flex items-center justify-between gap-3">
				<div className="text-[11px] text-emerald-400 overflow-x-auto">
					<span className="text-slate-500 select-none">dmesg | tail -n 1 $ </span>
					<code>{lastAuditLog}</code>
				</div>
			</div>
		</div>
	);
}
