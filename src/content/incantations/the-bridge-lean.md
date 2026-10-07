---
title: "The Bridge"
description: "Decoupling the abstract formulation of a ward from its concrete geometric implementation."
type: lean
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Geometry"
formula: |2
  namespace MathematicalWards

  class WardImplementation (I : Type) where
    drawSigil : I → String

  structure Glyph where
    id : Nat

  instance : WardImplementation Glyph where
    drawSigil g := s!"Drawing Glyph #{g.id}"

  structure AbstractWard (I : Type) [WardImplementation I] where
    impl : I

  def executeWard {I : Type} [WardImplementation I] (w : AbstractWard I) : String :=
    WardImplementation.drawSigil w.impl

  end MathematicalWards
tags: [structural, lean4, bridge, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge pattern is elegantly handled in Lean 4 by parameterizing the abstract ward structure over an implementation typeclass, separating abstraction from implementation.
