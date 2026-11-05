import React, { useState, useMemo } from "react";

type BootArchitecture = "srtm_legacy" | "bootguard_srtm" | "drtm_trenchboot";
type AttackVector = "none" | "logofail_dxe" | "blacklotus_byovd" | "spi_flashrom";

export default function UefiBootkitDefenseSimulator() {
	const [bootArch, setBootArch] = useState<BootArchitecture>("drtm_trenchboot");
	const [activeAttack, setActiveAttack] = useState<AttackVector>("logofail_dxe");
	const [isFuseLocked, setIsFuseLocked] = useState<boolean>(true);
	const [smmBwpEnabled, setSmmBwpEnabled] = useState<boolean>(true);
	const [pcr17_18Sealed, setPcr17_18Sealed] = useState<boolean>(true);

	// Evaluate security outcomes
	const outcome = useMemo(() => {
		let compromised = false;
		let detectionStage = "";
		let tcbDrivers = 550;
		let pcrTarget = "PCR 0..7";
		let explanation = "";

		if (bootArch === "srtm_legacy") {
			tcbDrivers = 550;
			pcrTarget = "PCR 0..7 (Locality 0)";
			if (activeAttack === "logofail_dxe") {
				compromised = true;
				detectionStage = "COMPROMISED BEFORE EXITBOOTSERVICES()";
				explanation = "A malicious image parser in UEFI DXE overwrote memory in Ring 0. Because legacy Secure Boot only checks drivers before loading, the compromised DXE driver hooked kernel entry and spoofed Locality-0 PCR extensions. Kernel is fully hijacked!";
			} else if (activeAttack === "blacklotus_byovd") {
				compromised = true;
				detectionStage = "BYOVD BOOTLOADER HIJACK";
				explanation = "An attacker used an older, vulnerable signed bootloader (CVE-2022-21894). Legacy Secure Boot accepted the signature, and the bootloader disabled kernel code integrity!";
			} else if (activeAttack === "spi_flashrom") {
				compromised = !smmBwpEnabled;
				detectionStage = smmBwpEnabled ? "BLOCKED BY SMM_BWP" : "SPI FLASH OVERWRITTEN";
				explanation = smmBwpEnabled
					? "Chipset SMM_BWP and PR0 protected range registers blocked Ring-0 flashrom writes."
					: "Without SMM_BWP or Boot Guard fuse lock, flashrom wrote directly to the SPI flash reset vector! Persistent hardware bootkit established.";
			} else {
				compromised = false;
				detectionStage = "CLEAN BOOT (FRAGILE)";
				explanation = "System booted cleanly, but the ~550 DXE driver attack surface remains vulnerable to any future zero-day in firmware parsers.";
			}
		} else if (bootArch === "bootguard_srtm") {
			tcbDrivers = 550;
			pcrTarget = "PCR 0..7 (Boot Guard Locality 3 -> Locality 0)";
			if (activeAttack === "spi_flashrom") {
				compromised = false;
				detectionStage = "BOOT GUARD ACM HALT";
				explanation = isFuseLocked
					? "Hardware fuses (FPF) verified Key Manifest public key hash. Modified IBB failed signature verification inside Cache-as-RAM (NEM). CPU halted at reset!"
					: "Fuses not blown! Boot Guard was bypassed because fallback mode allowed execution.";
			} else if (activeAttack === "logofail_dxe") {
				compromised = true;
				detectionStage = "COMPROMISED IN DXE RUNTIME";
				explanation = "Boot Guard successfully verified the SPI flash image, BUT the signed DXE driver contained an image parsing flaw. Boot Guard cannot inspect dynamic DXE heap exploitation! Kernel hijacked.";
			} else if (activeAttack === "blacklotus_byovd") {
				compromised = false;
				detectionStage = "REVOKED DBX / PCR 4 EXTENSION DETECTED";
				explanation = "Vulnerable bootloader was detected via dbx revocation or altered PCR 4 measurement, preventing key unsealing.";
			} else {
				compromised = false;
				detectionStage = "VERIFIED BOOT GUARD LAUNCH";
				explanation = "Hardware verified IBB. However, any BIOS update will change PCR 0/2 and break TPM unsealing policies.";
			}
		} else {
			// drtm_trenchboot
			tcbDrivers = 0; // DXE is decoupled from TCB!
			pcrTarget = "PCR 17..18 (Locality 2/4 Hardware Reset)";
			if (activeAttack === "logofail_dxe") {
				compromised = false;
				detectionStage = "DXE COMPLETELY BYPASSED VIA SENTER/SKINIT";
				explanation = "Even though the UEFI DXE driver was exploited, TrenchBoot issued GETSEC[SENTER] / SKINIT. Silicon microcode halted all cores, enabled IOMMU PMR DMA protections, reset PCR 17..22 via Locality 4, measured the Linux kernel directly into PCR 17/18, and jumped directly to sl_stub_entry. The DXE bootkit was wiped out!";
			} else if (activeAttack === "blacklotus_byovd") {
				compromised = false;
				detectionStage = "LOCALITY 4 DRTM ISOLATION";
				explanation = "The bootloader cannot tamper with PCR 17/18 because they can only be reset by hardware Locality 4. The unverified bootloader could not unseal secrets bound to PCR 17+18!";
			} else if (activeAttack === "spi_flashrom") {
				compromised = false;
				detectionStage = "BOOT GUARD + DRTM DEFENSE-IN-DEPTH";
				explanation = "SPI write protection blocked flashing; even in a worst-case scenario where SPI was modified, DRTM ensures the kernel is measured by CPU microcode independently of UEFI firmware.";
			} else {
				compromised = false;
				detectionStage = "HARDWARE SECURE LAUNCH (ZERO UEFI TRUST)";
				explanation = "System booted via TrenchBoot. Firmware updates do NOT break TPM disk unsealing because PCR 17/18 are decoupled from the 550 UEFI DXE drivers!";
			}
		}

		return {
			compromised,
			detectionStage,
			tcbDrivers,
			pcrTarget,
			explanation
		};
	}, [bootArch, activeAttack, isFuseLocked, smmBwpEnabled, pcr17_18Sealed]);

	return (
		<div className="w-full bg-[#0a0e17] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 text-gray-200 font-mono shadow-2xl">
			{/* Top HUD Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 mb-6 gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-wider mb-1">
						<span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
						<span>TACTICAL SIMULATION // HARDWARE ROOT OF TRUST LABORATORY</span>
					</div>
					<h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
						UEFI Bootkit Defense: Intel Boot Guard vs. DRTM TrenchBoot
					</h2>
				</div>
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs rounded">
						LOCALITY 4 SILICON RESET
					</span>
					<span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs rounded">
						TRENCHBOOT SENTER
					</span>
				</div>
			</div>

			{/* Boot Architecture Selection */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
				<button
					type="button"
					onClick={() => setBootArch("srtm_legacy")}
					className={`p-3 rounded-xl border text-left transition-all ${
						bootArch === "srtm_legacy"
							? "bg-red-950/40 border-red-400 text-white shadow-[0_0_12px_rgba(239,68,68,0.25)]"
							: "bg-gray-900/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200"
					}`}
				>
					<div className="text-xs font-bold text-red-400 mb-1">1. Legacy UEFI Secure Boot</div>
					<div className="text-[11px] text-gray-400">SRTM Only // PCR 0..7</div>
					<div className="text-[10px] text-gray-500 mt-1">550+ DXE Drivers in TCB</div>
				</button>

				<button
					type="button"
					onClick={() => setBootArch("bootguard_srtm")}
					className={`p-3 rounded-xl border text-left transition-all ${
						bootArch === "bootguard_srtm"
							? "bg-amber-950/40 border-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.25)]"
							: "bg-gray-900/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200"
					}`}
				>
					<div className="text-xs font-bold text-amber-400 mb-1">2. Intel Boot Guard + SRTM</div>
					<div className="text-[11px] text-gray-400">Hardware Fuse-Blown IBB</div>
					<div className="text-[10px] text-gray-500 mt-1">Protects SPI Flash only</div>
				</button>

				<button
					type="button"
					onClick={() => setBootArch("drtm_trenchboot")}
					className={`p-3 rounded-xl border text-left transition-all ${
						bootArch === "drtm_trenchboot"
							? "bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.25)]"
							: "bg-gray-900/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200"
					}`}
				>
					<div className="text-xs font-bold text-cyan-400 mb-1">3. DRTM (TrenchBoot) + Boot Guard</div>
					<div className="text-[11px] text-gray-400">GETSEC[SENTER] // PCR 17+18</div>
					<div className="text-[10px] text-emerald-400 mt-1">0 DXE Drivers in TCB!</div>
				</button>
			</div>

			{/* Attack Scenario Injector */}
			<div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl space-y-3 mb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
					<span className="text-xs font-bold text-gray-300">INJECT FIRMWARE &amp; BOOTKIT ATTACK VECTOR:</span>
					<div className="flex flex-wrap gap-2">
						{[
							{ id: "logofail_dxe", label: "LogoFAIL (DXE Image Parser)" },
							{ id: "blacklotus_byovd", label: "BlackLotus (Signed Bootloader BYOVD)" },
							{ id: "spi_flashrom", label: "Kernel SPI Flash Rewrite (flashrom)" },
							{ id: "none", label: "Normal Clean Boot" }
						].map((atk) => (
							<button
								key={atk.id}
								type="button"
								onClick={() => setActiveAttack(atk.id as AttackVector)}
								className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
									activeAttack === atk.id
										? "bg-red-500/30 text-red-300 border border-red-500"
										: "bg-black/40 text-gray-400 border border-gray-800 hover:text-gray-300"
								}`}
							>
								{atk.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Hardware Fuse & Register Toggles */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
				<button
					type="button"
					onClick={() => setIsFuseLocked(!isFuseLocked)}
					className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
						isFuseLocked
							? "bg-emerald-950/30 border-emerald-500/50 text-emerald-300"
							: "bg-red-950/30 border-red-500/50 text-red-300"
					}`}
				>
					<span>FPF Fuses Locked:</span>
					<span>{isFuseLocked ? "BLOWN (SHA-384)" : "UNBLOWN (BYPASS)"}</span>
				</button>

				<button
					type="button"
					onClick={() => setSmmBwpEnabled(!smmBwpEnabled)}
					className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
						smmBwpEnabled
							? "bg-emerald-950/30 border-emerald-500/50 text-emerald-300"
							: "bg-red-950/30 border-red-500/50 text-red-300"
					}`}
				>
					<span>SMM_BWP &amp; PR0 Locks:</span>
					<span>{smmBwpEnabled ? "ENABLED (Locked)" : "DISABLED (Vulnerable)"}</span>
				</button>

				<button
					type="button"
					onClick={() => setPcr17_18Sealed(!pcr17_18Sealed)}
					className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
						pcr17_18Sealed
							? "bg-cyan-950/30 border-cyan-500/50 text-cyan-300"
							: "bg-gray-900 border-gray-800 text-gray-500"
					}`}
				>
					<span>Disk Key Sealed To:</span>
					<span>{pcr17_18Sealed ? "DRTM PCR 17+18" : "SRTM PCR 0..7"}</span>
				</button>
			</div>

			{/* Simulation Outcome Display */}
			<div className={`p-4 rounded-xl border space-y-3 mb-6 ${
				outcome.compromised
					? "bg-red-950/40 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
					: "bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_20px_rgba(34,238,68,0.15)]"
			}`}>
				<div className="flex items-center justify-between border-b border-gray-800 pb-2">
					<div className="flex items-center gap-2">
						<span className="text-lg">{outcome.compromised ? "❌" : "🛡️"}</span>
						<span className="font-bold text-sm tracking-wide text-white">
							STATUS: {outcome.detectionStage}
						</span>
					</div>
					<span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
						outcome.compromised ? "bg-red-900 text-red-200" : "bg-emerald-900 text-emerald-200"
					}`}>
						{outcome.compromised ? "BOOTKIT PERSISTENT" : "IMPLANT NEUTRALIZED"}
					</span>
				</div>
				<p className="text-xs text-gray-300 leading-relaxed">
					{outcome.explanation}
				</p>
			</div>

			{/* Telemetry Metrics */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
					<div className="text-[10px] text-gray-500 uppercase">UEFI DXE Drivers in TCB</div>
					<div className={`text-lg font-bold ${outcome.tcbDrivers === 0 ? "text-emerald-400" : "text-red-400"}`}>
						{outcome.tcbDrivers} Drivers
					</div>
					<div className="text-[10px] text-gray-400">
						{outcome.tcbDrivers === 0 ? "Zero UEFI Trust" : "Ring-0 Attack Surface"}
					</div>
				</div>

				<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
					<div className="text-[10px] text-gray-500 uppercase">TPM Measurement Bank</div>
					<div className="text-lg font-bold text-cyan-400">
						{bootArch === "drtm_trenchboot" ? "PCR 17 + 18" : "PCR 0..7"}
					</div>
					<div className="text-[10px] text-gray-400">
						{bootArch === "drtm_trenchboot" ? "Locality 2/4 Hardware" : "Locality 0 Software"}
					</div>
				</div>

				<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
					<div className="text-[10px] text-gray-500 uppercase">IOMMU DMA Protection</div>
					<div className="text-lg font-bold text-emerald-400">
						{bootArch === "drtm_trenchboot" ? "VT-d PMR Active" : "Disabled (DXE)"}
					</div>
					<div className="text-[10px] text-gray-400">
						{bootArch === "drtm_trenchboot" ? "Blocks PCIe bus master DMA" : "Vulnerable to DMA"}
					</div>
				</div>

				<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
					<div className="text-[10px] text-gray-500 uppercase">BIOS Update Resilience</div>
					<div className={`text-lg font-bold ${bootArch === "drtm_trenchboot" ? "text-emerald-400" : "text-amber-400"}`}>
						{bootArch === "drtm_trenchboot" ? "Decoupled" : "Breaks Policy"}
					</div>
					<div className="text-[10px] text-gray-400">
						{bootArch === "drtm_trenchboot" ? "Zero re-enrollment needed" : "PCR 0/2 changes"}
					</div>
				</div>
			</div>
		</div>
	);
}
