---
title: "The Singleton of the Absolute Timeline"
description: "Enforce a universal, singular truth in a concurrent, non-deterministic universe."
type: tlaplus
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Singleton ----
  EXTENDS Naturals
  
  VARIABLES instance_exists, truth_value
  
  Init == 
      /\ instance_exists = FALSE
      /\ truth_value = 0
      
  InitializeSingleton(val) ==
      /\ instance_exists = FALSE
      /\ instance_exists' = TRUE
      /\ truth_value' = val
      
  ReadTruth ==
      /\ instance_exists = TRUE
      /\ UNCHANGED <<instance_exists, truth_value>>
      
  Next == 
      \/ \E v \in {42, 73, 108} : InitializeSingleton(v)
      \/ ReadTruth
      
  Spec == Init /\ [][Next]_<<instance_exists, truth_value>>
  
  SingletonProperty == [](instance_exists => [][UNCHANGED truth_value]_truth_value)
  ====
tags: [tla, invariants, temporal-divination, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In the chaotic realm of concurrency, the Singleton ensures that a given entity is manifested only once. The `SingletonProperty` verifies through temporal logic (`[]`) that once `instance_exists` becomes true, the `truth_value` is forever unchanged in all subsequent states. It represents an immutable destiny anchor.
