---
title: "The Directory Tree Metric Weigher: Composite Hierarchy Sifter"
description: "Traverse part-whole filesystem trees uniformly with find, du, and awk to isolate runaway storage vampires during critical disk exhaustion incidents."
type: "shell"
gofPattern: "Composite (Structural)"
gofCategory: "Structural"
arcaneSchool: "Divination // Sifting the Hierarchical Boughs"
formula: "find /var -mindepth 1 -maxdepth 2 -type d -exec du -sh {} + 2>/dev/null | sort -hr | head -n 20 | awk '{printf \"[%-8s] -> %s\\n\", $1, $2}'"
tags: ["shell", "oneliners", "find", "du", "awk", "composite-pattern", "storage", "sysadmin", "gof-patterns"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Apprentice"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four catalog, the **Composite** pattern creates unified recursive structures:

> *"Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly."*
> — Gang of Four, *Structural Patterns*

In software design, graphic scene graphs and abstract syntax trees use Composite so that invoking `.render()` or `.calculateSize()` on a root container seamlessly evaluates all intermediate branches and leaf components identically.

### The Transmutation to the POSIX Inode Tree

The UNIX Virtual Filesystem (VFS) is the historical progenitor of the Composite pattern:
- **Leaf Nodes**: Regular files, symlinks, device nodes.
- **Composite Nodes**: Directories containing collections of leaves and nested child directories.
- **The Uniform Interface**: Inodes, paths, ownership, access modes, and byte counts.

When a production cluster raises a `DiskPressure` or `Filesystem 98% Full (ENOSPC)` alarm, an operator must weigh disk consumption across the tree. Naive commands like `du -sh /*` or simple recursive `ls -R` either lock disk I/O for hours or fail to differentiate between single monolithic log files and directories holding ten million tiny cache files.

The **Directory Tree Metric Weigher** leverages `find`, `du`, and `awk` to inspect composite trees with bounded recursion depth, evaluating disk mass uniformly across part-whole nodes.

---

## The Spell Formula

Cast this pipeline during urgent disk remediation to immediately locate the largest branches in `/var`:

```bash
find /var -mindepth 1 -maxdepth 2 -type d -exec du -sh {} + 2>/dev/null \
  | sort -hr \
  | head -n 20 \
  | awk '{printf "[%-8s] -> %s\n", $1, $2}'
```

To include both monolithic files (leaves) and directories (composites) uniformly across the root tree:

```bash
du -ah --max-depth=2 / 2>/dev/null \
  | sort -rh \
  | head -n 25 \
  | awk '{printf "%-10s %s\n", $1, $2}'
```

---

## Anatomy of the Spell

### 1. `find /var -mindepth 1 -maxdepth 2 -type d`
- `find`: Walks the filesystem hierarchy.
- `-mindepth 1`: Excludes the root `/var` directory itself, avoiding redundant aggregate output.
- `-maxdepth 2`: Constrains the traversal to two levels of the hierarchy, preventing the search from descending into millions of deep subdirectories (e.g., node_modules or docker overlay layers).
- `-type d`: Focuses specifically on composite container directories.

### 2. `-exec du -sh {} + 2>/dev/null`
- `du -sh`: Calculates total disk usage in human-readable notation (`K`, `M`, `G`, `T`).
- The `+` delimiter aggregates multiple found paths into a single `du` process invocation, avoiding the process-forking overhead of `\;`.
- `2>/dev/null`: Suppresses permission denied errors when traversing restricted subdirectories.

### 3. `sort -hr | head -n 20`
- `-h`: Interprets human-numeric units (`G` > `M` > `K`) correctly.
- `-r`: Sorts in descending order, surfacing the largest storage consumers at the top.
- `head -n 20`: Restricts results to the top 20 storage culprits.

### 4. `awk '{printf "[%-8s] -> %s\n", $1, $2}'`
- Formats the raw tabular output into an aligned, readable diagnostic telemetry card for incident war rooms.

---

## Composite Traversal Comparison

| Command Pattern | Depth Strategy | I/O Blast Radius | Uniform Handling |
| :--- | :--- | :--- | :--- |
| `du -sh /*` | Unbounded recursive descent | High; can hang on large NFS or CIFS mounts | Aggregates only top-level roots |
| `ncdu /` | Interactive terminal UI | High memory overhead on multi-terabyte drives | Full interactive drill-down |
| **Directory Tree Weigher** | **Bounded composite depth (`-maxdepth 2`)** | **Minimal; completes in seconds** | **Uniform composite evaluation** |

By treating individual directories and compound folder hierarchies through a unified metric lens, the Composite pattern allows rapid triage of runaway filesystem growth.
