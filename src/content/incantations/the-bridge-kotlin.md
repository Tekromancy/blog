---
title: The Bridge Hex
description: Decoupling a magical abstraction from its elemental implementation.
type: kotlin
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Illusion // Construct
formula: |
  interface Enchantment {
      fun applyEffect()
  }
  
  class FireEnchantment : Enchantment {
      override fun applyEffect() = println(" engulfed in flames!")
  }
  
  abstract class Weapon(protected val enchantment: Enchantment) {
      abstract fun swing()
  }
  
  class Sword(enchantment: Enchantment) : Weapon(enchantment) {
      override fun swing() {
          print("Swinging sword...")
          enchantment.applyEffect()
      }
  }
tags: [kotlin, structural, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge Hex

When crafting weapons and enchantments, an explosion of permutations can crash the compile-time matrix. The Bridge Hex separates the abstraction (the weapon) from the implementation (the enchantment), allowing them to evolve independently. This compositional rune keeps our armory flexible and our codebases clean.
