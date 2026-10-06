---
title: "The Alchemical Engine: Pluggable Backup Strategies in Pure Bash"
description: "A production-grade, modular archival and snapshot utility in Bash implementing the Gang of Four Strategy pattern to dynamically swap compression algorithms (Zstandard, Gzip, XZ, or Raw Tar) without altering pipeline orchestration."
type: "script"
gofPattern: "Strategy Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Transmutation // The Alchemical Compression Engine"
formula: |
  #!/usr/bin/env bash
  set -Eeuo pipefail
  strategy_zstd() { tar -cf - "$1" | zstd -19 -T0 -o "$2.tar.zst"; }
  strategy_gzip() { tar -cf - "$1" | pigz -9 > "$2.tar.gz"; }
  strategy_raw()  { tar -cf "$2.tar" "$1"; }
  dispatch_archival() {
    local target="$1" dest="$2" strategy="${3:-zstd}"
    "strategy_${strategy}" "${target}" "${dest}"
  }
  dispatch_archival "/var/data" "/backups/nightly" "${1:-zstd}"
tags: ["bash", "shell-script", "strategy-pattern", "compression", "backup", "zstandard", "gof-patterns", "transmutation"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Strategy

In 1994, the Gang of Four defined the **Strategy Pattern**:
> *"Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it."*
> — Design Patterns, p. 315

In UNIX systems engineering, backup workloads have conflicting constraints:
- High-throughput database streams need lightning-fast compression (Zstandard or LZ4).
- Archival cold storage in AWS S3 Glacier requires maximum density (XZ / LZMA2).
- Embedded nodes or air-gapped recovery boots may lack modern compression tools and need vanilla POSIX `gzip` or uncompressed `tar`.

Hardcoding `tar -czvf` throughout a script forces engineers to duplicate orchestration code (checksumming, path sanitation, metric logging, cloud syncing) every time an algorithm changes.

By encapsulating each compression pipeline into an interchangeable Strategy function, the orchestrator remains pristine while algorithms vary at runtime.

---

## The Complete Bash Script

Save this script as `/usr/local/bin/alchemical-backup.sh` and make it executable:

```bash
#!/usr/bin/env bash
# ==============================================================================
# SCRIPT: alchemical-backup.sh
# PATTERN: Strategy Pattern (Gang of Four Behavioral)
# ARCANUM: Transmutation // The Alchemical Compression Engine
# DESCRIPTION: Pluggable compression strategies orchestrated via a single client.
# ==============================================================================
set -Eeuo pipefail

# ------------------------------------------------------------------------------
# 1. STRATEGY INTERFACES (FAMILY OF ALGORITHMS)
# Each strategy conforms to: (source_dir, output_basename) -> artifact_path
# ------------------------------------------------------------------------------

strategy_zstd() {
    local src="$1" dest_base="$2"
    local output="${dest_base}.tar.zst"
    echo "[STRATEGY: ZSTD] Transmuting via multi-threaded Zstandard level 19..." >&2
    tar -cf - -C "$(dirname "${src}")" "$(basename "${src}")" \
        | zstd -19 -T0 --ultra -o "${output}"
    echo "${output}"
}

strategy_gzip() {
    local src="$1" dest_base="$2"
    local output="${dest_base}.tar.gz"
    echo "[STRATEGY: GZIP] Transmuting via parallel Gzip level 9..." >&2
    tar -cf - -C "$(dirname "${src}")" "$(basename "${src}")" \
        | (pigz -9 2>/dev/null || gzip -9) > "${output}"
    echo "${output}"
}

strategy_xz() {
    local src="$1" dest_base="$2"
    local output="${dest_base}.tar.xz"
    echo "[STRATEGY: XZ] Transmuting via maximum density XZ compression..." >&2
    tar -cf - -C "$(dirname "${src}")" "$(basename "${src}")" \
        | xz -9e -T0 > "${output}"
    echo "${output}"
}

strategy_raw() {
    local src="$1" dest_base="$2"
    local output="${dest_base}.tar"
    echo "[STRATEGY: RAW] Uncompressed POSIX tarball encapsulation..." >&2
    tar -cf "${output}" -C "$(dirname "${src}")" "$(basename "${src}")"
    echo "${output}"
}

# ------------------------------------------------------------------------------
# 2. CONTEXT / ORCHESTRATION CLIENT
# The client knows how to inspect, verify, and catalog the artifact regardless
# of which strategy created it.
# ------------------------------------------------------------------------------
execute_backup_orchestration() {
    local target_dir="${1}"
    local backup_dir="${2}"
    local chosen_strategy="${3:-zstd}"
    
    if [[ ! -d "${target_dir}" ]]; then
        echo "[ERROR] Source target '${target_dir}' does not exist!" >&2
        return 1
    fi

    local timestamp
    timestamp="$(date +%Y%m%d_%H%M%S)"
    local dest_base="${backup_dir}/$(basename "${target_dir}")_${timestamp}"
    mkdir -p "${backup_dir}"

    local strategy_func="strategy_${chosen_strategy}"

    # Verify that the chosen strategy exists in our dispatch table
    if ! declare -F "${strategy_func}" >/dev/null; then
        echo "[ERROR] Unknown transmutation strategy: '${chosen_strategy}'" >&2
        echo "Available strategies: zstd, gzip, xz, raw" >&2
        return 2
    fi

    echo "=========================================================="
    echo "[ORCHESTRATOR] Commencing archival of: ${target_dir}"
    echo "[ORCHESTRATOR] Strategy Selected: ${chosen_strategy}"
    echo "=========================================================="

    local start_time
    start_time="$(date +%s)"

    # Dynamic Strategy Dispatch
    local generated_artifact
    generated_artifact="$("${strategy_func}" "${target_dir}" "${dest_base}")"

    local end_time
    end_time="$(date +%s)"
    local duration=$((end_time - start_time))

    # Generic post-processing (hashing, size telemetry)
    local artifact_size
    artifact_size="$(du -h "${generated_artifact}" | cut -f1)"
    local sha256_sum
    sha256_sum="$(sha256sum "${generated_artifact}" | awk '{print $1}')"

    echo "=========================================================="
    echo "[SUCCESS] Transmutation Complete in ${duration}s"
    echo "[ARTIFACT]  ${generated_artifact}"
    echo "[SIZE]      ${artifact_size}"
    echo "[SHA256]    ${sha256_sum}"
    echo "=========================================================="
}

# Entrypoint argument parsing
if [[ $# -lt 2 ]]; then
    echo "Usage: $0 <source_dir> <backup_dir> [zstd|gzip|xz|raw]" >&2
    exit 1
fi

execute_backup_orchestration "$1" "$2" "${3:-zstd}"
```

---

## Strategy Comparison Matrix

| Strategy | Compression Ratio | Speed (Multi-core) | Decompression Speed | Best Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **`strategy_zstd`** | High (~75%) | Extremely Fast | Sub-second | Production DB backups, VM images |
| **`strategy_gzip`** | Moderate (~65%) | Fast (`pigz`) | Fast | Web assets, legacy target compatibility |
| **`strategy_xz`** | Maximum (~85%) | Slow | Moderate | Archival cold storage, monthly ISO dumps |
| **`strategy_raw`** | 0% (Container only) | Line-speed (NVMe max)| Instant | Fast intra-cluster migrations |
