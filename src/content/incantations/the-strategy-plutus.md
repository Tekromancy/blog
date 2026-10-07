---
title: "The Strategy of Algorithmic Switching"
description: "Dynamically selecting validation algorithms at execution time."
type: plutus
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Algorithmic Switching"
formula: |2
  module LedgerMonad.Strategy where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Strategy Interface (Type Aliases in Haskell)
  type PricingStrategy = Integer -> Integer
  
  -- Concrete Strategies
  {-# INLINABLE linearPricing #-}
  linearPricing :: PricingStrategy
  linearPricing x = x * 10
  
  {-# INLINABLE exponentialPricing #-}
  exponentialPricing :: PricingStrategy
  exponentialPricing x = x * x
  
  -- The Strategy Selector (Passed via Redeemer)
  data StrategyType = Linear | Exponential
  PlutusTx.unstableMakeIsData ''StrategyType
  
  {-# INLINABLE getStrategy #-}
  getStrategy :: StrategyType -> PricingStrategy
  getStrategy Linear = linearPricing
  getStrategy Exponential = exponentialPricing
  
  -- The Execution
  {-# INLINABLE strategyValidator #-}
  strategyValidator :: BuiltinData -> StrategyType -> ScriptContext -> Bool
  strategyValidator _ stratType _ =
      let algorithm = getStrategy stratType
          price = algorithm 5
      in traceIfFalse "Calculated wrong price!" (price > 0)
tags: [strategy, plutus, divination, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A smart contract may need to calculate fees or prices differently depending on market conditions. The Strategy pattern allows the caller to pass an algorithmic selector (a token or a Redeemer flag) to the validator. The Diviner's script then dynamically retrieves and applies the correct mathematical strategy function, decoupling the core logic from the specific mathematical implementations.
