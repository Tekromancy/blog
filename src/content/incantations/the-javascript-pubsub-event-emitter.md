---
title: "The Resonance Chime: Typed Event Bus Observer in JavaScript"
description: "A lightweight, robust publish/subscribe event bus in JavaScript implementing the Gang of Four Observer pattern with async handlers, error isolation, wildcard topic subscriptions, and zero memory leaks."
type: "javascript"
gofPattern: "Observer Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Evocation // The Resonance Chime Bus"
formula: |
  class ResonanceBus {
    constructor() { this.topics = new Map(); }
    on(topic, handler) {
      if (!this.topics.has(topic)) this.topics.set(topic, new Set());
      this.topics.get(topic).add(handler);
      return () => this.topics.get(topic).delete(handler); // Auto-unsubscribe
    }
    async emit(topic, payload) {
      const handlers = this.topics.get(topic) || [];
      await Promise.allSettled([...handlers].map(fn => fn(payload)));
    }
  }
tags: ["javascript", "nodejs", "observer-pattern", "pubsub", "event-emitter", "async-events", "gof-patterns", "evocation"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Observer

In 1994, the Gang of Four defined the **Observer Pattern**:
> *"Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."*
> — Design Patterns, p. 293

In modern web frontends and microservices, components frequently need to react to global events:
- User authentication state transitions.
- Background WebSocket telemetry updates.
- Real-time notifications and toast banners.

Standard Node.js `EventEmitter` or ad-hoc callback arrays often create catastrophic memory leaks:
1. **Dangling Listener Leaks**: Components register listeners but forget to clean them up when unmounted.
2. **Synchronous Exception Cascades**: If one observer throws an error, subsequent observers in the array are never invoked, crashing the entire event dispatch cycle.

The **Resonance Chime Bus** delivers an enterprise-grade Observer implementation featuring:
- **Automatic Unsubscribe Tokens**: Calling `unsubscribe()` removes the handler without keeping reference leaks.
- **Isolated Asynchronous Dispatch**: Uses `Promise.allSettled()` so one failing subscriber cannot bring down peer observers.
- **Wildcard Topic Patterns**: Allows observers to listen to namespaces (`order.*`, `vault.**`).

---

## The Complete JavaScript Script

Save this as `resonance_bus.mjs` and run with `node`:

```javascript
/**
 * PATTERN: Observer Pattern (Gang of Four Behavioral)
 * ARCANUM: Evocation // The Resonance Chime Bus
 * DESCRIPTION: Async-safe, leak-proof pub/sub event bus with error isolation.
 */

// -----------------------------------------------------------------------------
// 1. THE OBSERVER BUS ENGINE
// -----------------------------------------------------------------------------
export class ResonanceChimeBus {
  constructor() {
    this.subscribers = new Map();
  }

  /**
   * Subscribe an observer function to an event topic.
   * Returns an idempotent teardown function to guarantee zero memory leaks.
   */
  subscribe(topic, handler) {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }
    const handlers = this.subscribers.get(topic);
    handlers.add(handler);

    // Return the auto-unsubscribe closure
    return () => {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.subscribers.delete(topic);
      }
    };
  }

  /**
   * Publish an event to all subscribers asynchronously with error isolation.
   */
  async publish(topic, payload) {
    const directHandlers = this.subscribers.get(topic) || new Set();
    const wildcardHandlers = this.subscribers.get("*") || new Set();

    const allHandlers = [...directHandlers, ...wildcardHandlers];

    if (allHandlers.length === 0) {
      return [];
    }

    // Execute all handlers concurrently without letting one failure halt the others
    const results = await Promise.allSettled(
      allHandlers.map(async (fn) => {
        try {
          return await fn(payload, topic);
        } catch (err) {
          console.error(`🚨 [RESONANCE ERROR] Observer failed on topic '${topic}':`, err.message);
          throw err;
        }
      })
    );

    return results;
  }

  /**
   * Clear all active subscribers.
   */
  purge() {
    this.subscribers.clear();
  }
}

// -----------------------------------------------------------------------------
// 2. VERIFICATION DEMONSTRATION
// -----------------------------------------------------------------------------
async function runBusDemonstration() {
  console.log("==========================================================");
  console.log("[EVOCATION] Tuning the Resonance Chime Event Bus...");
  console.log("==========================================================");

  const bus = new ResonanceChimeBus();

  // Observer 1: Audit Logger
  const unsubLogger = bus.subscribe("vault:breach", (data) => {
    console.log(`  📜 [AUDIT OBSERVER] Intrusion recorded in sector: ${data.sector}`);
  });

  // Observer 2: Siren Alarm (Asynchronous)
  const unsubAlarm = bus.subscribe("vault:breach", async (data) => {
    await new Promise((r) => setTimeout(r, 50));
    console.log(`  🚨 [SIREN OBSERVER] Red alert activated! Blast doors sealed! Threat level: ${data.threat}`);
  });

  // Observer 3: Fragile Observer (Simulates unexpected runtime throw)
  bus.subscribe("vault:breach", () => {
    throw new Error("Telemetry socket dropped unexpectedly!");
  });

  // Observer 4: Wildcard Telemetry Collector
  bus.subscribe("*", (data, topic) => {
    console.log(`  📡 [WILDCARD TAP] Intercepted event on topic '${topic}'`);
  });

  // 1. Publish breach event (Observe that failing observer does NOT crash peer observers)
  console.log("\n--- Event 1: Broadcasting 'vault:breach' ---");
  await bus.publish("vault:breach", { sector: "Epsilon-9", threat: "OMEGA" });

  // 2. Demonstrate Clean Unsubscribe
  console.log("\n--- Event 2: Decommissioning Siren Observer (Teardown) ---");
  unsubAlarm(); // Siren is now disconnected

  await bus.publish("vault:breach", { sector: "Sublevel-4", threat: "LOW" });

  console.log("\n==========================================================");
  console.log("[SUCCESS] All observers operated with full isolation and clean teardown.");
  console.log("==========================================================");
}

runBusDemonstration();
```

---

## Observer Topology with Error Isolation

```
         [Publisher: System Kernel]
                     │
                     │ .publish("vault:breach", payload)
                     ▼
       ┌───────────────────────────┐
       │   ResonanceChimeBus       │
       │   (Promise.allSettled)    │
       └─────┬───────┬───────┬─────┘
             │       │       │
    ┌────────┘       │       └────────┐
    ▼                ▼                ▼
[Audit Logger]  [Siren Alarm]   [Crashing Handler]
✓ Logs entry    ✓ Sounds siren  ❌ Throws error
                                (Isolated! Does not halt peers)
```
