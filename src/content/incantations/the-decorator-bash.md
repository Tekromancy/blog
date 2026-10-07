---
title: The Decorator of Wrappers
description: Augmenting command functionality by enveloping them in ethereal wrappers.
type: script
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Illusion // Wrappermancy
formula: |
  #!/usr/bin/env bash
  
  # The Core Command
  base_action() {
    echo "Transferring data packets..."
    sleep 1
  }
  
  # Decorator 1: Logging
  with_logging() {
    local cmd=$1
    echo "[LOG] $(date): Executing $cmd"
    $cmd
    echo "[LOG] $(date): $cmd finished."
  }
  
  # Decorator 2: Time Tracking
  with_timing() {
    local cmd=$1
    local start=$SECONDS
    $cmd
    local duration=$(( SECONDS - start ))
    echo "[TIME] Execution took $duration seconds."
  }
  
  # Usage: We build a decorated command dynamically
  decorated_spell() {
    with_timing "with_logging base_action"
  }
  
  decorated_spell
tags: [bash, decorator, structural, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To modify a command without rewriting its soul is the essence of the Decorator pattern. In Bash, passing function names to higher-order functions allows the scriptmancer to weave layers of logging, timing, and error-handling around an otherwise mundane incantation.
