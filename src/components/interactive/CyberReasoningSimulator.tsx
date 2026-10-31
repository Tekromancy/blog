import React, { useState, useMemo } from "react";

type EngineMode = "havoc_only" | "libafl_cmplog" | "libafl_symcc" | "full_crs";
type SinkBugClass = "heap_oob" | "uaf_ghost" | "house_of_spirit";

interface HalloweenLoreItem {
	year: string;
	title: string;
	category: string;
	summary: string;
	technicalArtifact: string;
}

const HALLOWEEN_EPHEMERA: HalloweenLoreItem[] = [
	{
		year: "Oct 31, 1998",
		title: "The 'Halloween Documents' Leak (Halloween I & II)",
		category: "Open-Source History",
		summary:
			"On All Hallows' Eve 1998, Eric S. Raymond published leaked internal Microsoft strategy memos by Vinod Valloppillil analyzing Linux. The memos admitted that open-source peer review and rapid bug-hunting harnesses achieved commercial-grade reliability faster than closed-source silos.",
		technicalArtifact:
			'Memo Quote (10/31/1998): "Linux can win as long as services / protocols are commodities."',
	},
	{
		year: "Oct 31, 2008",
		title: "Satoshi Nakamoto Publishes the Bitcoin Whitepaper",
		category: "Cryptography",
		summary:
			"At 14:10:00 EDT on October 31, 2008, Satoshi Nakamoto posted 'Bitcoin: A Peer-to-Peer Electronic Cash System' to the metzdowd.com Cryptography Mailing List—fusing Hashcash proof-of-work, Merkle trees, and secp256k1 signatures.",
		technicalArtifact:
			"SHA-256 Genesis Block Target: 0x1d00ffff (000000000019d6689c085ae165831e93...)",
	},
	{
		year: "Oct 31, 2016",
		title: "Google Project Zero Halloween 0-Day Disclosure & Dirty COW Era",
		category: "Zero-Day Research",
		summary:
			"Following the Oct 2016 Linux kernel 'Dirty COW' (CVE-2016-5195) race condition in get_user_pages(), Google TAG & Project Zero disclosed active in-the-wild kernel privilege escalation 0-days (CVE-2016-7255) on October 31 after a 7-day deadline.",
		technicalArtifact:
			"Dirty COW Race: FOLL_WRITE | FOLL_FORCE vs. madvise(MADV_DONTNEED) CoW page fault",
	},
	{
		year: "1994 – Present",
		title: "Linus Torvalds' 0xFEE1DEAD in sys_reboot() & The Hexspeak Graveyard",
		category: "Kernel Internals",
		summary:
			"In Linux include/uapi/linux/reboot.h, sys_reboot() refuses to halt or reboot the machine unless %rdi == 0xfee1dead ('feel dead') and %rsi == 0x28121969 (or 0x05121996 / 0x16041998 / 0x20112000). Meanwhile, debug allocators poison freed memory with 0xDEADBEEF and 0xFEEEFEEE.",
		technicalArtifact:
			"#define LINUX_REBOOT_MAGIC1 0xfee1dead /* include/uapi/linux/reboot.h */",
	},
	{
		year: "Oct 2005",
		title: "Phrack #66 & The Malloc Maleficarum Haunted Houses",
		category: "Heap Exploitation",
		summary:
			"When glibc hardened ptmalloc2 unlink() macros with fd->bk == P checks, Phantasmal Phantasmagoria published 'The Malloc Maleficarum', naming every modern heap exploitation primitive after a haunted house: The House of Spirit, House of Lore, House of Force, and House of Mind.",
		technicalArtifact:
			"House of Spirit: Overwrite fastbin ptr -> point to fake chunk header (size=0x40) on stack -> free()",
	},
];

