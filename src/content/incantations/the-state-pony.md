---
title: The State Ward
description: Morphing behaviors based on arcane phases.
type: pony
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  trait val ElementalState
    fun attack(): String val

  class val FireState is ElementalState
    fun attack(): String val => "Burn!"

  class Golem
    var _state: ElementalState val
    new create() => _state = EarthState
    fun ref shift(s: ElementalState val) => _state = s
tags: [pony, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The State Ward

State instances can be cleanly implemented as interchangeable `val` objects, allowing rapid shifting between behavioral modes.
