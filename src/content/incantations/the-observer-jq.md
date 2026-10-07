---
title: The Observer (jq)
description: Broadcast elemental shifts across a registry of bound spectral watchers.
type: jq
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  # State and watchers
  # { "state": "offline", "watchers": ["logger", "alert_system"] }

  # The Notify function
  def notify_watchers:
    .state as $current
    | .watchers[] | { "watcher": ., "event": "State changed to \($current)" };

  # Mutate and Trigger
  def change_state($new_state):
    .state = $new_state | notify_watchers;

  # Execution
  .core_system | change_state("critical_overload")
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the core state mutates, the ripples must be felt by all bound entities. The **Observer** maps over an array of registered spectral watchers. Whenever a state change is invoked, `jq` shatters the single object into a stream of targeted notification packets, broadcasting the telemetry across the void.
