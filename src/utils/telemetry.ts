/**
 * Tekromancy Engineering Telemetry & Unified Analytics System
 * 
 * Unites Google Analytics 4 (Measurement ID: G-YBFSBJRJK8, Property: 408486434)
 * and Google Ads (App ID: 554699267) into a telemetry pipeline that feeds
 * real-time engineer behavior back into codebase insights and Google Ads Machine Learning.
 */

export const TELEMETRY_VALUES = {
  LEAD_GEN: 100.0,
  APP_INSTALL_CLICK: 50.0,
  BETA_GROUP_CLICK: 30.0,
  HIGH_INTENT_ENGINEER: 10.0,
  SIMULATOR_ENGAGEMENT: 5.0,
  CODE_COPY: 2.5,
  SCROLL_90: 1.0,
  SEARCH_QUERY: 0.5,
} as const;

export interface TelemetryEvents {
  code_copy: {
    article_id?: string;
    article_title?: string;
    code_length?: number;
    language?: string;
    value?: number;
    currency?: string;
  };
  internal_search: {
    query: string;
    result_count: number;
    value?: number;
    currency?: string;
  };
  app_portal_click: {
    app_id: string;
    app_name: string;
    destination: string;
    value?: number;
    currency?: string;
  };
  app_play_store_click: {
    app_id: string;
    app_name: string;
    package_id?: string;
    value?: number;
    currency?: string;
  };
  simulator_interaction: {
    simulator_name: string;
    action_type: string;
    value?: number;
    currency?: string;
    setting?: string | number;
  };
  outbound_click: {
    url: string;
    label?: string;
    value?: number;
    currency?: string;
  };
  scroll_milestone: {
    depth: number;
    article_id?: string;
    value?: number;
    currency?: string;
  };
  generate_lead: {
    lead_type: string;
    subject?: string;
    value?: number;
    currency?: string;
  };
  high_intent_engineer: {
    article_id: string;
    trigger: string;
    value?: number;
    currency?: string;
  };
  contact_intent_click: {
    channel: string;
    destination: string;
    value?: number;
    currency?: string;
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
    setEnhancedConversionData?: (data: { email?: string; phone_number?: string }) => void;
  }
}

/**
 * Configure First-Party Enhanced Conversions data for Google Ads machine learning.
 * Matches conversions with Google accounts with privacy preservation.
 */
export function setEnhancedConversionData(data: { email?: string; phone_number?: string }): void {
  if (typeof window === "undefined") return;

  const payload: Record<string, string> = {};
  if (data.email) {
    payload.email = data.email.trim().toLowerCase();
  }
  if (data.phone_number) {
    payload.phone_number = data.phone_number.trim();
  }

  if (typeof window.gtag === "function") {
    window.gtag("set", "user_data", payload);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "set_user_data",
      user_data: payload,
    });
  }
}

/**
 * Universal Telemetry Event Dispatcher
 * Dispatches to Google Analytics, Google Ads smart bidding, and local diagnostic event bus.
 */
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
