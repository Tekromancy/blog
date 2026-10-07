---
title: The Decorator Ward
description: Dynamically adds defensive wards to an existing spell using nested effect handlers.
type: koka
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  effect castable
    ctl cast-base() : string
  
  fun empower-ward(action: () -> <castable|e> a) : <castable|e> a
    with handler
      ctl cast-base() resume("Empowered " ++ cast-base())
    action()
  
  fun echo-ward(action: () -> <castable|e> a) : <castable|e> a
    with handler
      ctl cast-base() { val res = cast-base(); resume(res ++ " (echo: " ++ res ++ ")") }
    action()
  
  pub fun main()
    with handler
      ctl cast-base() resume("Magic Missile")
    with echo-ward
    with empower-ward
    println(cast-base())
tags: [koka, decorator, effect-nesting]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
