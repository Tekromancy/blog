---
title: Strategy in Elm
description: Injecting algorithmic behavior dynamically via first-class functions in Elm.
type: elm
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Algorithmic Injection"
formula: |2
  module Strategy exposing (SortStrategy, sortData, ascStrategy, descStrategy)
  
  -- The Strategy is just a function signature
  type alias SortStrategy =
      List Int -> List Int
  
  -- Implementations of the Strategy
  ascStrategy : SortStrategy
  ascStrategy =
      List.sort
  
  descStrategy : SortStrategy
  descStrategy =
      List.sort >> List.reverse
  
  -- Context using the Strategy
  sortData : SortStrategy -> List Int -> List Int
  sortData strategy data =
      strategy data
tags: [elm, behavioral, strategy, first-class-functions, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Strategy: The Interchangeable Algorithms

The Strategy pattern is trivially elegant in functional programming. Because functions in Elm are first-class citizens, they do not need to be wrapped inside interface-implementing classes. The "Strategy" is simply a type alias for a function signature. The magus passes the desired sorting incantation as an argument to the context function, radically altering its behavior at runtime with zero structural boilerplate.
