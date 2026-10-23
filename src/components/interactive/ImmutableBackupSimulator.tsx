import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

type StorageStackId =
  | "seaweed_hardened_b2"
  | "seaweed_default_only"
  | "garage_s3"
  | "ceph_rgw_cluster";

interface StorageStack {
  id: StorageStackId;
  name: string;
  badge: string;
  description: string;
  supportsComplianceLock: boolean;
  defaultBucketDeleteSafe: boolean;
  filerSideDoorBlocked: boolean;
  ntpHardened: boolean;
  hasCloudWormReplica: boolean;
}

const STACKS: StorageStack[] = [
  {
    id: "seaweed_hardened_b2",
    name: "Hardened SeaweedFS + Kopia + Backblaze B2 WORM",
    badge: "RECOMMENDED 3-2-1-1-0",
    description:
      "On-prem SeaweedFS 4.x in Compliance Mode (-allowDeleteBucketNotEmpty=false per Issue #11660, Filer :8888/FUSE/WebDAV unexposed, bucket-scoped writer key, NTS time sync) paired with an independent Backblaze B2 Compliance bucket.",
    supportsComplianceLock: true,
    defaultBucketDeleteSafe: true,
    filerSideDoorBlocked: true,
    ntpHardened: true,
    hasCloudWormReplica: true,
  },
  {
    id: "seaweed_default_only",
    name: "Single-Box SeaweedFS (Out-of-the-Box Defaults)",
    badge: "ISSUE #11660 EXPOSED",
    description:
      "S3 Compliance Mode enabled on bucket, but shipped defaults remain active: allowDeleteBucketNotEmpty=true (Issue #11660), Filer/weed shell ports reachable on LAN, and no off-site cloud WORM copy.",
    supportsComplianceLock: true,
    defaultBucketDeleteSafe: false,
    filerSideDoorBlocked: false,
    ntpHardened: false,
    hasCloudWormReplica: false,
  },
  {
    id: "garage_s3",
    name: "Garage S3 v2.x (Lightweight Self-Hosted)",
    badge: "NO OBJECT LOCK",
    description:
      "Excellent ~30-60 MB RAM geo-distributed store, but exposes no S3 Object Lock or S3 Versioning API. Any `--write` key can delete objects, and deletes replicate across all nodes.",
    supportsComplianceLock: false,
    defaultBucketDeleteSafe: false,
    filerSideDoorBlocked: true,
    ntpHardened: true,
    hasCloudWormReplica: false,
  },
  {
    id: "ceph_rgw_cluster",
    name: "Ceph RGW Multi-Node Cluster (On-Prem Only)",
    badge: "COHASSET-ASSESSED",
    description:
      "Cohasset-assessed S3 Object Lock Compliance + Legal Hold (Tentacle+ supports locking existing buckets), but requires 3+ node MON/MGR/OSD ops and still shares the on-prem root/RADOS (`rados rm`) trust boundary.",
    supportsComplianceLock: true,
    defaultBucketDeleteSafe: true,
    filerSideDoorBlocked: true,
    ntpHardened: true,
    hasCloudWormReplica: false,
  },
];

