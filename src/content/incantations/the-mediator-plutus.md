---
title: "The Mediator of DEX Routers"
description: "Centralizing complex interactions between multiple loosely-coupled UTxOs."
type: plutus
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Conjuration // State Orchestration"
formula: |2
  module LedgerMonad.Mediator where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Central Nexus (Mediator Validator)
  -- Instead of Pool A talking directly to Pool B, they both verify the Nexus.
  
  {-# INLINABLE nexusValidator #-}
  nexusValidator :: BuiltinData -> BuiltinData -> ScriptContext -> Bool
  nexusValidator _ _ ctx =
      let info = scriptContextTxInfo ctx
          -- The Mediator inspects all inputs and coordinates the global trade
          totalValueIn = sumTxInValue (txInfoInputs info)
          totalValueOut = sumTxOutValue (txInfoOutputs info)
      in traceIfFalse "Mana leak detected by Mediator!" (totalValueIn == totalValueOut)
  
  -- Helper functions omitted for arcane brevity
  sumTxInValue :: [TxInInfo] -> Value
  sumTxInValue _ = mempty
  
  sumTxOutValue :: [TxOut] -> Value
  sumTxOutValue _ = mempty
tags: [mediator, plutus, conjuration, router]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In chaotic environments like decentralized exchanges, requiring every Liquidity Pool UTxO to understand the interface of every other pool leads to explosive complexity. The Mediator pattern introduces a Nexus script—a centralized router. The individual pools only need to verify that the Nexus is present in the transaction. The Nexus itself orchestrates the global state transition, calculating slippage and routing the elemental mana.
