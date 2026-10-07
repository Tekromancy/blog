---
title: "The Composite Matrix"
description: "Treating a unified cluster of spells identically to a single spell."
type: agda
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Fractal Weaving"
formula: |2
  module CompositePattern where
  
  open import Data.List
  open import Data.String
  
  data Graphic : Set where
    Leaf : String → Graphic
    Node : List Graphic → Graphic
    
  render : Graphic → String
  render (Leaf s) = s
  render (Node []) = ""
  render (Node (x ∷ xs)) = "Grouped" -- simplified for pure rune representation
tags: ["agda", "composite", "fractal"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite Matrix

A single thread of code or a sprawling hierarchy of interlocking ICE nodes—to the execution engine, they must both respond to the same "invoke" command. The **Composite Matrix** allows us to weave fractals.

## The Dependent Runes

Using an inductive data type, `Graphic`, we easily represent trees of magical effects. Pattern matching handles both individual spells and vast matrices.
