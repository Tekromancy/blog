---
title: "The Factory Method: The Weaver's Choice"
description: "Delaying the manifestation of magical entities until runtime, secured by type boundaries."
type: idris
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Manifestation"
formula: |2
  module FactoryMethod
  
  -- The product
  data Automaton = CombatBot | RepairDrone | ReconScout
  
  -- The Creator Interface
  interface AutomatonForge f where
    summonAutomaton : f -> String -> Maybe Automaton
  
  -- A specific Forge
  data NeonForge = MkNeonForge
  
  AutomatonForge NeonForge where
    summonAutomaton _ "combat" = Just CombatBot
    summonAutomaton _ "repair" = Just RepairDrone
    summonAutomaton _ _ = Nothing
tags: [creational, polymorphism, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method allows an archmage to establish a blueprint for conjuration while deferring the exact nature of the summoned entity. In the Theorem Proving Pacts, this delayed binding is heavily scrutinized by the Idris compiler, returning a `Maybe Automaton` to signify the chaotic, unpredictable nature of summoning based on runtime telemetry strings.
