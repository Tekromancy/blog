---
title: The Mediator of Subsystems
description: Orchestrating complex component communication through a central Mediator.
type: script
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Orchestramancy
formula: |
  #!/usr/bin/env bash
  
  # Components
  sensor_detect() {
    echo "Sensor: Intruder detected!"
    # Pass message to Mediator instead of directly calling defenses
    mediator_notify "Intruder"
  }
  
  defense_activate() {
    echo "Defense: Activating laser grid."
  }
  
  alarm_sound() {
    echo "Alarm: WEE-WOO-WEE-WOO!"
  }
  
  # The Mediator
  mediator_notify() {
    local event=$1
    if [[ "$event" == "Intruder" ]]; then
      echo "Mediator: Coordinating defense sequence..."
      alarm_sound
      defense_activate
    fi
  }
  
  # Usage
  sensor_detect
tags: [bash, mediator, behavioral, orchestration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When shell components become too entangled, the Mediator emerges as the central dispatcher. Rather than subsystems invoking one another in a web of brittle dependencies, they send signals to the Mediator. This central scriptmantic hub decides which functions to trigger, decoupling the origin from the reaction.
