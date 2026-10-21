import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

type CryptoMode =
  | "classical_wg"
  | "static_psk_wg"
  | "mlkem_only"
  | "rosenpass_dual_kem";

interface ModeSpec {
  id: CryptoMode;
  name: string;
  badge: string;
  description: string;
  staticKem: string;
  ephemeralKem: string;
  classicalEcdh: string;
  handshakeBytes: number;
  cpuHandshakeMs: number;
  diskPublicKeyBytes: number;
}

const MODES: ModeSpec[] = [
  {
    id: "classical_wg",
    name: "Standard WireGuard (Curve25519 Only)",
    badge: "NO PSK",
    description:
      "Default Noise_IKpsk2 with an all-zero PresharedKey slot. Vulnerable to Shor's algorithm via Harvest-Now-Decrypt-Later (HNDL) fiber taps.",
    staticKem: "None (Curve25519 Static)",
    ephemeralKem: "None (Curve25519 Ephemeral)",
    classicalEcdh: "X25519 (128-bit Classical / 0-bit Quantum)",
    handshakeBytes: 320,
    cpuHandshakeMs: 0.15,
    diskPublicKeyBytes: 32,
  },
  {
    id: "static_psk_wg",
    name: "WireGuard + Static Disk PSK",
    badge: "NO PQ FORWARD SECRECY",
    description:
      "Configures a static 256-bit PresharedKey in /etc/wireguard/wg0.conf. Resists immediate quantum decryption, but a future disk leak compromises all historical PCAPs.",
    staticKem: "Static 32-Byte PSK on Disk",
    ephemeralKem: "None (No PQ Ratchet)",
    classicalEcdh: "X25519 + Static HKDF-BLAKE2s",
    handshakeBytes: 320,
    cpuHandshakeMs: 0.15,
    diskPublicKeyBytes: 64,
  },
  {
    id: "mlkem_only",
    name: "Single-KEM Hybrid (X25519 + ML-KEM-768)",
    badge: "LATTICE ONLY",
    description:
      "Combines classical X25519 with NIST FIPS 203 ML-KEM. Provides post-quantum forward secrecy, but relies on a single post-quantum mathematical family (Module-LWE lattices).",
    staticKem: "ML-KEM-768 Static",
    ephemeralKem: "ML-KEM-768 Ephemeral",
    classicalEcdh: "X25519",
    handshakeBytes: 2420,
    cpuHandshakeMs: 0.65,
    diskPublicKeyBytes: 1184,
  },
  {
    id: "rosenpass_dual_kem",
    name: "Rosenpass Dual-KEM (McEliece + ML-KEM + X25519)",
    badge: "TRIPLE CRYPTO WALL",
    description:
      "Combines Classic McEliece 460896 (code-based static identity) + ML-KEM-512 (lattice ephemeral forward secrecy) + kernel X25519, rotating PSKs into wireguard.ko via Netlink.",
    staticKem: "Classic McEliece 460896 (156B CT)",
    ephemeralKem: "ML-KEM-512 / Kyber-512 (768B CT)",
    classicalEcdh: "Kernel X25519 + ChaCha20-Poly1305",
    handshakeBytes: 2450,
    cpuHandshakeMs: 4.2,
    diskPublicKeyBytes: 524160,
  },
];

