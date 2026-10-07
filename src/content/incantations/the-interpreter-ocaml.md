---
title: The Interpreter
description: Deciphering lost runic languages through recursive AST evaluation.
type: ocaml
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Runic Parsing"
formula: |2
  type expression =
    | Energy of int
    | Amplify of expression * expression
    | Dampen of expression * expression

  let rec evaluate = function
    | Energy n -> n
    | Amplify (e1, e2) -> evaluate e1 + evaluate e2
    | Dampen (e1, e2) -> evaluate e1 - evaluate e2

  let rune = Amplify (Energy 10, Dampen (Energy 5, Energy 2))
  let power = evaluate rune
tags: [Caml Metamagic, AST, Recursion, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Interpreting ancient syntax is native to OCaml. A custom grammar maps directly to Algebraic Data Types, effortlessly evaluated by a recursive divination function.
