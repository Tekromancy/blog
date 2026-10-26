import React, { useState, useMemo } from "react";

type CategoryId =
	| "all"
	| "unix-linux"
	| "security"
	| "telecom-photonics"
	| "orbital-hardware"
	| "cyberculture-ai";

interface EphemeraEntry {
	id: string;
	year: number;
	dateLabel: string;
	category: Exclude<CategoryId, "all">;
	categoryBadge: string;
	title: string;
	location: string;
	hardwareStack: string;
	summary: string;
	lowLevelSpec: string;
	ghostIn2026Stack: string;
}

const EPHEMERA_ENTRIES: EphemeraEntry[] = [
	{
		id: "1892-strowger",
		year: 1892,
		dateLabel: "NOV 3, 1892",
		category: "telecom-photonics",
		categoryBadge: "TELECOM & SWITCHING",
		title: "World's First Commercial Automatic Telephone Exchange (Strowger Step-by-Step)",
		location: "La Porte, Indiana, USA",
		hardwareStack: "Strowger 99-Line Electromechanical SXS Switch (U.S. Patent 447,918)",
		summary:
			"Convinced that local Bell switchboard operators were intercepting calls to his funeral parlor and routing them to a rival undertaker, Almon Brown Strowger engineered a two-axis (vertical + rotary) electromechanical relay switch driven directly by subscriber current pulses—opening the first commercial operator-less exchange on November 3, 1892.",
		lowLevelSpec:
			"10 Hz DC loop-disconnect pulse train (60 ms break / 40 ms make); Vertical Magnet steps wiper shaft up 1..10 levels (tens digit); Rotary Magnet sweeps 1..10 bank contacts (units digit); Release Magnet drops shaft via gravity on hang-up.",
		ghostIn2026Stack:
			"Direct ancestor of hierarchical circuit/packet routing tables, out-of-band vs. in-band trunk signaling (later exploited via 2600 Hz blue-boxes), and modern SIP/RTP state machines.",
	},
	{
		id: "1906-berlin-sos",
		year: 1906,
		dateLabel: "NOV 3, 1906",
		category: "telecom-photonics",
		categoryBadge: "RF PROTOCOL INTEROP",
		title: "First International Radiotelegraph Convention Standardizes 'SOS' & Breaks Marconi Lock-In",
		location: "Berlin, Germany (27 Nations)",
		hardwareStack: "500 kHz (600m) & 1000 kHz (300m) Spark-Gap Radiotelegraph Transmitters",
		summary:
			"Twenty-seven nations signed the Berlin Radiotelegraph Convention on November 3, 1906, adopting the unbroken Morse prosign SOS (··· −−− ···) globally and enacting Article 3—which outlawed the Marconi Company's corporate policy of refusing to relay packets from competing Telefunken or De Forest radios.",
		lowLevelSpec:
			"Prosign: ···−−−··· transmitted as a single 9-element continuous symbol (no inter-character gaps), replacing Marconi's 'CQD' (-·-· --·- -··) on the mandatory 500 kHz international calling carrier.",
		ghostIn2026Stack:
			"The world's first legally enforced Open Network Interoperability Mandate—the direct regulatory precursor to IETF RFC open standards and carrier peering neutrality.",
	},
	{
		id: "1928-holonyak",
		year: 1928,
		dateLabel: "NOV 3, 1928",
		category: "telecom-photonics",
		categoryBadge: "SEMICONDUCTOR PHOTONICS",
		title: "Birth of Nick Holonyak Jr., Inventor of the Visible LED & Quantum-Well Laser Diode",
		location: "Zeigler, Illinois, USA",
		hardwareStack: "GaAsP (Gallium Arsenide Phosphide) p-n Junction Alloy @ ~650 nm",
		summary:
			"John Bardeen's very first PhD student at UIUC, Nick Holonyak Jr. (born Nov 3, 1928) invented the first practical visible-spectrum Light-Emitting Diode (red GaAsP LED, 1962), the III-V semiconductor laser diode, and the household thyristor dimmer switch.",
		lowLevelSpec:
			"Direct-bandgap radiative recombination across a GaAs(1-x)P(x) crystal lattice emitting coherent and incoherent photons at ~1.9 eV (red visible spectrum) instead of 870 nm infrared.",
		ghostIn2026Stack:
			"Every blinking server rack link/activity LED, 800G VCSEL/silicon-photonics optical transceiver in AI GPU fabrics, and status indicator on Earth traces back to Holonyak's crystal junctions.",
	},
	{
		id: "1937-harvard-mark-i",
		year: 1937,
		dateLabel: "NOV 3, 1937",
		category: "orbital-hardware",
		categoryBadge: "EARLY COMPUTING",
		title: "Howard Aiken Writes the Proposal Letter to IBM for the Harvard Mark I (ASCC)",
		location: "Cambridge, Massachusetts, USA",
		hardwareStack: "IBM Automatic Sequence Controlled Calculator (765,000 Parts, 3,500 Relays)",
		summary:
			"On November 3, 1937, Harvard physicist Howard H. Aiken sent his pivotal letter to IBM Chief Engineer James W. Bryce proposing an automatic electromechanical calculator capable of evaluating non-linear differential equations—birthing the Harvard Mark I.",
		lowLevelSpec:
			"72 storage counters (each storing a 23-digit signed decimal number + sign via 24 electromechanical rotary wheels), synchronized by a 50-foot mechanical driveshaft driven by a 5-HP motor; 0.3s addition, 6.0s multiplication, 15.3s division; programmed via 24-channel perforated paper tape with separate instruction and data paths ('Harvard Architecture').",
		ghostIn2026Stack:
			"Gave computer architecture the term 'Harvard Architecture' (physically split Instruction L1i and Data L1d caches/buses), and Grace Hopper wrote its 500-page manual—the first computer programming book in history.",
	},
	{
		id: "1954-gojira-mozilla",
		year: 1954,
		dateLabel: "NOV 3, 1954",
		category: "cyberculture-ai",
		categoryBadge: "CYBERCULTURE & HTTP",
		title: "Ishirō Honda's 'Gojira' (Godzilla) Premieres Nationwide in Japan—Future Namesake of Mozilla/5.0",
		location: "Tokyo, Japan (Toho Studios)",
		hardwareStack: "Atomic-Age Cinema -> 1994 Netscape 'Mosaic + Godzilla' Engine",
		summary:
			"Released nationwide across Japan on Culture Day (November 3, 1954), Gojira became the ultimate nuclear-age technological allegory. Exactly 40 years later in 1994, Netscape engineer Jamie Zawinski combined 'Mosaic' and 'Godzilla' into 'Mozilla'—the internal codename for Netscape Navigator.",
		lowLevelSpec:
			"HTTP/1.0 – HTTP/3 Request Header: `User-Agent: Mozilla/5.0 (X11; Linux x86_64) ...` preserved forever due to late-1990s server-side user-agent sniffing for HTML frame support.",
		ghostIn2026Stack:
			"Inspect any HTTP request leaving Chrome, Firefox, Safari, or Edge right now: 72 years after Gojira hit theaters on November 3, 1954, every browser on Earth still announces itself as `Mozilla/5.0`.",
	},
	{
		id: "1957-sputnik-2",
		year: 1957,
		dateLabel: "NOV 3, 1957",
		category: "orbital-hardware",
		categoryBadge: "ORBITAL TELEMETRY",
		title: "Launch of Sputnik 2: Laika & Humanity's First Real-Time Orbital Bio-Telemetry ('Trall-D')",
		location: "Baikonur Cosmodrome Site 1/5, USSR",
		hardwareStack: "8K71PS R-7 Booster | 508.3 kg Payload | Trall-D 20.005 / 40.002 MHz Downlink",
		summary:
			"Constructed in under four weeks without formal blueprints following Sputnik 1, Sputnik 2 launched on November 3, 1957 carrying Laika and the first orbital life-support and cosmic-ray science payload (KS-5 Geiger counters + solar X-ray photometers).",
		lowLevelSpec:
			"Trall-D 15-channel time-division multiplexed (TDM) telemetry system transmitting implanted silver-electrode ECG waveforms, chest-impedance respiration frequency, carotid blood pressure, cabin barometric pressure, and cosmic-ray particle counts.",
		ghostIn2026Stack:
			"Pioneered multi-channel time-division multiplexed space telemetry and biometric sensor fusion used in every modern satellite bus and wearable medical monitor.",
	},
	{
		id: "1962-gabe-newell",
		year: 1962,
		dateLabel: "NOV 3, 1962",
		category: "cyberculture-ai",
		categoryBadge: "GRAPHICS & LINUX GAMING",
		title: "Birth of Gabe Newell: From Windows NT/WinG & DOOM to Valve, Steam, and Linux Proton",
		location: "Colorado / Bellevue, Washington, USA",
		hardwareStack: "WinG / DirectX -> GoldSrc / Source 2 -> SteamOS 3 (Arch Linux + Proton + Gamescope)",
		summary:
			"Born November 3, 1962, Gabe Newell spent 13 years at Microsoft (Employee #271), where he realized id Software's DOOM was installed on more PCs than Windows—leading the WinG fast-bitmap API and Windows 95 DOOM port before co-founding Valve in 1996.",
		lowLevelSpec:
			"Proton compatibility stack: translates Windows PE32+ syscalls via Wine and transpiles Direct3D 9/10/11 (`DXVK`) and Direct3D 12 (`VKD3D-Proton`) shader bytecode directly into native Linux Vulkan queues with `fsync`/`ntsync` kernel primitives.",
		ghostIn2026Stack:
			"Valve's investment in `Wine`, `DXVK`, `VKD3D-Proton`, `Mesa RADV`, and the Linux `ntsync` (`drivers/misc/ntsync.c`) kernel driver transformed Linux into a first-class low-latency gaming OS.",
	},
	{
		id: "1971-unix-v1",
		year: 1971,
		dateLabel: "NOV 3, 1971",
		category: "unix-linux",
		categoryBadge: "THE UNIX GENESIS",
		title: "Ken Thompson & Dennis Ritchie Publish the First Edition 'UNIX Programmer's Manual' (11/3/71)",
		location: "Bell Telephone Laboratories, Murray Hill, New Jersey",
		hardwareStack: "16-Bit DEC PDP-11/20 | 24 KB Magnetic Core RAM | 512 KB RF11 Drum | Model 37 Teletype",
		summary:
			"The canonical timestamp stamped at the top of every First Edition UNIX manual page: `11/3/71`. Written in ~4,500 lines of PDP-11 assembly before the C language existed, UNIX V1 codified hierarchical filesystems, device-as-a-file (`/dev/tty0`), `fork()` + `exec()`, and `setuid` permission bits.",
		lowLevelSpec:
			"60 user commands in `/bin`; 34 kernel syscalls invoked via PDP-11 `trap` (`0104400 + n`); `sys time` (#13) returned a 32-bit count of 60 Hz AC ticks since Jan 1, 1971 (`epoch`); note that `|` pipes did NOT exist yet in `11/3/71` (added in 1972/73 UNIX V3)!",
		ghostIn2026Stack:
			"Every `fork()`, `execve()`, `open()`, `read()`, `write()`, `chmod()`, `chown()`, `mount()`, and `/dev/*` node in Linux 6.12+ is a direct, unbroken descendant of the `11/3/71` specification.",
	},
	{
		id: "1973-mariner-10",
		year: 1973,
		dateLabel: "NOV 3, 1973",
		category: "orbital-hardware",
		categoryBadge: "DEEP-SPACE TELEMETRY",
		title: "Launch of Mariner 10: First Interplanetary Gravity-Assist & 117.6 kbps Real-Time Digital Video",
		location: "Cape Canaveral LC-36B, Florida, USA",
		hardwareStack: "Atlas-Centaur AC-34 | Dual Vidicon Cameras | S-Band (2.29 GHz) & X-Band (8.41 GHz)",
		summary:
			"Launched November 3, 1973, Mariner 10 executed Giuseppe 'Bepi' Colombo's gravitational slingshot around Venus to reach Mercury three times—while bypassing its small onboard tape recorder to stream uncompressed 117.6 kbps real-time digital video across the inner solar system.",
		lowLevelSpec:
			"832 x 700 pixel frames quantized at 8-bit grayscale (4.66 Mbits/frame) transmitted every 42 seconds at 117.6 kbps using block-coded reed-muller telemetry to the 64-meter Goldstone DSS-14 antenna.",
		ghostIn2026Stack:
			"Proved multi-planet gravity-assist trajectory optimization and high-rate X-band deep-space digital packet framing.",
	},
	{
		id: "1983-cohen-virus",
		year: 1983,
		dateLabel: "NOV 3, 1983",
		category: "security",
		categoryBadge: "FIRST COMPUTER VIRUS",
		title: "Fred Cohen & Len Adleman Create and Name the First 'Computer Virus' on VAX-11/750 UNIX",
		location: "University of Southern California (USC), Los Angeles",
		hardwareStack: "DEC VAX-11/750 running UNIX | 200-Line C Payload Infected into `vd` Binary",
		summary:
			"At 4:00 PM on November 3, 1983, PhD student Fred Cohen conceived and spent 8 hours writing a parasitic self-replicating program embedded in the `vd` directory utility on a VAX-11/750. His advisor Leonard Adleman (the 'A' in RSA) coined the term 'computer virus'.",
		lowLevelSpec:
			"Across 5 live experiments on a multi-user VAX-11/750, the virus traversed discretionary UNIX file permissions (`rwxr-xr-x`) to capture `root` (`uid=0`) privileges in an average of 30 minutes (minimum: 5 minutes). Cohen also proved via Turing halting diagonalization that universal virus detection is undecidable.",
		ghostIn2026Stack:
			"Demonstrated transitive trust exploitation under Discretionary Access Control (DAC), directly motivating Mandatory Access Control (SELinux, AppArmor, Landlock) and binary integrity signing.",
	},
	{
		id: "1987-gould-laser-patent",
		year: 1987,
		dateLabel: "NOV 3, 1987",
		category: "telecom-photonics",
		categoryBadge: "OPTICAL PHYSICS",
		title: "Gordon Gould Wins the 30-Year 'Laser Wars' Patent (U.S. Patent 4,704,583)",
		location: "United States Patent and Trademark Office",
		hardwareStack: "Gas-Discharge Collision Population-Inversion Laser Amplifier",
		summary:
			"Thirty years after coining the acronym 'LASER' in a notebook notarized at a Bronx candy store in November 1957, Gordon Gould defeated decades of legal challenges from Bell Labs and laser manufacturers to receive U.S. Patent 4,704,583 on November 3, 1987.",
		lowLevelSpec:
			"Inelastic collisions of the second kind (e.g., Helium-Neon 632.8 nm energy transfer) pumping metastable atomic states into population inversion ($N_2 > N_1$) inside a Fabry-Pérot optical resonator cavity.",
		ghostIn2026Stack:
			"Coherent laser amplification underpins DWDM submarine fiber cables, EUV lithography steppers printing 2nm transistors, and datacenter optical interconnects.",
	},
	{
		id: "1988-morris-worm",
		year: 1988,
		dateLabel: "NOV 3, 1988",
		category: "security",
		categoryBadge: "ARPANET INCIDENT RESPONSE",
		title: "'Dark Thursday': Reverse-Engineering the Morris Worm Across the Paralyzed ARPANET",
		location: "MIT, UC Berkeley, & Purdue University (ARPANET / NSFNET)",
		hardwareStack: "DEC VAX & Sun-3 (68020) running 4.3BSD UNIX (~6,000 of 60,000 Internet Hosts Infected)",
		summary:
			"Unleashed late on Nov 2, by the morning of Thursday, November 3, 1988 the Morris Worm had crippled 10% of the entire Internet. Teams at Berkeley (Keith Bostic, Mike Karels), MIT (Mark Eichin, Jon Rochlis), and Purdue (Gene Spafford) spent November 3rd capturing the 99-line C bootstrap and decompiling the stripped VAX/Sun-3 `.o` binaries.",
		lowLevelSpec:
			"Vector 1: `fingerd` 536-byte `gets(buf)` VAX stack buffer overflow executing `execve(\"/bin/sh\", 0, 0)`; Vector 2: `sendmail` `DEBUG` command piping shell script as root; Vector 3: `.rhosts`/`/etc/hosts.equiv` + 432-word dictionary attack; Fatal flaw: `pleasequit` / `1-in-7` (`random() % 7 == 0`) check caused exponential re-infection fork bombs.",
		ghostIn2026Stack:
			"Killed `gets()` (finally removed in C11), birthed stack canaries (`-fstack-protector-strong`), ASLR, NX/DEP bits, and prompted DARPA to establish CERT/CC days later.",
	},
	{
		id: "1994-redhat-linux",
		year: 1994,
		dateLabel: "NOV 3, 1994 / 2015 / 2021",
		category: "unix-linux",
		categoryBadge: "LINUX DISTRIBUTIONS",
		title: "The Red Hat & Fedora November 3rd Triad: Red Hat Linux (1994), Fedora 23 (2015), & RHEL 9 Beta (2021)",
		location: "Durham / Raleigh, North Carolina, USA",
		hardwareStack: "Linux Kernel 1.0.9 / 1.1.54 -> RPM Package Manager -> Enterprise Linux",
		summary:
			"On November 3, 1994, Marc Ewing announced the commercial availability of Red Hat Software Linux ('Halloween' release)—starting a recurring November 3rd tradition later echoed by Fedora 23 GA (Nov 3, 2015) and Red Hat Enterprise Linux 9 Beta (Nov 3, 2021).",
		lowLevelSpec:
			"Introduced declarative package metadata, pristine upstream tarball + patch spec builds (`RPP` -> `RPM`), and automated dependency resolution over raw Slackware tarballs.",
		ghostIn2026Stack:
			"The `rpm` / `dnf` / `ostree` packaging lineage powers millions of production bare-metal Kubernetes nodes, RHEL servers, and CoreOS/Fedora Atomic hosts.",
	},
	{
		id: "2023-bletchley-ai",
		year: 2023,
		dateLabel: "NOV 3, 2023",
		category: "cyberculture-ai",
		categoryBadge: "FRONTIER AI GOVERNANCE",
		title: "Conclusion of the Inaugural Bletchley Park AI Safety Summit & Frontier Model Testing Pact",
		location: "Bletchley Park (Hut 8 / Mansion), Buckinghamshire, UK",
		hardwareStack: "Frontier LLM Clusters (10^25+ FLOPs) Sitting on the Historic Site of Turing's Bombe & Colossus",
		summary:
			"On November 3, 2023, inside the exact estate where Alan Turing cracked Enigma and Tommy Flowers built the 2,400-vacuum-tube Colossus computer, 28 nations and frontier AI labs concluded the first AI Safety Summit, establishing the UK/US AI Safety Institutes and pre-deployment red-team evaluation protocols for CBRN and autonomous cyber capabilities.",
		lowLevelSpec:
			"Mandated pre-release adversarial red-teaming for frontier models exceeding $10^{25}\\text{–}10^{26}$ training FLOPs across autonomous vulnerability discovery, sandbox escape, and cryptographic/bio-design uplift.",
		ghostIn2026Stack:
			"Directly shaped the hardware enclave isolation, MCP tool-poisoning defenses, and Firecracker/Landlock agent sandboxes we engineer on Tekromancy today.",
	},
];

