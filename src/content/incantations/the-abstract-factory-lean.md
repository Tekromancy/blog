---
title: "The Abstract Factory"
description: "A mathematical ward that constructs families of absolute enchantments without exposing their concrete proofs."
type: lean
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Abjuration // Geometry"
formula: |2
  namespace MathematicalWards

  class WardFactory (A : Type) where
    createShield : A → String
    createSigil : A → String

  structure AbsoluteWard where
    power : Nat

  instance : WardFactory AbsoluteWard where
    createShield w := s!"Absolute Shield of power {w.power}"
    createSigil w := s!"Absolute Sigil of power {w.power}"

  def invokeWard {A : Type} [WardFactory A] (ward : A) : String × String :=
    (WardFactory.createShield ward, WardFactory.createSigil ward)

  end MathematicalWards
tags: [creational, lean4, abstract-factory, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An abstract factory implemented via typeclasses in Lean 4. It ensures families of related magical objects are instantiated consistently according to mathematical truths.
