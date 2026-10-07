---
title: The Decorator
description: Attach additional responsibilities to a spell dynamically via functional composition.
type: unison
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  type SpellFunction = Nat -> Nat
  
  baseSpell : SpellFunction
  baseSpell n = n * 2
  
  empower : SpellFunction -> SpellFunction
  empower spell n = (spell n) + 10
  
  echo : SpellFunction -> SpellFunction
  echo spell n = 
    first = spell n
    first + (spell first)
    
  -- Applying decorators through function composition
  ultimateSpell : SpellFunction
  ultimateSpell = empower (echo baseSpell)
tags: [structural, decorator, unison, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the object-oriented realms, the Decorator requires complex wrapper classes. In Unison's functional paradigm, decorators are simply higher-order functions or functions that compose over the original spell. By passing a function into a modifier, you weave new enchantments around it, creating a new, uniquely hashed spell that carries the combined properties.
