---
title: The Flyweight of the Ancestral Monad
description: Sharing pure immutable state to minimize memory usage within the Ancestral Monad.
type: miranda
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Ancestral Monad"
formula: |2
  || Flyweight leverages referential transparency of the Ancestral Monad.
  
  intrinsic_state == string
  extrinsic_state == num
  
  flyweight :: intrinsic_state -> extrinsic_state -> string
  flyweight intr extr = "Intrinsic: " ++ intr ++ ", Extrinsic: " ++ show extr
  
  shared_flyweight :: extrinsic_state -> string
  shared_flyweight = flyweight "SharedMonadicCore"
  
  client_calls :: [string]
  client_calls = map shared_flyweight [1, 2, 3, 4, 5]
tags: [miranda, structural, flyweight, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