export default function ImmutableBackupSimulator() {
  const [stackId, setStackId] = useState<StorageStackId>("seaweed_hardened_b2");
  const [clientCompromised, setClientCompromised] = useState<boolean>(true);
  const [sideDoorAttack, setSideDoorAttack] = useState<boolean>(false);
  const [clockJumpAttack, setClockJumpAttack] = useState<boolean>(false);
  const [storageRootCompromised, setStorageRootCompromised] =
    useState<boolean>(false);
  const [datasetTb, setDatasetTb] = useState<number>(10);
  const [retentionDays, setRetentionDays] = useState<number>(30);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const activeStack = STACKS.find((s) => s.id === stackId) || STACKS[0];

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "ImmutableBackupSimulator",
        action_type: "evaluate_worm_survivability",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `stack:${stackId}_client:${clientCompromised}_side:${sideDoorAttack}_clock:${clockJumpAttack}_root:${storageRootCompromised}_tb:${datasetTb}`,
      });
    }, 850);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    stackId,
    clientCompromised,
    sideDoorAttack,
    clockJumpAttack,
    storageRootCompromised,
    datasetTb,
    retentionDays,
  ]);

  // Evaluate On-Prem Survival
  const evaluateOnPrem = () => {
    if (storageRootCompromised) {
      return {
        survived: false,
        reason:
          "ON-PREM DESTROYED (Substrate Root Bypass): Attacker gained root on the storage host and ran `rm -rf`, `docker compose down -v`, or Ceph `rados rm` directly on the underlying storage layer, bypassing the S3 API entirely.",
      };
    }
    if (!activeStack.supportsComplianceLock && clientCompromised) {
      return {
        survived: false,
        reason:
          "ON-PREM DESTROYED (No S3 Object Lock): Attacker extracted the `--write` key from the compromised backup client and issued standard S3 DeleteObject calls.",
      };
    }
    if (
      sideDoorAttack &&
      (!activeStack.defaultBucketDeleteSafe || !activeStack.filerSideDoorBlocked)
    ) {
      return {
        survived: false,
        reason:
          "ON-PREM DESTROYED (SeaweedFS Issue #11660 / Filer Side-Door): Attacker called DeleteBucket with default `allowDeleteBucketNotEmpty=true` or deleted directly via the exposed Filer (:8888) / `weed shell` interface.",
      };
    }
    if (clockJumpAttack && !activeStack.ntpHardened) {
      return {
        survived: false,
        reason:
          "ON-PREM DESTROYED (Clock Fast-Forward Attack): Attacker spoofed NTP to advance the storage server clock past `RetainUntilDate`, expiring Compliance locks prematurely.",
      };
    }
    return {
      survived: true,
      reason:
        "ON-PREM INTACT: S3 Object Lock (COMPLIANCE mode) + bucket-scoped writer credentials + `-allowDeleteBucketNotEmpty=false` and hardened NTS time sync rejected all 6 S3 API deletion and downgrade vectors.",
    };
  };

  const onPremStatus = evaluateOnPrem();
  const cloudSurvived = activeStack.hasCloudWormReplica;
  const overallRecoverable = onPremStatus.survived || cloudSurvived;

  // Monthly Cloud Cost Calculations (accounting for daily churn & Wasabi 90-day minimum storage duration)
  const effectiveB2Tb = Number((datasetTb * (1 + retentionDays * 0.01)).toFixed(1));
  const effectiveWasabiDays = Math.max(90, retentionDays);
  const effectiveWasabiTb = Number(
    (datasetTb * (1 + effectiveWasabiDays * 0.01)).toFixed(1)
  );

  const b2MonthlyCost = (effectiveB2Tb * 6.95).toFixed(2);
  const wasabiMonthlyCost = (effectiveWasabiTb * 7.99).toFixed(2);
  const awsS3MonthlyCost = (effectiveB2Tb * 23.0).toFixed(2);

  return (
    <div className="space-y-6 font-mono text-xs sm:text-sm">
      {/* Architecture Selector */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-2.5 flex items-center justify-between">
          <span>1. Select Backup Storage Architecture</span>
          <span className="text-emerald-400">
            Ransomware Recovery:{" "}
            {overallRecoverable ? "GUARANTEED" : "TOTAL DATA LOSS"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {STACKS.map((s) => {
            const active = stackId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStackId(s.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  active
                    ? "bg-emerald-950/40 border-emerald-500/70 text-white shadow-lg"
                    : "bg-slate-950/70 border-slate-800 text-gray-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs sm:text-sm">{s.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${
                      active
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-700 text-gray-400"
                    }`}
                  >
                    {s.badge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {s.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Threat Injection & Sizing Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
            2. Inject Adversarial Ransomware / Substrate Vectors
          </div>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              1. Backup Client Root Compromised (Steals S3 Key)
            </span>
            <input
              type="checkbox"
              checked={clientCompromised}
              onChange={(e) => setClientCompromised(e.target.checked)}
              className="accent-emerald-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              2. Probe Side-Door API (DeleteBucket / Filer :8888)
            </span>
            <input
              type="checkbox"
              checked={sideDoorAttack}
              onChange={(e) => setSideDoorAttack(e.target.checked)}
              className="accent-amber-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-black/40 cursor-pointer">
            <span className="text-xs text-gray-300">
              3. NTP Clock Fast-Forward (+95 Days Lock Expiry)
            </span>
            <input
              type="checkbox"
              checked={clockJumpAttack}
              onChange={(e) => setClockJumpAttack(e.target.checked)}
              className="accent-amber-500 w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg border border-red-500/30 bg-red-950/20 cursor-pointer">
            <span className="text-xs text-red-300">
              4. On-Prem Storage Server Root Compromised (SSH/IPMI)
            </span>
            <input
              type="checkbox"
              checked={storageRootCompromised}
              onChange={(e) => setStorageRootCompromised(e.target.checked)}
              className="accent-red-500 w-4 h-4"
            />
          </label>
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">Protected Dataset Size:</span>
              <span className="text-cyan-400 font-bold">{datasetTb} TB</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={datasetTb}
              onChange={(e) => setDatasetTb(Number(e.target.value))}
              aria-label="Protected Dataset Size in Terabytes"
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">WORM Compliance Retention:</span>
              <span className="text-emerald-400 font-bold">
                {retentionDays} Days
              </span>
            </div>
            <input
              type="range"
              min={7}
              max={180}
              step={1}
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              aria-label="WORM Compliance Retention in Days"
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>7d</span>
              <span>30d (Standard)</span>
              <span>90d (Wasabi Min)</span>
              <span>180d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Survival Status Banner */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          overallRecoverable
            ? "border-emerald-500/60 bg-emerald-950/25 text-emerald-300"
            : "border-red-500/60 bg-red-950/30 text-red-300"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                overallRecoverable
                  ? "bg-emerald-400"
                  : "bg-red-500 animate-pulse"
              }`}
            />
            <span>
              {onPremStatus.survived
                ? "ON-PREM & OFF-SITE COPIES SURVIVED"
                : cloudSurvived
                ? "ON-PREM WIPED — RECOVERED FROM INDEPENDENT B2 WORM REPLICA!"
                : "CATASTROPHIC FAILURE: ALL BACKUP COPIES DESTROYED"}
            </span>
          </div>
          <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-current/40">
            On-Prem: {onPremStatus.survived ? "LOCKED" : "WIPED"} | Cloud:{" "}
            {cloudSurvived ? "LOCKED" : "NONE"}
          </span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          {onPremStatus.reason}
        </p>
      </div>

      {/* Cloud WORM Cost Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
          <div className="text-[10px] uppercase text-emerald-300 mb-1">
            Backblaze B2 (Compliance Lock)
          </div>
          <div className="text-xl font-bold text-emerald-400">
            ${b2MonthlyCost}
            <span className="text-xs font-normal text-gray-400"> / mo</span>
          </div>
          <div className="text-[10px] text-gray-300 mt-1">
            $6.95/TB &bull; No minimum duration penalty ({effectiveB2Tb} TB billed)
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            Wasabi (90-Day Min Duration)
          </div>
          <div className="text-xl font-bold text-cyan-400">
            ${wasabiMonthlyCost}
            <span className="text-xs font-normal text-gray-400"> / mo</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            $7.99/TB &bull; 90d min retention floor ({effectiveWasabiTb} TB billed)
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/90">
          <div className="text-[10px] uppercase text-gray-400 mb-1">
            AWS S3 Standard (Reference)
          </div>
          <div className="text-xl font-bold text-white">
            ${awsS3MonthlyCost}
            <span className="text-xs font-normal text-gray-400"> / mo</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            $23.00/TB + Egress &amp; API PutObject fees
          </div>
        </div>
      </div>
    </div>
  );
}
