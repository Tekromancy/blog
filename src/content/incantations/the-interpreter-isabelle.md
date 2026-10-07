---
title: The Interpreter
description: Given a formal language, define a representation for its grammar along with an interpreter that evaluates it.
type: isabelle
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Abjuration // Semantics"
formula: |2
  theory Interpreter
    imports Main
  begin
  
  datatype expr =
      Const nat
    | Add expr expr
    | Mul expr expr
  
  fun eval_expr :: "expr \<Rightarrow> nat" where
    "eval_expr (Const n) = n"
  | "eval_expr (Add e1 e2) = eval_expr e1 + eval_expr e2"
  | "eval_expr (Mul e1 e2) = eval_expr e1 * eval_expr e2"
  
  end
tags: [isabelle, hol, abjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
