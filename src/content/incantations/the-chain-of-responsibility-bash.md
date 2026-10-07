---
title: The Chain of Handlers
description: Passing signals down a chain of hierarchical fault handlers.
type: script
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Enchantment // Signalmancy
formula: |
  #!/usr/bin/env bash
  
  # Handler 1
  handle_low_disk() {
    local error_code=$1
    if [[ "$error_code" == "101" ]]; then
      echo "[LowDiskHandler]: Clearing /tmp to free space."
      return 0 # Handled
    fi
    return 1 # Pass to next
  }
  
  # Handler 2
  handle_network_drop() {
    local error_code=$1
    if [[ "$error_code" == "202" ]]; then
      echo "[NetworkHandler]: Restarting NIC interfaces."
      return 0
    fi
    return 1
  }
  
  # Handler 3
  handle_kernel_panic() {
    local error_code=$1
    if [[ "$error_code" == "500" ]]; then
      echo "[KernelHandler]: Initiating emergency failover!"
      return 0
    fi
    return 1
  }
  
  # The Chain
  process_error() {
    local code=$1
    echo "Processing error: $code"
    
    handle_low_disk "$code" || \
    handle_network_drop "$code" || \
    handle_kernel_panic "$code" || \
    echo "[Fallback]: Unhandled anomaly detected."
  }
  
  process_error "202"
  process_error "999"
tags: [bash, chain-of-responsibility, behavioral, pipeline]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Using Bash's short-circuit logical `||` operator, the Chain of Responsibility naturally elegantly manifests. Each handler attempts to resolve the anomaly; if it fails, the signal falls through to the next rung in the chain until order is restored or the fallback logic catches the remaining entropy.
