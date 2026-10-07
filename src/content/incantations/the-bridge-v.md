---
title: "The Bridge Sigil"
description: "Decoupling arcane abstractions from their elemental implementations."
type: v
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Construct Separation"
formula: |2
  module main

  interface Enchantment {
  	apply() string
  }

  struct FireEnchantment {}
  fn (e FireEnchantment) apply() string { return "wreathed in flames" }

  struct VoidEnchantment {}
  fn (e VoidEnchantment) apply() string { return "consuming all light" }

  interface Weapon {
  	wield() string
  }

  struct Sword {
  	enchantment Enchantment
  }
  fn (s Sword) wield() string {
  	return "Swinging a sword " + s.enchantment.apply()
  }

  struct Staff {
  	enchantment Enchantment
  }
  fn (s Staff) wield() string {
  	return "Channeling through a staff " + s.enchantment.apply()
  }

  fn main() {
  	fire_sword := Sword{enchantment: FireEnchantment{}}
  	void_staff := Staff{enchantment: VoidEnchantment{}}

  	println(fire_sword.wield())
  	println(void_staff.wield())
  }
tags: [vlang, bridge, structural, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge Sigil

When your spell matrices grow too complex, cross-multiplying weapons with elements leads to bloated grimoires. The Bridge decouples the high-level Weapon abstraction from the low-level Enchantment implementation. This keeps your Vlang constructs flat, simple, and blazing fast to compile.
