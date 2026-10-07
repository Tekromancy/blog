---
title: The Decorator Glyph
description: Dynamically attach new enchantments to an artifact without altering its base composition.
type: scala
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Imbuement"
formula: |2
  trait Weapon {
    def damage: Int
    def description: String
  }

  class BaseSword extends Weapon {
    def damage: Int = 10
    def description: String = "Iron Sword"
  }

  trait WeaponEnchantment extends Weapon {
    def base: Weapon
    def damage: Int = base.damage
    def description: String = base.description
  }

  class Flaming(val base: Weapon) extends WeaponEnchantment {
    override def damage: Int = super.damage + 5
    override def description: String = s"Flaming ${super.description}"
  }

  class Vorpal(val base: Weapon) extends WeaponEnchantment {
    override def damage: Int = super.damage + 15
    override def description: String = s"Vorpal ${super.description}"
  }
tags: [scala, structural, enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Stacking buffs. The Decorator allows a pure base object to be enveloped in multiple, stackable layers of arcane modifiers.
