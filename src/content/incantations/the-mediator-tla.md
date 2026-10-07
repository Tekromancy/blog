---
title: "The Mediator of Celestial Conjunctions"
description: "Reduce chaotic dependencies between celestial bodies by centralizing their gravitational communications."
type: tlaplus
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Mediator ----
  EXTENDS Naturals
  
  VARIABLES entityA, entityB, mediatorChannel
  
  Init == 
      /\ entityA = "Stable"
      /\ entityB = "Stable"
      /\ mediatorChannel = "Empty"
      
  ASendsSignal ==
      /\ entityA = "Stable"
      /\ mediatorChannel' = "SignalFromA"
      /\ entityA' = "Waiting"
      /\ UNCHANGED entityB
      
  MediatorRoutesToB ==
      /\ mediatorChannel = "SignalFromA"
      /\ entityB' = "Reacting"
      /\ mediatorChannel' = "Empty"
      /\ UNCHANGED entityA
      
  Next == ASendsSignal \/ MediatorRoutesToB
  
  Spec == Init /\ [][Next]_<<entityA, entityB, mediatorChannel>>
  ====
tags: [tla, decoupling, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Celestial bodies must not influence one another directly lest paradoxical loops form. The Mediator acts as the single point of interaction. `entityA` does not modify `entityB`; it modifies the `mediatorChannel`. TLA+ verifies that the Mediator resolves these signals fairly, maintaining cosmic order.
