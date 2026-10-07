---
title: "The Interpreter"
description: "Parsing and evaluating ancient runic grammars to deduce the resulting mathematical force."
type: lean
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  namespace MathematicalWards

  inductive RuneExpr where
    | literal : Nat → RuneExpr
    | amplify : RuneExpr → RuneExpr → RuneExpr
    | diminish : RuneExpr → RuneExpr → RuneExpr

  def interpret : RuneExpr → Nat
    | RuneExpr.literal n => n
    | RuneExpr.amplify a b => interpret a + interpret b
    | RuneExpr.diminish a b => interpret a - interpret b

  def wardSpell : RuneExpr :=
    RuneExpr.amplify (RuneExpr.literal 10) (RuneExpr.literal 5)

  #eval interpret wardSpell -- 15

  end MathematicalWards
tags: [behavioral, lean4, interpreter, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Interpreter pattern is fundamentally equivalent to evaluating an Abstract Syntax Tree, beautifully modeled via Lean 4's inductive types.
