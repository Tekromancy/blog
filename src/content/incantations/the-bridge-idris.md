---
title: "The Bridge: Separation of Grimoire and Spell"
description: "Decoupling abstraction from implementation to allow both to evolve independently."
type: idris
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Illusion // Decoupling"
formula: |2
  module Bridge
  
  -- Implementor
  interface ManaCore c where
    drawMana : c -> Nat
  
  data VoidCore = MkVoidCore
  ManaCore VoidCore where
    drawMana _ = 100
  
  data StarCore = MkStarCore
  ManaCore StarCore where
    drawMana _ = 500
  
  -- Abstraction
  data Grimoire = MkGrimoire (c : Type) (ManaCore c => c)
  
  castUltimate : Grimoire -> String
  castUltimate (MkGrimoire c core) = 
    "Casting with power level: " ++ show (drawMana core)
tags: [structural, decoupling, dependent-pairs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern detaches the abstract manifestation of a spell (`Grimoire`) from its underlying power source (`ManaCore`). Utilizing Idris's existential types and interface constraints, the Theorem Proving Pacts allow any valid mana core to be slotted into the grimoire. The compiler ensures that only cores capable of satisfying the `ManaCore` pact are permitted.
