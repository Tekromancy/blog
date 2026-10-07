---
title: "The Abstract Factory: Arrays of Infinite Synthesis"
description: "Parameterize your array generations across modular parallel dimensions."
type: futhark
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  module type RuneFactory = {
    type rune
    val forge : i32 -> rune
    val resonance : rune -> i32
  }
  
  module FireFactory : RuneFactory = {
    type rune = i32
    let forge (x: i32) = x * 2
    let resonance (x: rune) = x + 10
  }
tags: [futhark, gpu, factory, modules]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
