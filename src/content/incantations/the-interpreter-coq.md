---
title: The Interpreter
description: Defining a formalized grammar for runic expressions and an evaluator for recursive Gallina Ward patterns.
type: coq
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  (* Gallina Ward: Interpreter *)
  Require Import String.
  
  Inductive RuneExpr :=
    | RValue : nat -> RuneExpr
    | RMerge : RuneExpr -> RuneExpr -> RuneExpr
    | RSunder : RuneExpr -> RuneExpr -> RuneExpr.
    
  Fixpoint evaluate (expr : RuneExpr) : nat :=
    match expr with
    | RValue n => n
    | RMerge e1 e2 => evaluate e1 + evaluate e2
    | RSunder e1 e2 => evaluate e1 - evaluate e2
    end.
    
  (* RMerge (RValue 10) (RSunder (RValue 20) (RValue 5)) *)
  Definition arcaneEquation : RuneExpr :=
    RMerge (RValue 10) (RSunder (RValue 20) (RValue 5)).
    
  Definition result : nat := evaluate arcaneEquation.
tags: [interpreter, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
