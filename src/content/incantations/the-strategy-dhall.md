---
title: Strategy in Dhall
description: Inject algorithmic logic dynamically into higher-order evaluation spells.
type: dhall
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Tactics"
formula: |2
  let Strategy = Natural -> Natural -> Natural
  
  let addStrategy : Strategy = \(a : Natural) -> \(b : Natural) -> a + b
  let multStrategy : Strategy = \(a : Natural) -> \(b : Natural) -> a * b
  
  let executeRune = \(strat : Strategy) -> \(a : Natural) -> \(b : Natural) ->
        strat a b
  
  in  executeRune multStrategy 5 10
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Due to its nature as a functional language, Dhall treats functions as first-class citizens. The **Strategy** pattern requires no complex object instantiation; an archmage simply passes the desired mathematical or configuration transformation as a function argument, swapping execution tactics with total halting confidence.
