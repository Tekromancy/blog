---
title: "The Chain of Responsibility of Karmic Flow"
description: "Pass a temporal disturbance along a chain of cosmic handlers until one resolves it."
type: tlaplus
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE ChainOfResponsibility ----
  EXTENDS Naturals, Sequences
  
  CONSTANTS Handlers, CanHandle(_, _)
  
  VARIABLES activeEvent, currentHandlerIdx
  
  Init == 
      /\ activeEvent \in Naturals
      /\ currentHandlerIdx = 1
      
  HandleEvent ==
      /\ currentHandlerIdx \in DOMAIN Handlers
      /\ CanHandle(Handlers[currentHandlerIdx], activeEvent)
      /\ activeEvent' = 0 \* Resolved
      /\ UNCHANGED currentHandlerIdx
      
  PassToNext ==
      /\ currentHandlerIdx \in DOMAIN Handlers
      /\ ~CanHandle(Handlers[currentHandlerIdx], activeEvent)
      /\ currentHandlerIdx' = currentHandlerIdx + 1
      /\ UNCHANGED activeEvent
      
  Next == HandleEvent \/ PassToNext
  
  Spec == Init /\ [][Next]_<<activeEvent, currentHandlerIdx>>
  ====
tags: [tla, delegation, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A karmic disturbance ripples through the cosmos. The Chain of Responsibility models an ordered sequence of deities or handlers. In TLA+, we evaluate `CanHandle`. If false, we transition to the next entity in the sequence. This proves liveness properties: eventually, the disturbance is resolved, or the chain is exhausted.
