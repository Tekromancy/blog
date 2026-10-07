---
title: The Interpreter of Ancient Runes
description: Parsing and evaluating a domain-specific language of runic magic.
type: fstar
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  module Interpreter
  
  type rune_expr =
    | Power : nat -> rune_expr
    | Combine : rune_expr -> rune_expr -> rune_expr
    
  let rec eval_rune (e: rune_expr) : nat =
    match e with
    | Power n -> n
    | Combine e1 e2 -> eval_rune e1 + eval_rune e2
tags: [interpreter, runes, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

A verified interpreter for a deeply embedded domain-specific language representing runic combinations and power calculations.
