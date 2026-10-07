---
title: The Strategy Pattern
description: Selecting a magical algorithm at runtime.
type: swift
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Divination // Tactics
formula: |
  protocol CombatStrategy {
      func executeAttack()
  }
  class AggressiveStrategy: CombatStrategy {
      func executeAttack() { print("Casting Fireball") }
  }
  class DefensiveStrategy: CombatStrategy {
      func executeAttack() { print("Casting Shield") }
  }
  class Duelist {
      var strategy: CombatStrategy
      init(strategy: CombatStrategy) { self.strategy = strategy }
      func fight() { strategy.executeAttack() }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Strategy: The Duelist's Choice

With the Strategy pattern, a `Duelist` can seamlessly swap between an `AggressiveStrategy` and a `DefensiveStrategy` mid-duel.