export default function PostQuantumMeshSimulator() {
  const [modeId, setModeId] = useState<CryptoMode>("rosenpass_dual_kem");
  const [rotationSec, setRotationSec] = useState<number>(120);
  const [crqcActive, setCrqcActive] = useState<boolean>(true);
  const [diskBreached, setDiskBreached] = useState<boolean>(false);
  const [latticeBreakthrough, setLatticeBreakthrough] =
    useState<boolean>(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const activeMode = MODES.find((m) => m.id === modeId) || MODES[3];

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "PostQuantumMeshSimulator",
        action_type: "evaluate_hndl_posture",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `mode:${modeId}_rot:${rotationSec}_crqc:${crqcActive}_disk:${diskBreached}_lat:${latticeBreakthrough}`,
      });
    }, 850);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [modeId, rotationSec, crqcActive, diskBreached, latticeBreakthrough]);

  // Evaluate whether historical recorded PCAP traffic is compromised
  const evaluateSecurity = () => {
    if (modeId === "classical_wg") {
      if (crqcActive) {
        return {
          secure: false,
          status: "COMPROMISED (SHOR'S ALGORITHM BREAKS X25519)",
          reason:
            "Adversary's CRQC computes discrete logarithms on recorded Curve25519 public keys, recovering the Noise_IKpsk2 session keys and decrypting all historical PCAP traffic.",
        };
      }
      return {
        secure: true,
        status: "CLASSICAL ONLY (EXPOSED TO FUTURE HNDL)",
        reason:
          "Safe against classical computers today, but any backbone fiber tap recording your handshakes now will decrypt them once a CRQC comes online.",
      };
    }

    if (modeId === "static_psk_wg") {
      if (crqcActive && diskBreached) {
        return {
          secure: false,
          status: "COMPROMISED (STATIC PSK LEAK + SHOR'S ALGORITHM)",
          reason:
            "Because the static PresharedKey in /etc/wireguard/wg0.conf lacks forward secrecy, stealing the disk key years later allows the quantum adversary to unlock every previously recorded session.",
        };
      }
      return {
        secure: true,
        status: "CONDITIONAL (NO POST-QUANTUM FORWARD SECRECY)",
        reason:
          "Protected against immediate quantum decryption, but relies entirely on the static PSK file never being leaked, subpoenaed, or extracted from a decommissioned drive.",
      };
    }

    if (modeId === "mlkem_only") {
      if (crqcActive && latticeBreakthrough) {
        return {
          secure: false,
          status: "COMPROMISED (SINGLE-FAMILY LATTICE CRYPTANALYSIS)",
          reason:
            "With Shor's algorithm neutralizing X25519 and a mathematical breakthrough against Module-LWE lattices, the single-family hybrid handshake is defeated.",
        };
      }
      return {
        secure: true,
        status: "PROTECTED (SINGLE-KEM PQ FORWARD SECRECY)",
        reason:
          "Ephemeral ML-KEM keys are destroyed after each rotation, preventing retroactive decryption even if the node's disk is later seized.",
      };
    }

    // rosenpass_dual_kem
    if (crqcActive && latticeBreakthrough && diskBreached) {
      return {
        secure: false,
        status: "EXTREME TRIPLE-FAULT SCENARIO",
        reason:
          "Requires simultaneous failure of Elliptic Curves (Shor) + Module-LWE Lattices + physical theft of the Classic McEliece static secret key.",
      };
    }

    return {
      secure: true,
      status: "QUANTUM-IMMUNE (DUAL-KEM HYBRID FORWARD SECRECY)",
      reason:
        "Even under active CRQC Shor attacks, future disk compromise, or a lattice-only cryptanalysis breakthrough, combining Classic McEliece 460896 + ephemeral ML-KEM-512 + X25519 preserves confidentiality.",
    };
  };

  const verdict = evaluateSecurity();

  const controlBandwidthBps = Math.round(
    (activeMode.handshakeBytes * 3.8) / rotationSec
  );
  const cpuDutyCyclePct = (
    (activeMode.cpuHandshakeMs / (rotationSec * 1000)) *
    100
  ).toFixed(4);

  return (
    <div className="space-y-6 font-mono text-xs sm:text-sm">
      {/* Mode Selector */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2.5 flex items-center justify-between">
          <span>1. Select Mesh Key-Exchange Architecture</span>
          <span className="text-emerald-400">
            Data Plane: wireguard.ko (9.41 Gbps Line Rate)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {MODES.map((m) => {
            const active = modeId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setModeId(m.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  active
                    ? "bg-emerald-950/40 border-emerald-500/70 text-white shadow-lg"
                    : "bg-slate-950/70 border-slate-800 text-gray-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs sm:text-sm">{m.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      active
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-700 text-gray-400"
                    }`}
                  >
                    {m.badge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {m.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Adversary Threat Toggles & Rotation Cadence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">PQ-PSK Rekey Interval:</span>
            <span className="text-cyan-400 font-bold">{rotationSec} Seconds</span>
          </div>
          <input
            type="range"
            min={30}
            max={300}
            step={30}
            value={rotationSec}
            onChange={(e) => setRotationSec(Number(e.target.value))}
            aria-label="PQ-PSK Rekey Interval in seconds"
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>30s (Aggressive)</span>
            <span>120s (Rosenpass Default)</span>
            <span>300s (Relaxed)</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-gray-400">
            2. Inject HNDL &amp; Cryptanalytic Threat Conditions
          </div>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              CRQC Online (Shor&apos;s Algorithm Breaks X25519)
            </span>
            <input
              type="checkbox"
              checked={crqcActive}
              onChange={(e) => setCrqcActive(e.target.checked)}
              className="accent-emerald-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              Future Node Disk Leak (Static Key Stolen in 2029)
            </span>
            <input
              type="checkbox"
              checked={diskBreached}
              onChange={(e) => setDiskBreached(e.target.checked)}
              className="accent-amber-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              Zero-Day Lattice Flaw (Module-LWE Weakened)
            </span>
            <input
              type="checkbox"
              checked={latticeBreakthrough}
              onChange={(e) => setLatticeBreakthrough(e.target.checked)}
              className="accent-red-500 w-4 h-4"
            />
          </label>
        </div>
      </div>

      {/* Verdict Banner */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          verdict.secure
            ? "border-emerald-500/60 bg-emerald-950/25 text-emerald-300"
            : "border-red-500/60 bg-red-950/30 text-red-300"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                verdict.secure ? "bg-emerald-400" : "bg-red-500 animate-pulse"
              }`}
            />
            <span>{verdict.status}</span>
          </div>
          <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-current/40">
            {verdict.secure ? "PCAP UNREADABLE" : "PCAP DECRYPTED"}
          </span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{verdict.reason}</p>
      </div>

      {/* Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            Control-Plane Overhead
          </div>
          <div className="text-xl font-bold text-white">
            {controlBandwidthBps}{" "}
            <span className="text-xs font-normal text-gray-400">B/s</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">
            Fits Standard 1500B MTU
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            Static Identity Key (Disk)
          </div>
          <div className="text-xl font-bold text-cyan-400">
            {activeMode.diskPublicKeyBytes >= 1024
              ? `${(activeMode.diskPublicKeyBytes / 1024).toFixed(0)} KB`
              : `${activeMode.diskPublicKeyBytes} B`}
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            {activeMode.staticKem}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            Rekey CPU Duty Cycle
          </div>
          <div className="text-xl font-bold text-white">
            {cpuDutyCyclePct}%
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            {activeMode.cpuHandshakeMs} ms / {rotationSec}s
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
          <div className="text-[10px] uppercase text-emerald-300 mb-1">
            Ephemeral Forward Secrecy
          </div>
          <div className="text-xs sm:text-sm font-bold text-emerald-400 truncate">
            {activeMode.ephemeralKem}
          </div>
          <div className="text-[10px] text-emerald-300 mt-1">
            Zeroized via memfd_secret
          </div>
        </div>
      </div>
    </div>
  );
}
