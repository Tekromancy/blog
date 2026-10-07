---
title: "The Builder: Constructing the Theorem"
description: "Step-by-step manifestation of complex arcane structures, verified by Idris's type system."
type: idris
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct-Assembly"
formula: |2
  module Builder
  
  -- Data type representing a partially constructed spell
  record SpellConstruct where
    constructor MkSpellConstruct
    sigil : String
    mana : Nat
    target : String
  
  -- The Builder Interface
  interface SpellBuilder b where
    initBuilder : b
    addSigil : String -> b -> b
    infuseMana : Nat -> b -> b
    setTarget : String -> b -> b
    manifest : b -> SpellConstruct
  
  -- Concrete Builder
  data RitualBuilder = MkRitualBuilder String Nat String
  
  SpellBuilder RitualBuilder where
    initBuilder = MkRitualBuilder "" Z ""
    addSigil s (MkRitualBuilder _ m t) = MkRitualBuilder s m t
    infuseMana m' (MkRitualBuilder s _ t) = MkRitualBuilder s m' t
    setTarget t' (MkRitualBuilder s m _) = MkRitualBuilder s m t'
    manifest (MkRitualBuilder s m t) = MkSpellConstruct s m t
tags: [state-machine, creational, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To assemble a spell of monumental power requires precision. The Builder pattern in Idris operates as an arcane assembly line, step-by-step refining the `SpellConstruct`. Through Theorem Proving Pacts, each stage of the construction can be statically tracked—preventing the manifestation of a spell before its requisite mana and sigils are strictly bound.
