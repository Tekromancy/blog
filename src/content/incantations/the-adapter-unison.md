---
title: The Adapter
description: Convert the interface of an ancient spell into one expected by modern magical theories.
type: unison
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Spell Translation"
formula: |2
  -- Ancient interface
  structural type OldSpell = OldSpell (Text -> Nat)
  
  ancientCast : OldSpell -> Text -> Nat
  ancientCast s t = match s with
    OldSpell f -> f t
    
  -- Modern interface
  structural type NewSpell = NewSpell (Nat -> Boolean)
  
  -- The Adapter
  adaptSpell : OldSpell -> NewSpell
  adaptSpell s = NewSpell (n -> (ancientCast s "mana") > n)
tags: [structural, adapter, unison, functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Ancient spells, written in lost dialects of the weave, often possess incompatible geometries with modern casting circles. The Adapter pattern wraps the old construct in a new, pure function. Unison's type system ensures that this translation is sound and content-addressable, seamlessly integrating the ancient `OldSpell` into the `NewSpell` architecture.
