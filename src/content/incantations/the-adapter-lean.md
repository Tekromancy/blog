---
title: "The Adapter"
description: "Translating incompatible magical interfaces into a uniform mathematical ward interface."
type: lean
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Formatting"
formula: |2
  namespace MathematicalWards

  class AbsoluteWard (W : Type) where
    deflect : W → String

  structure LegacyShield where
    durability : Nat

  def LegacyShield.block (s : LegacyShield) : String :=
    s!"Blocked with legacy durability {s.durability}"

  instance : AbsoluteWard LegacyShield where
    deflect s := s.block

  def castWard {W : Type} [AbsoluteWard W] (ward : W) : String :=
    AbsoluteWard.deflect ward

  end MathematicalWards
tags: [structural, lean4, adapter, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Adapting a legacy magical construct to the `AbsoluteWard` interface using typeclass instances, transparently unifying old and new ward geometries.
