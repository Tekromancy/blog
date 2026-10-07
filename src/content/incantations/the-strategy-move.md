---
title: The Strategy of Combat Multipliers
description: Define a family of algorithms, encapsulate each one, and make them interchangeable in Move.
type: move
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  module arcane::strategy {
      struct AttackStrategy has drop {
          multiplier: u64,
          base_damage: u64,
      }
  
      public fun create_aggressive(): AttackStrategy {
          AttackStrategy { multiplier: 2, base_damage: 10 }
      }
  
      public fun create_defensive(): AttackStrategy {
          AttackStrategy { multiplier: 1, base_damage: 5 }
      }
  
      public fun execute(strategy: &AttackStrategy): u64 {
          strategy.multiplier * strategy.base_damage
      }
  }
tags: [behavioral, strategy, move, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
