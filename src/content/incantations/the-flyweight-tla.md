---
title: "The Flyweight of Shared Timelines"
description: "Minimize state space explosion by sharing immutable temporal fragments across parallel dimensions."
type: tlaplus
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Flyweight ----
  EXTENDS Naturals, Sequences
  
  CONSTANTS SharedFragments, MaxDimensions
  
  VARIABLES dimensionStates
  
  Init == 
      dimensionStates = [d \in 1..MaxDimensions |-> << >>]
      
  AppendFragment(d, frag) ==
      /\ frag \in SharedFragments
      /\ dimensionStates' = [dimensionStates EXCEPT ![d] = Append(dimensionStates[d], frag)]
      
  Next == \E d \in 1..MaxDimensions, f \in SharedFragments : AppendFragment(d, f)
  
  Spec == Init /\ [][Next]_dimensionStates
  ====
tags: [tla, state-space-optimization, temporal-divination, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When divining across thousands of dimensions, model checkers suffer from state-space explosion. The Flyweight pattern mitigates this by drawing from a constant set of `SharedFragments`. Dimensions merely store references (or sequences of these fragments), keeping the mutable state drastically reduced while retaining full expressive power over Destiny.
