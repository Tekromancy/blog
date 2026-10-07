---
title: The Abstract Factory Hex
description: A pragmatic hex for conjuring families of related runes safely.
type: kotlin
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Rune-Weaving"
formula: |2
  interface Rune {
      fun glow(): String
  }

  class FireRune : Rune {
      override fun glow() = "Burning red"
  }

  class FrostRune : Rune {
      override fun glow() = "Chilling blue"
  }

  interface RuneFactory {
      fun createRune(): Rune
  }

  class FireRuneFactory : RuneFactory {
      override fun createRune() = FireRune()
  }

  class FrostRuneFactory : RuneFactory {
      override fun createRune() = FrostRune()
  }
tags: [kotlin, creational, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory Hex

In the depths of the JVM construct, where null-safety forms our protective wards, the Abstract Factory pattern allows us to summon related arcane items without knowing their true physical manifestations. By binding to abstract interfaces, our spellcrafters can weave modular invocations that swap elemental domains with a mere keystroke.
