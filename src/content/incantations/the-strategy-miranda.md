---
title: The Strategy of the Ancestral Monad
description: Passing algorithmic behavior as pure higher-order functions within the Ancestral Monad.
type: miranda
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || Strategy is simply function parameterization.
  
  strategy == num -> num -> num
  
  strat_add :: strategy
  strat_add x y = x + y
  
  strat_mul :: strategy
  strat_mul x y = x * y
  
  context_execute :: strategy -> num -> num -> num
  context_execute strat a b = strat a b
  
  compute_result :: num
  compute_result = context_execute strat_mul 7 6
tags: [miranda, behavioral, strategy, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
