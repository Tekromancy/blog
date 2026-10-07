---
title: The Bridge
description: Decoupling abstractions from implementations via function injection.
type: gleam
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Planar Binding"
formula: |2
  pub type CastingFocus {
    Wand
    Staff
  }

  pub type Spell {
    Spell(
      name: String,
      cast_impl: fn(CastingFocus) -> String
    )
  }

  pub fn cast_spell(spell: Spell, focus: CastingFocus) -> String {
    spell.cast_impl(focus)
  }
tags: [transmutation, bridge, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge
By passing first-class functions, we decouple the spell's abstraction from its material implementation.
