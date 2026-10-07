---
title: The Iterator of the Endless Stream
description: Safely traversing collections and text streams without memory bloat.
type: script
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Transmutation // Loopmancy"
formula: |2
  #!/usr/bin/env bash

  # The Aggregate (A generated stream of data)
  generate_nodes() {
    echo "Node_Alpha"
    echo "Node_Beta"
    echo "Node_Gamma"
  }

  # The Iterator
  process_stream() {
    # 'read -r' is the Iterator traversing the stream line-by-line
    while IFS= read -r node; do
      echo "[Iterator] Pinging $node..."
      # simulate ping
      sleep 0.5
    done
  }

  # Client Code connecting Aggregate to Iterator
  generate_nodes | process_stream
tags: [bash, iterator, behavioral, streams]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

While arrays can be looped, the true Bash Iterator pattern is the pipeline. Using `while IFS= read -r`, the scriptmancer creates a memory-efficient iterator that processes infinite streams of data piece-by-piece, never requiring the full structure to manifest in RAM at once.
