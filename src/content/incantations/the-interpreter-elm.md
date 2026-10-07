---
title: Interpreter in Elm
description: Parsing and evaluating arcane domain languages in Elm.
type: elm
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Lexical Parsing"
formula: |2
  module Interpreter exposing (Expression(..), evaluate)
  
  -- The Abstract Syntax Tree (AST)
  type Expression
      = Literal Int
      | Add Expression Expression
      | Sub Expression Expression
  
  -- The Interpreter
  evaluate : Expression -> Int
  evaluate expr =
      case expr of
          Literal val ->
              val
              
          Add left right ->
              evaluate left + evaluate right
              
          Sub left right ->
              evaluate left - evaluate right
  
  -- Example usage:
  -- evaluate (Sub (Add (Literal 10) (Literal 5)) (Literal 2)) == 13
tags: [elm, behavioral, interpreter, ast, custom-types, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Interpreter: The Lexicon of the Ancients

To command the deeper layers of the machine, one must parse the ancient tongues. The Interpreter pattern in Elm leverages recursive Custom Types to represent an Abstract Syntax Tree (AST). The parser maps arcane string inputs into these pure AST nodes, while the `evaluate` function serves as the ultimate arbiter, traversing the tree recursively to divine the final numerical or logical truth hidden within the incantation.
