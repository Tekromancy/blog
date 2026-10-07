---
title: "The Seven Veils: Chain of Responsibility Audit Pipeline in Bash"
description: "A robust CI/CD and security audit script in pure Bash where an artifact passes through an extensible sequential tribunal of verification handlers—failing fast or escalating telemetry without tight coupling."
type: "script"
gofPattern: "Chain of Responsibility Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Divination // The Seven Veils Audit Tribunal"
formula: |2
  #!/usr/bin/env bash
  set -Eeuo pipefail
  readonly HANDLERS=(veil_syntax veil_permissions veil_secrets veil_checksum)
  run_pipeline() {
    local target="$1"
    for handler in "${HANDLERS[@]}"; do
      echo "[TRIBUNAL] Invoking ${handler}..." >&2
      "${handler}" "${target}" || { echo "[VEIL CONDEMNATION] Failed at ${handler}" >&2; return 1; }
    done
    echo "[TRIBUNAL ABSOLUTION] All veils traversed."
  }
tags: ["bash", "shell-script", "chain-of-responsibility", "security-audit", "secops", "pipeline", "gof-patterns", "divination"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Chain of Responsibility

In 1994, the Gang of Four defined the **Chain of Responsibility Pattern**:
> *"Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it."*
> — Design Patterns, p. 223

In DevOps, pre-flight gatekeepers and artifact security scanners often degenerate into massive, monolithic scripts stuffed with brittle, nested `if-else` blocks:
```bash
# ⚠️ THE MONOLITHIC SPAGHETTI ANTI-PATTERN
if check_permissions; then
    if check_secrets; then
        if check_syntax; then
            ...
        fi
    fi
fi
```
Adding a new verification step requires modifying the innermost core, increasing the blast radius of regressions.

The **Seven Veils Tribunal** structures security evaluation as a discrete chain of independent handler functions. Each handler:
1. Inspects the passed target payload or file path.
2. Performs its localized validation.
3. Either passes control to the successor handler with an exit status of `0`, or terminates the request early with rich diagnostic telemetry.

---

## The Complete Bash Script

Save this script as `/usr/local/bin/seven-veils-audit.sh` and make it executable:

```bash
#!/usr/bin/env bash
# ==============================================================================
# SCRIPT: seven-veils-audit.sh
# PATTERN: Chain of Responsibility Pattern (Gang of Four Behavioral)
# ARCANUM: Divination // The Seven Veils Audit Tribunal
# DESCRIPTION: Sequential pipeline of decoupled security verification handlers.
# ==============================================================================
set -Eeuo pipefail

# ------------------------------------------------------------------------------
# 1. DISCRETE HANDLERS (THE VEILS)
# Each handler accepts: target_file -> returns 0 (Pass/Delegate) or 1+ (Halt)
# ------------------------------------------------------------------------------

veil_existence() {
    local target="$1"
    echo "  [VEIL 1: EXISTENCE] Inspecting target reality..."
    if [[ ! -e "${target}" ]]; then
        echo "    ❌ ERROR: Target '${target}' does not exist in physical filesystem!" >&2
        return 101
    fi
    return 0
}

veil_permissions() {
    local target="$1"
    echo "  [VEIL 2: PERMISSIONS] Verifying octave mode permissions..."
    local perms
    perms=$(stat -c "%a" "${target}")
    # Enforce no world-writable permissions (e.g. 777 or 666)
    if [[ "${perms: -1}" =~ [2367] ]]; then
        echo "    ❌ CRITICAL: World-writable bit detected: ${perms}" >&2
        echo "    Fix with: chmod o-w '${target}'" >&2
        return 102
    fi
    return 0
}

veil_secrets() {
    local target="$1"
    echo "  [VEIL 3: SECRETS] Scrying for exposed private keys and API tokens..."
    if grep -Eq "(BEGIN PRIVATE KEY|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36})" "${target}" 2>/dev/null; then
        echo "    ❌ BREACH DETECTED: Plaintext cryptographic material or API secret found!" >&2
        return 103
    fi
    return 0
}

veil_shebang_syntax() {
    local target="$1"
    echo "  [VEIL 4: SYNTAX] Examining shebang header & parsing tokens..."
    if head -n 1 "${target}" | grep -q "^#!\s*/bin/bash"; then
        echo "    ⚠️ WARN: Hardcoded '/bin/bash' detected. Prefer '#!/usr/bin/env bash'." >&2
    fi
    # If it is a shell script, run syntax dry-run
    if [[ "${target}" == *.sh ]]; then
        bash -n "${target}" || {
            echo "    ❌ SYNTAX ERROR: Bash AST parsing failed!" >&2
            return 104
        }
    fi
    return 0
}

veil_integrity_hash() {
    local target="$1"
    echo "  [VEIL 5: INTEGRITY] Computing cryptographic fingerprint..."
    local hash
    hash=$(sha256sum "${target}" | awk '{print $1}')
    echo "    ✓ SHA256: ${hash}"
    return 0
}

# ------------------------------------------------------------------------------
# 2. THE CHAIN DISPATCH TABLE
# Handlers can be reordered, appended, or conditionally enabled at runtime.
# ------------------------------------------------------------------------------
declare -a AUDIT_CHAIN=(
    veil_existence
    veil_permissions
    veil_secrets
    veil_shebang_syntax
    veil_integrity_hash
)

# ------------------------------------------------------------------------------
# 3. PIPELINE DISPATCH ORCHESTRATOR
# ------------------------------------------------------------------------------
execute_audit_chain() {
    local target="$1"
    echo "=========================================================="
    echo "[TRIBUNAL] Commencing Seven Veils Audit for: ${target}"
    echo "=========================================================="

    for handler in "${AUDIT_CHAIN[@]}"; do
        if ! "${handler}" "${target}"; then
            local status=$?
            echo "=========================================================="
            echo "[CONDEMNATION] Pipeline halted by: ${handler} (Code ${status})"
            echo "=========================================================="
            return "${status}"
        fi
    done

    echo "=========================================================="
    echo "[ABSOLUTION] All ${#AUDIT_CHAIN[@]} Veils successfully traversed."
    echo "[STATUS] Target verified for production deployment."
    echo "=========================================================="
    return 0
}

if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <artifact_file>" >&2
    exit 1
fi

execute_audit_chain "$1"
```

---

## Sequence Execution Flow

```
   Target Artifact
         │
         ▼
┌──────────────────┐
│ veil_existence   │ ──(Fails)──▶ [Halt 101]
└────────┬─────────┘
         │ (Pass)
         ▼
┌──────────────────┐
│ veil_permissions │ ──(Fails)──▶ [Halt 102]
└────────┬─────────┘
         │ (Pass)
         ▼
┌──────────────────┐
│ veil_secrets     │ ──(Fails)──▶ [Halt 103]
└────────┬─────────┘
         │ (Pass)
         ▼
┌──────────────────┐
│ veil_syntax      │ ──(Fails)──▶ [Halt 104]
└────────┬─────────┘
         │ (Pass)
         ▼
┌──────────────────┐
│ veil_integrity   │
└────────┬─────────┘
         │ (Pass)
         ▼
   ✨ [Absolution Granted]
```
