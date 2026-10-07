---
title: "The Adapter of Dimensional Translation"
description: "Bridge incompatible state spaces through homomorphic mappings."
type: tlaplus
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Adapter ----
  EXTENDS Naturals
  
  VARIABLES alienState, earthState
  
  AlienDynamics == 
      \/ (alienState = "Zorg" /\ alienState' = "Blargh")
      \/ (alienState = "Blargh" /\ alienState' = "Zorg")
      
  Adapter == 
      earthState = IF alienState = "Zorg" THEN "Morning" ELSE "Night"
      
  Init == 
      /\ alienState = "Zorg"
      /\ Adapter
      
  Next == 
      /\ AlienDynamics
      /\ earthState' = IF alienState' = "Zorg" THEN "Morning" ELSE "Night"
      
  Spec == Init /\ [][Next]_<<alienState, earthState>>
  ====
tags: [tla, state-mapping, temporal-divination, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Adapter in TLA+ is often implemented as a refinement or a state variable mapped deterministically from another. Here, the `earthState` is adapted purely from the `alienState`, translating chaotic extradimensional shifts into a predictable temporal cycle that mortal minds can verify.
