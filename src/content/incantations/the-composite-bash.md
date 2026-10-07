---
title: The Composite File Tree
description: Treating individual files and directory branches uniformly.
type: script
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Divination // Treemancy"
formula: |2
  #!/usr/bin/env bash

  # The Component Interface
  scan_node() {
    local node=$1
    local indent=$2

    if [[ -d "$node" ]]; then
      scan_directory "$node" "$indent"
    elif [[ -f "$node" ]]; then
      scan_file "$node" "$indent"
    fi
  }

  # Leaf
  scan_file() {
    local file=$1
    local indent=$2
    echo "${indent}File: $(basename "$file") - Size: $(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null) bytes"
  }

  # Composite
  scan_directory() {
    local dir=$1
    local indent=$2
    echo "${indent}Directory: $(basename "$dir")/"

    # Recursively scan children
    for child in "$dir"/*; do
      [ -e "$child" ] || continue
      scan_node "$child" "  $indent"
    done
  }

  # Usage (create mock structure)
  mkdir -p /tmp/composite_test/sub
  touch /tmp/composite_test/file1.txt
  touch /tmp/composite_test/sub/file2.txt

  scan_node "/tmp/composite_test" ""

  # Cleanup
  rm -rf /tmp/composite_test
tags: [bash, composite, structural, filesystem]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The very filesystem of Unix is a Composite pattern. Files are leaves, directories are branches. By writing recursive scanning functions, a scriptmancer can traverse entire hierarchies, casting operations upon single bytes and sprawling directory structures with uniform ease.
