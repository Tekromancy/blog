---
title: "The Dynamic Compression Strategy: Multi-Algorithm Stream Engine"
description: "Encapsulate data compression algorithms into interchangeable strategy pipelines, dynamically switching between zstd, lz4, xz, and gzip based on runtime constraints."
type: "shell"
gofPattern: "Strategy (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Transmutation // Swapping Compression Sigils"
formula: "compress_stream() { local algo=\"${1:-zstd}\"; shift; case \"$algo\" in lz4) lz4 -1 -q ;; zstd) zstd -T0 -3 -q ;; xz) xz -T0 -6 -q ;; gzip) pigz -p 4 ;; *) cat ;; esac; }; tar -cf - /var/log | compress_stream zstd > /backup/logs.tar.zst"
tags: ["shell", "oneliners", "strategy-pattern", "compression", "zstd", "lz4", "xz", "sysadmin", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Apprentice"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four behavioral patterns, the **Strategy** pattern defines interchangeable algorithms:

> *"Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it."*
> — Gang of Four, *Behavioral Patterns*

Instead of hardcoding a specific sorting, routing, or compression algorithm inside an application, the Strategy pattern defines a common interface. The client holds a strategy reference and can swap implementations at runtime without altering the surrounding business logic.

### The Transmutation to Stream Compression Engines

In DevOps and cloud storage, there is no single "best" compression algorithm:
- **`lz4` (Maximum Throughput)**: Compresses at 800+ MB/s per core with minimal CPU overhead. Best for high-velocity telemetry streams over 10 Gbps LANs.
- **`zstd` (Balanced Ratio & Speed)**: Modern Facebook algorithm offering excellent compression ratio with linear scaling across all available CPU threads (`-T0`).
- **`xz` (Maximum Density Archive)**: Uses LZMA2 to squeeze every byte. Extremely CPU-heavy, but ideal for cold, long-term archival storage where network egress is costly.
- **`gzip / pigz` (Universal Legacy Parity)**: Universal POSIX baseline compatibility.

Hardcoding `gzip` into every backup script wastes CPU cores and balloons cloud storage costs. The **Dynamic Compression Strategy** encapsulates these algorithms behind a uniform standard input/output streaming filter.

---

## The Spell Formula

Cast this invocation to define the interchangeable compression strategy engine:

```bash
compress_stream() {
  local algo="${1:-zstd}"
  shift
  case "$algo" in
    lz4)
      # Strategy: Ultra-low latency, real-time pipe streaming
      lz4 -1 -q
      ;;
    zstd)
      # Strategy: Balanced multi-threaded modern standard
      zstd -T0 -3 -q
      ;;
    xz)
      # Strategy: Maximum byte density for cold archival
      xz -T0 -6 -q
      ;;
    gzip)
      # Strategy: Legacy POSIX compatibility via parallel pigz
      pigz -p "${GZIP_THREADS:-4}"
      ;;
    *)
      echo "Unknown compression strategy: $algo (fallback to passthrough)" >&2
      cat
      ;;
  esac
}

# Example 1: Stream real-time logs with ultra-fast lz4 strategy
tar -cf - /var/log | compress_stream lz4 | nc remote-storage 9000

# Example 2: Stream cold database backup with dense xz strategy
pg_dumpall -U postgres | compress_stream xz > /cold_storage/db.sql.xz
```

---

## Strategy Comparison Matrix

| Strategy | Algorithmic Family | Compression Speed | Decompression Speed | Optimal Operational Scenario |
| :--- | :--- | :--- | :--- | :--- |
| **`lz4`** | Byte-level LZ77 derivative | **~850 MB/s** | **~4,500 MB/s** | Live inter-process pipes, Kafka producers |
| **`zstd`** | FSE (Finite State Entropy) | **~350 MB/s** | **~1,200 MB/s** | Daily backups, container images, log sinks |
| **`xz`** | LZMA2 dictionary tree | **~25 MB/s** | **~150 MB/s** | Monthly/annual compliance cold archives |
| **`gzip`** | DEFLATE | **~90 MB/s** | **~300 MB/s** | Legacy systems lacking modern packages |

By decoupling the data generation pipeline (`tar`, `pg_dump`, `mysqldump`) from the compression algorithm, the Strategy pattern lets you adapt to CPU and bandwidth conditions dynamically with zero script refactoring.
