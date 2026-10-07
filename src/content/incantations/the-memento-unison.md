---
title: The Memento
description: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.
type: unison
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Reversal"
formula: |2
  structural type GrimoireState = GrimoireState [Text]
  
  addSpell : Text -> GrimoireState -> GrimoireState
  addSpell s gs = match gs with
    GrimoireState spells -> GrimoireState (s +: spells)
    
  -- Since Unison data structures are immutable, any reference to GrimoireState
  -- is intrinsically a Memento.
  
  timeTravel : GrimoireState -> GrimoireState -> GrimoireState
  timeTravel pastState currentState = pastState
tags: [behavioral, memento, unison, immutability, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Memento pattern seeks to capture state for future restoration. In the mutable realms, this requires complex encapsulation boundaries. In Unison, the world is immutable. Every value is its own perfectly preserved memento. To travel backward in time, a Chronomancer simply retains a reference to the older, content-addressed version of the `GrimoireState` and returns to it at will.
