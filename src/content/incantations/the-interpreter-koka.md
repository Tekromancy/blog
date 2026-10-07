---
title: The Interpreter Lexicon
description: Evaluates an ancient runic language using a recursive AST and effectful context.
type: koka
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Translation"
formula: |2
  type rune-expr
    Power(v: int)
    Amplify(left: rune-expr, right: rune-expr)
  
  fun interpret(expr: rune-expr) : int
    match expr
      Power(v) -> v
      Amplify(l, r) -> interpret(l) * interpret(r)
  
  pub fun main()
    val ancient-text = Amplify(Amplify(Power(2), Power(3)), Power(5))
    println("Interpreted power: " ++ interpret(ancient-text).show)
tags: [koka, interpreter, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
