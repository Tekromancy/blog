---
title: Interpreter in Dhall
description: Parse and evaluate abstract runic syntax trees with total functional guarantees.
type: dhall
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  let Expr = < Lit : Natural | Add : { left : Natural, right : Natural } >
  
  let interpret = \(e : Expr) ->
        merge
          { Lit = \(n : Natural) -> n
          , Add = \(args : { left : Natural, right : Natural }) -> args.left + args.right
          }
          e
  
  in  interpret (Expr.Add { left = 2, right = 3 })
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Dhall shines brightly when hosting an **Interpreter**. Since the language forbids non-terminating loops, any syntax tree defined and evaluated inside Dhall is fundamentally safe. The interpreter collapses custom symbolic expressions into tangible results via exhaustive pattern matching.
