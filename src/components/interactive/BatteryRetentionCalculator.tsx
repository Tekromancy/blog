import React, { useState, useEffect, useRef } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

export default function BatteryRetentionCalculator() {
  const [capacity, setCapacity] = useState<number>(5000);
  const [years, setYears] = useState<number>(3);
  const [cyclesPerDay, setCyclesPerDay] = useState<number>(1.2);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      trackTelemetry("simulator_interaction", {
        simulator_name: "BatteryRetentionCalculator",
        action_type: "calculate",
        value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
        currency: "USD",
        setting: `${capacity}mAh_${years}yrs_${cyclesPerDay}cyc`,
      });
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [capacity, years, cyclesPerDay]);

  // Electrochemical degradation model calculations
  const totalCycles = years * 365 * cyclesPerDay;

  // Conventional (0% - 100%) unmanaged cycling capacity fade (%)
  const unmanagedLossPct = Math.min(
    48,
    Math.round(0.048 * Math.pow(totalCycles, 0.58) + years * 2.8)
  );
  const unmanagedRetainedPct = Math.max(52, 100 - unmanagedLossPct);
  const unmanagedRetainedMah = Math.round(capacity * (unmanagedRetainedPct / 100));

  // SpareTank (25% - 75% protocol) guided cycling capacity fade (%)
  const spareTankLossPct = Math.min(
    20,
    Math.round(0.018 * Math.pow(totalCycles, 0.55) + years * 0.9)
  );
  const spareTankRetainedPct = Math.max(80, 100 - spareTankLossPct);
  const spareTankRetainedMah = Math.round(capacity * (spareTankRetainedPct / 100));

  const preservedMah = spareTankRetainedMah - unmanagedRetainedMah;
  const extraLifespanYears = (years * (spareTankRetainedPct / unmanagedRetainedPct - 1)).toFixed(1);

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/80 font-mono shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
          <span className="text-xs font-bold text-[#10b981] tracking-wider uppercase">
            // INTERACTIVE SIMULATOR // CAPACITY RETENTION ENGINE
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          ALGORITHM: ECKER ET AL. LI-ION
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <label className="text-gray-400 font-semibold">Battery Capacity</label>
            <span className="text-emerald-400 font-bold">{capacity} mAh</span>
          </div>
          <input
            type="range"
            min="3000"
            max="7000"
            step="100"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>3,000 mAh</span>
            <span>7,000 mAh</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <label className="text-gray-400 font-semibold">Usage Horizon</label>
            <span className="text-emerald-400 font-bold">{years} Years</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>1 Year</span>
            <span>5 Years</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <label className="text-gray-400 font-semibold">Daily Cycling Rate</label>
            <span className="text-emerald-400 font-bold">{cyclesPerDay.toFixed(1)} Cycles/Day</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={cyclesPerDay}
            onChange={(e) => setCyclesPerDay(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>Light (0.5)</span>
            <span>Heavy (2.5)</span>
          </div>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="grid md:grid-cols-2 gap-6 p-5 rounded-xl bg-white/5 border border-white/10">
        <div>
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>Conventional 0%–100% Full Cycling</span>
            <span className="text-red-400 font-bold">{unmanagedRetainedPct}% Health</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-300"
              style={{ width: `${unmanagedRetainedPct}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 flex justify-between">
            <span>Retained Capacity:</span>
            <span className="font-bold text-gray-200">{unmanagedRetainedMah} mAh</span>
          </div>
          <div className="text-[10px] text-red-400 mt-1">
            Severe capacity fade • Accelerated SEI growth
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>SpareTank 25%–75% Guided Protocol</span>
            <span className="text-emerald-400 font-bold">{spareTankRetainedPct}% Health</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${spareTankRetainedPct}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 flex justify-between">
            <span>Retained Capacity:</span>
            <span className="font-bold text-emerald-400">{spareTankRetainedMah} mAh</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-bold">
            +{preservedMah} mAh capacity preserved (~+{extraLifespanYears} yrs extra lifespan)
          </div>
        </div>
      </div>
    </div>
  );
}
