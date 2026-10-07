---
title: The Strategy of the Progenitor
description: Swap out the routing logic of tracking spells dynamically.
type: sml
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Planning"
formula: |2
  type strategy = int * int -> string
  
  fun aggressivePathing (x, y) =
    "Charging straight to (" ^ Int.toString x ^ ", " ^ Int.toString y ^ ")"
    
  fun stealthPathing (x, y) =
    "Sneaking through shadows to (" ^ Int.toString x ^ ", " ^ Int.toString y ^ ")"
    
  fun castTrackingSpell (strat: strategy) target =
    print ("Missile launched! " ^ strat target ^ "\n")
    
  val _ = castTrackingSpell aggressivePathing (10, 20)
  val _ = castTrackingSpell stealthPathing (10, 20)
tags: [higher-order functions, algorithms, dynamic dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Strategy pattern is the quintessential use case for higher-order functions. By defining a `strategy` as a function signature, you can cleanly inject different algorithms or tactical plans directly into the core execution flow. A tracking spell cares not *how* the path is calculated, only that the supplied function yields a valid route.
