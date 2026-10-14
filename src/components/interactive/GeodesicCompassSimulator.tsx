import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

interface PresetRoute {
  label: string;
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  nameA: string;
  nameB: string;
}

const PRESETS: PresetRoute[] = [
  {
    label: "NYC → London (Transatlantic)",
    lat1: 40.7128,
    lon1: -74.006,
    lat2: 51.5074,
    lon2: -0.1278,
    nameA: "New York, US",
    nameB: "London, UK",
  },
  {
    label: "Tokyo → San Francisco (Transpacific)",
    lat1: 35.6762,
    lon1: 139.6503,
    lat2: 37.7749,
    lon2: -122.4194,
    nameA: "Tokyo, JP",
    nameB: "San Francisco, US",
  },
  {
    label: "Austin → Dallas (Regional RF Link)",
    lat1: 30.2672,
    lon1: -97.7431,
    lat2: 32.7767,
    lon2: -96.797,
    nameA: "Austin, TX",
    nameB: "Dallas, TX",
  },
  {
    label: "Reykjavik → Anchorage (High-Latitude Polar)",
    lat1: 64.1466,
    lon1: -21.9426,
    lat2: 61.2181,
    lon2: -149.9003,
    nameA: "Reykjavik, IS",
    nameB: "Anchorage, AK",
  },
];

const CARDINALS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

function getCardinal(deg: number): string {
  const idx = Math.floor(((deg + 11.25) % 360) / 22.5);
  return CARDINALS[idx] || "N";
}

const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

// Compact Degree-3 WMM2025 Dipole/Quadrupole/Octupole Declination approximation for interactive HUD
function estimateWmmDeclination(latDeg: number, lonDeg: number): number {
  const G: [number, number, number][] = [
    [1, 0, -29351.8], [1, 1, -1410.8],
    [2, 0, -2556.6], [2, 1, 2951.1], [2, 2, 1649.3],
    [3, 0, 1361.0], [3, 1, -2381.0], [3, 2, 1233.8], [3, 3, 453.6],
  ];
  const H: [number, number, number][] = [
    [1, 0, 0.0], [1, 1, 4545.4],
    [2, 0, 0.0], [2, 1, -3133.6], [2, 2, -815.1],
    [3, 0, 0.0], [3, 1, -29.2], [3, 2, 237.5], [3, 3, -549.5],
  ];

  const phi = toRad(Math.max(-89.9, Math.min(89.9, latDeg)));
  const lambda = toRad(lonDeg);
  const sinPhi = Math.sin(phi);
  const cosPhi = Math.cos(phi);

  const P: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  const dP: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  P[0][0] = 1;

  for (let n = 1; n <= 3; n++) {
    for (let m = 0; m <= n; m++) {
      if (n === m) {
        P[n][m] = cosPhi * P[n - 1][m - 1];
        dP[n][m] = cosPhi * dP[n - 1][m - 1] - sinPhi * P[n - 1][m - 1];
      } else if (n === 1 && m === 0) {
        P[n][m] = sinPhi * P[0][0];
        dP[n][m] = cosPhi * P[0][0];
      } else {
        const k = ((n - 1) * (n - 1) - m * m) / ((2 * n - 1) * (2 * n - 3));
        P[n][m] = sinPhi * P[n - 1][m] - k * P[n - 2][m];
        dP[n][m] = cosPhi * P[n - 1][m] + sinPhi * dP[n - 1][m] - k * dP[n - 2][m];
      }
    }
  }

  let X = 0;
  let Y = 0;
  for (let i = 0; i < G.length; i++) {
    const [n, m, gnm] = G[i];
    const hnm = H[i][2];
    const schmidt = m === 0 ? 1 : Math.sqrt(2 * factorial(n - m) / factorial(n + m));
    const p = P[n][m] * schmidt;
    const dp = dP[n][m] * schmidt;
    const cosM = Math.cos(m * lambda);
    const sinM = Math.sin(m * lambda);
    X += (gnm * cosM + hnm * sinM) * dp;
    if (cosPhi > 1e-6) {
      Y += (m * (gnm * sinM - hnm * cosM) * p) / cosPhi;
    }
  }

  return toDeg(Math.atan2(Y, X));
}

