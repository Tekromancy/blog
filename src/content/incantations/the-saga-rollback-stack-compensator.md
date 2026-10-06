---
title: "The Saga Rollback Stack: Compensating Transaction Stack"
description: "Maintain an explicit reverse execution stack of compensating actions to guarantee automated multi-step rollback upon script error using bash trap hooks."
type: "shell"
gofPattern: "Saga / Compensating Transaction (Architectural)"
gofCategory: "Architectural"
arcaneSchool: "Thaumaturgy // The Rewound Thread of Fate"
formula: "SAGA_STACK=(); saga_push() { SAGA_STACK+=(\"$*\"); }; saga_rollback() { echo \"[SAGA ROLLBACK ENGAGED] Reversing steps in LIFO order...\" >&2; for ((i=${#SAGA_STACK[@]}-1; i>=0; i--)); do eval \"${SAGA_STACK[i]}\"; done; }; trap saga_rollback ERR; saga_step1() { touch /tmp/step1.lock && saga_push \"rm -f /tmp/step1.lock\"; }; saga_step1"
tags: ["shell", "oneliners", "saga-pattern", "rollback", "transactions", "devops", "fault-tolerance", "sysadmin"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to Distributed Saga Patterns

Formulated by Hector Garcia-Molina and Kenneth Salem in 1987, the **Saga Pattern** manages long-lived transactions without locking distributed databases:

> *"A Saga is a sequence of local transactions where each transaction updates data within a single service. If a local transaction fails because it violates a business rule, the saga executes a series of compensating transactions that undo the changes that were made by the preceding local transactions."*
> — Chris Richardson, *Microservices Patterns*

In shell automation and infrastructure provisioning, operations are inherently distributed across disparate subsystems: creating cloud VPCs, provisioning DNS records, allocating databases, generating TLS certificates.

If Step 4 fails, a naive bash script crashes with exit code 1, leaving orphaned cloud assets and half-provisioned zombie databases on your bill.

The **Saga Rollback Stack** implements the Saga pattern using an in-memory **LIFO (Last-In, First-Out) Compensating Action Stack**:
- Every time a forward action succeeds, its exact inverse compensating undo command is pushed onto the stack.
- If any subsequent step fails, a `trap ... ERR` signal intercepts the exit, unwinding the thread of fate in reverse order to leave the system in a pristine zero-leak state.

---

## The Spell Formula

Cast this invocation to orchestrate multi-step infrastructure deployments with automatic compensating rollback:

```bash
#!/usr/bin/env bash
set -eE

# 1. Initialize the Compensating Transaction Stack
SAGA_STACK=()

saga_push() {
  SAGA_STACK+=("$*")
}

saga_rollback() {
  local exit_code=$?
  echo "[SAGA ROLLBACK ENGAGED] Error triggered on exit code $exit_code! Unwinding thread in LIFO order..." >&2
  for (( i=${#SAGA_STACK[@]}-1; i>=0; i-- )); do
    echo "  -> Executing Compensating Action: ${SAGA_STACK[i]}" >&2
    eval "${SAGA_STACK[i]}" || echo "    [WARN] Compensating action failed: ${SAGA_STACK[i]}" >&2
  done
  echo "[SAGA COMPLETE] Systems restored to clean baseline state." >&2
}

# Bind the Saga Compensator to any script failure
trap saga_rollback ERR

# 2. Forward Transaction Execution
echo "[STEP 1] Allocating temporary migration workspace..."
mkdir -p /tmp/tek_migration && saga_push "rm -rf /tmp/tek_migration"

echo "[STEP 2] Creating database snapshot..."
touch /tmp/db_snapshot.bin && saga_push "rm -f /tmp/db_snapshot.bin"

echo "[STEP 3] Opening network firewall hole..."
# (Simulated firewall rule creation)
touch /tmp/firewall_port_8443.rule && saga_push "rm -f /tmp/firewall_port_8443.rule"

# Simulating a catastrophic failure in Step 4:
echo "[STEP 4] Deploying application binary..."
false # <-- Deliberate failure triggers trap saga_rollback immediately
```

---

## Anatomy of the Rewound Thread

```
[Forward Execution]                         [Compensating Rollback (LIFO)]
 Step 1: Create Workspace   ────┐             ┌── Undo 1: Remove Workspace
 Step 2: Snapshot DB        ────┼─────────────┼── Undo 2: Purge Snapshot
 Step 3: Open Firewall      ────┤             └── Undo 3: Close Firewall
 Step 4: Deploy Binary [FAIL] ──┘ (Triggers Trap)
```

1. **`set -eE`**: `-e` exits immediately upon command failure; `-E` ensures that the `ERR` trap is inherited by shell functions, command substitutions, and subshells.
2. **`saga_push "$*"`**: Captures the exact shell expression needed to reverse the step (e.g., `aws ec2 delete-volume`, `terraform destroy`, `rm -rf`).
3. **LIFO Stack Iteration**: Iterating from `${#SAGA_STACK[@]}-1` down to `0` guarantees dependencies are torn down in the exact reverse order of creation.

---

## Why Saga Stacks Beat Manual Cleanup

| Strategy | Script Complexity | Orphan Asset Leakage | Maintainability |
| :--- | :--- | :--- | :--- |
| **No Rollback (Exit on error)** | Low | Severe (leaves orphan VMs & disks) | Terrible |
| **Manual `if / else` cleanup** | Astronomical (exponential nesting) | Moderate (easy to miss branches) | Fragile |
| **Saga Compensator Stack** | **Minimal (one `saga_push` per step)** | **Zero (guaranteed LIFO unwind)** | **Clean & Declarative** |

By coupling every forward action with an immutable compensating undo, the Saga Rollback Stack brings database-grade transactional safety to complex shell workflows.
