---
title: The Decorator
description: Enhancing spell effects via higher-order functions.
type: gleam
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Aura Enhancement"
formula: |2
  pub type SpellFn = fn(Int) -> Int

  pub fn base_fireball(mana: Int) -> Int {
    mana * 2
  }

  pub fn empower(spell: SpellFn) -> SpellFn {
    fn(mana) { spell(mana) + 10 }
  }

  pub fn maximize(spell: SpellFn) -> SpellFn {
    fn(mana) { spell(mana) * 3 }
  }

  // Usage:
  // let ultimate_fireball = base_fireball |> empower |> maximize
tags: [transmutation, decorator, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator
Higher-order functions wrap simple spells in layered auras of immense power.
