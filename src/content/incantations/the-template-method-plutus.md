---
title: "The Template Method of Ritual Scaffolding"
description: "Defining the skeleton of a spell, deferring exact steps to higher-order parameters."
type: plutus
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritual Scaffolding"
formula: |2
  module LedgerMonad.TemplateMethod where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Ritual Scaffolding (Template Method)
  {-# INLINABLE baseRitual #-}
  baseRitual :: (ScriptContext -> Bool) -> (ScriptContext -> Bool) -> ScriptContext -> Bool
  baseRitual step1 step2 ctx =
      traceIfFalse "Step 1 failed!" (step1 ctx) &&
      traceIfFalse "Step 2 failed!" (step2 ctx)
  
  -- Concrete Ritual Steps
  {-# INLINABLE checkPhasesOfMoon #-}
  checkPhasesOfMoon :: ScriptContext -> Bool
  checkPhasesOfMoon _ = True -- Simplified
  
  {-# INLINABLE checkBloodSacrifice #-}
  checkBloodSacrifice :: ScriptContext -> Bool
  checkBloodSacrifice ctx = length (txInfoInputs (scriptContextTxInfo ctx)) > 2
  
  -- The Final Binding
  {-# INLINABLE templateValidator #-}
  templateValidator :: Datum -> Redeemer -> ScriptContext -> Bool
  templateValidator _ _ ctx = 
      baseRitual checkPhasesOfMoon checkBloodSacrifice ctx
tags: [template-method, plutus, conjuration, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Some arcane rituals follow an uncompromising order of operations, even if the specific ingredients change. The Template Method is implemented in Haskell via higher-order functions. The base ritual dictates the absolute control flow (e.g., Ward A must evaluate before Ward B), while accepting the specific, concrete validation functions as parameters. This enforces structural integrity across many variations of a contract.
