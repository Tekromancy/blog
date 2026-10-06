---
title: "The Fractal Task Composite: Recursive Goal Decomposition"
description: "Treat atomic tool actions and complex multi-phase milestones uniformly using recursive tree decomposition, computing status and validation criteria hierarchically."
type: "prompt"
gofPattern: "Composite (Structural)"
gofCategory: "Structural"
arcaneSchool: "Divination // Unfolding the Fractal Task Tree"
formula: "Decompose the root mission [INSERT HIGH LEVEL MISSION] into a strict recursive Composite Object: Nodes may be either ATOMIC_LEAF (single tool call, duration <= 5 min) or COMPOSITE_BRANCH (contains child nodes). Implement the uniform interface: { 'id': String, 'type': 'LEAF'|'COMPOSITE', 'weight': Float, 'verify_contract': String, 'children': [ ... ] }. Evaluate total mission mass and compute uniform validation across both leaves and branches."
tags: ["ai-prompts", "composite-pattern", "planning", "agentic-ai", "task-decomposition", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, the **Composite** pattern creates part-whole tree hierarchies:

> *"Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly."*
> — Gang of Four, *Structural Patterns*

In software engineering, whether you inspect a single vector graphic line or an entire nested group of 5,000 shapes, the client calls `.render()` or `.getBounds()` without caring whether the target is an atomic leaf or a compound branch.

### The Transmutation to Autonomous AI Goal Planning

When autonomous AI agents receive high-level goals (e.g., *"Migrate legacy monolith from MySQL to PostgreSQL without downtime"*), naive prompts fail:
- They output a flat, unorganized checklist of 40 linear steps that quickly becomes overwhelming.
- They fail to isolate sub-dependencies, leading to circular execution blocks.
- They cannot calculate completion progress or verify intermediate milestones.

The **Fractal Task Composite** prompt structures agentic planning under the **Composite Pattern**:
- **Uniform Task Interface**: Every node in the planning tree—whether a high-level Epic, an intermediate Phase, or an atomic Bash command—implements the identical contract: `id`, `title`, `status`, `verify_contract()`, `children`.
- **Recursive Progress Aggregation**: The status of a branch composite is computed deterministically from the status of its children.

---

## The Spell Formula

Cast this prompt to decompose any massive engineering initiative into a deterministic Composite tree:

```markdown
You are the Fractal Task Architect, operating under the Gang of Four COMPOSITE PATTERN.
Your objective is to decompose the following high-level mission into a strictly validated, recursive Task Tree:

MISSION TO DECOMPOSE:
"""
{{HIGH_LEVEL_MISSION}}
"""

### THE UNIFORM COMPOSITE NODE CONTRACT:
Every node in the tree MUST adhere strictly to this schema:
```json
{
  "node_id": "TASK-1.2.1",
  "node_type": "COMPOSITE_BRANCH" | "ATOMIC_LEAF",
  "title": "Concise human-readable name",
  "estimated_blast_radius": "LOW" | "MEDIUM" | "HIGH",
  "verification_contract": "Exact terminal command or assertion that proves this node is satisfied",
  "children": [
    /* Array of child nodes conforming to this identical schema (empty for ATOMIC_LEAF) */
  ]
}
```

### RECURSIVE DECOMPOSITION RULES:
1. ATOMIC LEAF BOUNDARY: A node is an `ATOMIC_LEAF` if and only if it can be fulfilled by a single, focused tool execution taking less than 5 minutes.
2. UNIFORM EVALUATION: You must be able to evaluate `verification_contract` on a branch (which evaluates its children) or on a leaf directly using the identical verification interface.
3. NO ORPHAN LEAVES: Every task must roll up hierarchically to the root mission node.

### OUTPUT:
Emit the full JSON Composite Tree followed by a hierarchical ASCII visual map of the branch-and-leaf topology.
```

---

## The Recursive Tree Topology

```
[ROOT: Zero-Downtime Database Migration]  (Composite)
 ├── [PHASE 1: Dual-Write CDC Pipeline]   (Composite)
 │    ├── Deploy Debezium Kafka Connector  (Leaf)
 │    └── Verify Zero-Lag CDC Replication   (Leaf)
 ├── [PHASE 2: Shadow Read Verification]   (Composite)
 │    ├── Route 10% Read Traffic to Postgres (Leaf)
 │    └── Assert Zero Data Discrepancies    (Leaf)
 └── [PHASE 3: Cutover & Primary Promotion](Composite)
      ├── Promote Postgres to Primary Read/Write (Leaf)
      └── Decommission Legacy MySQL Engine      (Leaf)
```

---

## Why Composite Planning Outperforms Flat Checklists

| Metric | Flat Linear Checklist | Fractal Composite Tree |
| :--- | :--- | :--- |
| **Cognitive Load** | High; 50 items flatten all priorities | **Grouped into bounded, conquerable branches** |
| **Parallel Execution** | Difficult; dependencies are unclear | **Independent sibling branches can run concurrently** |
| **Progress Metrics** | Arbitrary percentages | **Calculated hierarchically from verified leaves** |
| **Verification Rigor** | Often checked off without proof | **Every leaf mandates an executable verification contract** |

By treating atomic terminal actions and compound architectural phases uniformly, the Composite pattern allows autonomous agents to navigate complex multi-day projects with structured clarity.
