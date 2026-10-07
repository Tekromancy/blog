---
title: The Bridge of Spell Casting
description: Decouple abstraction from implementation using generic phantom types in Move.
type: move
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Channeling"
formula: |2
  module arcane::bridge {
      // Abstraction
      struct Spell<phantom Implementation> has store, drop {
          mana_cost: u64,
      }
  
      // Implementations
      struct FireMagic {}
      struct WaterMagic {}
  
      public fun create_fire_spell(cost: u64): Spell<FireMagic> {
          Spell { mana_cost: cost }
      }
  
      public fun cast<Impl>(spell: &Spell<Impl>): u64 {
          spell.mana_cost
      }
  }
tags: [structural, bridge, move, phantom-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
