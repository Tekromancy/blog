---
title: "The Adapter of Datum Morphing"
description: "Bridging incompatible UTxO interfaces through Redeemer-driven transmutation."
type: plutus
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Datum Morphing"
formula: |2
  module LedgerMonad.Adapter where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Ancient Interface (Old Datum)
  data AncientDatum = AncientDatum { ancientPower :: Integer }
  
  -- The Modern Interface (New Datum)
  data ModernDatum = ModernDatum { modernEnergy :: Integer, modernPhase :: Integer }
  
  -- The Transmuter's Catalyst (Adapter Function)
  {-# INLINABLE adaptDatum #-}
  adaptDatum :: AncientDatum -> ModernDatum
  adaptDatum (AncientDatum p) = ModernDatum p 0
  
  -- The Adapting Ritual
  {-# INLINABLE validateAdapter #-}
  validateAdapter :: AncientDatum -> BuiltinData -> ScriptContext -> Bool
  validateAdapter oldDatum _ ctx =
      let modernDatum = adaptDatum oldDatum
      in validateModern modernDatum ctx
  
  {-# INLINABLE validateModern #-}
  validateModern :: ModernDatum -> ScriptContext -> Bool
  validateModern (ModernDatum e p) _ = e > p
tags: [adapter, plutus, transmutation, datum]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When an ancient smart contract leaves UTxOs trapped in a forgotten schema, the Transmuter employs the Adapter pattern. Rather than rewriting the ancient scripts (which is impossible on an immutable ledger), we craft a new Validator that wraps the old Datum, mutating its shape at runtime into a modern interface compatible with our new spellbooks.
