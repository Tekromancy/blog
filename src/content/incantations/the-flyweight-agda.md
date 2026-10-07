---
title: "The Flyweight Dust"
description: "Sharing massive amounts of fine-grained objects to save memory."
type: agda
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Mass Optimization"
formula: |2
  module FlyweightPattern where
  
  open import Data.String
  
  record SharedRune : Set where
    field glyph : String
    
  record Particle : Set where
    field
      x y : String
      base : SharedRune
tags: ["agda", "flyweight", "optimization"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Flyweight Dust

When rendering millions of glowing cyber-particles in a holographic blast, storing the full matrix per particle causes immediate RAM overflow. The **Flyweight Dust** shares common intrinsic state among all instances.

## The Dependent Runes

By separating the `SharedRune` (intrinsic state) from the extrinsic state (`x`, `y` positions), we create efficient arrays of pointers. In pure Agda, this naturally flows from structural sharing in functional data structures.
