---
title: "The Prototype"
description: "Cloning absolute mathematical wards based on a perfect archetype."
type: lean
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  namespace MathematicalWards

  class Prototypable (T : Type) where
    clone : T → T

  structure PerfectWard where
    axiomCount : Nat
    theorem : String
    deriving Repr

  instance : Prototypable PerfectWard where
    clone w := { axiomCount := w.axiomCount, theorem := w.theorem }

  def replicateWard {T : Type} [Prototypable T] (ward : T) : T :=
    Prototypable.clone ward

  end MathematicalWards
tags: [creational, lean4, prototype, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In functional programming, values are often cloned trivially, but an explicit typeclass for Prototypable objects can still codify the intent of replicating complex mathematical ward states.
