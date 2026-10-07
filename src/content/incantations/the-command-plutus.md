---
title: "The Command of the Redeemer"
description: "Encapsulating action requests as objects passed into the Validator."
type: plutus
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Action Dispatch"
formula: |2
  module LedgerMonad.Command where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Arcane Commands (Redeemers)
  data EvocationCommand
      = Ignite  { manaCost :: Integer }
      | Freeze  { duration :: POSIXTime }
      | Dispel
  
  PlutusTx.unstableMakeIsData ''EvocationCommand
  
  -- The Dispatcher
  {-# INLINABLE executeCommand #-}
  executeCommand :: EvocationCommand -> ScriptContext -> Bool
  executeCommand (Ignite cost) ctx = 
      traceIfFalse "Not enough mana to Ignite!" (cost > 10)
  executeCommand (Freeze dur) ctx = 
      traceIfFalse "Freeze duration too short!" (dur > 1000)
  executeCommand Dispel ctx = 
      True -- Dispels always succeed if authorized
  
  {-# INLINABLE commandValidator #-}
  commandValidator :: Datum -> EvocationCommand -> ScriptContext -> Bool
  commandValidator _ cmd ctx = executeCommand cmd ctx
tags: [command, plutus, evocation, redeemer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the Plutus ecosystem, the Command pattern is not merely a design choice; it is woven into the very fabric of the ledger via the `Redeemer`. By encoding distinct actions as constructors of an algebraic data type, the Evoker encapsulates all parameters necessary for a specific state transition. The validator then pattern-matches on this Command, dispatching to the appropriate sub-ritual.