export default function CyberReasoningSimulator() {
	const [engineMode, setEngineMode] = useState<EngineMode>("full_crs");
	const [sinkBug, setSinkBug] = useState<SinkBugClass>("uaf_ghost");
	const [activeTab, setActiveTab] = useState<"crs_lab" | "halloween_grimoire">(
		"crs_lab",
	);
	const [payloadHexInput, setPayloadHexInput] = useState<string>("0xfff0");

	// Evaluate which CFG basic-block gates are unlocked by the chosen engine architecture
	const gateState = useMemo(() => {
		const gate1Passed = true; // Even Havoc or CmpLog eventually passes or CmpLog passes in 1 step
		const gate1Latency =
			engineMode === "havoc_only" ? "48.2 min (2^32 Brute-Force)" : "0.02 ms (CmpLog Hook)";

		const gate2Passed =
			engineMode === "libafl_symcc" || engineMode === "full_crs";
		const gate2Latency = gate2Passed
			? "1.84 ms (SymCC + Z3 SMT)"
			: "STALLED (2^-64 Invariant Wall)";

		const gate3Passed = engineMode === "full_crs";
		const gate3Latency = gate3Passed
			? "310 ms (LLM IR Slice Mutator)"
			: "STALLED (Stateful Sequence Drop)";

		const gate4Triggered = gate1Passed && gate2Passed && gate3Passed;

		return {
			gate1Passed,
			gate1Latency,
			gate2Passed,
			gate2Latency,
			gate3Passed,
			gate3Latency,
			gate4Triggered,
		};
	}, [engineMode]);

	// ASan Shadow Memory simulation (`MemToShadow(addr) = (addr >> 3) + 0x7fff8000`)
	const shadowAnatomy = useMemo(() => {
		if (sinkBug === "heap_oob") {
			return {
				bugTitle: "Heap-Buffer-Overflow (uint16_t Integer Wrap -> Redzone Write)",
				appAddr: "0x603000000040",
				shadowAddr: "0x1fff80000008",
				shadowBytes: [
					{ byte: "0xfa", label: "Left Redzone", status: "poison" },
					{ byte: "0xfa", label: "Left Redzone", status: "poison" },
					{ byte: "0x00", label: "8B Valid Chunk", status: "ok" },
					{ byte: "0x00", label: "8B Valid Chunk", status: "ok" },
					{ byte: "0xfa", label: "CRASH! Right Redzone", status: "crash" },
					{ byte: "0xfa", label: "Right Redzone", status: "poison" },
				],
				asanReport:
					"ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000050 at pc 0x55a8104a2ef1 bp 0x7ffd41b0cc10 sp 0x7ffd41b0cc08 (WRITE of size 65520)",
				smtFormula:
					"(assert (= (bvadd (zero_extend 16 payload_len) #x0020) #x0010)) ; Solves payload_len = 0xfff0!",
			};
		}
		if (sinkBug === "uaf_ghost") {
			return {
				bugTitle:
					"Heap-Use-After-Free (Quarantine Ghost 0xfd / 0xDEADBEEF Dereference)",
				appAddr: "0x604000000190",
				shadowAddr: "0x1fff80000032",
				shadowBytes: [
					{ byte: "0xfa", label: "Left Redzone", status: "poison" },
					{ byte: "0xfd", label: "CRASH! Freed Ghost (0xfd)", status: "crash" },
					{ byte: "0xfd", label: "Freed Quarantine", status: "poison" },
					{ byte: "0xfd", label: "Freed Quarantine", status: "poison" },
					{ byte: "0xfd", label: "Freed Quarantine", status: "poison" },
					{ byte: "0xfa", label: "Right Redzone", status: "poison" },
				],
				asanReport:
					"ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000190 (READ of size 8: 0xdeadbeefdeadbeef in parse_samhain_frame+0x1c4)",
				smtFormula:
					"(assert (and (= msg_type #x0d) (= session_flags #x80))) ; Triggers error-path free() without NULLing ctx->frame_ptr!",
			};
		}
		return {
			bugTitle:
				"The Malloc Maleficarum: House of Spirit (Arbitrary Stack Fake-Chunk Free)",
			appAddr: "0x7ffd41b0cd40",
			shadowAddr: "0x1fffeb3619a8",
			shadowBytes: [
				{ byte: "0xf1", label: "Stack Left Redzone", status: "poison" },
				{ byte: "0x00", label: "Fake Chunk (size=0x41)", status: "ok" },
				{ byte: "0xf2", label: "CRASH! Stack Mid Redzone", status: "crash" },
				{ byte: "0x00", label: "Next Fake Size (0x21)", status: "ok" },
				{ byte: "0xf3", label: "Stack Right Redzone", status: "poison" },
				{ byte: "0x00", label: "Saved RIP Target", status: "ok" },
			],
			asanReport:
				"ERROR: AddressSanitizer: attempting free on address which was not malloc()-allocated: 0x7ffd41b0cd40 in frame #0 parse_samhain_frame (House of Spirit primitive)",
			smtFormula:
				"(assert (and (= fake_hdr_size #x00000041) (= next_chunk_size #x00000021))) ; Bypasses ptmalloc2 fastbin size check!",
		};
	}, [sinkBug]);

	return (
		<div className="space-y-6 font-mono text-xs sm:text-sm text-gray-200">
			{/* Mode Switcher Tabs: CRS Exploit Lab vs. Oct 31 Halloween Hacker Grimoire */}
			<div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setActiveTab("crs_lab")}
						className={`px-3.5 py-2 rounded-lg border font-bold text-xs transition-all ${
							activeTab === "crs_lab"
								? "border-emerald-500/80 bg-emerald-500/15 text-emerald-200"
								: "border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700"
						}`}
					>
						🔬 Tri-Engine CRS + ASan Shadow Memory Lab
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("halloween_grimoire")}
						className={`px-3.5 py-2 rounded-lg border font-bold text-xs transition-all ${
							activeTab === "halloween_grimoire"
								? "border-amber-500/80 bg-amber-500/15 text-amber-200"
								: "border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700"
						}`}
					>
						🎃 Oct 31 All Hallows&apos; Eve Hacker Lore &amp; Hexspeak Vault
					</button>
				</div>

				<span className="px-2.5 py-1 rounded text-[10px] font-bold border border-amber-500/40 bg-amber-500/10 text-amber-300">
					DISPATCH // OCT 31 HALLOWEEN EDITION
				</span>
			</div>

			{activeTab === "crs_lab" ? (
				<>
					{/* Top Selector Controls */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
						{/* CRS Engine Configuration */}
						<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
							<label className="block text-[10px] uppercase tracking-wider text-cyan-400 mb-2">
								1. Select Vulnerability Discovery Engine Architecture
							</label>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
								{[
									{
										id: "havoc_only",
										title: "Naive Bit-Flip Fuzzing (No CmpLog)",
										sub: "Stalls at 32-bit 0xFEE1DEAD magic gate",
									},
									{
										id: "libafl_cmplog",
										title: "In-Process LibAFL + CmpLog",
										sub: "Solves magic bytes; stalls on coupled CRC/math",
									},
									{
										id: "libafl_symcc",
										title: "LibAFL + SymCC (Z3 Concolic)",
										sub: "Inverts math/checksums; stalls on multi-turn state",
									},
									{
										id: "full_crs",
										title: "Full Neuro-Symbolic CRS",
										sub: "LibAFL + SymCC Z3 + LLM Backward IR Slice",
									},
								].map((m) => (
									<button
										key={m.id}
										type="button"
										onClick={() => setEngineMode(m.id as EngineMode)}
										className={`text-left p-2.5 rounded-lg border transition-all ${
											engineMode === m.id
												? "border-cyan-400/80 bg-cyan-500/15 text-white"
												: "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
										}`}
									>
										<div className="font-bold text-[11px]">{m.title}</div>
										<div className="text-[10px] opacity-75">{m.sub}</div>
									</button>
								))}
							</div>
						</div>

						{/* Target Sink Bug Class Selector */}
						<div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
							<label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-2">
								2. Select Target Sink Vulnerability &amp; ASan Shadow Trap
							</label>
							<div className="space-y-1.5">
								{[
									{
										id: "uaf_ghost",
										title:
											"Use-After-Free Quarantine Ghost (0xfd / 0xDEADBEEF)",
										sub: "Dangling pointer read inside freed SLUB/ASan quarantine chunk",
									},
									{
										id: "heap_oob",
										title:
											"uint16_t Integer Wrap -> Heap Redzone Overflow (0xfa)",
										sub: "0xfff0 + 0x0020 wraps alloc_sz to 0x0010 -> 64KB memcpy OOB!",
									},
									{
										id: "house_of_spirit",
										title:
											"The Malloc Maleficarum: House of Spirit (0xf2 Stack Free)",
										sub: "Overwrites pointer to free() a crafted fake fastbin chunk on stack",
									},
								].map((b) => (
									<button
										key={b.id}
										type="button"
										onClick={() => setSinkBug(b.id as SinkBugClass)}
										className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
											sinkBug === b.id
												? "border-amber-400/80 bg-amber-500/15 text-white"
												: "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
										}`}
									>
										<div className="font-bold text-[11px]">{b.title}</div>
										<div className="text-[10px] opacity-75">{b.sub}</div>
									</button>
								))}
							</div>
						</div>
					</div>

					{/* 4-Stage Basic Block Control-Flow Maze Visualizer */}
					<div className="p-4 rounded-xl border border-slate-800 bg-slate-950/95">
						<div className="flex flex-wrap items-center justify-between gap-2 mb-3">
							<div>
								<h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
									Control-Flow Graph (CFG) Frontier Progression
								</h4>
								<p className="text-[11px] text-slate-400">
									Observe which engine unlocks each basic-block predicate along the path to the vulnerable sink.
								</p>
							</div>
							<span
								className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
									gateState.gate4Triggered
										? "border-rose-500/60 bg-rose-500/15 text-rose-300"
										: "border-amber-500/50 bg-amber-500/10 text-amber-300"
								}`}
							>
								{gateState.gate4Triggered
									? "POV SYNTHESIZED & ASAN VERIFIED (0% FALSE POSITIVES)"
									: "FRONTIER STALLED BEFORE SINK"}
							</span>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
							{/* Gate 1 */}
							<div className="p-3 rounded-lg border border-emerald-500/50 bg-emerald-950/20">
								<div className="flex items-center justify-between mb-1">
									<span className="font-bold text-xs text-emerald-300">
										BB_01: Magic Gate
									</span>
									<span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200">
										SOLVED
									</span>
								</div>
								<code className="block text-[10px] text-slate-300 bg-black/60 p-1.5 rounded mb-1.5">
									hdr-&gt;magic == 0xFEE1DEAD
								</code>
								<div className="text-[10px] text-slate-400">
									Time: <strong className="text-white">{gateState.gate1Latency}</strong>
								</div>
							</div>

							{/* Gate 2 */}
							<div
								className={`p-3 rounded-lg border ${
									gateState.gate2Passed
										? "border-emerald-500/50 bg-emerald-950/20"
										: "border-rose-500/50 bg-rose-950/20"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<span className="font-bold text-xs text-cyan-300">
										BB_02: Coupled Math
									</span>
									<span
										className={`text-[10px] px-1.5 py-0.5 rounded ${
											gateState.gate2Passed
												? "bg-emerald-500/20 text-emerald-200"
												: "bg-rose-500/20 text-rose-300"
										}`}
									>
										{gateState.gate2Passed ? "Z3 SOLVED" : "STALLED"}
									</span>
								</div>
								<code className="block text-[10px] text-slate-300 bg-black/60 p-1.5 rounded mb-1.5">
									cnt * stride + 0x31 == len
								</code>
								<div className="text-[10px] text-slate-400">
									Time: <strong className="text-white">{gateState.gate2Latency}</strong>
								</div>
							</div>

							{/* Gate 3 */}
							<div
								className={`p-3 rounded-lg border ${
									gateState.gate3Passed
										? "border-emerald-500/50 bg-emerald-950/20"
										: "border-rose-500/50 bg-rose-950/20"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<span className="font-bold text-xs text-purple-300">
										BB_03: State Machine
									</span>
									<span
										className={`text-[10px] px-1.5 py-0.5 rounded ${
											gateState.gate3Passed
												? "bg-emerald-500/20 text-emerald-200"
												: "bg-rose-500/20 text-rose-300"
										}`}
									>
										{gateState.gate3Passed ? "LLM SLICED" : "STALLED"}
									</span>
								</div>
								<code className="block text-[10px] text-slate-300 bg-black/60 p-1.5 rounded mb-1.5">
									state == S_AUTH_READY
								</code>
								<div className="text-[10px] text-slate-400">
									Time: <strong className="text-white">{gateState.gate3Latency}</strong>
								</div>
							</div>

							{/* Gate 4: Sink */}
							<div
								className={`p-3 rounded-lg border ${
									gateState.gate4Triggered
										? "border-rose-500/80 bg-rose-950/40 shadow-lg"
										: "border-slate-800 bg-slate-900/40 opacity-60"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<span className="font-bold text-xs text-amber-300">
										BB_04: Vulnerable Sink
									</span>
									<span
										className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
											gateState.gate4Triggered
												? "bg-rose-500/30 text-rose-200 animate-pulse"
												: "bg-slate-800 text-slate-400"
										}`}
									>
										{gateState.gate4Triggered ? "POV CRASH!" : "UNREACHED"}
									</span>
								</div>
								<code className="block text-[10px] text-slate-300 bg-black/60 p-1.5 rounded mb-1.5">
									{sinkBug === "heap_oob"
										? "memcpy(buf, src, 0xfff0)"
										: sinkBug === "uaf_ghost"
											? "return ctx->freed->magic"
											: "free(&stack_fake_chunk)"}
								</code>
								<div className="text-[10px] text-slate-400">
									ASan Shadow:{" "}
									<strong className="text-rose-300">
										{sinkBug === "heap_oob"
											? "0xfa (Redzone)"
											: sinkBug === "uaf_ghost"
												? "0xfd (Freed UAF)"
												: "0xf2 (Stack Redzone)"}
									</strong>
								</div>
							</div>
						</div>
					</div>

					{/* ASan Shadow Memory Byte Inspector & SMT-LIBv2 Output */}
					<div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950/95 space-y-3">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div>
								<span className="text-[10px] uppercase tracking-widest text-amber-400 block">
									// ADDRESS SANITIZER SHADOW MEMORY &amp; Z3 SMT SOLVER TRACE
								</span>
								<h4 className="text-sm font-bold text-white">
									{shadowAnatomy.bugTitle}
								</h4>
							</div>
							<code className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[11px]">
								Shadow = ({shadowAnatomy.appAddr} &gt;&gt; 3) + 0x7fff8000 ={" "}
								{shadowAnatomy.shadowAddr}
							</code>
						</div>

						{/* 6-Cell Shadow Memory Strip */}
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
							{shadowAnatomy.shadowBytes.map((cell, idx) => (
								<div
									key={idx}
									className={`p-2.5 rounded-lg border text-center ${
										cell.status === "crash"
											? "border-rose-500 bg-rose-950/50 text-rose-200 animate-pulse"
											: cell.status === "poison"
												? "border-amber-500/40 bg-amber-950/20 text-amber-300"
												: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300"
									}`}
								>
									<div className="text-base font-bold">{cell.byte}</div>
									<div className="text-[10px] opacity-85 mt-0.5">{cell.label}</div>
								</div>
							))}
						</div>

						<div className="p-3 rounded-lg bg-black/90 border border-slate-800 space-y-1.5 text-[11px] overflow-x-auto">
							<div className="text-cyan-400">
								<span className="text-slate-500 select-none">SymCC Z3 Query $ </span>
								<code>{shadowAnatomy.smtFormula}</code>
							</div>
							<div
								className={
									gateState.gate4Triggered ? "text-rose-400 font-bold" : "text-slate-500"
								}
							>
								<span className="text-slate-500 select-none">ASan Verifier  $ </span>
								<code>
									{gateState.gate4Triggered
										? shadowAnatomy.asanReport
										: "[Waiting for CRS to solve BB_01..BB_03 path constraints...]"}
								</code>
							</div>
						</div>
					</div>
				</>
			) : (
				/* October 31st All Hallows' Eve Hacker Lore & Hexspeak Grimoire */
				<div className="space-y-3">
					<div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/15">
						<div className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">
							// ALL HALLOWS&apos; EVE IN THE MACHINE (OCTOBER 31ST ARCHIVES)
						</div>
						<p className="text-xs text-slate-300">
							From the 1998 <em>Halloween Documents</em> leak and Satoshi Nakamoto&apos;s 2008 Bitcoin whitepaper to Linus Torvalds&apos; <code>0xFEE1DEAD</code> reboot magic and Phrack&apos;s <em>Malloc Maleficarum</em> haunted houses—explore the computing history of October 31st.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-3">
						{HALLOWEEN_EPHEMERA.map((item, idx) => (
							<div
								key={idx}
								className="p-4 rounded-xl border border-slate-800 bg-slate-950/90 hover:border-amber-500/50 transition-all"
							>
								<div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
									<div className="flex items-center gap-2">
										<span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
											{item.year}
										</span>
										<h4 className="font-bold text-sm text-white">{item.title}</h4>
									</div>
									<span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300">
										{item.category}
									</span>
								</div>
								<p className="text-xs text-slate-300 leading-relaxed mb-2">
									{item.summary}
								</p>
								<div className="p-2 rounded bg-black/80 border border-slate-800 text-[11px] text-emerald-400 overflow-x-auto">
									<code>{item.technicalArtifact}</code>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
