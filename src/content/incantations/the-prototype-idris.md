---
title: "The Prototype: Arcane Cloning"
description: "Duplicating existing enchantments and structures via deep, mathematically pure copies."
type: idris
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Replicant"
formula: |2
  module Prototype
  
  -- A record that can be cloned
  record CloneableSoul where
    constructor MkSoul
    memoryCore : String
    powerLevel : Nat
  
  interface Prototype p where
    clone : p -> p
  
  Prototype CloneableSoul where
    -- In pure functional Idris, data is immutable, so cloning is trivial,
    -- but we can simulate divergence if desired.
    clone (MkSoul mc pl) = MkSoul mc pl
  
  diverge : CloneableSoul -> CloneableSoul
  diverge s = record { powerLevel = s.powerLevel + 1 } s
tags: [creational, pure-functions, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the functional realms of Idris, the Prototype pattern takes on a spectral beauty. Since data is inherently immutable, an exact copy of a `CloneableSoul` costs nothing—it is a pure reference. However, the Theorem Proving Pacts allow for controlled divergence. The clone can be mutated via record updates to forge an entity that is identical in memory core but divergent in power, sidestepping the costly rituals of from-scratch conjuration.
