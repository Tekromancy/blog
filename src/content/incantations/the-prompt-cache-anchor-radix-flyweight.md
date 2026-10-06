---
title: "The Prompt Cache Anchor: Radix KV-Cache Flyweight"
description: "Share massive common context state across fine-grained generative queries by anchoring immutable prefix tokens into GPU KV-cache memory."
type: "prompt"
gofPattern: "Flyweight (Structural)"
gofCategory: "Structural"
arcaneSchool: "Enchantment // Sharing the Immutable Memory Sigil"
formula: "Structure the prompt into two distinct thermodynamic phases: 1. INTRINSIC FLYWEIGHT ROOT (>= 2048 tokens of immutable API schemas, system rules, and architectural invariants marked with an explicit cache breakpoint), and 2. EXTRINSIC EPHEMERAL STATE (lightweight caller-specific query variables). Never mutate a single character before the cache anchor, preserving 90% latency reduction and sub-cent inference."
tags: ["ai-prompts", "prompt-caching", "flyweight-pattern", "gof-patterns", "vllm", "radix-attention", "llm-architecture"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Archmage"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four architectural canon, the **Flyweight** pattern prevents memory exhaustion through shared intrinsic state:

> *"Use sharing to support large numbers of fine-grained objects efficiently."*
> — Gang of Four, *Structural Patterns*

When a system instantiates thousands or millions of small objects (such as individual character glyphs in a word processor or particles in a physics engine), storing duplicate state in every instance collapses heap memory. The Flyweight splits state into two halves:
1. **Intrinsic State**: Immutable, shared context stored once in a shared pool.
2. **Extrinsic State**: Ephemeral, variable data passed dynamically by the client at runtime.

### The Transmutation to Generative Attention & KV-Cache

In modern LLM systems, running multi-agent workflows, code-review bots, or customer support swarms over large contexts (10,000 to 100,000 tokens of API schemas, internal documentation, and tool definitions) incurs prohibitive costs:
- Re-computing multi-head attention weights for 50,000 tokens on every single query burns hundreds of GPU compute cycles.
- Time-to-First-Token (TTFT) degrades to 5–15 seconds per call.

Frontier inference engines (Anthropic Prompt Caching, Google Gemini Context Caching, and vLLM RadixAttention) solve this through **KV-Cache Sharing**. The GPU pre-computes the Key and Value matrices for the prompt prefix once, holding it in High-Bandwidth Memory (HBM) as an immutable tree.

The **Prompt Cache Anchor** implements the **Flyweight Pattern** in generative latent space:
- **Intrinsic Flyweight State**: The static system instructions, full enterprise schema, and reference exemplars anchored prior to the cache boundary.
- **Extrinsic State**: The transient user question, session ID, or dynamic input injected strictly at the tail.

---

## The Spell Formula

Structure your agent prompts using the Flyweight separation protocol. In SDK calls (Anthropic, Gemini, or vLLM), attach the cache control sigil directly to the intrinsic boundary:

```markdown
<!-- [INTRINSIC FLYWEIGHT: SHARED ACROSS ALL 10,000 AGENT SESSIONS] -->
# SOVEREIGN INFRASTRUCTURE ARCHITECTURE REFERENCE MANUAL
You are the Tekromancy Systems Sentinel. You operate with absolute awareness of the following 12 enterprise microservice specifications, OpenAPI schemas, and incident response runbooks:

[... INSERT 15,000 TOKENS OF ENTERPRISE SCHEMAS, DB DDLs, AND HARDENING RULES ...]

### INTRINSIC INVARIANTS:
1. All database modifications require an atomic transaction with idempotency keys.
2. Port 22 is permanently sealed; access requires bastions over wireguard.
3. Zero markdown preambles or corporate apologies. Emits strictly valid JSON.

<!-- # CACHE_ANCHOR_BOUNDARY_SIGIL -->
<!-- [EXTRINSIC STATE: CALLER DYNAMIC QUERY] -->
SESSION_ID: {{uuid}}
CALLER_IDENTITY: {{user_role}}
TIMESTAMP_UTC: {{iso_timestamp}}

TARGET INCIDENT TELEMETRY:
{{ephemeral_incident_log}}

EXECUTE TRIAGE REPORT FOR THE ABOVE INCIDENT.
```

In the Anthropic API, mark the intrinsic block with the cache header:
```json
{
  "type": "text",
  "text": "... [15k tokens of immutable architecture manual] ...",
  "cache_control": { "type": "ephemeral" }
}
```

---

## The Golden Law of Prefix Cache Preservation

The GPU Radix prefix tree indexes cached tokens strictly by **exact byte-level prefix hash**. 

> [!CAUTION] The Cache Invalidation Trap
> If you inject a dynamic variable (such as `Date: 2026-10-06 14:32:01` or `SessionID: 9a2b`) near the **top** of the system prompt, you mutate the prefix hash. The entire 20,000-token intrinsic flyweight is invalidated, forcing the GPU to recompute all attention tensors from scratch!

### Architectural Comparison

| Dimension | Naive Uncached Prompting | Prompt Cache Flyweight |
| :--- | :--- | :--- |
| **KV-Cache State** | Recomputed on every call ($N \times K$ tokens) | **Computed once; shared across $N$ instances** |
| **Time-to-First-Token** | 4,200 ms | **180 ms (95% speedup)** |
| **Inference Cost** | \$15.00 per 1,000 calls | **\$1.50 per 1,000 calls (90% discount)** |
| **GoF Pattern Alignment** | Ad-hoc duplicate state | **Strict Intrinsic / Extrinsic Separation** |

By anchoring immutable knowledge as shared intrinsic memory and treating user queries as lightweight extrinsic variables, the Flyweight pattern brings order and hyper-efficiency to frontier AI systems.
