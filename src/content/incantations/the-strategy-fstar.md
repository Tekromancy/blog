---
title: The Strategy of Magical Combat
description: Swapping out combat algorithms dynamically based on enemy weaknesses.
type: fstar
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Combat"
formula: |2
  module Strategy
  
  type enemy = { is_weak_to_fire: bool }
  type attack_strategy = enemy -> nat
  
  let fire_attack : attack_strategy = fun e ->
    if e.is_weak_to_fire then 100 else 10
    
  let physical_attack : attack_strategy = fun e ->
    50
    
  let execute_attack (strat: attack_strategy) (e: enemy) : nat =
    strat e
tags: [strategy, algorithms, combat]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Higher-order functions inherently provide the Strategy pattern. Combat strategies are simply functions swapped at will.
