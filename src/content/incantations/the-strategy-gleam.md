---
title: The Strategy
description: Swapping algorithms via higher-order functions.
type: gleam
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Forethought"
formula: |2
  pub type AttackStrategy = fn(Int) -> Int

  pub fn aggressive_stance(power: Int) -> Int { power * 2 }
  pub fn defensive_stance(power: Int) -> Int { power / 2 }

  pub fn execute_attack(power: Int, strategy: AttackStrategy) -> Int {
    strategy(power)
  }
tags: [divination, strategy, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Strategy
Passing a function as an argument entirely encapsulates the Strategy pattern in a functional paradigm.
