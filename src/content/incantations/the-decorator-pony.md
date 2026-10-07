---
title: The Decorator Ward
description: Layering protective enchantments.
type: pony
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Layered Warding"
formula: |2
  trait val Shield
    fun absorb(damage: U32): U32

  class val FrostAura is Shield
    let _base: Shield val
    new create(b: Shield val) => _base = b
    fun absorb(damage: U32): U32 => _base.absorb(damage) - 10
tags: [pony, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Decorator Ward

Decorators augment capabilities. Stacking immutable objects safely chains their effects without mutating underlying states.
