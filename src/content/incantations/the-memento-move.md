---
title: The Memento of State Preservation
description: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored later in Move.
type: move
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  module arcane::memento {
      struct State has store, copy, drop {
          mana: u64,
          health: u64,
      }
  
      struct Memento has store, drop {
          state: State,
      }
  
      public fun save(state: &State): Memento {
          Memento { state: *state }
      }
  
      public fun restore(memento: &Memento): State {
          *&memento.state
      }
  }
tags: [behavioral, memento, move, state-management]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
