---
title: "The Singleton of Thread Tokens"
description: "Guaranteeing the uniqueness of a state machine UTxO via an unforgeable NFT."
type: plutus
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Unique UTxO Binding"
formula: |2
  module LedgerMonad.Singleton where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Thread Token (Singleton Sigil)
  type ThreadToken = AssetClass
  
  {-# INLINABLE hasSingleton #-}
  hasSingleton :: ThreadToken -> TxOut -> Bool
  hasSingleton token out = assetClassValueOf (txOutValue out) token == 1
  
  {-# INLINABLE validateSingletonState #-}
  validateSingletonState :: ThreadToken -> ScriptContext -> Bool
  validateSingletonState token ctx =
      let info = scriptContextTxInfo ctx
          -- Find exactly one continuing output containing the Singleton NFT
          continuingOuts = getContinuingOutputs ctx
          singletonOuts = filter (hasSingleton token) continuingOuts
      in case singletonOuts of
          [_] -> True
          _   -> traceError "Singleton paradox detected: State fractured!"
tags: [singleton, plutus, abjuration, thread-token]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the stateless void of the Cardano ledger, ensuring a globally unique state (a Singleton) requires high abjuration. We mint an unforgeable Native Token (an NFT) known as a Thread Token. The validator script is then warded to ensure that any valid transaction consuming the current Singleton state must place this exact NFT into exactly one continuing output, preserving the unbroken chain of unique state.
