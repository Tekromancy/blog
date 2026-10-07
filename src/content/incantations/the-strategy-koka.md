---
title: The Strategy Stance
description: Defines a family of combat spells, encapsulating each one, and making them interchangeable.
type: koka
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Combat"
formula: |2
  alias combat-strategy = (int) -> int
  
  val aggressive : combat-strategy = fn(damage) damage * 2
  val defensive : combat-strategy = fn(damage) damage / 2
  
  fun execute-strike(base-dmg: int, strat: combat-strategy) : int
    strat(base-dmg)
  
  pub fun main()
    println("Aggressive strike: " ++ execute-strike(10, aggressive).show)
    println("Defensive strike: " ++ execute-strike(10, defensive).show)
tags: [koka, strategy, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
