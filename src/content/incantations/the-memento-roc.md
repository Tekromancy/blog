---
title: The Memento of Chronomancy
description: Capturing and restoring the state of the magical weave without exposing its internals.
type: roc
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Transmutation // Chronomancy"
tags: [fast-functional-wards, roc, memento, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface ChronomancyMemento
      exposes [WeaveState, Memento, saveState, restoreState]
      imports []

  WeaveState : {
      mana : U64,
      activeSpells : List Str
  }

  # Memento is simply a saved copy of the record
  Memento : WeaveState

  saveState : WeaveState -> Memento
  saveState = \state -> state

  restoreState : Memento -> WeaveState
  restoreState = \memento -> memento
---
