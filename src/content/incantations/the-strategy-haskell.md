---
title: The Strategy
description: First-class functions passed as combat tactics.
type: haskell
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Evocation // Tactics
formula: |
  module Strategy where
  type Strategy = Int -> Int -> Int
  addStrategy :: Strategy
  addStrategy = (+)
  execute :: Strategy -> Int -> Int -> Int
  execute s a b = s a b
tags: [strategy, functions, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
