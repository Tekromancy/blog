---
title: "The Composite of Merkle Trees"
description: "Treating single Datums and trees of Datums uniformly."
type: plutus
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Merkle Trees"
formula: |2
  module LedgerMonad.Composite where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Recursive Arcane Structure
  data CompositeState
      = Leaf Integer
      | Node [CompositeState]
  
  {-# INLINABLE evaluateState #-}
  evaluateState :: CompositeState -> Integer
  evaluateState (Leaf val) = val
  evaluateState (Node children) = sum (map evaluateState children)
  
  -- The Conjuration Ritual
  {-# INLINABLE validateComposite #-}
  validateComposite :: CompositeState -> BuiltinData -> ScriptContext -> Bool
  validateComposite state _ _ =
      let totalMana = evaluateState state
      in traceIfFalse "Insufficient composite mana!" (totalMana > 100)
      
  -- Note: sum and map need specific PlutusTx equivalents in production,
  -- simplified here for the purity of the incantation.
tags: [composite, plutus, conjuration, merkle]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern manifests when the Conjurer must treat a single drop of mana (a Leaf) and a vast reservoir (a Node tree) with the same invocation. By structuring the Datum as an algebraic data type with recursive branches, the smart contract evaluates complex nested state machines as if they were a singular entity.
