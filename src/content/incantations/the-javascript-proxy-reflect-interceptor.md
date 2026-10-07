---
title: "The Mirage Mirror: Proxy & Reflect Interceptors in JavaScript"
description: "Implement the Gang of Four Proxy pattern in modern JavaScript (ES6+) using Proxy and Reflect traps—enforcing runtime schema validation, defensive immutability, and access tracing without modifying raw target objects."
type: "javascript"
gofPattern: "Proxy Pattern (Structural)"
gofCategory: "Structural"
arcaneSchool: "Illusion // The Mirage Reflection Mirror"
formula: |2
  const withTelemetry = (target) => new Proxy(target, {
    get(obj, prop, receiver) {
      console.log(`[MIRAGE: READ] Accessed property: ${String(prop)}`);
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, val, receiver) {
      if (typeof val === "number" && val < 0) throw new RangeError("Values must be non-negative!");
      console.log(`[MIRAGE: WRITE] Set ${String(prop)} = ${val}`);
      return Reflect.set(obj, prop, val, receiver);
    }
  });
tags: ["javascript", "nodejs", "proxy-pattern", "reflect", "metaprogramming", "validation", "gof-patterns", "illusion"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Proxy

In 1994, the Gang of Four defined the **Proxy Pattern**:
> *"Provide a surrogate or placeholder for another object to control access to it."*
> — Design Patterns, p. 207

In JavaScript applications, raw objects are mutable by default. Bugs frequently occur when:
- Unsanitized inputs write negative numbers or unexpected types into configuration objects.
- Secret tokens or sensitive keys are accessed by unverified third-party NPM dependencies.
- Developers mutate shared state directly, bypassing validation hooks.

Using ES6 **`Proxy`** combined with the **`Reflect`** API, developers can construct a transparent **Protection and Virtual Proxy**. The Proxy intercepts low-level JavaScript runtime operations (`get`, `set`, `has`, `deleteProperty`) and enforces business invariants before delegating to the target object.

---

## The Complete JavaScript Script

Save this as `mirage_proxy.mjs` and run with `node`:

```javascript
/**
 * PATTERN: Proxy Pattern (Gang of Four Structural)
 * ARCANUM: Illusion // The Mirage Reflection Mirror
 * DESCRIPTION: Defense-in-depth object protection and telemetry via Proxy & Reflect.
 */

// -----------------------------------------------------------------------------
// 1. PROTECTION PROXY FACTORY
// -----------------------------------------------------------------------------
export function createGuardedGrimoire(targetData = {}) {
  const schemaValidators = {
    mana: (val) => typeof val === "number" && val >= 0 && val <= 1000,
    spellName: (val) => typeof val === "string" && val.length > 0,
    isForbidden: (val) => typeof val === "boolean",
  };

  return new Proxy(targetData, {
    // Intercept property reads
    get(target, prop, receiver) {
      // Security Ward: Block access to internal private fields prefixed with '_'
      if (typeof prop === "string" && prop.startsWith("_")) {
        console.warn(`🚨 [MIRAGE VIOLATION] Unauthorized read attempt on private field: ${prop}`);
        return undefined;
      }

      const value = Reflect.get(target, prop, receiver);
      console.log(`👁️ [MIRAGE READ] Read: ${String(prop)} ──▶ ${JSON.stringify(value)}`);
      return value;
    },

    // Intercept property mutations
    set(target, prop, value, receiver) {
      // Enforce validation if a validator exists for this field
      if (prop in schemaValidators) {
        const isValid = schemaValidators[prop](value);
        if (!isValid) {
          throw new TypeError(
            `[MIRAGE REJECTION] Value '${value}' violated invariant for property '${String(prop)}'`
          );
        }
      }

      console.log(`✍️ [MIRAGE WRITE] Mutation: ${String(prop)} = ${JSON.stringify(value)}`);
      return Reflect.set(target, prop, value, receiver);
    },

    // Intercept 'delete' operator
    deleteProperty(target, prop) {
      if (prop === "id" || prop === "spellName") {
        throw new Error(`[MIRAGE IMMUTABILITY] Cannot delete mandatory core rune: ${String(prop)}`);
      }
      return Reflect.deleteProperty(target, prop);
    },
  });
}

// -----------------------------------------------------------------------------
// 2. VERIFICATION DEMONSTRATION
// -----------------------------------------------------------------------------
function runVerification() {
  console.log("==========================================================");
  console.log("[ILLUSION] Casting Mirage Protection Proxy...");
  console.log("==========================================================");

  // Raw data object
  const rawSpell = {
    id: "SPELL-001",
    spellName: "Chrono Shift",
    mana: 250,
    isForbidden: false,
    _internalHash: "0xDEADBEEF",
  };

  // Encase in Protection Proxy
  const guardedSpell = createGuardedGrimoire(rawSpell);

  // 1. Valid Read & Write
  guardedSpell.mana = 300;
  console.log(`Current Mana: ${guardedSpell.mana}\n`);

  // 2. Blocked Access to Private Field
  const secret = guardedSpell._internalHash;
  console.log(`Secret Read Result: ${secret}\n`);

  // 3. Caught Validation Rejection
  try {
    console.log("Attempting invalid mana assignment (-50)...");
    guardedSpell.mana = -50;
  } catch (err) {
    console.error(`Caught Expected Error: ${err.message}\n`);
  }

  // 4. Blocked Deletion of Core Property
  try {
    console.log("Attempting illegal property deletion (id)...");
    delete guardedSpell.id;
  } catch (err) {
    console.error(`Caught Expected Error: ${err.message}\n`);
  }

  console.log("==========================================================");
  console.log("[SUCCESS] Object invariants guarded without modifying raw data.");
  console.log("==========================================================");
}

runVerification();
```

---

## Proxy Interception Pipeline

```
Caller: guardedSpell.mana = 300
              │
              ▼
┌──────────────────────────────────────────────┐
│ ES6 Proxy [[Set]] Trap                       │
│                                              │
│ 1. Check schemaValidators.mana(300)          │
│    └── Valid! (Number between 0 and 1000)    │
│ 2. Emit telemetry log                        │
│ 3. Reflect.set(target, "mana", 300)          │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
              [Raw Object Updated]
```
