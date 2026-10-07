---
title: "The Memento: Temporal Snapshots"
description: "Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later."
type: alloy
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State-Preservation"
formula: |2
  sig SystemState {}
  
  sig TemporalCore {
    currentState: one SystemState,
    snapshot: one MemoryEngram
  }
  {
    snapshot.savedState = currentState
  }
  
  sig MemoryEngram {
    savedState: one SystemState
  }
  
  sig Archivist {
    storedEngram: lone MemoryEngram
  }
  
  run {} for 3
tags: [behavioral, memento, time]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento: Temporal Snapshots

The `TemporalCore` commits its state to a `MemoryEngram`. Through the constraint block `snapshot.savedState = currentState`, Alloy ensures that at the exact moment of instantiation, the engram is a perfect, immutable reflection of reality. The `Archivist` simply holds the pointer, unaware of the arcane state within.
