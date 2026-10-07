---
title: The Interpreter of the Ancestral Monad
description: Evaluating an abstract syntax tree of pure monadic expressions.
type: miranda
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || The Interpreter evaluates the true language of the Ancestral Monad.
  
  expr ::= Val num | Add expr expr | Mul expr expr
  
  interpret :: expr -> num
  interpret (Val n) = n
  interpret (Add a b) = interpret a + interpret b
  interpret (Mul a b) = interpret a * interpret b
  
  sacred_expression :: expr
  sacred_expression = Mul (Add (Val 2) (Val 3)) (Val 4)
  
  result :: num
  result = interpret sacred_expression
tags: [miranda, behavioral, interpreter, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
