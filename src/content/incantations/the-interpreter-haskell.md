---
title: The Interpreter
description: Parsing the true names of the universe via parser combinators and ASTs.
type: haskell
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  module Interpreter where
  data Expr = Lit Int | Add Expr Expr
  eval :: Expr -> Int
  eval (Lit n) = n
  eval (Add a b) = eval a + eval b
tags: [interpreter, ast, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
