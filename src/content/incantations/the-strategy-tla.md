---
title: "The Strategy of Divergent Fates"
description: "Define a family of prophetic algorithms, encapsulate each, and make them interchangeable across timelines."
type: tlaplus
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Strategy ----
  EXTENDS Naturals
  
  VARIABLES currentStrategy, data, result
  
  Init == 
      /\ currentStrategy \in {"Aggressive", "Defensive"}
      /\ data = 10
      /\ result = 0
      
  SetStrategy(s) ==
      /\ currentStrategy' = s
      /\ UNCHANGED <<data, result>>
      
  ExecuteStrategy ==
      /\ currentStrategy = "Aggressive" /\ result' = data * 2
      \/ currentStrategy = "Defensive" /\ result' = data + 2
      /\ UNCHANGED <<currentStrategy, data>>
      
  Next == 
      \/ \E s \in {"Aggressive", "Defensive"} : SetStrategy(s)
      \/ ExecuteStrategy
      
  Spec == Init /\ [][Next]_<<currentStrategy, data, result>>
  ====
tags: [tla, encapsulation, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Fates are not fixed; they are shaped by the `currentStrategy` employed by the scryer. By encapsulating different algorithms ("Aggressive" vs "Defensive"), a diviner can hot-swap the laws of consequence at runtime. TLA+ cleanly branches the `ExecuteStrategy` action to enforce whichever fate is currently active.
