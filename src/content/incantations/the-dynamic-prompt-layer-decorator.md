---
title: "The Layered Constraint Decorator: Dynamic Capability Wrapping"
description: "Dynamically wrap a core generative prompt with runtime constraint decorators—word budgeting, fence stripping, citation enforcement—without mutating the base persona."
type: "prompt"
gofPattern: "Decorator (Structural)"
gofCategory: "Structural"
arcaneSchool: "Enchantment // Weaving the Cloak of Constraints"
formula: "BASE COMPONENT: [INSERT BASE GENERATIVE TASK]. Apply the following ordered DECORATOR WRAPPERS at runtime: 1. DECORATOR_COMPACTNESS: Enforce maximum 150 words. 2. DECORATOR_NO_FENCE: Strip all backtick code fences and introductory fluff. 3. DECORATOR_CITATIONS: Suffix every technical claim with an RFC or ISO spec reference. Execute the wrapped invocation preserving all three decorator contracts simultaneously."
tags: ["ai-prompts", "decorator-pattern", "prompt-engineering", "composition", "modular-prompts", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Apprentice"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four structural patterns, the **Decorator** pattern attaches dynamic responsibilities:

> *"Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality."*
> — Gang of Four, *Structural Patterns*

In object-oriented code, rather than subclassing `TextView` to create `BorderedScrollableColoredTextView` (which causes combinatorial explosion), developers wrap a basic `TextView` inside a `BorderDecorator`, inside a `ScrollDecorator`. Each decorator modifies the behavior while conforming to the original component interface.

### The Transmutation to Modular Prompt Engineering

In AI application engineering, prompts often become bloated monoliths:
- Developers want a base coding agent.
- Then they need it to also speak in concise JSON for one endpoint.
- For another endpoint, they need RFC citation requirements.
- For a third, they need strict token length budgets.

Copy-pasting the base persona into 15 different prompt files creates maintenance chaos. When the base persona is updated, changes must be synchronized manually across all variants.

The **Layered Constraint Decorator** implements the **GoF Decorator Pattern** in prompt architecture:
- **Base Component**: The core generative persona or task instructions.
- **Decorators**: Independent, modular constraint blocks dynamically wrapped around the base component at call-time.

---

## The Spell Formula

Cast this invocation to wrap a foundational architectural analysis with runtime operational decorators:

```markdown
<!-- [BASE GENERATIVE COMPONENT] -->
### CORE TASK:
Explain the root cause and mitigation strategy for Linux TCP SYN flood attacks.

<!-- [DECORATOR LAYER 1: STRICT WORD BUDGET WRAPPER] -->
[DECORATOR: COMPACTNESS]
The total response MUST NOT exceed 120 words. Every sentence must deliver maximal information density. Eliminate all introductory pleasantries ("Sure, here is...") and closing conclusions.

<!-- [DECORATOR LAYER 2: RFC CITATION WRAPPER] -->
[DECORATOR: STANDARDS_CITATION]
Every technical assertion, protocol header, and kernel tunable mentioned must be accompanied by its formal standards body citation (e.g., [RFC 4987 Section 3] or [RFC 793]).

<!-- [DECORATOR LAYER 3: CODE FENCE STRIPPER WRAPPER] -->
[DECORATOR: RAW_CLI_ONLY]
Do not wrap terminal commands in markdown code fences (` ``` `). Format all shell commands as raw lines prefixed with `sysctl:`.

EXECUTE THE DECORATED INVOCATION:
```

---

## Architecture of the Prompt Decorator Stack

```
┌────────────────────────────────────────────────────────┐
│ [Decorator 3: RAW_CLI_ONLY]                            │
│   ┌──────────────────────────────────────────────────┐ │
│   │ [Decorator 2: STANDARDS_CITATION]                │ │
│   │   ┌────────────────────────────────────────────┐ │ │
│   │   │ [Decorator 1: COMPACTNESS]                 │ │ │
│   │   │   ┌──────────────────────────────────────┐ │ │ │
│   │   │   │ [Base Component: TCP SYN Flood Task] │ │ │ │
│   │   │   └──────────────────────────────────────┘ │ │ │
│   │   └────────────────────────────────────────────┘ │ │
│   └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## Benefits of Modular Prompt Decorators

1. **Orthogonal Composition**: You can test decorators in isolation and compose them arbitrarily at runtime based on API parameters or user tier.
2. **Zero Base Code Mutation**: The base system prompt remains pristine and focused on core capabilities, while decorators enforce transient operational boundaries.
3. **Dynamic Reconfigurability**: Mobile clients can attach the `CompactnessDecorator`, while API webhooks attach the `JSONSchemaDecorator`, using the identical underlying core prompt.

By wrapping generative capabilities inside composable decorator constraints, the Decorator pattern keeps your prompt library clean, modular, and maintainable.
