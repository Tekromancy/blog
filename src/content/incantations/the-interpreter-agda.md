---
title: "The Interpreter Codex"
description: "Evaluating expressions in a domain-specific esoteric language."
type: agda
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  module InterpreterPattern where
  
  open import Data.Nat
  
  data Expr : Set where
    Lit : ℕ → Expr
    Add : Expr → Expr → Expr
    
  eval : Expr → ℕ
  eval (Lit n) = n
  eval (Add e1 e2) = eval e1 + eval e2
tags: ["agda", "interpreter", "ast"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Interpreter Codex

To command archaic alien artifacts, we must speak their language. The **Interpreter Codex** defines an Abstract Syntax Tree (AST) and the arcane semantics to map it to reality.

## The Dependent Runes

This pattern is the very soul of languages like Agda. We write deeply typed inductive graphs (`Expr`) and mathematically sound evaluators (`eval`).
