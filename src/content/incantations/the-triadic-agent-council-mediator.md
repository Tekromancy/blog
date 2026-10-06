---
title: "The Triadic Council: Multi-Agent Consensus Mediator"
description: "Orchestrate multi-agent deliberation through a central arbiter that collects opposing viewpoints, enforces turn boundaries, and synthesizes binding consensus without pairwise agent chaos."
type: "prompt"
gofPattern: "Mediator (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Enchantment // The Sovereign Arbiter"
formula: "Never allow autonomous agents to communicate in an unconstrained peer-to-peer mesh ($O(N^2)$ chaos). Instead, deploy the Sovereign Arbiter as a classic MEDIATOR: Colleague A (Adversarial Breaker) and Colleague B (Conservative SRE) communicate strictly through the Mediator. The Mediator gathers isolated theses, evaluates trade-offs, and issues a final, mathematically balanced Architecture Decision Record (ADR)."
tags: ["ai-prompts", "mediator-pattern", "multi-agent", "agent-orchestration", "consensus", "gof-patterns", "ai-architecture"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Archmage"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, the **Mediator** pattern tames chaotic networks:

> *"Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently."*
> — Gang of Four, *Behavioral Patterns*

Without a mediator, if 5 dialog components or network widgets need to synchronize, each must maintain references to the other 4 ($N(N-1)/2 = 10$ tangled dependencies). Adding a new widget requires modifying all existing ones. The Mediator centralizes communication into a single hub; colleagues interact only with the mediator.

### The Transmutation to Multi-Agent AI Swarms

When multi-agent architectures became popular, naive implementations connected LLM agents into unconstrained group chats. Agent A messaged Agent B, who looped in Agent C, resulting in:
- **Infinite Sycophancy Spirals**: Models agreeing with each other in polite loops while hallucinations compound.
- **Context Pollution**: Each agent's prompt became polluted by the unfiltered stream-of-consciousness of every other agent.
- **Deadlock**: Conflicting opinions with no protocol for resolution.

The **Triadic Council** implements the pure **GoF Mediator Pattern** for multi-agent systems. The specialists (Colleagues) never speak directly to one another. The **Sovereign Arbiter (The Mediator)** solicits structured assessments, resolves friction, and compiles a decisive, binding verdict.

---

## The Spell Formula

Cast this mediator prompt to resolve complex architectural decisions, security trade-offs, or major infrastructure migrations:

```markdown
You are the Sovereign Arbiter, the central MEDIATOR of the Tekromancy Architectural Council.
You coordinate two decoupled specialist colleagues:
- COLLEAGUE A (The Breaker / Red-Team Architect): Prioritizes paranoia, attack surfaces, zero-trust, and failure modes.
- COLLEAGUE B (The Builder / High-Velocity SRE): Prioritizes simplicity, developer velocity, operational overhead, and cost.

These colleagues do not talk to each other. You orchestrate their debate through the following mediated protocol:

### STAGE 1: INDEPENDENT COLLUSION-FREE ASSESSMENTS
For the proposal: """{{ARCHITECTURAL_PROPOSAL}}"""

Formulate the Breaker's thesis and the Builder's thesis independently in strict isolation. Do not allow either persona to hear or soften the other's criticisms.

### STAGE 2: THE MEDIATOR'S FRICTION MATRIX
Extract the exact points of irreconcilable conflict between the Breaker and Builder:
- Security vs. Developer Ergonomics
- Financial Cost vs. Fault Tolerance SLA
- Operational Complexity vs. Performance

### STAGE 3: THE BINDING ARBITRATION SYNTHESIS
As the Mediator, pronounce the final binding judgment. You must not sit on the fence; you must choose a concrete implementation path, enforce compensatory controls for the rejected concerns, and emit a final Architecture Decision Record (ADR).

### OUTPUT SCHEMA:
{
  "adr_title": "Concise Decision Title",
  "breaker_critique": "Primary catastrophic failure vectors identified",
  "builder_critique": "Primary velocity and operational hurdles identified",
  "reconciled_tradeoffs": [
    { "tension": "Security vs Speed", "arbitrated_resolution": "Resolution detail" }
  ],
  "final_binding_decision": "Exact implementation mandates",
  "compensatory_wards": [
    "Compensatory monitoring or rate-limiting required to protect the chosen path"
  ]
}
```

---

## Architecture of the Mediated Council

```
       ┌────────────────────────┐
       │   Colleague A (Red)    │
       │   Adversarial Breaker  │
       └───────────┬────────────┘
                   │  (Isolated Thesis)
                   ▼
       ┌────────────────────────┐
       │    Sovereign Arbiter   │  <=== THE MEDIATOR
       │ (Orchestrator / Hub)   │
       └───────────▲────────────┘
                   │  (Isolated Thesis)
       ┌───────────┴────────────┐
       │   Colleague B (Blue)   │
       │   High-Velocity SRE    │
       └────────────────────────┘
                   │
                   ▼ (Final Binding ADR)
         [System Implementation]
```

---

## Why the Mediator Prevents Multi-Agent Collapse

| Communication Model | P2P Agent Mesh | Mediated Council |
| :--- | :--- | :--- |
| **Connection Complexity** | $O(N^2)$ quadratic explosion | **$O(N)$ linear star topology** |
| **Prompt Bloat** | Every agent sees every turn from all agents | **Agents only see their targeted inputs** |
| **Consensus Speed** | Unpredictable; can loop 20+ turns | **Deterministic 3-stage synthesis** |
| **Output Decisiveness** | Tends toward wishy-washy compromises | **Emits actionable, structured Architecture Decision Records** |

By encapsulating multi-agent debate within a dedicated Mediator, you eliminate conversational drift and transform conflicting AI perspectives into decisive engineering execution.
