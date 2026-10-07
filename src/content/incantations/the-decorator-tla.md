---
title: "The Decorator of Augmented Foresight"
description: "Dynamically attach additional properties to a state machine without altering its core temporal axioms."
type: tlaplus
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Decorator ----
  EXTENDS Naturals
  
  VARIABLES baseState, metaData
  
  BaseAction == 
      /\ baseState < 10
      /\ baseState' = baseState + 1
      
  DecoratorAction ==
      /\ BaseAction
      /\ metaData' = metaData \union {baseState'}
      
  Init == 
      /\ baseState = 0
      /\ metaData = {}
      
  Next == DecoratorAction \/ (BaseAction /\ UNCHANGED metaData)
  
  Spec == Init /\ [][Next]_<<baseState, metaData>>
  ====
tags: [tla, state-extension, temporal-divination, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Decorator allows us to weave new divinatory insights (`metaData`) atop an existing timeline progression (`BaseAction`) without rewriting the fundamental laws of time. By conjuncting `BaseAction` within `DecoratorAction`, we guarantee the original invariants hold while extending the verifiable state space.
