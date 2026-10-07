---
title: The Flyweight Sigil
description: Minimizes memory usage by sharing intrinsic state of thousands of glowing runes.
type: koka
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  struct rune-type( color: string, glow: bool )
  struct rune( x: int, y: int, rtype: rune-type )
  
  val fire-rune-type = rune-type("red", True)
  val frost-rune-type = rune-type("blue", False)
  
  pub fun main()
    val r1 = rune(10, 20, fire-rune-type)
    val r2 = rune(15, 25, fire-rune-type)
    val r3 = rune(0, 0, frost-rune-type)
    println("Rune at " ++ r1.x.show ++ " is " ++ r1.rtype.color)
tags: [koka, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
