---
title: The Memento
description: Capturing temporal snapshots of state.
type: gleam
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Anchors"
formula: |2
  pub type WorldState {
    WorldState(hp: Int, gold: Int)
  }

  pub type Memento {
    Memento(state: WorldState)
  }

  pub fn save_state(state: WorldState) -> Memento {
    Memento(state)
  }

  pub fn restore_state(memento: Memento) -> WorldState {
    memento.state
  }
tags: [chronomancy, memento, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Memento
In a pure language, every piece of data is an immutable snapshot. The Memento is just the data itself, safely preserved from the river of time.
