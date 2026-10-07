---
title: "The Visitor of Heterogeneous Datums"
description: "Applying operations across distinct data structures without modifying them."
type: plutus
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Pattern Matching"
formula: |2
  module LedgerMonad.Visitor where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Heterogeneous Elements
  data Spell
      = Fireball Integer
      | FrostNova Integer Integer
  PlutusTx.unstableMakeIsData ''Spell
  
  -- The Visitor Interface (A function mapping the sum type to a result)
  type SpellVisitor a = Spell -> a
  
  -- Concrete Visitors
  {-# INLINABLE manaCostVisitor #-}
  manaCostVisitor :: SpellVisitor Integer
  manaCostVisitor (Fireball dmg) = dmg * 2
  manaCostVisitor (FrostNova range freeze) = range + freeze
  
  {-# INLINABLE isLethalVisitor #-}
  isLethalVisitor :: SpellVisitor Bool
  isLethalVisitor (Fireball dmg) = dmg > 50
  isLethalVisitor (FrostNova _ freeze) = freeze > 100
  
  -- The Execution
  {-# INLINABLE visitorValidator #-}
  visitorValidator :: Spell -> BuiltinData -> ScriptContext -> Bool
  visitorValidator spell _ _ =
      let cost = manaCostVisitor spell
          lethal = isLethalVisitor spell
      in traceIfFalse "Spell too weak!" lethal && traceIfFalse "Spell too costly!" (cost < 200)
tags: [visitor, plutus, divination, pattern-matching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In object-oriented realms, the Visitor traverses complex class hierarchies. In the pure functional world of Plutus, the Visitor pattern is elegantly expressed through exhaustive pattern matching on Algebraic Data Types (Sum Types). The Diviner constructs a Visitor as a standalone function that maps every possible constructor of a `Datum` to a specific result, fully decoupling the operational logic from the data definition itself.
