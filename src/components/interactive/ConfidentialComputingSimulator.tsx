import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

type EnclaveArchId =
  | "standard_kvm"
  | "legacy_sev_es"
  | "sev_snp_h100_cc"
  | "tdx_b200_tee_io";

interface EnclaveArch {
  id: EnclaveArchId;
  name: string;
  badge: string;
  description: string;
  dramEncrypted: boolean;
  rmpOrSeptIntegrity: boolean;
  restrictedVcInjection: boolean;
  gpuCcProtected: boolean;
  pcieIdeLineRate: boolean;
}

const ARCHITECTURES: EnclaveArch[] = [
  {
    id: "sev_snp_h100_cc",
    name: "AMD SEV-SNP + NVIDIA H100 (CC-On Mode)",
    badge: "PRODUCTION CVM + GPU",
    description:
      "CPU DRAM protected by AES-128/256-XEX + Hardware RMP (PVALIDATE) + Restricted Injection (#HV). H100 BAR1 locked; PCIe DMA encrypted via SWIOTLB bounce buffers + GPU Copy Engine AES-GCM-256 over SPDM 1.2.",
    dramEncrypted: true,
    rmpOrSeptIntegrity: true,
    restrictedVcInjection: true,
    gpuCcProtected: true,
    pcieIdeLineRate: false,
  },
  {
    id: "tdx_b200_tee_io",
    name: "Intel TDX / SEV-SNP + Blackwell B200 (TEE-I/O + PCIe IDE)",
    badge: "LINE-RATE TEE-I/O",
    description:
      "Secure EPT + 28-bit ECC MACs on CPU DRAM paired with PCIe IDE / TDISP inline link encryption and encrypted 5th-Gen NVLink—eliminating software SWIOTLB bounce-buffer copy overhead.",
    dramEncrypted: true,
    rmpOrSeptIntegrity: true,
    restrictedVcInjection: true,
    gpuCcProtected: true,
    pcieIdeLineRate: true,
  },
  {
    id: "legacy_sev_es",
    name: "First-Gen AMD SEV-ES + Standard GPU Passthrough",
    badge: "NO RMP / GPU EXPOSED",
    description:
      "Encrypts guest CPU DRAM and VMSA registers, but lacks Reverse Map Table (RMP) nested page integrity, allows unrestricted #VC injection, and leaves PCIe/GPU BAR1 completely unencrypted.",
    dramEncrypted: true,
    rmpOrSeptIntegrity: false,
    restrictedVcInjection: false,
    gpuCcProtected: false,
    pcieIdeLineRate: false,
  },
  {
    id: "standard_kvm",
    name: "Standard KVM / QEMU VM (No Confidential Computing)",
    badge: "PLAINTEXT SILICON",
    description:
      "Traditional cloud VM: host root can dump guest RAM via /dev/mem, inspect nested page tables, and mmap() GPU HBM3 over PCIe BAR1.",
    dramEncrypted: false,
    rmpOrSeptIntegrity: false,
    restrictedVcInjection: false,
    gpuCcProtected: false,
    pcieIdeLineRate: false,
  },
];

