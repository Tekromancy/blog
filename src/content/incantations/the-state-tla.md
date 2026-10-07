---
title: "The State of Quantum Flux"
description: "Allow a temporal entity to alter its cosmic behavior when its internal quantum state transitions."
type: tlaplus
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE StatePattern ----
  EXTENDS Naturals
  
  VARIABLES phase, behaviorOutput
  
  Init == 
      /\ phase = "Solid"
      /\ behaviorOutput = "Resting"
      
  SolidAction ==
      /\ phase = "Solid"
      /\ behaviorOutput' = "Holding"
      /\ phase' = "Liquid"
      
  LiquidAction ==
      /\ phase = "Liquid"
      /\ behaviorOutput' = "Flowing"
      /\ phase' = "Gas"
      
  GasAction ==
      /\ phase = "Gas"
      /\ behaviorOutput' = "Expanding"
      /\ phase' = "Solid"
      
  Next == SolidAction \/ LiquidAction \/ GasAction
  
  Spec == Init /\ [][Next]_<<phase, behaviorOutput>>
  ====
tags: [tla, state-machine, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
As an entity transitions through Quantum Flux, its very nature changes. The State pattern is elegantly native to TLA+. An entity's actions (`SolidAction`, `LiquidAction`) are heavily guarded by its current `phase`. It visually and logically transitions the behavior seamlessly without complex conditional nesting.
