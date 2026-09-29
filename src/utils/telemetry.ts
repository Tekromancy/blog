/**
 * Tekromancy Engineering Telemetry & Unified Analytics System
 * 
 * Unites Google Analytics 4 (Measurement ID: G-YBFSBJRJK8, Property: 408486434)
 * and Google Ads (App ID: 554699267) into a telemetry pipeline that feeds
 * real-time engineer behavior back into codebase insights and engineering roadmap.
 */

export interface TelemetryEvents {
  code_copy: {
    article_id?: string;
    article_title?: string;
    code_length?: number;
    language?: string;
  };
  internal_search: {
    query: string;
    result_count: number;
  };
  app_portal_click: {
    app_id: string;
    app_name: string;
    destination: string;
  };
  app_play_store_click: {
    app_id: string;
    app_name: string;
    package_id?: string;
  };
  simulator_interaction: {
    simulator_name: string;
    action_type: string;
    value?: number | string;
  };
  outbound_click: {
    url: string;
    label?: string;
  };
  scroll_milestone: {
    depth: number;
    article_id?: string;
  };
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    trackTelemetry?: <K extends keyof TelemetryEvents>(
      eventName: K,
      params: TelemetryEvents[K]
    ) => void;
  }
}

export function trackTelemetry<K extends keyof TelemetryEvents>(
  eventName: K,
  params: TelemetryEvents[K]
): void {
  if (typeof window === "undefined") return;

  // 1. Google Analytics / Google Ads gtag transmission
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // 2. Dispatch custom DOM event for local client telemetry observation
  try {
    const customEvt = new CustomEvent("tekromancy:telemetry", {
      detail: { eventName, params, timestamp: new Date().toISOString() },
    });
    window.dispatchEvent(customEvt);
  } catch {
    // Ignore in older environments
  }
}
