---
title: The State Machine of the Shell
description: Dynamic context swapping using the State pattern.
type: script
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Statemancy
formula: |
  #!/usr/bin/env bash
  
  # Context pointer
  CURRENT_STATE="state_idle"
  
  # State Implementations
  state_idle() {
    echo "[Idle] Waiting for stimulus..."
    if [[ "$1" == "hack" ]]; then
      CURRENT_STATE="state_breaching"
    fi
  }
  
  state_breaching() {
    echo "[Breaching] Injecting payloads..."
    if [[ "$1" == "success" ]]; then
      CURRENT_STATE="state_root"
    else
      CURRENT_STATE="state_idle"
    fi
  }
  
  state_root() {
    echo "[Root] Complete system control achieved."
  }
  
  # Context runner
  execute_state() {
    # Call the function named in CURRENT_STATE
    $CURRENT_STATE "$1"
  }
  
  # Client Simulation
  execute_state "wait"
  execute_state "hack"
  execute_state "wait"
  execute_state "success"
  execute_state "wait"
tags: [bash, state, behavioral, fsm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Instead of massive, deeply nested `if/else` monoliths, the State pattern points a variable at the current state-handling function. By dynamically evaluating the pointer, the script smoothly transitions its behavior. The state machine shifts seamlessly between 'idle', 'breaching', and 'rooted' modes based on the environment's feedback.
