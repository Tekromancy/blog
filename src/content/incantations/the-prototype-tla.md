---
title: "The Prototype of Echoed Realities"
description: "Clone existing state configurations to quickly branch parallel timelines without redefining their genesis."
type: tlaplus
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Prototype ----
  EXTENDS Naturals
  
  VARIABLES realityStates, nextId
  
  Init == 
      /\ realityStates = [id \in {0} |-> "Genesis"]
      /\ nextId = 1
      
  CloneReality(sourceId) ==
      /\ sourceId \in DOMAIN realityStates
      /\ realityStates' = realityStates @@ (nextId :> realityStates[sourceId])
      /\ nextId' = nextId + 1
      
  MutateReality(id, newState) ==
      /\ id \in DOMAIN realityStates
      /\ realityStates' = [realityStates EXCEPT ![id] = newState]
      /\ UNCHANGED nextId
      
  Next == 
      \/ \E s \in DOMAIN realityStates : CloneReality(s)
      \/ \E id \in DOMAIN realityStates, s \in {"War", "Peace", "Void"} : MutateReality(id, s)
      
  Spec == Init /\ [][Next]_<<realityStates, nextId>>
  ====
tags: [tla, branching-time, temporal-divination, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Prototype incantation maps perfectly to exploring branching realities. Instead of recreating the world from the primordial `Init`, we clone an existing state vector via function extension (`@@`). This enables a temporal diviner to rapidly fork timelines and apply targeted mutations to analyze divergent destinies.
