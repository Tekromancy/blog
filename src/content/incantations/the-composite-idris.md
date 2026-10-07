---
title: "The Composite: Fractal Spell Trees"
description: "Treating single enchantments and sprawling spell clusters uniformly."
type: idris
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Fractal-Weaving"
formula: |2
  module Composite
  
  -- The component
  interface SpellComponent s where
    evaluatePower : s -> Nat
  
  -- Leaf
  data BasicSpell = MkBasicSpell Nat
  
  SpellComponent BasicSpell where
    evaluatePower (MkBasicSpell p) = p
  
  -- Composite
  data SpellCluster : Type -> Type where
    MkCluster : SpellComponent s => List s -> SpellCluster s
  
  SpellComponent (SpellCluster s) where
    evaluatePower (MkCluster xs) = sum (map evaluatePower xs)
tags: [structural, recursion, inductive-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By treating a lone `BasicSpell` and a vast `SpellCluster` interchangeably, the Composite pattern allows technomancers to manipulate fractal arrays of magic. Through Idris's inductive data structures, the Theorem Proving Pacts guarantee that any traversal of the spell tree terminates safely, calculating the aggregate mana cost without fear of infinite cosmic loops.