function factorial(n: number): number {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export default function GeodesicCompassSimulator() {
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [lat1, setLat1] = useState<number>(PRESETS[0].lat1);
  const [lon1, setLon1] = useState<number>(PRESETS[0].lon1);
  const [lat2, setLat2] = useState<number>(PRESETS[0].lat2);
  const [lon2, setLon2] = useState<number>(PRESETS[0].lon2);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const selectPreset = (idx: number) => {
    setPresetIdx(idx);
    const p = PRESETS[idx];
    setLat1(p.lat1);
    setLon1(p.lon1);
    setLat2(p.lat2);
    setLon2(p.lon2);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "GeodesicCompassSimulator",
        action_type: "calculate",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `${lat1.toFixed(2)},${lon1.toFixed(2)}_to_${lat2.toFixed(2)},${lon2.toFixed(2)}`,
      });
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [lat1, lon1, lat2, lon2]);

  // 1. Great-Circle Orthodrome
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLambda = toRad(lon2 - lon1);

  const yInit = Math.sin(dLambda) * Math.cos(phi2);
  const xInit =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  const initialBearing = (toDeg(Math.atan2(yInit, xInit)) + 360) % 360;

  // True Reverse Bearing (B -> A)
  const yRev = Math.sin(-dLambda) * Math.cos(phi1);
  const xRev =
    Math.cos(phi2) * Math.sin(phi1) -
    Math.sin(phi2) * Math.cos(phi1) * Math.cos(-dLambda);
  const reverseBearing = (toDeg(Math.atan2(yRev, xRev)) + 360) % 360;
  const finalBearing = (reverseBearing + 180) % 360;
  const naiveBackBearing = (initialBearing + 180) % 360;
  const convergenceDrift = Math.abs(finalBearing - initialBearing);

  // Haversine Distance
  const R = 6371;
  const a =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const gcDistanceKm = R * c;

  // 2. Rhumb Line (Loxodrome)
  const clampLat = (r: number) => Math.max(Math.min(r, Math.PI / 2 - 1e-7), -Math.PI / 2 + 1e-7);
  const dPsi = Math.log(
    Math.tan(Math.PI / 4 + clampLat(phi2) / 2) /
      Math.tan(Math.PI / 4 + clampLat(phi1) / 2)
  );
  const q = Math.abs(dPsi) > 1e-12 ? dPhi / dPsi : Math.cos(phi1);
  let dLonRhumb = dLambda;
  if (Math.abs(dLonRhumb) > Math.PI) {
    dLonRhumb = dLonRhumb > 0 ? -(2 * Math.PI - dLonRhumb) : 2 * Math.PI + dLonRhumb;
  }
  const rhumbDistanceKm = Math.sqrt(dPhi * dPhi + q * q * dLonRhumb * dLonRhumb) * R;
  const rhumbBearing = (toDeg(Math.atan2(dLonRhumb, dPsi)) + 360) % 360;
  const rhumbPenaltyKm = Math.max(0, rhumbDistanceKm - gcDistanceKm);

  // 3. WMM2025 Magnetic Declination at Origin A
  const declination = estimateWmmDeclination(lat1, lon1);
  const magneticBearing = (initialBearing - declination + 360) % 360;

  // 4. URL-Hash v2 Base64URL Compression Preview
  const payloadObj = {
    v: [[Number(lat1.toFixed(5)), Number(lon1.toFixed(5)), Number(lat2.toFixed(5)), Number(lon2.toFixed(5))]],
    z: 4.5,
    c: [Number(((lat1 + lat2) / 2).toFixed(5)), Number(((lon1 + lon2) / 2).toFixed(5))],
    m: "geographic",
  };
  const encodedHash =
    typeof btoa === "function"
      ? btoa(JSON.stringify(payloadObj))
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "")
      : "";

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/80 font-mono shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
            // INTERACTIVE SIMULATOR // GEODESIC vs. RHUMB &amp; WMM2025 ENGINE
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          WGS84 SPHERICAL + WMM2025 HARMONICS
        </span>
      </div>

      {/* Preset Selector Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESETS.map((preset, idx) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => selectPreset(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
              presetIdx === idx
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/60 font-bold"
                : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Coordinate Sliders */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-blue-500/20 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-blue-400 font-bold uppercase">Point A (Origin)</span>
            <span className="text-gray-300">
              {lat1.toFixed(4)}°, {lon1.toFixed(4)}°
            </span>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>Latitude (φ₁)</span>
              <span className="text-blue-300">{lat1.toFixed(2)}°</span>
            </div>
            <input
              type="range"
              min="-70"
              max="75"
              step="0.1"
              value={lat1}
              onChange={(e) => {
                setPresetIdx(-1);
                setLat1(Number(e.target.value));
              }}
              className="w-full accent-blue-400 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>Longitude (λ₁)</span>
              <span className="text-blue-300">{lon1.toFixed(2)}°</span>
            </div>
            <input
              type="range"
              min="-175"
              max="175"
              step="0.1"
              value={lon1}
              onChange={(e) => {
                setPresetIdx(-1);
                setLon1(Number(e.target.value));
              }}
              className="w-full accent-blue-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-red-500/20 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-red-400 font-bold uppercase">Point B (Target)</span>
            <span className="text-gray-300">
              {lat2.toFixed(4)}°, {lon2.toFixed(4)}°
            </span>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>Latitude (φ₂)</span>
              <span className="text-red-300">{lat2.toFixed(2)}°</span>
            </div>
            <input
              type="range"
              min="-70"
              max="75"
              step="0.1"
              value={lat2}
              onChange={(e) => {
                setPresetIdx(-1);
                setLat2(Number(e.target.value));
              }}
              className="w-full accent-red-400 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>Longitude (λ₂)</span>
              <span className="text-red-300">{lon2.toFixed(2)}°</span>
            </div>
            <input
              type="range"
              min="-175"
              max="175"
              step="0.1"
              value={lon2}
              onChange={(e) => {
                setPresetIdx(-1);
                setLon2(Number(e.target.value));
              }}
              className="w-full accent-red-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Telemetry Comparison Matrix */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Card 1: Great-Circle Orthodrome */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-1">
            1. Great-Circle (Orthodrome)
          </div>
          <div className="text-2xl font-extrabold text-white mb-1">
            {initialBearing.toFixed(1)}°{" "}
            <span className="text-sm font-bold text-cyan-400">{getCardinal(initialBearing)}</span>
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Surface Distance:</span>
              <span className="font-bold text-emerald-400">{gcDistanceKm.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Final Arrival (θ_end):</span>
              <span className="font-semibold text-cyan-300">{finalBearing.toFixed(1)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">True Reverse (B→A):</span>
              <span className="font-semibold text-white">{reverseBearing.toFixed(1)}°</span>
            </div>
            <div className="text-[10px] text-amber-300 pt-1">
              Naive (θ₁+180°): {naiveBackBearing.toFixed(1)}° (Δ {convergenceDrift.toFixed(1)}° drift)
            </div>
          </div>
        </div>

        {/* Card 2: Rhumb Line (Loxodrome) */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">
            2. Rhumb Line (Loxodrome)
          </div>
          <div className="text-2xl font-extrabold text-white mb-1">
            {rhumbBearing.toFixed(1)}°{" "}
            <span className="text-sm font-bold text-amber-400">{getCardinal(rhumbBearing)}</span>
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Loxodrome Dist:</span>
              <span className="font-bold text-amber-300">{rhumbDistanceKm.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Distance Penalty:</span>
              <span className="font-bold text-red-400">+{rhumbPenaltyKm.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reverse Heading:</span>
              <span className="font-semibold text-white">
                {((rhumbBearing + 180) % 360).toFixed(1)}°
              </span>
            </div>
            <div className="text-[10px] text-gray-400 pt-1">
              Constant compass heading across all meridians
            </div>
          </div>
        </div>

        {/* Card 3: WMM2025 Magnetic Compass */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">
            3. WMM2025 Magnetic Heading
          </div>
          <div className="text-2xl font-extrabold text-white mb-1">
            {magneticBearing.toFixed(1)}°{" "}
            <span className="text-sm font-bold text-emerald-400">MAG</span>
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Declination (δ):</span>
              <span className="font-bold text-emerald-300">
                {Math.abs(declination).toFixed(1)}° {declination >= 0 ? "E" : "W"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">True Heading:</span>
              <span className="font-semibold text-white">{initialBearing.toFixed(1)}° TRUE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Nautical Miles:</span>
              <span className="font-semibold text-cyan-300">
                {(gcDistanceKm * 0.539957).toFixed(1)} nm
              </span>
            </div>
            <div className="text-[10px] text-gray-400 pt-1">
              Physical lensatic compass correction at Point A
            </div>
          </div>
        </div>
      </div>

      {/* Live Stateless URL-Hash Preview */}
      <div className="p-3.5 rounded-xl bg-black/90 border border-white/10 text-xs">
        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
          <span>STATELESS RFC 4648 BASE64URL FRAGMENT (v2 CODEC)</span>
          <span className="text-emerald-400 font-bold">{encodedHash.length} chars • 0 DB queries</span>
        </div>
        <div className="text-cyan-300 truncate select-all">
          https://coordy.tekromancy.com/#v={encodedHash}
        </div>
      </div>
    </div>
  );
}
