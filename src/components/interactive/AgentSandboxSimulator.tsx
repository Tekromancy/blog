import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

type SandboxTier = "docker_default" | "rootless_seccomp" | "gvisor_sentry" | "three_ring_jail";

interface AttackVector {
  id: string;
  name: string;
  target: string;
  payload: string;
  description: string;
}

const ATTACK_VECTORS: AttackVector[] = [
  {
    id: "imds_exfil",
    name: "1. Cloud IMDS Credential Theft",
    target: "169.254.169.254:80",
    payload: "curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/",
    description: "Agent issues an HTTP request to the local link-local hypervisor metadata endpoint to steal AWS/GCP IAM role keys.",
  },
  {
    id: "io_uring_escape",
    name: "2. Kernel Privilege Escalation (io_uring CVE)",
    target: "Host Kernel (Ring 0)",
    payload: "./exploit_io_uring_cred_uaf --pid=1 --overwrite-cred",
    description: "Agent exploits a shared-kernel use-after-free in io_uring / nf_tables to overwrite task credentials and escape to host root.",
  },
  {
    id: "host_fs_bleed",
    name: "3. Host Filesystem & SSH Key Bleed",
    target: "/root/.ssh/id_ed25519 & /etc/shadow",
    payload: "cat /host_mnt/home/dev/.ssh/id_ed25519 || cat /etc/shadow",
    description: "Agent inspects parent directory bind mounts and sensitive host volume mappings to exfiltrate private developer keys.",
  },
  {
    id: "pypi_poisoning",
    name: "4. Supply Chain Exfiltration & Outbound Pivot",
    target: "pypi.org / Unrestricted Public Net",
    payload: "twine upload dist/malicious_payload-1.0.0.tar.gz --repository-url https://upload.pypi.org/legacy/",
    description: "Agent attempts to publish a poisoned backdoor package to public package indexes or connect to an external C2 IP.",
  },
];

interface SandboxConfig {
  id: SandboxTier;
  name: string;
  badge: string;
  kernelIsolation: string;
  filesystemAccess: string;
  networkPolicy: string;
  coldStartTime: string;
  escapeRisk: "CRITICAL" | "HIGH" | "MEDIUM" | "ZERO";
}

const SANDBOX_CONFIGS: Record<SandboxTier, SandboxConfig> = {
  docker_default: {
    id: "docker_default",
    name: "Standard Docker Container",
    badge: "SHARED KERNEL",
    kernelIsolation: "Shared Host Kernel (namespaces + cgroups v1/v2)",
    filesystemAccess: "Full container rootfs + host bind mounts",
    networkPolicy: "Default Docker Bridge (NAT to host + RFC 1918 + IMDS)",
    coldStartTime: "~140 ms",
    escapeRisk: "CRITICAL",
  },
  rootless_seccomp: {
    id: "rootless_seccomp",
    name: "Rootless Podman + Seccomp",
    badge: "USER NAMESPACE",
    kernelIsolation: "Shared Host Kernel (filtered via default seccomp profile)",
    filesystemAccess: "Rootless user namespace mapped to unprivileged host UID",
    networkPolicy: "Slirp4netns / Pasta user networking (still reaches LAN/IMDS)",
    coldStartTime: "~180 ms",
    escapeRisk: "HIGH",
  },
  gvisor_sentry: {
    id: "gvisor_sentry",
    name: "gVisor (runsc Syscall Sentry)",
    badge: "USERSPACE KERNEL",
    kernelIsolation: "Sentry Go userspace kernel intercepting ~300 syscalls",
    filesystemAccess: "Gofer 9P/virtiofs filesystem sandbox proxy",
    networkPolicy: "Netstack userspace TCP/IP stack (configurable egress)",
    coldStartTime: "~220 ms",
    escapeRisk: "MEDIUM",
  },
  three_ring_jail: {
    id: "three_ring_jail",
    name: "Firecracker + Landlock + eBPF (Three-Ring Jail)",
    badge: "HARDWARE KVM + LSM + BPF",
    kernelIsolation: "Dedicated KVM Guest Kernel (6.12 micro-config, no modules)",
    filesystemAccess: "Landlock LSM ABI v4: RWX locked to /workspace/sandbox only",
    networkPolicy: "eBPF cgroup/connect4 drops IMDS/RFC1918; TLS SNI proxy on :3128",
    coldStartTime: "14 ms (uffd snapshot)",
    escapeRisk: "ZERO",
  },
};

