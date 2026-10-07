---
title: The Prototype Hex
description: Cloning existing magical matrices instead of chanting from scratch.
type: kotlin
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Transmutation // Cloning
formula: |
  data class SpellMatrix(val power: Int, val element: String) : Cloneable {
      public override fun clone(): SpellMatrix {
          return super.clone() as SpellMatrix
      }
  }
  
  // Pragmatic Kotlin way
  val fireBall = SpellMatrix(100, "Fire")
  val greaterFireBall = fireBall.copy(power = 200)
tags: [kotlin, creational, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Prototype Hex

Why spend precious mana re-weaving a complex spell matrix when you can simply clone it? The Prototype hex allows a sorcerer to duplicate existing constructs. In the modern Kotlin paradigm, the true power of Prototype is wielded effortlessly via data classes and their inherent `copy()` invocation, bypassing the perilous `Cloneable` interface entirely.
