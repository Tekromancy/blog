---
title: "The Memento of Chronomancy"
description: "Preserving historical UTxO states within the Datum for later restoration."
type: plutus
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Reversion"
formula: |2
  module LedgerMonad.Memento where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Chrono-Anchor (Memento)
  data StateSnapshot = StateSnapshot
      { snapMana     :: Integer
      , snapPosition :: Integer
      }
  PlutusTx.unstableMakeIsData ''StateSnapshot
  
  -- The Originator State
  data ContractState = ContractState
      { currentMana     :: Integer
      , currentPosition :: Integer
      , memento         :: Maybe StateSnapshot
      }
  PlutusTx.unstableMakeIsData ''ContractState
  
  data ChronoRedeemer = SaveState | RestoreState | Mutate Integer Integer
  PlutusTx.unstableMakeIsData ''ChronoRedeemer
  
  {-# INLINABLE mementoValidator #-}
  mementoValidator :: ContractState -> ChronoRedeemer -> ScriptContext -> Bool
  mementoValidator datum SaveState _ =
      -- Requires checking that the continuing output has memento = Just (StateSnapshot currentMana currentPosition)
      True
  mementoValidator datum RestoreState _ =
      case memento datum of
          Nothing -> traceError "No temporal anchor found!"
          Just _  -> True -- Requires checking that continuing output restores the snapshot values
  mementoValidator _ (Mutate _ _) _ = True
tags: [memento, plutus, chronomancy, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Because the UTxO model consumes state permanently, reversing a bad mutation is normally impossible without hard forks. The Memento pattern is a Chronomantic trick: the current state explicitly caches a historical snapshot of itself inside its own Datum. When disaster strikes, a specific `RestoreState` Redeemer can be invoked to overwrite the current variables with the cached Memento, effectively rewinding time for that specific smart contract.
