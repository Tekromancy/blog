---
title: The State Metamorphosis
description: Allows an arcane entity to alter its behavior when its internal elemental state changes.
type: koka
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  type elemental-state
    Solid
    Liquid
    Gas
  
  fun react(s: elemental-state) : string
    match s
      Solid -> "The ice blocks the attack."
      Liquid -> "The water flows around the blade."
      Gas -> "The mist dissipates and reforms."
  
  pub fun main()
    var current := Solid
    println(react(current))
    current = Liquid
    println(react(current))
    current = Gas
    println(react(current))
tags: [koka, state, adt, mutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
