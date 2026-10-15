import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

interface Scenario {
  id: string;
  label: string;
  badge: string;
  ekValid: boolean;
  biosIntact: boolean;
  ukiIntact: boolean;
  secureBootEnabled: boolean;
  imagePinned: boolean;
  svidTtlMin: number;
  description: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "production-verified",
    label: "1. Sovereign Production Baseline (Verified)",
    badge: "NOMINAL",
    ekValid: true,
    biosIntact: true,
    ukiIntact: true,
    secureBootEnabled: true,
    imagePinned: true,
    svidTtlMin: 15,
    description:
      "Genuine motherboard TPM 2.0 EK, golden PCR 0/4/7 Measured Boot hashes, and SHA-256 pinned container image.",
  },
  {
    id: "evil-maid-usb",
    label: "2. Evil Maid Attack (Live USB / init=/bin/sh)",
    badge: "PCR 4 TAMPER",
    ekValid: true,
    biosIntact: true,
    ukiIntact: false,
    secureBootEnabled: true,
    imagePinned: true,
    svidTtlMin: 15,
    description:
      "Attacker with physical rack access modifies kernel cmdline or boots an unsigned kernel image. PCR 4 hash diverges immediately.",
  },
  {
    id: "disk-clone-theft",
    label: "3. Stolen NVMe Disk Booted in Attacker Server",
    badge: "EK MISMATCH",
    ekValid: false,
    biosIntact: true,
    ukiIntact: true,
    secureBootEnabled: true,
    imagePinned: true,
    svidTtlMin: 15,
    description:
      "Attacker pulls NVMe drive from datacenter and boots it in foreign hardware. Foreign TPM lacks the factory EK private key to decrypt TPM2_ActivateCredential.",
  },
  {
    id: "rogue-pod-hijack",
    label: "4. Compromised Manifest (alpine:latest in Prod SA)",
    badge: "DIGEST REJECT",
    ekValid: true,
    biosIntact: true,
    ukiIntact: true,
    secureBootEnabled: true,
    imagePinned: false,
    svidTtlMin: 15,
    description:
      "Hardware node is genuine, but a rogue container (alpine:latest) attempts to claim the payment-engine ServiceAccount over the SPIRE unix socket.",
  },
];

