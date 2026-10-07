---
title: The Strategy Hex
description: Swappable algorithms for dynamic spell weaving.
type: kotlin
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  typealias AttackStrategy = (Int) -> Int

  val fireAttack: AttackStrategy = { baseDamage -> baseDamage * 2 }
  val frostAttack: AttackStrategy = { baseDamage -> baseDamage + 5 }

  class ElementalMage(var strategy: AttackStrategy) {
      fun strike(baseDamage: Int) {
          println("Damage dealt: ${strategy(baseDamage)}")
      }
  }
tags: [kotlin, behavioral, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Strategy Hex

Combat is fluid; rigid algorithms fail. The Strategy pattern defines a family of algorithms, encapsulating each, and making them interchangeable. In Kotlin, thanks to higher-order functions, we can often bypass massive class hierarchies entirely, passing simple lambda expressions to represent our tactical permutations.
