---
title: "The Strategy Algorithm"
description: "Defining a family of algorithms, encapsulating each one, and making them interchangeable."
type: agda
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Computation"
formula: |2
  module StrategyPattern where
  
  open import Data.Nat
  
  Strategy : Set
  Strategy = ℕ → ℕ → ℕ
  
  addStrat : Strategy
  addStrat x y = x + y
  
  execute : Strategy → ℕ → ℕ → ℕ
  execute s x y = s x y
tags: ["agda", "strategy", "algorithms"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Strategy Algorithm

Combat subroutines require immediate adaptation. If brute-force cracking fails, the ICE-breaker must swap to stealth injection. The **Strategy Algorithm** keeps these varying tactics interchangeable.

## The Dependent Runes

In Agda, strategies are beautifully reduced to First-Class Functions. You merely pass the logic (`Strategy`) as an argument to the executing shell.
