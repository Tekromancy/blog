---
title: "The State: The Metamorphic Soul"
description: "Allowing an entity to alter its behavior when its internal metaphysical state shifts."
type: idris
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  module State
  
  -- The State interface
  interface EntityState s where
    react : s -> String
  
  data Calm = MkCalm
  EntityState Calm where
    react _ = "The entity hums peacefully."
  
  data Enraged = MkEnraged
  EntityState Enraged where
    react _ = "The entity lashes out with void-fire!"
  
  -- The Context
  data Golem : Type where
    MkGolem : EntityState s => s -> Golem
  
  pokeGolem : Golem -> String
  pokeGolem (MkGolem s) = react s
tags: [behavioral, state-machine, dependent-pairs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A creature born of the Theorem Proving Pacts is rarely static. The State pattern encapsulates its varying behaviors into distinct metaphysical forms—`Calm` or `Enraged`. By storing the current state within an existential envelope (`Golem`), the entity alters its reaction dynamically. Idris's rigid type constraints verify that regardless of the metamorphic phase, the entity will never fail to respond to the `react` protocol.
