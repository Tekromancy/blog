---
title: The Observer of the Event Bus
description: Implementing a pub/sub mechanism natively within Bash arrays.
type: script
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Eventmancy"
formula: |2
  #!/usr/bin/env bash

  # The Subject (Event Bus)
  declare -a OBSERVERS

  subscribe() {
    OBSERVERS+=("$1")
    echo "Subscribed: $1"
  }

  notify_all() {
    local event=$1
    echo "Broadcasting event: $event"
    for observer in "${OBSERVERS[@]}"; do
      # Invoke the observer function
      $observer "$event"
    done
  }

  # The Observers
  logger_plugin() { echo "Logger: Recorded event '$1'"; }
  mailer_plugin() { echo "Mailer: Sent admin alert for '$1'"; }

  # Client
  subscribe "logger_plugin"
  subscribe "mailer_plugin"

  echo "Simulating system breach..."
  notify_all "BREACH_DETECTED"
tags: [bash, observer, behavioral, pubsub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through arrays of function names and iteration loops, Bash can mimic a powerful Observer event bus. This pattern allows the core logic to remain entirely agnostic of its listeners. As events unfold in the script, the `notify_all` rune loops through dynamically registered observers, pushing state outwards like a mystical sonar.
