---
title: "The Flyweight of Reference Inputs"
description: "Sharing massive, immutable state across many transactions via CIP-31."
type: plutus
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Reference Inputs"
formula: |2
  module LedgerMonad.Flyweight where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Massive Oracle Data (The Flyweight)
  data OracleFlyweight = OracleFlyweight
      { ofExchangeRates :: [(CurrencySymbol, Integer)]
      , ofTimestamp     :: POSIXTime
      }
  
  {-# INLINABLE extractFlyweight #-}
  extractFlyweight :: ScriptContext -> Maybe OracleFlyweight
  extractFlyweight ctx =
      let info = scriptContextTxInfo ctx
          refInputs = txInfoReferenceInputs info
          -- In a real incantation, we would safely parse the Datum from the TxInInfo
      in Nothing -- Placeholder for parsing logic
  
  {-# INLINABLE validateWithFlyweight #-}
  validateWithFlyweight :: Datum -> Redeemer -> ScriptContext -> Bool
  validateWithFlyweight _ _ ctx =
      case extractFlyweight ctx of
          Nothing -> traceError "Flyweight not found!"
          Just fw -> traceIfFalse "Stale flyweight!" (ofTimestamp fw > 1600000000)
tags: [flyweight, plutus, transmutation, reference-inputs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the physical world, copying vast amounts of data incurs massive execution fees. The Flyweight pattern, enabled by the arcane discovery of CIP-31 (Reference Inputs), allows the Transmuter to deploy a massive, read-only Datum to a single UTxO. Countless parallel transactions can then reference this exact UTxO to borrow its state, eliminating the need to duplicate the heavy data within their own transaction size limits.
