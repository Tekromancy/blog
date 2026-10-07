---
title: The State Pattern
description: Altering a magical entity's behavior when its internal state changes.
type: swift
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Polymorph
formula: |
  protocol ElementalState {
      func attack()
  }
  class WaterState: ElementalState {
      func attack() { print("Casting Water Whip") }
  }
  class IceState: ElementalState {
      func attack() { print("Casting Ice Shards") }
  }
  class Elemental {
      var state: ElementalState = WaterState()
      func attack() { state.attack() }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State: The Shifting Elemental

The State pattern allows an `Elemental` to change its attack style dynamically as it shifts from `WaterState` to `IceState`.
