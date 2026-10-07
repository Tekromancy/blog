---
title: The Abstract Factory Pattern
description: A protocol-oriented conjuration for orchestrating families of related orchard enchantments without specifying their concrete implementations.
type: swift
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Orchardmancy
formula: |
  protocol AppleEnchantment {
      func cast() -> String
  }
  protocol TreeEnchantment {
      func cast() -> String
  }
  protocol OrchardFactory {
      func createAppleEnchantment() -> AppleEnchantment
      func createTreeEnchantment() -> TreeEnchantment
  }
  
  class PoisonAppleEnchantment: AppleEnchantment {
      func cast() -> String { return "Casting poison on the apple..." }
  }
  class PoisonTreeEnchantment: TreeEnchantment {
      func cast() -> String { return "Blighting the tree..." }
  }
  class DarkOrchardFactory: OrchardFactory {
      func createAppleEnchantment() -> AppleEnchantment { return PoisonAppleEnchantment() }
      func createTreeEnchantment() -> TreeEnchantment { return PoisonTreeEnchantment() }
  }
tags: [swift, design-pattern, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Abstract Factory: Orchard Conjuration

In the mystical groves of Apple programming, the Abstract Factory is a protocol-oriented spell. It allows a magus to summon related families of enchantments—such as those affecting apples and trees—without binding their spellbooks to concrete incantations.

Using Swift's powerful protocols, we define the essence of the enchantments. Concrete factories, such as the `DarkOrchardFactory`, provide the specific implementations.
