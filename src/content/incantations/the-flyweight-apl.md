---
title: The Flyweight
description: Cache alien memory fragments to save multidimensional processing power.
type: apl
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory-Caching"
formula: |2
  :Class GeneticMemory
      :Field Public Sequence

      ∇ Make Seq
        :Access Public
        :Implements Constructor
        Sequence ← Seq
        ⎕ ← 'Synthesizing new sequence: ', Sequence
      ∇
  :EndClass

  :Class MemoryPool
      :Field Private Shared Cache ← 0 2 ⍴ ''

      ∇ R←GetMemory Seq
        :Access Public Shared
        :If (⊂Seq) ∊ Cache[;1]
            R ← ⊃Cache[;2] /⍨ (⊂Seq) = Cache[;1]
            ⎕ ← 'Retrieved from cache.'
        :Else
            R ← ⎕NEW GeneticMemory (Seq)
            Cache ← Cache ⍪ Seq R
        :EndIf
      ∇
  :EndClass
tags: [apl, structural, alien, flyweight, genetics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When generating billions of alien spores, instantiating identical genetic structures repeatedly collapses the system's multidimensional memory bounds. The Flyweight pattern intervenes by utilizing a localized cache array (`Cache ← 0 2 ⍴ ''`). It checks whether the required genetic sequence exists using membership (`∊`) and replication (`/⍨`), sharing the instances and saving unfathomable processing power.
