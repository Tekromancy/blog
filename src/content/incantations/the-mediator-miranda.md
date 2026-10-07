---
title: The Mediator of the Ancestral Monad
description: Centralizing complex communications through a pure monadic mediator function.
type: miranda
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || The Mediator orchestrates interactions purely.
  
  component_state == (string, num)
  system_state == (component_state, component_state)
  
  mediator_update :: system_state -> string -> system_state
  mediator_update ((n1, v1), (n2, v2)) "sync" = ((n1, v1), (n2, v1))
  mediator_update ((n1, v1), (n2, v2)) "swap" = ((n1, v2), (n2, v1))
  mediator_update s _ = s
  
  initial_system :: system_state
  initial_system = (("A", 10), ("B", 20))
  
  synced_system :: system_state
  synced_system = mediator_update initial_system "sync"
tags: [miranda, behavioral, mediator, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
