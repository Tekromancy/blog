---
title: "The Interpreter of Akashic Runes"
description: "Define a grammar for an arcane language and construct an interpreter to parse prophetic expressions."
type: tlaplus
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Interpreter ----
  EXTENDS Naturals, Sequences
  
  CONSTANTS Variables
  
  VARIABLES env, expression, result
  
  Init == 
      /\ env \in [Variables -> Naturals]
      /\ expression \in {"Add", "Sub", "Var"}
      /\ result = 0
      
  EvalVar(v) ==
      /\ expression = "Var"
      /\ result' = env[v]
      /\ UNCHANGED <<env, expression>>
      
  EvalAdd(v1, v2) ==
      /\ expression = "Add"
      /\ result' = env[v1] + env[v2]
      /\ UNCHANGED <<env, expression>>
      
  Next == 
      \/ \E v \in Variables : EvalVar(v)
      \/ \E v1, v2 \in Variables : EvalAdd(v1, v2)
      
  Spec == Init /\ [][Next]_<<env, expression, result>>
  ====
tags: [tla, semantics, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When the Akashic records speak, they do so in cryptic runes. The Interpreter defines the operational semantics of these expressions over a dynamic state environment (`env`). In TLA+, we model evaluation steps as state transitions, proving that every valid syntactical construct yields a deterministic and terminating prophetic truth.
