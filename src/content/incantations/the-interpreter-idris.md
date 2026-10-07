---
title: "The Interpreter: Decoding the Runes"
description: "Evaluating abstract syntax trees of ancient cyber-magical tongues."
type: idris
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune-Parsing"
formula: |2
  module Interpreter
  
  -- The Abstract Syntax Tree for a simple runic language
  data Expr : Type where
    Lit : Nat -> Expr
    Add : Expr -> Expr -> Expr
    Mul : Expr -> Expr -> Expr
  
  -- The Interpreter
  eval : Expr -> Nat
  eval (Lit n) = n
  eval (Add x y) = eval x + eval y
  eval (Mul x y) = eval x * eval y
  
  -- Evaluating a runic expression
  runicFormula : Expr
  runicFormula = Mul (Add (Lit 2) (Lit 3)) (Lit 4)
  
  result : Nat
  result = eval runicFormula -- Evaluates to 20
tags: [behavioral, ast, evaluation, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Within the deep archives, ancient logic runs on forgotten esoteric syntax. The Interpreter pattern defines a grammatical representation for these lost tongues and maps them into the absolute truths of the Theorem Proving Pacts. Idris’s powerful algebraic data types make defining the AST (`Expr`) and its evaluator (`eval`) incredibly robust—the compiler enforces that every possible branch of the runic syntax is safely evaluated.
