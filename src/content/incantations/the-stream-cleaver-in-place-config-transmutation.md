---
title: "The Stream Cleaver: In-Place Batch Config Transmutation"
description: "Atomically find, backup, and regex-substitute configuration tokens across thousands of files using find, xargs, and sed."
type: "shell"
gofPattern: "Decorator & Template Method (Structural & Behavioral)"
gofCategory: "Structural"
arcaneSchool: "Transmutation // Multi-file Atomic Regex Rewriting"
formula: "find /etc -type f -name \"*.conf\" -exec grep -l \"DEPRECATED_CIPHER_SUITE\" {} + | xargs -I{} sed -i.tekromancy_bak -E 's/DEPRECATED_CIPHER_SUITE/TLS_AES_256_GCM_SHA384/g' {}"
tags: ["shell", "oneliners", "find", "sed", "xargs", "gof-patterns", "sysadmin"]
pubDate: "2026-10-05"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four lexicon:
- **Decorator**: Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.
- **Template Method**: Defines the skeleton of an algorithm in an operation, deferring invariant steps to specific operators.

When modernizing cluster configurations or rotating enterprise security keys, changing a single file is trivial. Changing hundreds of configuration files scattered across nested directory structures without introducing corruption or losing the ability to rollback is high-stakes.

The **Stream Cleaver** embodies the **Decorator and Template Method**:
1. **The Traversal Template**: `find` provides the algorithmic skeleton for walking the directory tree.
2. **The Invariant Filter**: `grep -l` ensures only files containing the target token are touched, preventing timestamp corruption on unrelated configs.
3. **The Backup Decorator**: `sed -i.tekromancy_bak` decorates the target file by creating an immutable backup snapshot before executing in-place atomic transmutation.

---

## The Spell Formula

Cast this one-liner when migrating deprecated configuration stanzas or rotating secrets across a server fleet:

```bash
find /etc -type f -name "*.conf" -exec grep -l "DEPRECATED_CIPHER_SUITE" {} + \
  | xargs -I{} sed -i.tekromancy_bak -E 's/DEPRECATED_CIPHER_SUITE/TLS_AES_256_GCM_SHA384/g' {}
```

---

## Anatomy of the Spell

### 1. `find /etc -type f -name "*.conf" -exec grep -l "..." {} +`
- `find /etc`: Recursively traverses the directory hierarchy.
- `-type f`: Restricts matches to regular files, ignoring symlinks and socket fifos.
- `-exec grep -l "..." {} +`: Uses POSIX batch execution (`+`) to pass hundreds of paths to `grep` at once. `-l` outputs ONLY the filenames containing the target string.

### 2. `xargs -I{} sed -i.tekromancy_bak ...`
- `xargs -I{}`: Takes the matched file paths from standard input and replaces `{}` with each path.
- `sed -i.tekromancy_bak`: The master stroke. The `-i` flag instructs `sed` to edit the file in place, while `.tekromancy_bak` instructs it to first clone the original file with this extension.
- `-E 's/.../.../g'`: Executes extended regular expression substitution globally across all lines.

---

## Arcane Lore: The Seal of Preservation

True sorcery never destroys without leaving a tether to the past. Novice wizards rewrite reality recklessly, only to find the kingdom collapsed with no memory of what came before.

The Stream Cleaver leaves the **Seal of Preservation** (`.tekromancy_bak`). If an unintended variable breaks a daemon, the previous reality can be restored with a single counter-curse:
```bash
find /etc -name "*.tekromancy_bak" -exec sh -c 'mv "$0" "${0%.tekromancy_bak}"' {} \;
```