export default function TpmSpireAttestationSimulator() {
  const [selectedId, setSelectedId] = useState<string>("production-verified");
  const [ekValid, setEkValid] = useState<boolean>(true);
  const [biosIntact, setBiosIntact] = useState<boolean>(true);
  const [ukiIntact, setUkiIntact] = useState<boolean>(true);
  const [secureBootEnabled, setSecureBootEnabled] = useState<boolean>(true);
  const [imagePinned, setImagePinned] = useState<boolean>(true);
  const [svidTtlMin, setSvidTtlMin] = useState<number>(15);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const applyScenario = (s: Scenario) => {
    setSelectedId(s.id);
    setEkValid(s.ekValid);
    setBiosIntact(s.biosIntact);
    setUkiIntact(s.ukiIntact);
    setSecureBootEnabled(s.secureBootEnabled);
    setImagePinned(s.imagePinned);
    setSvidTtlMin(s.svidTtlMin);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "TpmSpireAttestationSimulator",
        action_type: "evaluate_chain",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `ek:${ekValid}_pcr0:${biosIntact}_pcr4:${ukiIntact}_pcr7:${secureBootEnabled}_img:${imagePinned}`,
      });
    }, 900);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [ekValid, biosIntact, ukiIntact, secureBootEnabled, imagePinned, svidTtlMin]);

  // Compute simulated SHA-256 PCR values
  const pcr0Hash = biosIntact
    ? "8a9f3e2c...4b10d9a2"
    : "e4d190aa...ff00129c [MISMATCH]";
  const pcr4Hash = ukiIntact
    ? "3c71b09e...91a4f801"
    : "deadbeef...0091caf3 [MISMATCH]";
  const pcr7Hash = secureBootEnabled
    ? "f021a6d4...77c81e05"
    : "00000000...00000000 [DISABLED]";

  const pcrAllValid = biosIntact && ukiIntact && secureBootEnabled;
  const stage1Passed = ekValid && pcrAllValid;
  const stage2Passed = stage1Passed;
  const stage3Passed = stage2Passed && imagePinned;
  const stage4Passed = stage3Passed;

  const activeScenario = SCENARIOS.find((s) => s.id === selectedId);

  return (
    <div className="my-6 p-5 sm:p-7 rounded-2xl border border-white/10 bg-[#070b12] font-mono text-gray-200 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              stage4Passed ? "bg-emerald-400 animate-ping" : "bg-red-500 animate-pulse"
            }`}
          />
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
            // HARDWARE ATTESTATION TELEMETRY // TPM 2.0 → SPIRE → OPENBAO
          </span>
        </div>
        <span
          className={`text-[10px] px-2.5 py-0.5 rounded font-bold border ${
            stage4Passed
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
              : "bg-red-500/15 border-red-500/40 text-red-300"
          }`}
        >
          {stage4Passed
            ? "STATUS: ZERO-SECRET LEASE ACTIVE"
            : "STATUS: CRYPTOGRAPHIC CHAIN HALTED"}
        </span>
      </div>

      {/* Preset Threat Scenarios */}
      <div className="mb-6">
        <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-2">
          Select Hardware / Workload Threat Scenario:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SCENARIOS.map((s) => {
            const active = selectedId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => applyScenario(s)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  active
                    ? "bg-emerald-500/15 border-emerald-400 text-white shadow-lg"
                    : "bg-black/50 border-white/10 text-gray-400 hover:border-white/30 hover:text-gray-200"
                }`}
              >
                <span className="text-xs font-semibold truncate">{s.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                    s.id === "production-verified"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {s.badge}
                </span>
              </button>
            );
          })}
        </div>
        {activeScenario && (
          <p className="mt-2.5 text-xs text-gray-400 bg-black/40 border border-white/5 rounded-lg p-2.5">
            {activeScenario.description}
          </p>
        )}
      </div>

      {/* Interactive Hardware & Workload Fault Injection Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-black/60 border border-white/10">
          <div className="text-[11px] uppercase text-cyan-400 font-bold mb-3">
            1. Silicon &amp; UEFI Controls
          </div>
          <div className="space-y-2.5 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">TPM 2.0 Factory EK Cert</span>
              <input
                type="checkbox"
                checked={ekValid}
                onChange={(e) => {
                  setSelectedId("custom");
                  setEkValid(e.target.checked);
                }}
                className="accent-emerald-400 w-4 h-4 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">PCR 0 (UEFI BIOS Golden)</span>
              <input
                type="checkbox"
                checked={biosIntact}
                onChange={(e) => {
                  setSelectedId("custom");
                  setBiosIntact(e.target.checked);
                }}
                className="accent-emerald-400 w-4 h-4 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">PCR 4 (Signed UKI Kernel)</span>
              <input
                type="checkbox"
                checked={ukiIntact}
                onChange={(e) => {
                  setSelectedId("custom");
                  setUkiIntact(e.target.checked);
                }}
                className="accent-emerald-400 w-4 h-4 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">PCR 7 (Secure Boot Policy)</span>
              <input
                type="checkbox"
                checked={secureBootEnabled}
                onChange={(e) => {
                  setSelectedId("custom");
                  setSecureBootEnabled(e.target.checked);
                }}
                className="accent-emerald-400 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/10">
          <div className="text-[11px] uppercase text-cyan-400 font-bold mb-3">
            2. Workload &amp; SVID Policy
          </div>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">Image SHA-256 Digest Match</span>
              <input
                type="checkbox"
                checked={imagePinned}
                onChange={(e) => {
                  setSelectedId("custom");
                  setImagePinned(e.target.checked);
                }}
                className="accent-emerald-400 w-4 h-4 cursor-pointer"
              />
            </label>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">SVID / Lease Rotation TTL</span>
                <span className="text-emerald-400 font-bold">{svidTtlMin} min</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={svidTtlMin}
                onChange={(e) => setSvidTtlMin(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>5m (Ultra-Strict)</span>
                <span>60m</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/10">
          <div className="text-[11px] uppercase text-cyan-400 font-bold mb-3">
            3. Live TPM 2.0 PCR Bank (SHA-256)
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-gray-400">PCR[00]:</span>
              <span className={biosIntact ? "text-emerald-400" : "text-red-400 font-bold"}>
                {pcr0Hash}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-gray-400">PCR[04]:</span>
              <span className={ukiIntact ? "text-emerald-400" : "text-red-400 font-bold"}>
                {pcr4Hash}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">PCR[07]:</span>
              <span className={secureBootEnabled ? "text-emerald-400" : "text-red-400 font-bold"}>
                {pcr7Hash}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Stage Attestation Pipeline Visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
        {/* Stage 1 */}
        <div
          className={`p-3.5 rounded-xl border ${
            stage1Passed
              ? "bg-emerald-950/20 border-emerald-500/40"
              : "bg-red-950/25 border-red-500/50"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] uppercase mb-1">
            <span className="text-gray-400">Stage 01</span>
            <span className={stage1Passed ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
              {stage1Passed ? "PASS ✓" : "FAIL ✕"}
            </span>
          </div>
          <div className="text-xs font-bold text-white mb-1">TPM2_ActivateCredential</div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {!ekValid
              ? "Foreign TPM rejected: Cannot decrypt AK challenge bound to EK."
              : !pcrAllValid
              ? "PCR Quote mismatch: Boot chain modified from golden baseline."
              : "EK decrypted challenge; signed PCR 0/4/7 quote verified."}
          </p>
        </div>

        {/* Stage 2 */}
        <div
          className={`p-3.5 rounded-xl border ${
            stage2Passed
              ? "bg-emerald-950/20 border-emerald-500/40"
              : "bg-gray-900/40 border-white/10 opacity-60"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] uppercase mb-1">
            <span className="text-gray-400">Stage 02</span>
            <span className={stage2Passed ? "text-emerald-400 font-bold" : "text-gray-500"}>
              {stage2Passed ? "ISSUED ✓" : "BLOCKED"}
            </span>
          </div>
          <div className="text-xs font-bold text-white mb-1">SPIRE Node Identity</div>
          <p className="text-[11px] text-gray-400 leading-relaxed break-all">
            {stage2Passed
              ? "spiffe://tekromancy.internal/spire/agent/tpm_devid/node-01"
              : "Node SVID withheld by SPIRE Server."}
          </p>
        </div>

        {/* Stage 3 */}
        <div
          className={`p-3.5 rounded-xl border ${
            stage3Passed
              ? "bg-emerald-950/20 border-emerald-500/40"
              : stage2Passed && !imagePinned
              ? "bg-red-950/25 border-red-500/50"
              : "bg-gray-900/40 border-white/10 opacity-60"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] uppercase mb-1">
            <span className="text-gray-400">Stage 03</span>
            <span
              className={
                stage3Passed
                  ? "text-emerald-400 font-bold"
                  : stage2Passed
                  ? "text-red-400 font-bold"
                  : "text-gray-500"
              }
            >
              {stage3Passed ? "VERIFIED ✓" : stage2Passed ? "REJECTED ✕" : "BLOCKED"}
            </span>
          </div>
          <div className="text-xs font-bold text-white mb-1">K8s cgroup + SHA-256</div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {!stage2Passed
              ? "Awaiting valid node attestation."
              : !imagePinned
              ? "Container image digest does not match registered payment-engine SHA-256!"
              : `Minted JWT-SVID (${svidTtlMin}m TTL) over tmpfs CSI socket.`}
          </p>
        </div>

        {/* Stage 4 */}
        <div
          className={`p-3.5 rounded-xl border ${
            stage4Passed
              ? "bg-cyan-950/25 border-cyan-500/40"
              : "bg-gray-900/40 border-white/10 opacity-60"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] uppercase mb-1">
            <span className="text-gray-400">Stage 04</span>
            <span className={stage4Passed ? "text-cyan-400 font-bold" : "text-gray-500"}>
              {stage4Passed ? `ACTIVE (${svidTtlMin}m)` : "DENIED"}
            </span>
          </div>
          <div className="text-xs font-bold text-white mb-1">OpenBao Dynamic Lease</div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {stage4Passed
              ? `Ephemeral Postgres user v-jwt-prod-${(svidTtlMin * 41) % 900 + 100} active in RAM (0 disk secrets).`
              : "Zero credentials dispensed."}
          </p>
        </div>
      </div>

      {/* Bottom Live Audit Log */}
      <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 text-[11px] font-mono">
        <div className="text-gray-500 mb-1">// SPIRE &amp; OPENBAO AUDIT STREAM //</div>
        {stage4Passed ? (
          <div className="text-emerald-400">
            [AUDIT ALLOW] sub=&quot;spiffe://tekromancy.internal/ns/prod/sa/payment-engine&quot;
            tpm_ek=&quot;verified&quot; pcr_set=&quot;0,2,4,7:golden&quot;
            img_sha256=&quot;9f86d081...0a08&quot; → leased dynamic credential (TTL={svidTtlMin * 60}s,
            rotations/day={Math.round(1440 / svidTtlMin)})
          </div>
        ) : (
          <div className="text-red-400">
            [SECURITY HALT] Attestation rejected at{" "}
            {!ekValid
              ? "Stage 1 (TPM2_ActivateCredential EK mismatch)"
              : !pcrAllValid
              ? "Stage 1 (Measured Boot PCR hash divergence)"
              : "Stage 3 (Kubelet container image SHA-256 selector mismatch)"}
            . Zero secrets exposed on disk or memory.
          </div>
        )}
      </div>
    </div>
  );
}
