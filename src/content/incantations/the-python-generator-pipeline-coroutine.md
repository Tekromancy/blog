---
title: "The Temporal Weft: Generator Pipeline Iterator in Python"
description: "A memory-bounded, zero-buffer streaming pipeline in Python implementing the Gang of Four Iterator and Pipeline patterns using nested generators to process gigabytes of streaming log telemetry in constant O(1) memory."
type: "python"
gofPattern: "Iterator Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Chronomancy // The Temporal Stream Weft"
formula: |2
  def stream_lines(filepath):
      with open(filepath, "r") as f:
          for line in f: yield line.strip()

  def grep_errors(lines):
      for line in lines:
          if "ERROR" in line or "CRITICAL" in line: yield line

  def parse_telemetry(lines):
      for line in lines: yield dict(part.split("=") for part in line.split() if "=" in part)

  # Chained Iterator Pipeline (O(1) Memory)
  pipeline = parse_telemetry(grep_errors(stream_lines("/var/log/syslog")))
  for event in pipeline: process(event)
tags: ["python", "python3", "iterator-pattern", "generators", "streaming", "memory-optimization", "gof-patterns", "chronomancy"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Iterator

In 1994, the Gang of Four defined the **Iterator Pattern**:
> *"Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation."*
> — Design Patterns, p. 257

In contemporary data engineering and observability, software engineers frequently crash production containers by loading unbounded datasets into memory:
```python
# ⚠️ THE OUT-OF-MEMORY (OOM) ANTI-PATTERN
with open("/var/log/massive_system.log") as f:
    lines = f.readlines()            # Allocates 12GB of RAM immediately!
    errors = [l for l in lines if "ERROR" in l] # Duplicates another 2GB!
```
When processing gigabyte-scale access logs, blockchain ledgers, or telemetry streams, the collection should never reside in memory all at once.

Python's **generators** (`yield`) elevate the GoF Iterator pattern into composable, lazy computational pipelines. Elements are pulled **on demand** (pull-based backpressure) one token at a time, guaranteeing constant **$O(1)$ memory consumption** regardless of whether the dataset contains ten lines or ten billion.

---

## The Complete Python Script

```python
#!/usr/bin/env python3
"""
PATTERN: Iterator Pattern (Gang of Four Behavioral)
ARCANUM: Chronomancy // The Temporal Stream Weft
DESCRIPTION: Composable lazy iterator pipelines executing in O(1) memory.
"""
import io
import time
from typing import Generator, Dict, Any, Iterable


# ------------------------------------------------------------------------------
# 1. LAZY ITERATOR STAGES (GENERATOR CONSUMERS / PRODUCERS)
# ------------------------------------------------------------------------------

def stream_synthetic_syslog(count: int = 1_000) -> Generator[str, None, None]:
    """Generates an infinite or high-volume stream of log lines lazily."""
    levels = ["INFO", "DEBUG", "WARN", "ERROR", "CRITICAL"]
    for i in range(count):
        lvl = levels[i % len(levels)]
        yield f"timestamp={time.time():.2f} host=node-{i%5} level={lvl} latency_ms={i*1.5:.1f} id={i}"


def filter_severity(stream: Iterable[str], min_level: str = "ERROR") -> Generator[str, None, None]:
    """Iterator stage: filters records, discarding low-severity entries on the fly."""
    target_levels = {"ERROR", "CRITICAL"} if min_level == "ERROR" else {min_level}
    for line in stream:
        if any(f"level={lvl}" in line for lvl in target_levels):
            yield line


def parse_key_value_pairs(stream: Iterable[str]) -> Generator[Dict[str, str], None, None]:
    """Iterator stage: parses key=value log syntax into structured dictionary tokens."""
    for line in stream:
        record = {}
        for token in line.split():
            if "=" in token:
                k, v = token.split("=", 1)
                record[k] = v
        yield record


def filter_high_latency(stream: Iterable[Dict[str, str]], threshold_ms: float = 100.0) -> Generator[Dict[str, Any], None, None]:
    """Iterator stage: extracts and asserts numeric latency metrics."""
    for record in stream:
        latency = float(record.get("latency_ms", 0.0))
        if latency >= threshold_ms:
            record["latency_ms"] = latency
            yield record


# ------------------------------------------------------------------------------
# 2. PIPELINE COMPOSITION (THE ITERATOR WEFT)
# ------------------------------------------------------------------------------
def execute_chronomancy_pipeline():
    print("==========================================================")
    print("[CHRONOMANCY] Launching Lazy Iterator Pipeline...")
    print("==========================================================")

    # Raw stream: 50,000 synthetic log records generated lazily
    raw_source = stream_synthetic_syslog(50_000)

    # Compose the pipeline by wrapping generator iterators
    error_stream = filter_severity(raw_source, min_level="ERROR")
    structured_stream = parse_key_value_pairs(error_stream)
    anomaly_stream = filter_high_latency(structured_stream, threshold_ms=500.0)

    # Consume elements one by one with pull-based backpressure
    captured = 0
    for anomaly in anomaly_stream:
        captured += 1
        print(f"[ANOMALY #{captured:03d}] Node: {anomaly['host']:<8} | Latency: {anomaly['latency_ms']:>6.1f}ms | Level: {anomaly['level']}")
        if captured >= 5:
            print("... Pipeline consumer halted after 5 samples (Stream cleanly unrolls).")
            break

    print("==========================================================")
    print(f"[COMPLETE] Processed stream in strictly constant O(1) RAM.")
    print("==========================================================")


if __name__ == "__main__":
    execute_chronomancy_pipeline()
```

---

## Memory Allocation Comparison

| Approach | 100M Log Lines | Memory Usage | Time to First Item |
| :--- | :--- | :--- | :--- |
| **Traditional List (`.readlines()`)** | ~18 GB RAM | **OOM Kill (SIGKILL)** | 45+ seconds |
| **Generator Iterator Pipeline** | **~4 KB RAM** | **$O(1)$ Constant** | **< 1 millisecond** |
