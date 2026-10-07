---
title: The Decorator of Enchanted Wands
description: Attach additional responsibilities to objects dynamically by wrapping resources in Move.
type: move
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Artifice"
formula: |2
  module arcane::decorator {
      struct BaseWand has store, drop { power: u64 }
      
      struct EnchantedWand has store, drop {
          wand: BaseWand,
          bonus_power: u64,
      }
  
      public fun enchant(wand: BaseWand, bonus: u64): EnchantedWand {
          EnchantedWand { wand, bonus_power: bonus }
      }
  
      public fun total_power(ew: &EnchantedWand): u64 {
          ew.wand.power + ew.bonus_power
      }
  }
tags: [structural, decorator, move, enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
