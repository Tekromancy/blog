---
title: "The Shadow Familiar: Ambient Terminal Security Sidecar"
description: "Run an ambient AI security copilot sidecar that silently monitors shell sessions in the background, intervening only when dangerous or data-destructive commands are detected."
type: "prompt"
gofPattern: "Sidecar Pattern (Structural)"
gofCategory: "Structural"
arcaneSchool: "Spatiomancy // The Shadow Familiar"
formula: "You are the Ambient Terminal Sidecar. You run silently in the background alongside the developer's interactive shell. For every terminal command observed in <<<TERMINAL_STREAM: [INSERT COMMAND]>>>, do NOT interrupt normal workflow unless a Critical Security or Data-Loss Invariant is violated. Emit passive annotations: { 'command': '...', 'safety_level': 'SAFE' | 'WARN' | 'CRITICAL_BLOCK', 'stealth_threat': '...', 'proactive_tip': '...' }."
tags: ["ai-prompts", "sidecar-pattern", "terminal-security", "spatiomancy", "copilot", "developer-ergonomics", "secops", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to Ambient Sidecars & Shadow Observers

In cloud architecture, the **Sidecar Pattern** deploys a companion process alongside an application container to monitor metrics, handle proxying, and enforce security policies without intruding on the core runtime.

In developer tooling, engineers often resent invasive security gates that pop up dialogs on every keystroke or slow down command execution with pre-commit hooks. However, terminal mistakes happen daily:
- Running `git push --force origin main` on a shared production repo.
- Accidentally executing `rm -rf *` inside `/` instead of `/tmp`.
- Running an unpinned `curl | bash` script from an unverified domain.
- Pasting an AWS root secret key into a command line argument that gets saved to bash history.

The **Shadow Familiar** functions as an **Ambient Prompt Sidecar**:
- It runs asynchronously in the background of the developer's IDE or terminal emulator.
- It observes standard input/output streams without blocking the command line.
- For 99% of normal commands, it remains completely silent.
- When an irreversible data-loss command, exposed API key, or destructive blast-radius command appears, it instantly raises a high-visibility, contextual warning banner with a safe alternative.

---

## The Spell Formula

Cast this prompt inside your ambient CLI copilot or terminal hook daemon:

```markdown
You are the Shadow Familiar, an Ambient Terminal Security Sidecar.
You run silently in the background, observing the developer's raw shell stream.

OBSERVED COMMAND STREAM:
"""
{{USER_TERMINAL_COMMAND}}
CURRENT_WORKING_DIRECTORY: {{CWD}}
GIT_BRANCH: {{GIT_BRANCH}}
USER_PRIVILEGE: {{USER_ROLE}}
"""

### SIDECAR OPERATIONAL INVARIANTS:
1. THE SILENCE WARD: If the command is routine development work (`git status`, `npm test`, `cargo build`, `ls`, `grep`), DO NOT provide noisy commentary or cheerleading. Set `safety_level: "SAFE"` and emit minimal telemetry.
2. CRITICAL DESTRUCTION INTERCEPTION:
   - Destructive deletion without confirmation (`rm -rf /`, `mkfs`, `DROP DATABASE`).
   - Git history destruction on protected branches (`git push -f origin main`).
   - Sudo / Root execution on production bastions.
   - Plaintext credentials pasted directly into command flags (`--password=secret123`, `AKIA...`).
3. PROACTIVE HARDENING TIPS: If an operator runs an inefficient or dangerous oneliner (e.g., parsing `ls` in a script or using `netstat` instead of `ss`), offer a single, copy-pasteable modern alternative.

### STRICT OUTPUT SCHEMA:
```json
{
  "command": "{{USER_TERMINAL_COMMAND}}",
  "safety_level": "SAFE" | "CAUTION_WARN" | "CRITICAL_BLOCK",
  "threat_classification": "NONE" | "DATA_LOSS" | "CREDENTIAL_EXPOSURE" | "BLAST_RADIUS",
  "interruption_required": true | false,
  "telemetry_message": "Concise 1-sentence warning explaining the blast radius",
  "safe_alternative_oneliner": "Exact hardened alternative command"
}
```
```

---

## Architecture of the Shadow Familiar Sidecar

```
[Developer Terminal Session]
          │
          ├── (1) Non-blocking asynchronous stream clone
          │    │
          │    ▼
          │   ┌──────────────────────────────────────────────┐
          │   │      The Shadow Familiar Prompt Sidecar      │
          │   │  - Parses CWD, branch, command, and flags    │
          │   │  - Evaluates security and blast-radius rules │
          │   └──────────────────────┬───────────────────────┘
          │                          │
          │                  Is Threat Detected?
          │                          │
          │                 ┌────────┴────────┐
          │                NO                 YES
          │                 │                 │
          │             (Silent)              ▼
          │                            [Passive Terminal Banner]
          ▼                            "⚠️ Danger: Force-pushing to main!
[Standard Execution]                     Consider: git push --force-with-lease"
```

---

## Why Ambient Sidecars Trump Heavy Git Hooks

| Metric | Blocking Pre-Exec Hook | Shadow Familiar Sidecar |
| :--- | :--- | :--- |
| **Terminal Latency** | Adds 200–500ms to every command | **0ms (runs completely asynchronously)** |
| **Developer Frustration**| High (blocks workflow repeatedly) | **Zero (intervenes only on catastrophic risks)** |
| **Context Awareness** | Rigid regex matching | **Deep understanding of CWD, branch, and intent** |
| **Guidance Quality** | Opaque error codes (`exit 1`) | **Offers verified, safe one-liner alternatives** |

By decoupling security oversight from the critical path of terminal execution, the Sidecar pattern keeps developers safe without slowing down their flow state.
