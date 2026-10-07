---
title: The Interpreter of Jsonnet
description: Evaluating a bespoke syntax tree.
type: jsonnet
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Reading"
formula: |2
  local Interpret(ast) =
    if ast.type == "Number" then ast.value
    else if ast.type == "Add" then Interpret(ast.left) + Interpret(ast.right)
    else if ast.type == "Mul" then Interpret(ast.left) * Interpret(ast.right)
    else error "Unknown AST node";

  local Expr = {
    type: "Add",
    left: { type: "Number", value: 10 },
    right: { 
      type: "Mul",
      left: { type: "Number", value: 5 },
      right: { type: "Number", value: 2 }
    }
  };

  {
    result: Interpret(Expr)
  }
tags: [behavioral, interpreter, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Jsonnet functions can traverse Abstract Syntax Trees, evaluating custom mathematical or logical runes to compute deeply nested outcomes.
