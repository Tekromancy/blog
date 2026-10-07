---
title: The Iterator
description: Traverse hyper-dimensional organic arrays safely.
type: apl
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Array-Traversal"
formula: |2
  :Class BiomassIterator
      :Field Private Collection
      :Field Private Index ← 1

      ∇ Make Coll
        :Access Public
        :Implements Constructor
        Collection ← Coll
      ∇

      ∇ R←HasNext
        :Access Public
        R ← Index ≤ ≢Collection
      ∇

      ∇ R←Next
        :Access Public
        R ← Collection[Index]
        Index ← Index + 1
      ∇
  :EndClass

  :Class AlienBiomass
      :Field Private Cells ← '⍋' '⍒' '⍟' '⌾'

      ∇ R←GetIterator
        :Access Public
        R ← ⎕NEW BiomassIterator (Cells)
      ∇
  :EndClass
tags: [apl, behavioral, alien, iterator, array-traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Though APL natively excels at acting on arrays holistically, there are moments when alien biomatter must be dissected and traversed sequentially to avoid awakening a defense matrix. The Iterator abstracts the traversal mechanism away from the underlying collection (`Cells`), allowing an external entity to sequentially read the organic arrays (`⍋ ⍒ ⍟ ⌾`) while maintaining the aggregate structure's integrity.
