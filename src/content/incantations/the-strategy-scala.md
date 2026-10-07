---
title: The Strategy Stance
description: Swap arcane algorithms on the fly depending on the weakness of the entity you are battling.
type: scala
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Divination // Tactics
formula: |
  type AttackStrategy = (Int) => Int

  val fireBlast: AttackStrategy = power => power * 2
  val frostNova: AttackStrategy = power => power + 10

  class BattleMage(var strategy: AttackStrategy) {
    def cast(basePower: Int): Int = strategy(basePower)
  }

  // Usage:
  // val mage = new BattleMage(fireBlast)
  // println(mage.cast(10)) // 20
  // mage.strategy = frostNova
tags: [scala, behavioral, tactics, functions-as-objects]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In Scala, functions are first-class citizens. The Strategy pattern is radically simplified by merely passing different function values representing the algorithms.
