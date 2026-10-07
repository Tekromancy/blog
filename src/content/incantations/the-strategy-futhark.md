---
title: "The Strategy: Interchangeable Kernels"
description: "Inject arbitrary logic algorithms to morph matrix transformations."
type: futhark
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  let execute_strategy [n] (strat: i32 -> i32 -> i32) (arr1: [n]i32) (arr2: [n]i32) : [n]i32 =
    map2 strat arr1 arr2
    
  let strategy_aggressive x y = x * y
  let strategy_defensive x y = x + y
tags: [futhark, strategy, map2]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
