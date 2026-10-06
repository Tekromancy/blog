---
title: "The Chunked Knowledge Cursor: Streaming Document Iterator"
description: "Sequentially paginate through massive multi-megabyte log dumps or enterprise corpora in bounded memory chunks, maintaining cursor state without context overflow."
type: "prompt"
gofPattern: "Iterator (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Divination // The Unbroken Sequence Cursor"
formula: "You are a Streaming Corpus Iterator. You do not ingest whole documents at once. You maintain cursor state: { 'cursor_index': N, 'chunk_size': 500_WORDS, 'has_next': Boolean }. For each step, yield: 1. CURRENT_CHUNK_SUMMARY, 2. EXTRACTED_ENTITIES, 3. NEXT_CURSOR_POINTER. Iterate over [INSERT DATASET BATCH] until has_next is false."
tags: ["ai-prompts", "iterator-pattern", "context-window", "streaming", "cursor", "rag", "gof-patterns", "data-pipelines"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Apprentice"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four behavioral patterns, the **Iterator** pattern abstracts sequential access:

> *"Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation."*
> — Gang of Four, *Behavioral Patterns*

In classical software design, an Iterator exposes `.hasNext()` and `.next()`, allowing clients to walk massive collections element-by-element without needing the entire dataset resident in heap memory simultaneously.

### The Transmutation to Chunked AI Context Ingestion

A common pitfall in generative AI application architecture is the **Monolithic Dump Anti-Pattern**:
- Developers attempt to dump a 200-page operational manual or a 50,000-line incident log into a single prompt.
- Even if the context window accommodates the tokens, the model suffers from severe "Lost in the Middle" attention degradation, overlooking critical anomalies buried deep in the middle pages.
- Latency and cost explode quadratically.

The **Chunked Knowledge Cursor** brings the **Iterator Pattern** to generative pipelines:
- The host application feeds the LLM discrete, bounded chunks (e.g., 500 words or 50 log records).
- The prompt acts as an **Iterator Cursor**, maintaining accumulated state, extracting entities, updating a rolling summary, and declaring whether iteration should advance (`has_next: true`) or terminate (`has_next: false`).

---

## The Spell Formula

Cast this iterator prompt to sequentially process massive document batches or streaming log buffers:

```markdown
You are the Streaming Knowledge Iterator, operating under the Gang of Four ITERATOR PATTERN.
You do not process the full corpus at once; you iterate over discrete chunks while maintaining cursor continuity.

### PREVIOUS ITERATOR STATE:
```json
{
  "cursor_position": 4,
  "total_items_processed": 200,
  "accumulated_threat_indicators": ["IP_198.51.100.12", "PORT_SCAN_TCP_443"],
  "rolling_summary": "High volume of syn probes targeting edge load balancer."
}
```

### CURRENT CHUNK TO ITERATE (WINDOW 5):
"""
{{CHUNK_RAW_CONTENT}}
"""

### ITERATOR DIRECTIVES:
1. PROCESS CURRENT ELEMENT: Extract new facts, anomalies, or entities exclusive to this chunk.
2. MUTATE ACCUMULATED STATE: Merge newly discovered facts into the `accumulated_threat_indicators` without creating duplicates.
3. COMPUTE NEXT CURSOR: Increment `cursor_position`.
4. EMIT ITERATOR STATUS:
   - If the chunk contains an EOF marker or has fewer items than batch size, set `has_next: false`.
   - Otherwise, set `has_next: true`.

### STRICT OUTPUT SCHEMA:
```json
{
  "iterator_cursor": {
    "current_position": 5,
    "has_next": true,
    "items_in_chunk": 50
  },
  "chunk_discoveries": [
    "Discovered CVE-2024-38077 signature in chunk 5"
  ],
  "updated_accumulated_state": {
    "rolling_summary": "Expanded summary including chunk 5 telemetry...",
    "accumulated_threat_indicators": ["..."]
  }
}
```
```

---

## The Streaming Iterator Loop

```
           ┌──────────────────────────────────────┐
           │      External Document Stream        │
           └──────────────────┬───────────────────┘
                              │
                    Fetch next chunk (500 tokens)
                              │
                              ▼
           ┌──────────────────────────────────────┐
           │     Chunked Knowledge Cursor LLM     │  <== ITERATOR
           │   1. Analyze current window          │
           │   2. Fold into rolling accumulator   │
           │   3. Yield next cursor position      │
           └──────────────────┬───────────────────┘
                              │
                    has_next == true ?
                              │
                    ┌─────────┴─────────┐
                   YES                  NO
                    │                   │
         [Loop to next chunk]      [Emit Final Unified Report]
```

---

## Why Streaming Iterators Beat Monolithic Prompts

1. **Immunity to Context Window Limits**: A streaming iterator can process infinite terabytes of data over thousands of turns without breaching token ceilings.
2. **Attention Precision**: The model focuses 100% of its attention tensor capacity on a small 500-token window, catching subtle edge-cases that are lost in 100k-token monoliths.
3. **Real-Time Progress Streaming**: Downstream UIs can stream progress bars and live discovery feeds as each chunk is yielded.

By applying the Iterator pattern to context window management, you transform unmanageable data avalanches into a disciplined, sequential stream of actionable insight.
