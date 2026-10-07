---
title: The Memento Ward
description: Capturing and restoring timelines.
type: pony
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  class val TimeCrystal
    let state: String val
    new create(s: String val) => state = s

  class Chronomancer
    var _current_state: String val = ""
    fun save(): TimeCrystal val => TimeCrystal(_current_state)
    fun ref restore(m: TimeCrystal val) => _current_state = m.state
tags: [pony, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Memento Ward

Immutable Mementos (`val`) are a perfect fit for Chronomancy. Once captured, state snapshots cannot be tampered with.
