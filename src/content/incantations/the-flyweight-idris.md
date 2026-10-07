---
title: "The Flyweight: Shared Leyline Echoes"
description: "Minimizing mana footprint by sharing state across millions of fine-grained spell instances."
type: idris
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory-Weaving"
formula: |2
  module Flyweight
  
  import Data.Vect
  
  -- The intrinsic, shared state
  record RuneCore where
    constructor MkRuneCore
    sigil : String
    baseCost : Nat
  
  -- The extrinsic, unique state
  record CastInstance where
    constructor MkCastInstance
    core : RuneCore
    coordinates : (Double, Double)
  
  -- A shared cache of cores
  fireCore : RuneCore
  fireCore = MkRuneCore "Ignis" 50
  
  iceCore : RuneCore
  iceCore = MkRuneCore "Glacies" 40
  
  spawnStorm : Nat -> RuneCore -> List CastInstance
  spawnStorm n c = replicate n (MkCastInstance c (0.0, 0.0))
tags: [structural, optimization, state-sharing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When an archmage summons a storm of a thousand blades, maintaining the arcane geometry for each blade individually would shatter the mind. The Flyweight separates the intrinsic essence (`RuneCore`) from the extrinsic coordinates. By sharing references to pure, immutable `RuneCore` records, the memory weave remains pristine. The Theorem Proving Pacts ensure that these shared nodes remain immutable and eternally valid.
