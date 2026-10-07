---
title: The Adapter of Legacy Runes
description: Bridge incompatible spellcasting interfaces by adapting legacy resource structures in Move.
type: move
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Metamagic"
formula: |2
  module arcane::adapter {
      // Legacy Rune System
      struct OldRune has store, drop { val: u64 }
      
      // New Spell System
      struct NewSpell has store, drop { power: u64 }
  
      // Adapter function to safely consume and convert OldRune to NewSpell
      public fun adapt_rune(rune: OldRune): NewSpell {
          let OldRune { val } = rune;
          NewSpell { power: val * 10 }
      }
  }
tags: [structural, adapter, move, integration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
