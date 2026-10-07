---
title: "The Builder of Destiny Constructs"
description: "Construct complex, multi-stage state configurations step-by-step through rigorous temporal assertions."
type: tlaplus
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Builder ----
  EXTENDS Naturals, Sequences
  
  CONSTANTS Components
  
  VARIABLES productState, buildPhase
  
  Init == 
      /\ productState = << >>
      /\ buildPhase = 0
      
  AddPart(part) ==
      /\ part \in Components
      /\ buildPhase < 3
      /\ productState' = Append(productState, part)
      /\ buildPhase' = buildPhase + 1
      
  Finalize ==
      /\ buildPhase = 3
      /\ buildPhase' = "Done"
      /\ UNCHANGED productState
      
  Next == 
      \/ \E c \in Components : AddPart(c)
      \/ Finalize
      
  Spec == Init /\ [][Next]_<<productState, buildPhase>>
  
  Safety == [](buildPhase = "Done" => Len(productState) = 3)
  ====
tags: [tla, safety-properties, temporal-divination, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Builder pattern allows the progressive definition of a destiny construct. Temporal logic dictates that a construct cannot be finalized until all required components are inscribed. The `Safety` theorem ensures that any realized timeline reaching the "Done" phase has exactly the intended structural length.
