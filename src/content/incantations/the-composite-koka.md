---
title: The Composite Coven
description: Treats individual mages and covens of mages uniformly as components of a grand ritual.
type: koka
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Enchantment // Binding"
formula: |2
  type ritual-component
    Mage(name: string, power: int)
    Coven(name: string, members: list<ritual-component>)
  
  fun calculate-power(c: ritual-component) : int
    match c
      Mage(_, p) -> p
      Coven(_, members) -> members.map(calculate-power).sum
  
  pub fun main()
    val m1 = Mage("Alistair", 10)
    val m2 = Mage("Morrigan", 15)
    val coven = Coven("Circle of Ash", [m1, m2, Coven("Initiates", [Mage("Apprentice", 2)])])
    println("Total Coven Power: " ++ calculate-power(coven).show)
tags: [koka, composite, adt]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
