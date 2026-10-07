---
title: "The Decorator of Validator Wrapping"
description: "Dynamically adding constraints to a smart contract via higher-order functions."
type: plutus
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Validator Wrapping"
formula: |2
  module LedgerMonad.Decorator where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  type CoreSpell = Datum -> Redeemer -> ScriptContext -> Bool
  
  -- The Base Ritual
  {-# INLINABLE baseValidator #-}
  baseValidator :: CoreSpell
  baseValidator _ _ _ = True
  
  -- The Enchanter's Decorators
  {-# INLINABLE withTimeLock #-}
  withTimeLock :: POSIXTime -> CoreSpell -> CoreSpell
  withTimeLock deadline baseSpell datum redeemer ctx =
      let info = scriptContextTxInfo ctx
          range = txInfoValidRange info
      in traceIfFalse "Time lock not satisfied!" (contains (to deadline) range)
         && baseSpell datum redeemer ctx
  
  {-# INLINABLE withSignature #-}
  withSignature :: PubKeyHash -> CoreSpell -> CoreSpell
  withSignature pkh baseSpell datum redeemer ctx =
      let info = scriptContextTxInfo ctx
      in traceIfFalse "Missing required signature!" (txSignedBy info pkh)
         && baseSpell datum redeemer ctx
  
  -- The Final Enchantment (Composed Spell)
  {-# INLINABLE decoratedValidator #-}
  decoratedValidator :: POSIXTime -> PubKeyHash -> CoreSpell
  decoratedValidator deadline pkh = 
      withTimeLock deadline (withSignature pkh baseValidator)
tags: [decorator, plutus, enchantment, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Enchantment often requires layering wards upon a core spell. The Decorator pattern in Plutus relies on higher-order functions. By wrapping the base `Validator` function in decorators (like time-locks or multi-sig checks), we augment the contract's constraints without modifying its original source. The `ScriptContext` flows through each layer until all conditions are met.
