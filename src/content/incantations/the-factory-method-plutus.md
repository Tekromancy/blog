---
title: "The Factory Method of Token Forging"
description: "Delegating the exact instantiation of Native Tokens to subclassed minting policies."
type: plutus
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Minting Policies"
formula: |2
  {-# INLINABLE mkMintingFactory #-}
  module LedgerMonad.FactoryMethod where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Abstract Conjuration Requirement
  -- We define a template for minting, parameterized by a specific "Sigil" (TokenName)
  
  {-# INLINABLE validateMinting #-}
  validateMinting :: TokenName -> ScriptContext -> Bool
  validateMinting sigil ctx = 
      let info = scriptContextTxInfo ctx
          mintedVal = txInfoMint info
          -- Ensure only the specific sigil is conjured
      in traceIfFalse "Wrong sigil conjured!" (checkSigil mintedVal sigil)
  
  {-# INLINABLE checkSigil #-}
  checkSigil :: Value -> TokenName -> Bool
  checkSigil val sigil = True -- Simplified for arcane brevity
  
  -- Concrete Factories (Instantiating the parameters)
  {-# INLINABLE mkDragonSigilPolicy #-}
  mkDragonSigilPolicy :: BuiltinData -> ScriptContext -> Bool
  mkDragonSigilPolicy _ ctx = validateMinting (TokenName "Dragon") ctx
  
  {-# INLINABLE mkPhoenixSigilPolicy #-}
  mkPhoenixSigilPolicy :: BuiltinData -> ScriptContext -> Bool
  mkPhoenixSigilPolicy _ ctx = validateMinting (TokenName "Phoenix") ctx
tags: [factory-method, plutus, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rather than invoking a single, bloated spell to mint every asset, the Factory Method provides a parameterized ritual. In Plutus, this manifests as a parameterized minting policy where the concrete token identity (the Sigil) is bound at compile time, creating distinct CurrencySymbols while sharing the same underlying validation logic.
