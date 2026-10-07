---
title: The Strategy of the Algorithmic Swap
description: Swappable algorithmic behavior through function pointers.
type: script
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Illusion // Morphmancy
formula: |
  #!/usr/bin/env bash
  
  # The Strategies
  sort_quick() { echo "Sorting data via Cyber-QuickSort..."; }
  sort_bubble() { echo "Sorting data via Archaic-BubbleSort..."; }
  sort_bogo() { echo "Sorting data via Chaos-BogoSort... Good luck."; }
  
  # The Context
  declare CURRENT_STRATEGY="sort_quick"
  
  set_strategy() {
    CURRENT_STRATEGY=$1
  }
  
  execute_sort() {
    # Dynamically invoke the chosen strategy
    $CURRENT_STRATEGY
  }
  
  # Usage
  execute_sort
  
  set_strategy "sort_bubble"
  execute_sort
tags: [bash, strategy, behavioral, dynamic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy pattern is trivially elegant in Bash. By passing function names as strings, the algorithm used by a master process can be swapped on the fly. Whether compressing files via `gzip`, `bzip2`, or `xz`, the core loop merely executes the current `$STRATEGY_PTR`, entirely unconcerned with the mechanics within.
