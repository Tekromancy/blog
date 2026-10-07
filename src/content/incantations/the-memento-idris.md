---
title: "The Memento: The Chrono-Anchor"
description: "Capturing and externalizing the internal state of a spell to allow for temporal restoration."
type: idris
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  module Memento
  
  -- The Memento (State Snapshot)
  record ChronoSnapshot where
    constructor MkSnapshot
    energyLevel : Nat
    phase : String
  
  -- The Originator
  record RitualState where
    constructor MkRitual
    energyLevel : Nat
    phase : String
  
  saveState : RitualState -> ChronoSnapshot
  saveState (MkRitual e p) = MkSnapshot e p
  
  restoreState : ChronoSnapshot -> RitualState
  restoreState (MkSnapshot e p) = MkRitual e p
  
  -- Temporal execution
  mutate : RitualState -> RitualState
  mutate (MkRitual e _) = MkRitual (e + 100) "Unstable"
tags: [behavioral, state-preservation, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Time is notoriously brittle in the higher realms. The Memento pattern serves as a Chrono-Anchor, taking an immutable snapshot (`ChronoSnapshot`) of a `RitualState` before embarking on highly volatile transmutations. If the ritual spirals into instability, the Theorem Proving Pacts permit an immediate rollback. In Idris, pure functions make state restoration not just safe, but a fundamental property of the language.
