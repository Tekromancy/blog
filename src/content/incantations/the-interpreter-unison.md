---
title: The Interpreter
description: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
type: unison
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  structural type Expr = 
    Rune Nat |
    Combine Expr Expr
    
  interpret : Expr -> Nat
  interpret expr = match expr with
    Rune n -> n
    Combine e1 e2 -> (interpret e1) + (interpret e2)
tags: [behavioral, interpreter, unison, ast, pattern-matching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Interpreter pattern is the bread and butter of functional programming. Unison handles this with profound grace using algebraic data types to represent the Abstract Syntax Tree of the arcane dialect. The interpreter itself is a pure recursive function that pattern-matches on the nodes of the tree, transmuting symbolic runes into raw numerical power.