export default function AgentSandboxSimulator() {
  const [sandboxTier, setSandboxTier] = useState<SandboxTier>("three_ring_jail");
  const [selectedAttack, setSelectedAttack] = useState<string>("imds_exfil");
  const [activeTab, setActiveTab] = useState<"architecture" | "telemetry">("architecture");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const activeConfig = SANDBOX_CONFIGS[sandboxTier];
  const activeAttack = ATTACK_VECTORS.find((a) => a.id === selectedAttack) || ATTACK_VECTORS[0];

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "AgentSandboxSimulator",
        action_type: "evaluate_containment",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `tier:${sandboxTier}_attack:${selectedAttack}`,
      });
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [sandboxTier, selectedAttack]);

  // Determine attack outcome based on sandbox tier
  const evaluateAttack = (tier: SandboxTier, attackId: string) => {
    switch (tier) {
      case "docker_default":
        return {
          blocked: false,
          layer: "NO BARRIER",
          statusText: "EXPLOIT SUCCEEDED (BREACH)",
          colorClass: "text-red-400 border-red-500/60 bg-red-950/30",
          badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
          details:
            attackId === "imds_exfil"
              ? "Container bridged NIC made direct HTTP GET to 169.254.169.254. AWS STS tokens dumped in 4ms."
              : attackId === "io_uring_escape"
              ? "Shared host kernel vulnerable to io_uring ring-0 UAF. Container process elevated to host root (#)."
              : attackId === "host_fs_bleed"
              ? "Bind mount /workspace traversed to parent directory. SSH private keys dumped to terminal."
              : "Direct egress allowed to public Internet. Malicious package published live to PyPI registry!",
        };
      case "rootless_seccomp":
        if (attackId === "io_uring_escape") {
          return {
            blocked: true,
            layer: "seccomp-bpf",
            statusText: "BLOCKED (Syscall Denied)",
            colorClass: "text-amber-400 border-amber-500/60 bg-amber-950/30",
            badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
            details: "Default seccomp profile returned EPERM on io_uring_setup(). Kernel exploit aborted.",
          };
        }
        return {
          blocked: false,
          layer: "USER NAMESPACE",
          statusText: "EXPLOIT SUCCEEDED",
          colorClass: "text-red-400 border-red-500/60 bg-red-950/30",
          badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
          details:
            attackId === "imds_exfil"
              ? "User-mode networking still routes packets to 169.254.169.254. IAM credentials exfiltrated."
              : attackId === "host_fs_bleed"
              ? "User namespace maps files to owner UID. Unprotected user files inside mount readable."
              : "Rootless networking allows outbound TCP port 443 to PyPI. Package published.",
        };
      case "gvisor_sentry":
        if (attackId === "io_uring_escape") {
          return {
            blocked: true,
            layer: "gVisor Sentry",
            statusText: "BLOCKED (Virtual Kernel)",
            colorClass: "text-emerald-400 border-emerald-500/60 bg-emerald-950/30",
            badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
            details: "io_uring syscall not implemented in Sentry sandbox. Attack cannot reach host kernel.",
          };
        }
        if (attackId === "host_fs_bleed") {
          return {
            blocked: true,
            layer: "Gofer 9P/virtiofs",
            statusText: "BLOCKED (Filesystem Jail)",
            colorClass: "text-emerald-400 border-emerald-500/60 bg-emerald-950/30",
            badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
            details: "Gofer filesystem mediator restricts path traversal outside designated rootfs directory.",
          };
        }
        return {
          blocked: false,
          layer: "Netstack (Default Egress)",
          statusText: "EXPLOIT SUCCEEDED (Network Permitted)",
          colorClass: "text-amber-400 border-amber-500/60 bg-amber-950/30",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          details: "Netstack permits outbound connections by default. Network-based pivot or IMDS access succeeded.",
        };
      case "three_ring_jail":
      default:
        return {
          blocked: true,
          layer:
            attackId === "imds_exfil"
              ? "Ring 3 (eBPF cgroup/connect4)"
              : attackId === "io_uring_escape"
              ? "Ring 2 (KVM Hardware Boundary)"
              : attackId === "host_fs_bleed"
              ? "Ring 1 (Landlock LSM ABI v4)"
              : "Ring 3 (TLS SNI Proxy Allowlist)",
          statusText: "BLOCKED (Hardware & LSM & eBPF Defense-in-Depth)",
          colorClass: "text-emerald-400 border-emerald-500/60 bg-emerald-950/30",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          details:
            attackId === "imds_exfil"
              ? "Host eBPF cgroup/connect4 filter intercepted connect() to 169.254.169.254. TCP SYN dropped with EPERM before socket creation."
              : attackId === "io_uring_escape"
              ? "Attack confined inside disposable Firecracker microVM. Guest kernel 6.12 has no io_uring/modules. Host hypervisor KVM boundary intact."
              : attackId === "host_fs_bleed"
              ? "Landlock LSM ruleset enforced no_new_privs=1. Subprocess cannot open paths outside /workspace/sandbox. Open call returned EACCES."
              : "Direct egress blocked by host eBPF. Outbound HTTPS redirected to port 3128 MITM-inspection proxy. Destination upload.pypi.org rejected by policy.",
        };
    }
  };

  const outcome = evaluateAttack(sandboxTier, selectedAttack);

  return (
    <div className="space-y-6 font-mono text-xs sm:text-sm">
      {/* Sandbox Tier Selector */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2.5 flex items-center justify-between">
          <span>1. Select Isolation Architecture</span>
          <span className="text-emerald-400">Current Escape Risk: {activeConfig.escapeRisk}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(Object.keys(SANDBOX_CONFIGS) as SandboxTier[]).map((tierKey) => {
            const cfg = SANDBOX_CONFIGS[tierKey];
            const active = sandboxTier === tierKey;
            return (
              <button
                key={tierKey}
                type="button"
                onClick={() => setSandboxTier(tierKey)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  active
                    ? "bg-emerald-950/40 border-emerald-500/70 text-white shadow-lg"
                    : "bg-slate-950/70 border-slate-800 text-gray-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs sm:text-sm">{cfg.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      active
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-700 text-gray-400"
                    }`}
                  >
                    {cfg.badge}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 flex items-center justify-between mt-2">
                  <span>Cold-Start: {cfg.coldStartTime}</span>
                  <span
                    className={
                      cfg.escapeRisk === "ZERO"
                        ? "text-emerald-400 font-bold"
                        : cfg.escapeRisk === "CRITICAL"
                        ? "text-red-400 font-bold"
                        : "text-amber-400 font-bold"
                    }
                  >
                    {cfg.escapeRisk} RISK
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Attack Vector Evaluator */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2.5">
          2. Inject Autonomous Agent Exploit / Breakout Attempt
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ATTACK_VECTORS.map((attack) => {
            const isSelected = selectedAttack === attack.id;
            return (
              <button
                key={attack.id}
                type="button"
                onClick={() => setSelectedAttack(attack.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-slate-900 border-cyan-500/80 text-white"
                    : "bg-slate-950/60 border-slate-800 text-gray-400 hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-xs text-cyan-300 mb-1">{attack.name}</div>
                <div className="text-[11px] text-gray-300 mb-1">Target: {attack.target}</div>
                <p className="text-[10px] text-gray-500 leading-tight">{attack.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Simulation Outcome Banner */}
      <div className={`p-4 rounded-xl border ${outcome.colorClass} shadow-xl transition-all`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                outcome.blocked ? "bg-emerald-400" : "bg-red-500 animate-pulse"
              }`}
            />
            <span className="font-bold text-sm tracking-wide">{outcome.statusText}</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${outcome.badgeColor}`}>
            DEFENSE: {outcome.layer}
          </span>
        </div>

        <div className="text-xs text-gray-200 mt-2 bg-black/50 p-2.5 rounded-lg border border-slate-800 mb-2">
          <span className="text-gray-500 select-none">$ </span>
          <code>{activeAttack.payload}</code>
        </div>

        <p className="text-xs leading-relaxed text-gray-300">{outcome.details}</p>
      </div>

      {/* Layer Specs Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
          <div className="text-[10px] uppercase text-gray-500 mb-1">Kernel Boundary</div>
          <div className="text-xs font-semibold text-white mb-1">
            {activeConfig.kernelIsolation}
          </div>
          <div className="text-[10px] text-gray-400">
            {sandboxTier === "three_ring_jail"
              ? "Ring 2: KVM Hypervisor + Minimal vmlinux"
              : "Shared kernel exposes host ring-0"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
          <div className="text-[10px] uppercase text-gray-500 mb-1">Filesystem LSM</div>
          <div className="text-xs font-semibold text-white mb-1">
            {activeConfig.filesystemAccess}
          </div>
          <div className="text-[10px] text-gray-400">
            {sandboxTier === "three_ring_jail"
              ? "Ring 1: Landlock ABI v4 (no_new_privs)"
              : "Docker root can read mounted dev dirs"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
          <div className="text-[10px] uppercase text-gray-500 mb-1">Egress Jail</div>
          <div className="text-xs font-semibold text-white mb-1">
            {activeConfig.networkPolicy}
          </div>
          <div className="text-[10px] text-emerald-400">
            {sandboxTier === "three_ring_jail"
              ? "Ring 3: eBPF cgroup/connect4 pre-SYN drop"
              : "Direct NAT reaches metadata & VPC"}
          </div>
        </div>
      </div>
    </div>
  );
}
