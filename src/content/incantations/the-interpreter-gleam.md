---
title: The Interpreter
description: Parsing arcane runes into executable operations.
type: gleam
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Parsing"
formula: |2
  pub type Expr {
    Num(Int)
    Add(Expr, Expr)
    Multiply(Expr, Expr)
  }

  pub fn evaluate(expr: Expr) -> Int {
    case expr {
      Num(n) -> n
      Add(a, b) -> evaluate(a) + evaluate(b)
      Multiply(a, b) -> evaluate(a) * evaluate(b)
    }
  }
tags: [divination, interpreter, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Interpreter
Pattern matching recursively over abstract syntax trees is the bread and butter of functional programming. The interpreter is native to Gleam.
