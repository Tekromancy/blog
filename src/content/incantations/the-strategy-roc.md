---
title: The Strategy of Duels
description: Swapping out combat algorithms dynamically during a wizard's duel.
type: roc
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Combat"
tags: [fast-functional-wards, roc, strategy, functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
formula: |2
  interface DuelStrategy
      exposes [Strategy, executeStrategy, aggressive, defensive]
      imports []

  Strategy : (U64 -> U64)

  aggressive : Strategy
  aggressive = \mana -> mana * 2

  defensive : Strategy
  defensive = \mana -> mana / 2

  executeStrategy : Strategy, U64 -> U64
  executeStrategy = \strat, mana ->
      strat mana
---
