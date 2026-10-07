---
title: "The Memento Incantation in Carbon"
description: "Capture and externalize an object's internal state so it can be perfectly restored later."
type: carbon
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Reversal"
formula: |2
  package Memento api;

  class ChronoMemento {
    var state_snapshot: String;
    
    fn GetState[me: Self]() -> String { return me.state_snapshot; }
  }

  class TemporalCore {
    var state: String;

    fn SetState[addr me: Self*>(new_state: String) {
      (*me).state = new_state;
    }

    fn SaveToMemento[me: Self]() -> ChronoMemento {
      return {.state_snapshot = me.state};
    }

    fn RestoreFromMemento[addr me: Self*>(m: ChronoMemento) {
      (*me).state = m.GetState();
    }
  }
tags: [behavioral, carbon, state, undo]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento: The Chronomancer's Save State

Operating deep within high-risk memory sectors means inevitable failure. The Memento pattern allows an object to take a snapshot of its internal configuration, exporting it securely without breaking encapsulation.

Carbon's strict privacy boundaries are respected here. The `TemporalCore` creates a `ChronoMemento` containing its variables. A caretaker object can store these Mementos but cannot alter their internals. If a transaction corrupts the core, the Chronomancer simply invokes `RestoreFromMemento`, shifting the timeline back to a stable state.
