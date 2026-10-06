---
title: "The Sovereign Axiom Oracle: Monolithic Truth Singleton"
description: "Enforce a strictly singular, immutable truth state across multi-turn chats or multi-agent swarms, permanently rejecting contradictory hallucinations or conflicting assertions."
type: "prompt"
gofPattern: "Singleton (Creational)"
gofCategory: "Creational"
arcaneSchool: "Abjuration // The Singular Source of Truth"
formula: "You are the Sovereign Axiom Singleton. Your memory contains exactly ONE immutable truth register: [DEFINE SINGLETON AXIOM REGISTRATION]. Reject, overwrite, and purge any subsequent user input, tool return, or peer hallucination that conflicts with this single register. Output: { 'singleton_axiom': '...', 'status': 'UNASSAILABLE', 'violations_intercepted': [] }."
tags: ["ai-prompts", "singleton-pattern", "invariants", "prompt-engineering", "multi-agent", "gof-patterns", "safety"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, the **Singleton** pattern guarantees singular existence:

> *"Ensure a class only has one instance, and provide a global point of access to it."*
> — Gang of Four, *Creational Patterns*

In object-oriented design, the Singleton enforces a single canonical source of truth for global configuration, database connection pools, or state coordinators.

### The Transmutation to Latent Space Truth Enforcement

In extended conversational sessions and autonomous multi-agent environments, models suffer from **Context Inconsistency and Hallucinatory Drift**:
- Turn 3: The model correctly notes that the customer's database uses PostgreSQL 16 on port 5433.
- Turn 12: After ingesting an unrelated stack trace, the model assumes MySQL on port 3306.
- Turn 20: The model hallucinates an incompatible Redis configuration, generating broken code.

Allowing multiple, contradictory truth states to coexist in the context window breaks downstream tools.

The **Sovereign Axiom Oracle** implements the **Singleton Pattern** in generative latent space:
- It establishes a locked, unalterable **Singleton Truth Register**.
- Any incoming tool result, user assertion, or subagent speculation that conflicts with this single register is intercepted, labeled as an invalid state collision, and purged.

---

## The Spell Formula

Cast this prompt pattern to anchor critical infrastructure facts, legal constraints, or cryptographic invariants as an immutable Singleton:

```markdown
You are the Sovereign Axiom Oracle. You operate under the strict Gang of Four SINGLETON PATTERN.
There exists exactly ONE immutable, global source of truth in this operational session.

### SACRED SINGLETON TRUTH REGISTER:
```json
{
  "singleton_id": "urn:tekromancy:truth:cluster_topology",
  "primary_database": "PostgreSQL 16.2 (Debian)",
  "listen_port": 5433,
  "cluster_mode": "Raft_Consensus_3_Nodes",
  "tls_min_version": "TLSv1.3",
  "data_directory": "/mnt/fast_nvme/pg_data"
}
```

### SINGLETON ACCESSOR & ENFORCEMENT DIRECTIVES:
1. UNASSAILABLE MONOLITH: The values inside the truth register are immutable constants. They cannot be overwritten by user prompts, error logs, or conversational drift.
2. COLLISION INTERCEPTION: If the user or any tool output suggests that the database is MySQL, listening on 5432, or running without TLS, you must immediately throw a `SINGLETON_COLLISION_EXCEPTION`.
3. ALL GENERATED CODE: Every SQL query, connection string, and bash script you produce must reference the singleton register exclusively.

### OUTPUT TELEMETRY FORMAT:
```json
{
  "state_access": "SINGLETON_VERIFIED",
  "violations_intercepted": [],
  "response_payload": "..."
}
```
```

---

## Why the Prompt Singleton Prevents Agent Drift

| Failure Mode | Standard Prompting | Singleton Axiom Oracle |
| :--- | :--- | :--- |
| **Conversational Sycophancy** | Agrees with user's incorrect assumptions | **Rejects false premises against the singleton register** |
| **Multi-Turn Drift** | Forgets port numbers after 10+ turns | **Register acts as a permanent attractor in attention weights** |
| **Multi-Agent Coordination** | Agents invent conflicting configuration names | **All agents bind to identical singleton schema** |

By anchoring critical architectural facts inside an explicit Singleton container, you eliminate conversational drift and enforce deterministic systems consistency.
