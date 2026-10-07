---
title: "The Memento of Time Crystals"
description: "Capture and externalize an entity's internal state so it can be restored to this exact moment later."
type: tlaplus
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Memento ----
  EXTENDS Naturals
  
  VARIABLES currentState, savedMemento
  
  Init == 
      /\ currentState = 0
      /\ savedMemento = -1
      
  MutateState ==
      /\ currentState' = currentState + 1
      /\ UNCHANGED savedMemento
      
  SaveMemento ==
      /\ savedMemento' = currentState
      /\ UNCHANGED currentState
      
  RestoreMemento ==
      /\ savedMemento # -1
      /\ currentState' = savedMemento
      /\ UNCHANGED savedMemento
      
  Next == MutateState \/ SaveMemento \/ RestoreMemento
  
  Spec == Init /\ [][Next]_<<currentState, savedMemento>>
  ====
tags: [tla, state-restoration, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When traversing treacherous futures, an chronomancer may embed their current essence into a Time Crystal. The Memento pattern captures `currentState` into `savedMemento`. Should the future lead to ruin, `RestoreMemento` acts as a perfect temporal anchor, resetting reality back to the pristine crystalized state.
