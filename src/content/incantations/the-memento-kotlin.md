---
title: The Memento Hex
description: Capturing temporal snapshots of a magical state.
type: kotlin
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Snapshot
formula: |
  data class SoulMemento(val state: String)
  
  class Wizard(var state: String) {
      fun save(): SoulMemento = SoulMemento(state)
      fun restore(memento: SoulMemento) {
          this.state = memento.state
      }
  }
  
  class SoulStone {
      var savedState: SoulMemento? = null
  }
tags: [kotlin, behavioral, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento Hex

Chronomancy is a delicate art. To revert to a previous timeline without violating encapsulation, we employ the Memento Hex. It stores an immutable snapshot of an entity's internal state—a Soul Stone—that can be safely held by an external caretaker and used to restore the wizard if their corporeal form is corrupted.
