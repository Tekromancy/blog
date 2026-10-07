---
title: The Memento Pattern
description: Capturing and restoring a wizard's state.
type: swift
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Time-Weaving
formula: |
  class WizardState {
      let mana: Int
      init(mana: Int) { self.mana = mana }
  }
  class Wizard {
      var mana: Int = 100
      func save() -> WizardState { return WizardState(mana: mana) }
      func restore(from memento: WizardState) { self.mana = memento.mana }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento: The Chronomancer's Save

Using Chronomancy, the Memento pattern allows a `Wizard` to save their `mana` state and restore it after a disastrous miscast.