interface UnixV1Command {
	cmd: string;
	label: string;
	output: string;
}

const UNIX_V1_COMMANDS: Record<string, UnixV1Command> = {
	"man-sh": {
		cmd: "roff /usr/man/man1/sh.1",
		label: "1. man(I) sh — 11/3/71 Thompson Shell",
		output: `11/3/71                                                       SH (I)

NAME          sh  --  command interpreter

SYNOPSIS      sh [ name [ arg1 ... [ arg9 ] ] ]

DESCRIPTION   sh is the standard command interpreter. It arranges
              for the execution of the commands listed in sections I
              and VI.

              Filters & Redirection (11/3/71):
                >file     redirect standard output (fd 1) to file
                <file     redirect standard input (fd 0) from file
                cmd1;cmd2 sequential command execution
                cmd &     asynchronous background execution (prints PID)

FILES         /etc/glob  (wildcard expansion helper binary!)

DIAGNOSTICS   "?"        (Thompson's notorious 1-byte error message)

BUGS          Notice what is MISSING on November 3, 1971:
              Pipes (|) do not exist yet! Doug McIlroy's pipe operator
              was not added until 1972/1973 (UNIX V3).`,
	},
	"man-fork": {
		cmd: "roff /usr/man/man2/fork.2",
		label: "2. sys fork(II) — PDP-11 Trap #2",
		output: `11/3/71                                                 SYS FORK (II)

NAME          fork  --  spawn new process

SYNOPSIS      sys fork    / opcode: 0104402 (PDP-11 trap #2)
              (old process returns here -> r0 = child PID)
              (new process returns 1 word earlier!)

DESCRIPTION   fork is the ONLY way new processes are created in UNIX.
              The new process's core image is a complete copy of the
              12 KB user core segment of the caller, swapped onto the
              512 KB RF11 fixed-head drum (/dev/rf0).

PDP-11 ASM    sys   fork          / trap 2 into kernel
              br    child_branch  / child returns here!
              mov   r0,child_pid  / parent skips 1 word & gets child PID`,
	},
	"man-time": {
		cmd: "roff /usr/man/man2/time.2",
		label: "3. sys time(II) — The 1971 60Hz Epoch Bug",
		output: `11/3/71                                                 SYS TIME (II)

NAME          time  --  get time of year

SYNOPSIS      sys time    / opcode: 0104415 (PDP-11 trap #13)

DESCRIPTION   time returns the time since 00:00:00, Jan. 1, 1971,
              measured in SIXTIETHS of a second (60 Hz AC line clock).
              The high-order word is in register r0; low-order in r1.

BUGS          "The chronological-minded user will note that 2**32
              sixtieths of a second is only about 2.26 years!"
              -- Ken Thompson & Dennis Ritchie, 11/3/71 Manual.
              (This forced Bell Labs to switch to 1 Hz seconds and
              reset the canonical UNIX Epoch to Jan 1, 1970 in V4!)`,
	},
	"pipe-test": {
		cmd: "ls /bin | wc",
		label: "4. Try Running `ls /bin | wc` on 11/3/71",
		output: `@ ls /bin | wc
| : not found
?

[HISTORICAL KERNEL NOTE // 11/3/71]:
On November 3, 1971, the pipe syscall (sys pipe) and '|' shell syntax
had not been invented yet! To count files in /bin on UNIX V1, you had
to write an explicit temporary file onto the RK03 disk pack:

@ ls /bin >tmp
@ wc tmp
      60      60     312 tmp
@ rm tmp`,
	},
	"pdp11-map": {
		cmd: "db /unix /dev/mem",
		label: "5. Inspect 24 KB PDP-11/20 Core Memory Map",
		output: `=====================================================================
 DEC PDP-11/20 PHYSICAL CORE MEMORY MAP (UNIX V1 — NOV 3, 1971)
 Total System RAM: 24 KB (12,288 16-bit words | Octal 000000..057777)
=====================================================================
 [000000 - 000377]  Hardware Interrupt & Trap Vectors (sys 0104400)
 [000400 - 027777]  Resident UNIX V1 Kernel (~12 KB PDP-11 Assembly)
                    ├── Process Table (16 max processes: u.p_pid)
                    ├── I/O Buffer Cache (6 x 512-byte RK03/RF11 bufs)
                    └── Character & Teletype Clists (tty0..tty7)
---------------------------------------------------------------------
 [030000 - 057777]  Active User Process Image (~12 KB Max Program!)
                    ├── No Hardware MMU! (KS11 memory protection only)
                    └── Context switch = full 12 KB DMA swap to RF11 drum!
---------------------------------------------------------------------
 [160000 - 177777]  PDP-11 UNIBUS Memory-Mapped Device Registers`,
	},
};

