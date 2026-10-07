---
title: The Interpreter of Ancient Tongues
description: Parsing and evaluating arcane expressions encoded in functional trees.
type: roc
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
tags: [fast-functional-wards, roc, interpreter, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
formula: |2
  interface ArcaneInterpreter
      exposes [Expr, evaluate]
      imports []

  Expr : [
      Power U64,
      Amplify Expr Expr,
      Dampen Expr Expr
  ]

  evaluate : Expr -> U64
  evaluate = \expr ->
      when expr is
          Power v -> v
          Amplify e1 e2 -> (evaluate e1) + (evaluate e2)
          Dampen e1 e2 -> 
              v1 = evaluate e1
              v2 = evaluate e2
              if v1 > v2 then v1 - v2 else 0
---
