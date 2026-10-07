---
title: "The Decorator"
description: "Dynamically attaching additional mathematical invariances to a ward without altering its core geometry."
type: lean
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  namespace MathematicalWards

  class Ward (W : Type) where
    power : W → Nat

  structure CoreWard where
    basePower : Nat

  instance : Ward CoreWard where
    power w := w.basePower

  structure ElementalDecorator (W : Type) where
    inner : W
    bonus : Nat

  instance {W : Type} [Ward W] : Ward (ElementalDecorator W) where
    power w := Ward.power w.inner + w.bonus

  def decorated : ElementalDecorator CoreWard :=
    { inner := { basePower := 10 }, bonus := 5 }

  #eval Ward.power decorated -- 15

  end MathematicalWards
tags: [structural, lean4, decorator, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Decorators in Lean 4 wrap existing types and delegate typeclass behavior while augmenting functionality.
