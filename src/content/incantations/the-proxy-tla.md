---
title: "The Proxy of Temporal Wards"
description: "Guard access to a sensitive temporal anomaly using a protective logical intermediary."
type: tlaplus
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Proxy ----
  EXTENDS Naturals
  
  VARIABLES trueAnomalyState, proxyAccessGranted, proxyState
  
  Init == 
      /\ trueAnomalyState = 100
      /\ proxyAccessGranted = FALSE
      /\ proxyState = 0
      
  Authenticate(key) ==
      /\ key = 42
      /\ proxyAccessGranted' = TRUE
      /\ UNCHANGED <<trueAnomalyState, proxyState>>
      
  ReadAnomaly ==
      /\ proxyAccessGranted = TRUE
      /\ proxyState' = trueAnomalyState
      /\ UNCHANGED <<trueAnomalyState, proxyAccessGranted>>
      
  Next == 
      \/ \E k \in 1..100 : Authenticate(k)
      \/ ReadAnomaly
      
  Spec == Init /\ [][Next]_<<trueAnomalyState, proxyAccessGranted, proxyState>>
  
  Security == [](proxyState > 0 => proxyAccessGranted)
  ====
tags: [tla, access-control, temporal-divination, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Direct interaction with a temporal anomaly can shatter a timeline. The Proxy acts as a ward, enforcing conditions (like `Authenticate`) before any interaction propagates. TLA+ verifies the `Security` theorem, proving that the `proxyState` only ever reflects the anomaly if the correct esoteric rites were performed.
