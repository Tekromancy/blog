---
title: The Mediator (jq)
description: Centralize chaotic node communication through a single, omniscient hub.
type: jq
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Compulsion"
formula: |2
  # Nodes do not talk to each other; they emit states
  # [ { "id": "A", "status": "critical" }, { "id": "B", "status": "idle" } ]

  # The Mediator coordinates the global response
  def mediator_hub:
    (map(select(.status == "critical")) | length) as $critical_count
    | if $critical_count > 0 then
        map(if .status == "idle" then .status = "assisting" else . end)
      else
        .
      end;

  # Execution
  .system_nodes | mediator_hub
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In a sprawling micro-ecosystem, nodes attempting to influence each other lead to entangled, spaghetti-like code. The **Mediator** absorbs the state of the entire network, evaluates the global context, and dictates the resulting shifts in behavior. The nodes remain blind to one another, answering only to the hub.
