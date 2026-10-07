---
title: "The Chain of Responsibility in Validator Links"
description: "Passing execution constraints through a sequence of modular wards."
type: plutus
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Ward Chaining"
formula: |2
  module LedgerMonad.ChainOfResponsibility where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  type Ward = Datum -> Redeemer -> ScriptContext -> Bool
  
  -- Individual Wards
  {-# INLINABLE checkSignatures #-}
  checkSignatures :: Ward
  checkSignatures _ _ ctx = txSignedBy (scriptContextTxInfo ctx) (PubKeyHash "abcd")
  
  {-# INLINABLE checkTimeLock #-}
  checkTimeLock :: Ward
  checkTimeLock _ _ ctx = True -- placeholder time ward
  
  -- The Chain Forge
  {-# INLINABLE executeChain #-}
  executeChain :: [Ward] -> Datum -> Redeemer -> ScriptContext -> Bool
  executeChain [] _ _ _ = True
  executeChain (w:ws) d r ctx =
      if w d r ctx
      then executeChain ws d r ctx
      else traceError "Ward shattered!"
  
  {-# INLINABLE chainedValidator #-}
  chainedValidator :: Datum -> Redeemer -> ScriptContext -> Bool
  chainedValidator = executeChain [checkSignatures, checkTimeLock]
tags: [chain-of-responsibility, plutus, abjuration, validation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When defending high-mana vaults, a single, monolithic validator becomes brittle. The Chain of Responsibility pattern allows the Abjurer to forge individual, modular Wards (functions returning Bool). These wards are strung together into a chain. The `ScriptContext` flows through each link. If any ward fails, the transaction is banished. If it survives the entire chain, the state transition succeeds.
