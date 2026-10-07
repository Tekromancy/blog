---
title: Interpreter in ReasonML
description: Pattern matching over AST nodes to evaluate hexes.
type: reason
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Comprehension"
formula: |2
  type expr =
    | Num(int)
    | Add(expr, expr);

  let rec eval = (e) =>
    switch (e) {
    | Num(n) => n
    | Add(left, right) => eval(left) + eval(right)
    };
tags: [reason, interpreter, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
OCaml and ReasonML were forged for compilers. The Interpreter pattern is trivially elegantly expressed via recursive ADTs and exhaustive pattern matching.
