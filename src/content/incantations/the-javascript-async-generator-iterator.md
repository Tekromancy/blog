---
title: "The Infinite River: Async Generator Iterator in JavaScript"
description: "Master the Gang of Four Iterator pattern in asynchronous JavaScript using async function* and for-await-of—streaming paginated API pages and WebSocket feeds with backpressure in constant memory."
type: "javascript"
gofPattern: "Iterator Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Chronomancy // The Infinite Event River"
formula: |
  async function* paginateApi(endpoint, pageSize = 50) {
    let cursor = null;
    do {
      const url = cursor ? `${endpoint}?cursor=${cursor}` : endpoint;
      const res = await fetch(url);
      const { items, nextCursor } = await res.json();
      for (const item of items) yield item;
      cursor = nextCursor;
    } while (cursor);
  }

  // Client iteration with natural backpressure:
  for await (const record of paginateApi("https://api.domain/stream")) {
    await processRecord(record);
  }
tags: ["javascript", "nodejs", "async-iterator", "generators", "streaming", "pagination", "gof-patterns", "chronomancy"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Iterator

In 1994, the Gang of Four defined the **Iterator Pattern**:
> *"Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation."*
> — Design Patterns, p. 257

In web development and backend Node.js services, fetching large datasets from third-party APIs (GitHub issues, Stripe events, AWS S3 buckets) is typically split across paginated endpoints.

Naive implementations fetch all pages into a gigantic array before returning:
```javascript
// ⚠️ THE MEMORY-EXHAUSTION ARRAY ANTI-PATTERN
async function fetchAllEvents() {
  const all = [];
  let page = 1;
  while (true) {
    const res = await fetch(`/events?page=${page++}`);
    const data = await res.json();
    if (!data.length) break;
    all.push(...data); // Consumes hundreds of megabytes in Node heap!
  }
  return all;
}
```
If the dataset contains 100,000 items, the Node process spikes in memory, experiences heavy V8 garbage collection pauses, and delays returning any results to the user until the final page finishes downloading.

Using **Async Generators** (`async function*`) and **Async Iteration** (`for await...of`), the GoF Iterator pattern handles pagination lazily. The caller pulls items one at a time; new network requests are triggered **only when the consumer requests more elements**, providing natural backpressure.

---

## The Complete JavaScript Script

Save this as `async_river.mjs` and run with `node`:

```javascript
/**
 * PATTERN: Iterator Pattern via Async Generators (Gang of Four Behavioral)
 * ARCANUM: Chronomancy // The Infinite Event River
 * DESCRIPTION: Asynchronous paginated stream iteration with natural backpressure.
 */

// -----------------------------------------------------------------------------
// 1. MOCK PAGINATED API SERVICE (SIMULATING REMOTE ENDPOINT)
// -----------------------------------------------------------------------------
async function mockFetchApiPage(cursor = 0, pageSize = 3) {
  // Simulate network roundtrip latency
  await new Promise((r) => setTimeout(r, 60));

  const totalItems = 10;
  if (cursor >= totalItems) {
    return { items: [], nextCursor: null };
  }

  const items = [];
  const limit = Math.min(cursor + pageSize, totalItems);
  for (let i = cursor; i < limit; i++) {
    items.push({
      id: `EVENT-${1000 + i}`,
      timestamp: new Date(Date.now() - (totalItems - i) * 60000).toISOString(),
      payload: `Aetheric Resonance Reading #${i}`,
    });
  }

  const nextCursor = limit < totalItems ? limit : null;
  return { items, nextCursor };
}

// -----------------------------------------------------------------------------
// 2. THE ASYNC GENERATOR ITERATOR (THE RIVER)
// Yields individual records, requesting subsequent pages only when consumed.
// -----------------------------------------------------------------------------
export async function* paginateRemoteAether(pageSize = 3) {
  let cursor = 0;
  let pageNumber = 1;

  while (cursor !== null) {
    console.log(`\n  🌊 [RIVER: NETWORK PULL] Fetching Page #${pageNumber} (Cursor: ${cursor})...`);
    const { items, nextCursor } = await mockFetchApiPage(cursor, pageSize);

    for (const item of items) {
      // Yield each element lazily to the consumer
      yield item;
    }

    cursor = nextCursor;
    pageNumber++;
  }

  console.log(`\n  ✨ [RIVER: DEPLETED] All pages traversed gracefully.`);
}

// -----------------------------------------------------------------------------
// 3. CONSUMER DEMONSTRATION WITH STREAM TRANSFORMERS
// -----------------------------------------------------------------------------
async function runRiverDemonstration() {
  console.log("==========================================================");
  console.log("[CHRONOMANCY] Commencing Infinite Event River Stream...");
  console.log("==========================================================");

  let processedCount = 0;

  // Consume with for-await-of loop
  for await (const event of paginateRemoteAether(3)) {
    processedCount++;
    console.log(`    ▶ Consumer Processed: [${event.id}] - ${event.payload}`);

    // Simulate downstream processing delay
    await new Promise((r) => setTimeout(r, 20));

    // Demonstrate Early Exit / Cancellation:
    // If the consumer breaks early, no further pages are downloaded!
    if (processedCount >= 5) {
      console.log(`\n[EARLY BREAK] Consumer requirements satisfied. Halting stream.`);
      break;
    }
  }

  console.log("==========================================================");
  console.log(`[COMPLETED] Stream terminated without buffering unnecessary pages.`);
  console.log("==========================================================");
}

runRiverDemonstration();
```

---

## Memory & Pull-Stream Mechanics

```
Consumer Loop: for await (const item of river)
                      │
                      │ 1. Request item
                      ▼
┌────────────────────────────────────────────────────────┐
│ Async Generator Iterator (River)                       │
│                                                        │
│ Is internal page buffer empty?                         │
│  ├── YES ──▶ Await network fetch for Page N            │
│  └── NO  ──▶ Yield next item from memory               │
└─────────────────────┬──────────────────────────────────┘
                      │
                      │ 2. Item delivered
                      ▼
         [Consumer processes item]
```
