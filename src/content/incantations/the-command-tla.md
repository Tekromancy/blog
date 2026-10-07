---
title: "The Command of Encapsulated Fate"
description: "Encapsulate a destined action as an independent entity, allowing undo/redo across temporal boundaries."
type: tlaplus
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Command ----
  EXTENDS Naturals, Sequences
  
  VARIABLES state, history
  
  Init == 
      /\ state = 0
      /\ history = << >>
      
  ExecuteCommand(cmdValue) ==
      /\ state' = state + cmdValue
      /\ history' = Append(history, cmdValue)
      
  UndoCommand ==
      /\ Len(history) > 0
      /\ state' = state - history[Len(history)]
      /\ history' = SubSeq(history, 1, Len(history) - 1)
      
  Next == 
      \/ \E v \in 1..5 : ExecuteCommand(v)
      \/ UndoCommand
      
  Spec == Init /\ [][Next]_<<state, history>>
  ====
tags: [tla, undo-history, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
To command fate is to record it. The Command pattern materializes actions as elements in a `history` sequence. This encapsulation allows seers to perform temporal reversions (`UndoCommand`), unwinding the state exactly as it was manipulated. TLA+ ensures our history invariants perfectly map back to the origin state.
