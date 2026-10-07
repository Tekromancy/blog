---
title: The Strategy of Web Runes
description: Define a family of highly typed combat algorithms, making them interchangeable.
type: purescript
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Foresight"
formula: |2
  module Arcane.Strategy where
  import Prelude

  -- Strategy Interface
  type CombatStrategy = Int -> Int -> String

  aggressiveStance :: CombatStrategy
  aggressiveStance p _ = "Striking with power " <> show (p * 2)

  defensiveStance :: CombatStrategy
  defensiveStance _ d = "Shielding with power " <> show (d * 2)

  executeCombat :: CombatStrategy -> Int -> Int -> String
  executeCombat strategy power defense = strategy power defense
tags: [behavioral, strategy, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
