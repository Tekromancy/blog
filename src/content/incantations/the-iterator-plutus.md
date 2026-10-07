---
title: "The Iterator of UTxO Traversal"
description: "Safely processing lists of arcane data within execution unit limits."
type: plutus
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // List Traversal"
formula: |2
  module LedgerMonad.Iterator where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Divining Rod (Iterator function using foldl)
  {-# INLINABLE sumMana #-}
  sumMana :: [Integer] -> Integer
  sumMana = foldl (\acc x -> acc + x) 0
  
  {-# INLINABLE findSigil #-}
  findSigil :: BuiltinByteString -> [BuiltinByteString] -> Bool
  findSigil target sigils = any (== target) sigils
  
  -- The Validation
  {-# INLINABLE iterValidator #-}
  iterValidator :: [BuiltinByteString] -> BuiltinByteString -> ScriptContext -> Bool
  iterValidator sigils target ctx =
      traceIfFalse "Sigil missing from sequence!" (findSigil target sigils)
tags: [iterator, plutus, divination, folding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Haskell has no `while` loops, only pure traversal. The Iterator pattern in the Ledger Monad manifests as recursive functions, maps, and folds. The Diviner must be cautious: unconstrained iteration rapidly consumes the transaction's memory and CPU budget. Proper use of the Iterator pattern in Plutus implies using strict, inlinable higher-order functions like `any`, `all`, and `foldl` to keep the arcane execution units stable.
