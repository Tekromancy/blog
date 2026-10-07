---
title: "The Interpreter of On-Chain Runes"
description: "Evaluating abstract syntax trees dynamically within the validator."
type: plutus
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // AST Evaluation"
formula: |2
  module LedgerMonad.Interpreter where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Runic Grammar (AST)
  data RuneExpr
      = RValue Integer
      | RAdd RuneExpr RuneExpr
      | RMul RuneExpr RuneExpr
  
  PlutusTx.unstableMakeIsData ''RuneExpr
  
  -- The Diviner's Eye (Evaluator)
  {-# INLINABLE evalRune #-}
  evalRune :: RuneExpr -> Integer
  evalRune (RValue v) = v
  evalRune (RAdd a b) = evalRune a + evalRune b
  evalRune (RMul a b) = evalRune a * evalRune b
  
  {-# INLINABLE runeValidator #-}
  runeValidator :: RuneExpr -> Integer -> ScriptContext -> Bool
  runeValidator expr expected ctx =
      let result = evalRune expr
      in traceIfFalse "Runic translation failed!" (result == expected)
tags: [interpreter, plutus, divination, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the exact parameters of a spell cannot be hardcoded, the Diviner employs the Interpreter pattern. By defining an Abstract Syntax Tree (AST) as a Plutus-compatible Data type, complex rules can be passed as a Datum or Redeemer. The validator then runs a bounded recursive evaluator, dynamically interpreting the script's behavior on-chain at execution time.
