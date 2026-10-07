---
title: "The Observer of the Astral Web"
description: "Define a one-to-many cosmic dependency where all astral nodes are notified when the locus changes."
type: tlaplus
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Observer ----
  EXTENDS Naturals, FiniteSets
  
  CONSTANTS Observers
  
  VARIABLES subjectState, notifiedObservers
  
  Init == 
      /\ subjectState = 0
      /\ notifiedObservers = Observers
      
  UpdateSubject(val) ==
      /\ subjectState' = val
      /\ notifiedObservers' = {}
      
  NotifyObserver(obs) ==
      /\ obs \notin notifiedObservers
      /\ notifiedObservers' = notifiedObservers \union {obs}
      /\ UNCHANGED subjectState
      
  Next == 
      \/ \E v \in 1..5 : UpdateSubject(v)
      \/ \E o \in Observers : NotifyObserver(o)
      
  Spec == Init /\ [][Next]_<<subjectState, notifiedObservers>>
  
  Liveness == \A o \in Observers : []<>(o \in notifiedObservers)
  ====
tags: [tla, pub-sub, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Astral Web vibrates across dimensions. The Observer pattern ensures that when the `subjectState` shifts, a wave of updates propagates to all `Observers`. TLA+ proves the powerful `Liveness` property: no matter the non-deterministic scheduling, eventually (`[]<>`), every observer will feel the echo of the shift.
