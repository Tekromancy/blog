---
title: The Interpreter of the Progenitor
description: Evaluate a domain-specific language of mystical logic.
type: sml
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Translation"
formula: |2
  datatype expr = 
      Num of int
    | Add of expr * expr
    | Multiply of expr * expr
    
  fun eval (Num n) = n
    | eval (Add (e1, e2)) = eval e1 + eval e2
    | eval (Multiply (e1, e2)) = eval e1 * eval e2
    
  (* A magical formula: (3 + 4) * 2 *)
  val formula = Multiply(Add(Num 3, Num 4), Num 2)
  
  val powerLevel = eval formula
tags: [datatypes, abstract syntax trees, evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Interpreter pattern is the very soul of functional programming languages like SML. Abstract Syntax Trees (ASTs) are trivially expressed via algebraic `datatype` declarations. A simple recursive `eval` function patterned-matches over the datatype to resolve the grammar, granting life to embedded domain-specific languages and esoteric rune scripts.