export default function ConfidentialComputingSimulator() {
  const [archId, setArchId] = useState<EnclaveArchId>("sev_snp_h100_cc");
  const [hostMemDump, setHostMemDump] = useState<boolean>(true);
  const [pageRemapAttack, setPageRemapAttack] = useState<boolean>(false);
  const [fakeVcInjection, setFakeVcInjection] = useState<boolean>(false);
  const [pcieBusSnoop, setPcieBusSnoop] = useState<boolean>(true);
  const [tamperedFirmware, setTamperedFirmware] = useState<boolean>(false);
  const [modelSizeGb, setModelSizeGb] = useState<number>(70);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const activeArch =
    ARCHITECTURES.find((a) => a.id === archId) || ARCHITECTURES[0];

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "ConfidentialComputingSimulator",
        action_type: "evaluate_enclave_posture",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `arch:${archId}_mem:${hostMemDump}_rmp:${pageRemapAttack}_vc:${fakeVcInjection}_pcie:${pcieBusSnoop}_rim:${tamperedFirmware}`,
      });
    }, 850);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    archId,
    hostMemDump,
    pageRemapAttack,
    fakeVcInjection,
    pcieBusSnoop,
    tamperedFirmware,
    modelSizeGb,
  ]);

  const evaluateSecurity = () => {
    if (tamperedFirmware) {
      if (activeArch.rmpOrSeptIntegrity && activeArch.gpuCcProtected) {
        return {
          secure: true,
          kbsReleased: false,
          headline:
            "ATTESTATION HALTED BY TRUSTEE KBS (ZERO SECRETS EXPOSED)",
          detail:
            "Tampered OVMF/initrd or GPU GSP firmware altered the SHA-384 Launch Measurement / NVIDIA RIM digest. Remote Verifier rejected the VCEK/SPDM quote and refused to release the AES-256 model decryption key.",
        };
      }
      return {
        secure: false,
        kbsReleased: true,
        headline: "BREACH: BACKDOORED BOOTLOADER / FIRMWARE EXECUTED",
        detail:
          "Without hardware-rooted CPU + GPU SPDM remote attestation gating key release, the modified initrd booted and exfiltrated model weights.",
      };
    }

    if (hostMemDump && !activeArch.dramEncrypted) {
      return {
        secure: false,
        kbsReleased: true,
        headline: "BREACH: HOST ROOT DUMPED PLAINTEXT GUEST RAM (/dev/mem)",
        detail:
          "Compromised KVM host read plaintext prompts and keys directly from system DRAM pages.",
      };
    }

    if (pageRemapAttack && !activeArch.rmpOrSeptIntegrity) {
      return {
        secure: false,
        kbsReleased: true,
        headline:
          "BREACH: HYPERVISOR NESTED PAGE TABLE (NPT) REMAPPING ATTACK",
        detail:
          "Malicious hypervisor remapped two GPAs to the same SPA without an RMP / Secure-EPT check, corrupting guest control flow and leaking ciphertext patterns.",
      };
    }

    if (fakeVcInjection && !activeArch.restrictedVcInjection) {
      return {
        secure: false,
        kbsReleased: true,
        headline: "BREACH: FORGED #VC / #VE EXCEPTION INJECTION (WeSee)",
        detail:
          "Hypervisor injected a spoofed #VC exception (vector 29) during normal execution, tricking the guest #VC handler into leaking register state via the GHCB.",
      };
    }

    if (pcieBusSnoop && !activeArch.gpuCcProtected) {
      return {
        secure: false,
        kbsReleased: true,
        headline:
          "BREACH: PLAINTEXT LLM WEIGHTS & KV-CACHE SNOOPED ON PCIe / BAR1",
        detail:
          "Even with CPU RAM encrypted, weights crossed the PCIe root complex in plaintext and were captured via host BAR1 mmap() / PCIe interposer.",
      };
    }

    return {
      secure: true,
      kbsReleased: true,
      headline: "ENCLAVE INTACT: CPU + GPU HARDWARE ATTESTED & ISOLATED",
      detail:
        "All host hypervisor attacks neutralized: RMP/S-EPT blocked page remapping (#PF), Restricted Injection blocked fake #VC, and SPDM AES-GCM-256 / PCIe IDE protected all GPU H2D/D2H transfers.",
    };
  };

  const status = evaluateSecurity();

  // Compute cold weight load time (H2D) and inference throughput retention
  const rawPcieLoadSec = Number((modelSizeGb / 26.5).toFixed(1)); // ~26.5 GB/s effective PCIe Gen5
  const bounceBufferLoadSec = Number((modelSizeGb / 10.2).toFixed(1)); // ~10.2 GB/s SWIOTLB AES-GCM + CE decrypt
  const ideLineRateLoadSec = Number((modelSizeGb / 24.1).toFixed(1));

  const coldLoadSec = !activeArch.gpuCcProtected
    ? rawPcieLoadSec
    : activeArch.pcieIdeLineRate
    ? ideLineRateLoadSec
    : bounceBufferLoadSec;

  const throughputRetentionPct = !activeArch.gpuCcProtected
    ? "100.0%"
    : activeArch.pcieIdeLineRate
    ? "98.9%"
    : "94.5%";

  return (
    <div className="space-y-6 font-mono text-xs sm:text-sm">
      {/* Architecture Selector */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2.5 flex items-center justify-between">
          <span>1. Select CPU + GPU Enclave Architecture</span>
          <span
            className={
              status.secure ? "text-emerald-400 font-bold" : "text-red-400 font-bold"
            }
          >
            Enclave Posture: {status.secure ? "ISOLATED" : "COMPROMISED"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ARCHITECTURES.map((a) => {
            const active = archId === a.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setArchId(a.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  active
                    ? "bg-emerald-950/40 border-emerald-500/70 text-white shadow-lg"
                    : "bg-slate-950/70 border-slate-800 text-gray-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs sm:text-sm">{a.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${
                      active
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-700 text-gray-400"
                    }`}
                  >
                    {a.badge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {a.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Host Hypervisor Attack Toggles & Model Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
            2. Inject Host Hypervisor / Physical Bus Attacks
          </div>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              1. Host Root `/dev/mem` &amp; Cold-Boot DRAM Dump
            </span>
            <input
              type="checkbox"
              checked={hostMemDump}
              onChange={(e) => setHostMemDump(e.target.checked)}
              className="accent-emerald-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              2. Nested Page Table (`GPA -&gt; SPA`) Aliasing / Replay
            </span>
            <input
              type="checkbox"
              checked={pageRemapAttack}
              onChange={(e) => setPageRemapAttack(e.target.checked)}
              className="accent-cyan-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              3. Spoofed `#VC` / `#VE` Exception Injection (`WeSee`)
            </span>
            <input
              type="checkbox"
              checked={fakeVcInjection}
              onChange={(e) => setFakeVcInjection(e.target.checked)}
              className="accent-amber-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              4. PCIe Root Complex / GPU `BAR1 mmap()` Snoop
            </span>
            <input
              type="checkbox"
              checked={pcieBusSnoop}
              onChange={(e) => setPcieBusSnoop(e.target.checked)}
              className="accent-cyan-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-amber-500/30 bg-amber-950/20 cursor-pointer">
            <span className="text-xs text-amber-300">
              5. Tamper with Guest Initrd / GPU GSP Firmware (`RIM`)
            </span>
            <input
              type="checkbox"
              checked={tamperedFirmware}
              onChange={(e) => setTamperedFirmware(e.target.checked)}
              className="accent-amber-500 w-4 h-4"
            />
          </label>
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">Encrypted Model Checkpoint Size:</span>
              <span className="text-cyan-400 font-bold">{modelSizeGb} GB</span>
            </div>
            <input
              type="range"
              min={8}
              max={140}
              step={2}
              value={modelSizeGb}
              onChange={(e) => setModelSizeGb(Number(e.target.value))}
              aria-label="Encrypted Model Checkpoint Size in GB"
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>8 GB (8B FP8)</span>
              <span>40 GB (70B NVFP4)</span>
              <span>70 GB (70B FP8)</span>
              <span>140 GB (70B BF16)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl border border-slate-800 bg-black/50">
              <div className="text-[10px] uppercase text-gray-400">
                Cold H2D Weight Transfer
              </div>
              <div className="text-lg font-bold text-cyan-400 mt-0.5">
                {coldLoadSec}s
              </div>
              <div className="text-[10px] text-gray-400">
                {activeArch.pcieIdeLineRate
                  ? "PCIe IDE Line-Rate TLP"
                  : activeArch.gpuCcProtected
                  ? "SWIOTLB + Copy Engine AES-GCM"
                  : "Unencrypted Raw DMA"}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-black/50">
              <div className="text-[10px] uppercase text-gray-400">
                Inference Throughput
              </div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">
                {throughputRetentionPct}
              </div>
              <div className="text-[10px] text-gray-400">
                of bare-metal native tok/s
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Banner */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          status.secure
            ? "border-emerald-500/60 bg-emerald-950/25 text-emerald-300"
            : "border-red-500/60 bg-red-950/30 text-red-300"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                status.secure ? "bg-emerald-400" : "bg-red-500 animate-pulse"
              }`}
            />
            <span>{status.headline}</span>
          </div>
          <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-current/40">
            Trustee KBS Key Release:{" "}
            {status.kbsReleased ? "GRANTED" : "DENIED (RIM/PCR MISMATCH)"}
          </span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{status.detail}</p>
      </div>
    </div>
  );
}
