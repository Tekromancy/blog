import React, { useState } from "react";
import { trackTelemetry, TELEMETRY_VALUES } from "../../utils/telemetry";

interface ScheduleBlock {
  group: string;
  timeRange: string;
  action: "RING" | "VIBRATE" | "MUTE" | "DROP";
  color: string;
  description: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function TelecomTimelineMatrix() {
  const [activeHour, setActiveHour] = useState<number>(14); // 2:00 PM default

  const handleHourSelect = (h: number) => {
    setActiveHour(h);
    trackTelemetry("simulator_interaction", {
      simulator_name: "TelecomTimelineMatrix",
      action_type: "select_hour",
      value: TELEMETRY_VALUES.SIMULATOR_ENGAGEMENT,
      currency: "USD",
      setting: `hour_${h}`,
    });
  };

  // Evaluate active posture based on selected hour
  const getHourPosture = (h: number) => {
    if (h >= 0 && h < 6) {
      return {
        label: "NOCTURNAL SHIELDS UP (00:00 - 06:00)",
        vip: { mode: "Full Ring", desc: "Whitelisted family can ring aloud" },
        oncall: { mode: "Tactile Vibrate", desc: "Pager alerts escalate silently" },
        work: { mode: "Silent Log", desc: "Completely muted, logged to history" },
        unknown: { mode: "Instant Drop", desc: "Zero interrupt, screen & drop" },
      };
    } else if (h >= 6 && h < 9) {
      return {
        label: "MORNING STANDBY (06:00 - 09:00)",
        vip: { mode: "Full Ring", desc: "Instant audio pass-through" },
        oncall: { mode: "Normal Ring", desc: "Morning handoff active" },
        work: { mode: "Silent Log", desc: "Deferred until 09:00 business hours" },
        unknown: { mode: "Screen & Drop", desc: "Voicemail redirect" },
      };
    } else if (h >= 9 && h < 18) {
      return {
        label: "OPERATIONAL HOURS (09:00 - 18:00)",
        vip: { mode: "Full Ring", desc: "VIP priority pass" },
        oncall: { mode: "Full Ring", desc: "Production duty active" },
        work: { mode: "Full Ring", desc: "Team & customer calls ring normally" },
        unknown: { mode: "Screen & Drop", desc: "Spam firewall active" },
      };
    } else if (h >= 18 && h < 22) {
      return {
        label: "EVENING FOCUS & PERSONAL (18:00 - 22:00)",
        vip: { mode: "Full Ring", desc: "Family & personal priority" },
        oncall: { mode: "Tactile Vibrate", desc: "Standby escalation only" },
        work: { mode: "Silent Log", desc: "End-of-day firewall engaged" },
        unknown: { mode: "Instant Drop", desc: "Automated reject" },
      };
    } else {
      return {
        label: "NIGHT PRE-REST SHIELDS (22:00 - 24:00)",
        vip: { mode: "Full Ring", desc: "Emergency bypass armed" },
        oncall: { mode: "Tactile Vibrate", desc: "Emergency repeated-call mode" },
        work: { mode: "Mute", desc: "Zero notifications" },
        unknown: { mode: "Instant Drop", desc: "Zero interrupt" },
      };
    }
  };

  const posture = getHourPosture(activeHour);

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/80 font-mono shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9333ea] animate-ping"></span>
          <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">
            // INTERACTIVE SIMULATOR // 24-HOUR TELECOM MATRIX
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          SELECTED: {String(activeHour).padStart(2, "0")}:00 HRS
        </span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>Click any hour to test dynamic telecom firewall transitions:</span>
          <span className="text-purple-300 font-bold">{posture.label}</span>
        </div>

        {/* 24-Hour Interactive Slider / Bar */}
        <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 select-none">
          {HOURS.map((h) => {
            const isSelected = activeHour === h;
            const isNight = h < 6 || h >= 22;
            const isWork = h >= 9 && h < 18;
            return (
              <button
                key={h}
                onClick={() => handleHourSelect(h)}
                className={`py-2 rounded text-[10px] font-bold transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? "bg-[#9333ea] text-white ring-2 ring-purple-400 scale-105 shadow-lg"
                    : isWork
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                    : isNight
                    ? "bg-purple-950/40 text-purple-400 border border-purple-500/20 hover:bg-purple-900/40"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                }`}
                title={`Simulate ${h}:00`}
              >
                <span>{h}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Rule State Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
          <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">// VIP & Family</div>
          <div className="text-sm font-bold text-emerald-400">{posture.vip.mode}</div>
          <div className="text-[10px] text-gray-400 mt-1">{posture.vip.desc}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
          <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">// On-Call Rotation</div>
          <div className="text-sm font-bold text-amber-300">{posture.oncall.mode}</div>
          <div className="text-[10px] text-gray-400 mt-1">{posture.oncall.desc}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
          <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">// Work / Clients</div>
          <div className="text-sm font-bold text-cyan-300">{posture.work.mode}</div>
          <div className="text-[10px] text-gray-400 mt-1">{posture.work.desc}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
          <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">// Unknown / Spam</div>
          <div className="text-sm font-bold text-red-400">{posture.unknown.mode}</div>
          <div className="text-[10px] text-gray-400 mt-1">{posture.unknown.desc}</div>
        </div>
      </div>
    </div>
  );
}
