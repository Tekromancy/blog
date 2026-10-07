---
title: "The Interpreter Hex"
description: "Parsing and evaluating an arcane DSL within Nix."
type: nix
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # AST Nodes
    Literal = val: ctx: val;
    Add = left: right: ctx: (left ctx) + (right ctx);
    Var = name: ctx: ctx.''${name};

    # The Expression: x + 10
    expr = Add (Var "x") (Literal 10);

    # Contexts
    contextA = { x = 5; };
    contextB = { x = 42; };
  in
  {
    evalA = expr contextA;
    evalB = expr contextB;
  }
tags: [behavioral, interpreter, nix, dsl]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Interpreter pattern leverages Nix as a functional evaluation engine. By representing expressions as higher-order functions that accept an evaluation context, we construct Domain-Specific Languages (DSLs) fully embedded within the pure environment.
