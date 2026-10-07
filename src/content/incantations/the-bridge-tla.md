---
title: "The Bridge of Detached Realities"
description: "Decouple a temporal abstraction from its dimensional implementation so both can vary independently."
type: tlaplus
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Bridge ----
  EXTENDS Naturals
  
  CONSTANTS Implementations, Abstractions, Invoke(_, _)
  
  VARIABLES currentAbstraction, currentImpl, result
  
  Init == 
      /\ currentAbstraction \in Abstractions
      /\ currentImpl \in Implementations
      /\ result = "None"
      
  Execute ==
      /\ result' = Invoke(currentAbstraction, currentImpl)
      /\ UNCHANGED <<currentAbstraction, currentImpl>>
      
  ShiftAbstraction(newAbs) ==
      /\ newAbs \in Abstractions
      /\ currentAbstraction' = newAbs
      /\ UNCHANGED <<currentImpl, result>>
      
  ShiftImpl(newImpl) ==
      /\ newImpl \in Implementations
      /\ currentImpl' = newImpl
      /\ UNCHANGED <<currentAbstraction, result>>
      
  Next == Execute \/ (\E a \in Abstractions : ShiftAbstraction(a)) \/ (\E i \in Implementations : ShiftImpl(i))
  
  Spec == Init /\ [][Next]_<<currentAbstraction, currentImpl, result>>
  ====
tags: [tla, decoupling, temporal-divination, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge divides the prophetic vision from the magical mechanism. In TLA+, we represent this as orthogonal variables (`currentAbstraction` and `currentImpl`) that can transition independently. The system's behavior (`Invoke`) resolves across the Cartesian product of the two, enabling vast explorations of cross-reality phenomena.
