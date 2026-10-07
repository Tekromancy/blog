---
title: The Prototype
description: Clone complex hyper-dimensional entities through deep matrix copying.
type: apl
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Cloning-Matrices
formula: |
  :Class Xenomorph
      :Field Public DNA ← ⍬
      
      ∇ Make D
        :Access Public
        :Implements Constructor
        DNA ← D
      ∇
      
      ∇ R←Clone
        :Access Public
        R ← ⎕NEW Xenomorph (DNA)
      ∇
      
      ∇ Mutate M
        :Access Public
        DNA ← DNA , M
      ∇
  :EndClass
  
  ⍝ Usage:
  ⍝ X1 ← ⎕NEW Xenomorph ('⍉⍟')
  ⍝ X2 ← X1.Clone
  ⍝ X2.Mutate '⍋'
tags: [apl, creational, alien, prototype, dna-cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Prototype pattern in APL leverages the native strength of array replication to clone complex xenomorphic organisms. Instead of synthesizing a new entity from scratch—a computationally expensive and arcane process—we duplicate the DNA matrix directly. The `Clone` operation perfectly copies the genetic glyphs (`⍉⍟`), allowing the clone to undergo divergent mutations (`⍋`) without affecting the original.
