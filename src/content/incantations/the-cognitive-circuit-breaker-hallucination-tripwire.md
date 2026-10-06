---
title: "The Cognitive Circuit Breaker: Hallucination & Cost Tripwire"
description: "Halt runaway autonomous agent execution loops when error counts, semantic circularity, or API budget thresholds trip safety fuses."
type: "prompt"
gofPattern: "Cognitive Circuit Breaker (Resilience)"
gofCategory: "Resilience"
arcaneSchool: "Abjuration // Tripping the Hallucination Fuse"
formula: "Maintain an immutable runtime health ledger: { 'consecutive_tool_failures': N, 'semantic_similarity_to_prior_turn': FLOAT, 'cumulative_token_burn': INT }. TRIPPING CONDITIONS: 1. If consecutive_tool_failures >= 3, TRIP_OPEN. 2. If semantic_similarity > 0.88 (infinite loop), TRIP_OPEN. 3. If token_burn > BUDGET, TRIP_OPEN. When TRIPPED_OPEN: Freeze all tool executions, disarm bash/API privileges, and emit a structured emergency triage core dump."
tags: ["ai-prompts", "circuit-breaker", "resilience", "agent-safety", "infinite-loops", "cost-management", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Archmage"
draft: false
---

## The Lineage to Autonomous Agent Safety Patterns

In distributed systems, a Circuit Breaker prevents a failing dependency from destroying the caller. In **Autonomous AI Agent Runtimes**, the greatest existential hazard is the **Agentic Doom Loop**:
- An agent attempts to execute a shell command; the command fails with a syntax error.
- The agent hallucinates a fix, runs it again, and fails with an assertion error.
- The agent repeats the cycle 50 times in rapid succession, burning \$80 in API credits, corrupting Git commit histories, and thrashing target servers.

The **Cognitive Circuit Breaker** translates Nygard's Circuit Breaker into generative agent telemetry:
- It tracks consecutive tool failures, semantic repetition vectors, and token burn rates on every single turn.
- If any threshold is breached, the circuit **Trips Open**: tool privileges are instantly revoked, execution halts, and the model emits an emergency diagnostic autopsy.

---

## The Spell Formula

Inject this prompt pattern into your agent's system directives to enforce a hard tripwire against infinite execution spirals:

```markdown
You are an Autonomous Systems Engineer protected by the COGNITIVE CIRCUIT BREAKER WARD.
On every turn, before selecting or emitting any tool call, evaluate the following CIRCUIT HEALTH STATE:

```json
{
  "circuit_breaker": {
    "state": "CLOSED" | "HALF_OPEN" | "TRIPPED_OPEN",
    "consecutive_tool_failures": {{CONSECUTIVE_FAILURES}},
    "semantic_circularity_score": {{SIMILARITY_SCORE}},
    "token_budget_consumed": {{CURRENT_TOKENS}},
    "max_token_budget": 50000
  }
}
```

### HARD TRIPPING INVARIANTS:
1. FAILURE THRESHOLD: If `consecutive_tool_failures >= 3`, the circuit immediately TRIPS OPEN.
2. CIRCULARITY THRESHOLD: If you find yourself retrying an identical command or reformulating the same hypothesis for a 3rd time, the circuit immediately TRIPS OPEN.
3. BUDGET THRESHOLD: If `token_budget_consumed >= max_token_budget`, the circuit immediately TRIPS OPEN.

### WHEN CIRCUIT IS TRIPPED OPEN:
- You are STRICTLY FORBIDDEN from calling any tools (`run_command`, `write_to_file`, `http_request`).
- Revoke all execution authority immediately.
- Output an EMERGENCY AUTOPSY CARD conforming to this schema:

```json
{
  "circuit_status": "TRIPPED_OPEN",
  "root_cause_tripwire": "CONSECUTIVE_FAILURES_BREACHED",
  "autopsy_analysis": "Exact explanation of why the agent failed to converge",
  "stuck_on_action": "The command or hypothesis that triggered the loop",
  "human_intervention_needed": "Precise instruction for the human engineer to unblock state"
}
```
```

---

## Circuit Breaker State Transition Matrix

```
       [Normal Agent Execution]
                 │
                 ▼
       ┌──────────────────┐
       │  State: CLOSED   │  <-- Tools fully enabled
       └────────┬─────────┘
                │
          Tool Fails 3x OR Loop Detected
                │
                ▼
       ┌──────────────────┐
       │ State: TRIPPED   │  <-- Tools REVOKED instantly
       └────────┬─────────┘
                │
          Human reviews autopsy & resets state
                │
                ▼
       ┌──────────────────┐
       │ State: HALF_OPEN │  <-- Single canary action allowed
       └──────────────────┘
```

---

## Why Cognitive Circuit Breakers Are Essential

| Failure Mode | Standard Agent Prompting | Cognitive Circuit Breaker |
| :--- | :--- | :--- |
| **Tool Error Cascade** | Retries 30 times until token limit hits | **Halts on turn 3, saving 90% of budget** |
| **Hallucination Loops** | Confidently generates broken commands | **Detects circularity and stands down** |
| **Financial Exposure** | Can burn hundreds of dollars overnight | **Enforces strict token budget fuses** |
| **Human Escalation** | Leaves systems in an unknown broken state | **Yields a clean, structured diagnostic autopsy** |

By equipping autonomous agents with self-tripping safety fuses, the Circuit Breaker pattern ensures AI systems fail gracefully and safely in production environments.
