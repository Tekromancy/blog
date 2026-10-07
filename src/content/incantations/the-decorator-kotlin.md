---
title: The Decorator Hex
description: Dynamically weaving additional wards onto a base spell.
type: kotlin
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  interface Spell {
      val manaCost: Int
      fun cast(): String
  }

  class BasicSpell : Spell {
      override val manaCost = 10
      override fun cast() = "Casting spell"
  }

  class EmpoweredSpell(private val spell: Spell) : Spell by spell {
      override val manaCost: Int
          get() = spell.manaCost + 15

      override fun cast() = spell.cast() + " with immense power"
  }
tags: [kotlin, structural, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator Hex

When a spell requires augmentation on the fly, subclassing creates brittle grimoires. The Decorator Hex wraps an existing spell dynamically. In Kotlin, the `by` keyword invokes native delegation magic, allowing us to compose decorators effortlessly and extend functionality without inheriting rigid class structures.