export default function November3EphemeraAlmanac() {
	const [activeTab, setActiveTab] = useState<"almanac" | "unix-v1" | "strowger">("almanac");
	const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
	const [selectedEntryId, setSelectedEntryId] = useState<string>("1971-unix-v1");
	const [selectedUnixCmd, setSelectedUnixCmd] = useState<string>("man-sh");
	const [dialedNumber, setDialedNumber] = useState<string>("71");

	const filteredEntries = useMemo(() => {
		if (selectedCategory === "all") return EPHEMERA_ENTRIES;
		return EPHEMERA_ENTRIES.filter((e) => e.category === selectedCategory);
	}, [selectedCategory]);

	const activeEntry = useMemo(() => {
		return (
			filteredEntries.find((e) => e.id === selectedEntryId) ||
			filteredEntries[0] ||
			EPHEMERA_ENTRIES[0]
		);
	}, [filteredEntries, selectedEntryId]);

	const unixCmd = UNIX_V1_COMMANDS[selectedUnixCmd] || UNIX_V1_COMMANDS["man-sh"];

	const strowgerDigits = useMemo(() => {
		const clean = dialedNumber.replace(/\D/g, "").slice(0, 2).padStart(2, "1");
		const tens = parseInt(clean[0], 10) || 10; // '0' on rotary dial = 10 pulses
		const units = parseInt(clean[1], 10) || 10;
		const totalPulses = tens + units;
		const dialTimeMs = tens * 100 + 600 + units * 100; // 100ms/pulse + 600ms inter-digit pause
		return {
			display: clean,
			tensPulses: tens,
			unitsPulses: units,
			totalPulses,
			dialTimeMs,
		};
	}, [dialedNumber]);

	return (
		<div className="w-full rounded-xl border border-emerald-500/30 bg-[#070b12] p-5 sm:p-6 text-gray-200 font-mono text-xs shadow-2xl">
			{/* Top Header & Tab Switcher */}
			<div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
						11 // 03 CHRONICLES
					</span>
					<span className="text-gray-400 hidden sm:inline">
						134 Years of Verified November 3rd Systems &amp; Hacker Ephemera
					</span>
				</div>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setActiveTab("almanac")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "almanac"
								? "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						01. Ephemera Vault (1892–2026)
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("unix-v1")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "unix-v1"
								? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						02. 11/3/71 UNIX V1 PDP-11 Console
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("strowger")}
						className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
							activeTab === "strowger"
								? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold"
								: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
						}`}
					>
						03. 1892 Strowger &amp; 1906 SOS Lab
					</button>
				</div>
			</div>

			{activeTab === "almanac" && (
				<div className="space-y-5">
					{/* Category Filter Pills */}
					<div className="flex flex-wrap gap-2">
						{[
							{ id: "all", label: "ALL EPOCHS (12)" },
							{ id: "unix-linux", label: "UNIX & LINUX" },
							{ id: "security", label: "SECURITY & VIRUSES" },
							{ id: "telecom-photonics", label: "TELECOM & LASERS" },
							{ id: "orbital-hardware", label: "ORBITAL & HARDWARE" },
							{ id: "cyberculture-ai", label: "CYBERCULTURE & AI" },
						].map((cat) => (
							<button
								key={cat.id}
								type="button"
								onClick={() => setSelectedCategory(cat.id as CategoryId)}
								className={`px-2.5 py-1 rounded border text-[11px] transition-all cursor-pointer ${
									selectedCategory === cat.id
										? "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold"
										: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>

					{/* Timeline Selector + Deep-Dive Inspector */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
						{/* Left List */}
						<div className="lg:col-span-5 space-y-2 max-h-[430px] overflow-y-auto pr-1">
							{filteredEntries.map((item) => {
								const isSelected = activeEntry.id === item.id;
								return (
									<button
										key={item.id}
										type="button"
										onClick={() => setSelectedEntryId(item.id)}
										className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
											isSelected
												? "bg-emerald-950/50 border-emerald-400 text-white shadow-lg"
												: "bg-black/40 border-white/10 text-gray-400 hover:border-white/25"
										}`}
									>
										<div className="flex items-center justify-between gap-2 mb-1">
											<span className="font-bold text-emerald-300 text-[11px]">
												{item.dateLabel}
											</span>
											<span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-cyan-300">
												{item.categoryBadge}
											</span>
										</div>
										<div className="text-xs font-bold text-white leading-snug">
											{item.title}
										</div>
									</button>
								);
							})}
						</div>

						{/* Right Inspector Card */}
						<div className="lg:col-span-7 p-5 rounded-xl border border-emerald-500/30 bg-black/60 flex flex-col justify-between space-y-4">
							<div className="space-y-3">
								<div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
									<span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold">
										{activeEntry.dateLabel} // {activeEntry.categoryBadge}
									</span>
									<span className="text-[11px] text-gray-400">
										📍 {activeEntry.location}
									</span>
								</div>

								<h4 className="text-base sm:text-lg font-bold text-white leading-snug">
									{activeEntry.title}
								</h4>

								<div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[11px]">
									<span className="text-cyan-400 uppercase font-bold">
										Hardware / Protocol Stack:{" "}
									</span>
									<span className="text-gray-200">{activeEntry.hardwareStack}</span>
								</div>

								<p className="text-xs text-gray-300 leading-relaxed">
									{activeEntry.summary}
								</p>

								<div className="p-3.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20">
									<div className="text-[10px] font-bold uppercase text-cyan-300 mb-1">
										// Low-Level Hardware &amp; Protocol Telemetry
									</div>
									<div className="text-[11px] text-cyan-100 leading-relaxed">
										{activeEntry.lowLevelSpec}
									</div>
								</div>
							</div>

							<div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
								<div className="text-[10px] font-bold uppercase text-emerald-300 mb-1">
									// Ghost in Your 2026 Production Stack
								</div>
								<div className="text-[11px] text-emerald-100 leading-relaxed">
									{activeEntry.ghostIn2026Stack}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{activeTab === "unix-v1" && (
				<div className="space-y-4">
					<div className="flex flex-wrap gap-2">
						{Object.entries(UNIX_V1_COMMANDS).map(([key, item]) => (
							<button
								key={key}
								type="button"
								onClick={() => setSelectedUnixCmd(key)}
								className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
									selectedUnixCmd === key
										? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
										: "bg-black/40 border-white/10 text-gray-400 hover:text-white"
								}`}
							>
								{item.label}
							</button>
						))}
					</div>

					<div className="p-4 rounded-xl border border-cyan-500/40 bg-[#04070d] shadow-inner">
						<div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-[11px] text-gray-400">
							<span>
								TTY0 // MODEL 37 TELETYPE @ 150 BAUD (BELL LABS MURRAY HILL — NOV 3, 1971)
							</span>
							<span className="text-emerald-400 font-bold">
								DEC PDP-11/20 (24 KB CORE)
							</span>
						</div>
						<div className="text-amber-300 mb-2 font-bold">
							login: dmr
							<br />@ {unixCmd.cmd}
						</div>
						<pre className="text-[11px] sm:text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
							{unixCmd.output}
						</pre>
					</div>
				</div>
			)}

			{activeTab === "strowger" && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
					{/* Left: 1892 Strowger Step-by-Step Simulator */}
					<div className="p-4 rounded-xl border border-amber-500/30 bg-black/50 space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-amber-300 font-bold uppercase">
								// Nov 3, 1892: Strowger 99-Line SXS Switch (La Porte, IN)
							</span>
							<span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 text-[10px]">
								10 PPS Loop-Disconnect
							</span>
						</div>

						<p className="text-[11px] text-gray-300 leading-relaxed">
							Select a 2-digit subscriber line (`01`–`99`) to inspect how Almon Strowger&apos;s
							electromechanical vertical and rotary pawls routed calls in hardware without a
							human switchboard operator:
						</p>

						<div className="flex items-center gap-3">
							<label className="text-[11px] text-gray-400">Subscriber Line (01–99):</label>
							<input
								type="text"
								maxLength={2}
								value={dialedNumber}
								onChange={(e) => setDialedNumber(e.target.value)}
								className="w-20 px-3 py-1.5 rounded bg-black border border-amber-400/50 text-amber-300 font-bold text-center"
							/>
							<div className="flex gap-1.5">
								{["71", "83", "88", "99"].map((preset) => (
									<button
										key={preset}
										type="button"
										onClick={() => setDialedNumber(preset)}
										className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 cursor-pointer"
									>
										Line #{preset}
									</button>
								))}
							</div>
						</div>

						<div className="grid grid-cols-3 gap-2.5 text-center">
							<div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
								<div className="text-[10px] text-gray-400">Vertical Ascent</div>
								<div className="text-base font-bold text-amber-300 mt-0.5">
									{strowgerDigits.tensPulses} Steps Up
								</div>
								<div className="text-[10px] text-gray-500">Tens Magnet (60ms/40ms)</div>
							</div>
							<div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
								<div className="text-[10px] text-gray-400">Rotary Sweep</div>
								<div className="text-base font-bold text-cyan-300 mt-0.5">
									{strowgerDigits.unitsPulses} Contacts In
								</div>
								<div className="text-[10px] text-gray-500">Units Magnet Bank</div>
							</div>
							<div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
								<div className="text-[10px] text-gray-400">Switching Time</div>
								<div className="text-base font-bold text-emerald-300 mt-0.5">
									{strowgerDigits.dialTimeMs} ms
								</div>
								<div className="text-[10px] text-gray-500">
									{strowgerDigits.totalPulses} Total Loop Pulses
								</div>
							</div>
						</div>

						<div className="p-3 rounded-lg bg-[#05080f] border border-white/10">
							<div className="text-[10px] text-gray-400 mb-1">
								10 Hz DC Loop-Disconnect Pulse Train (Tens -&gt; 600ms Pause -&gt; Units):
							</div>
							<div className="font-bold text-amber-300 tracking-widest break-all">
								{Array.from({ length: strowgerDigits.tensPulses })
									.map(() => "⎍")
									.join("")}
								<span className="text-gray-600 mx-2">___[600ms IDR]___</span>
								{Array.from({ length: strowgerDigits.unitsPulses })
									.map(() => "⎍")
									.join("")}
							</div>
						</div>
					</div>

					{/* Right: 1906 Berlin Radiotelegraph SOS Protocol */}
					<div className="p-4 rounded-xl border border-cyan-500/30 bg-black/50 space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-cyan-300 font-bold uppercase">
								// Nov 3, 1906: Berlin Radiotelegraph SOS &amp; Article 3
							</span>
							<span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 text-[10px]">
								500 kHz (600m) Carrier
							</span>
						</div>

						<p className="text-[11px] text-gray-300 leading-relaxed">
							Before November 3, 1906, Marconi stations transmitted proprietary{" "}
							<code className="text-amber-300">CQD</code> and refused to interoperate with
							Telefunken ships. The Berlin Convention standardized the unbroken 9-element
							prosign <code className="text-emerald-300">···−−−···</code> and mandated
							vendor-neutral wireless peering:
						</p>

						<div className="p-3.5 rounded-lg bg-[#05080f] border border-cyan-500/30 space-y-2">
							<div className="text-[10px] text-gray-400 uppercase">
								Deprecated Marconi Proprietary Signal (Pre-Nov 3, 1906):
							</div>
							<div className="text-amber-300 font-bold">
								C Q D : &nbsp; − · − · &nbsp;&nbsp; − − · − &nbsp;&nbsp; − · · &nbsp; (3
								separate letters, easily garbled in static)
							</div>
							<div className="text-[10px] text-gray-400 uppercase pt-2">
								Berlin Treaty Mandatory Global Prosign (Signed Nov 3, 1906):
							</div>
							<div className="text-emerald-300 font-bold text-sm tracking-wider">
								S O S : &nbsp; · · · − − − · · · &nbsp; (18-Baud Unbroken 27-Unit Frame)
							</div>
						</div>

						<div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-100 leading-relaxed">
							<strong className="text-emerald-300">Article 3 (Open Interop):</strong>{" "}
							&ldquo;Coastal stations and shipboard stations are bound to exchange
							radiotelegrams the one with the other without distinction as to the
							radiotelegraph system adopted by such stations.&rdquo;
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
