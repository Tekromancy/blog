---
title: "The Template Method of the Ritual Skeleton"
description: "Define the skeleton of a grand ritual in an operation, deferring esoteric steps to specialized subclasses."
type: tlaplus
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE TemplateMethod ----
  EXTENDS Naturals
  
  CONSTANTS Implementations, SpecificStep(_, _)
  
  VARIABLES step, activeImpl, context
  
  Init == 
      /\ step = 1
      /\ activeImpl \in Implementations
      /\ context = 0
      
  CommonStep1 ==
      /\ step = 1
      /\ context' = context + 10
      /\ step' = 2
      /\ UNCHANGED activeImpl
      
  DeferredStep2 ==
      /\ step = 2
      /\ context' = SpecificStep(activeImpl, context)
      /\ step' = 3
      /\ UNCHANGED activeImpl
      
  CommonStep3 ==
      /\ step = 3
      /\ context' = context * 2
      /\ step' = 4
      /\ UNCHANGED activeImpl
      
  Next == CommonStep1 \/ DeferredStep2 \/ CommonStep3
  
  Spec == Init /\ [][Next]_<<step, activeImpl, context>>
  ====
tags: [tla, ritual-structure, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A grand ritual requires absolute precision. The Template Method hardcodes the structural backbone of the ceremony (`CommonStep1`, `CommonStep3`), while allowing the `activeImpl` to fill in the variable mysticism (`SpecificStep`). This ensures that no matter the sect performing the ritual, the overarching invariants hold true.
