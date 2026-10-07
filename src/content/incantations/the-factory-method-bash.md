---
title: The Factory Method of Process Spawning
description: Spawning polymorphic daemon processes using the Factory Method in Bash.
type: script
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Processmancy
formula: |
  #!/usr/bin/env bash
  
  # Factory Method
  spawn_daemon() {
    local daemon_type=$1
    case "$daemon_type" in
      "watcher")
        spawn_watcher_daemon
        ;;
      "indexer")
        spawn_indexer_daemon
        ;;
      *)
        echo "Error: Unknown daemon archetype." >&2
        exit 1
        ;;
    esac
  }
  
  # Concrete Products
  spawn_watcher_daemon() {
    echo "[Watcher Daemon] Initialized. Monitoring system logs for anomalies..."
  }
  
  spawn_indexer_daemon() {
    echo "[Indexer Daemon] Initialized. Cataloging cyber-artifacts..."
  }
  
  # Client
  spawn_daemon "watcher"
  spawn_daemon "indexer"
tags: [bash, factory-method, creational, processmancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Factory Method defers the exact process spawning logic to subclasses, or in the case of Bash, a specialized dispatcher function. By centralizing the creation logic, we maintain a grimoire that can easily adapt to new daemon archetypes without cluttering our main execution loops.
