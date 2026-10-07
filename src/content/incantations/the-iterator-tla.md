---
title: "The Iterator of Cyclic Eons"
description: "Sequentially access the elements of a cosmic aggregate without exposing its underlying dimensional representation."
type: tlaplus
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Iterator ----
  EXTENDS Naturals, Sequences
  
  CONSTANTS Cosmos
  
  VARIABLES collection, cursor, currentElement
  
  Init == 
      /\ collection \in Seq(Cosmos)
      /\ cursor = 1
      /\ currentElement = "None"
      
  HasNext == cursor <= Len(collection)
  
  NextElement ==
      /\ HasNext
      /\ currentElement' = collection[cursor]
      /\ cursor' = cursor + 1
      /\ UNCHANGED collection
      
  Next == NextElement \/ (~HasNext /\ UNCHANGED <<collection, cursor, currentElement>>)
  
  Spec == Init /\ [][Next]_<<collection, cursor, currentElement>>
  ====
tags: [tla, traversal, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
To scry across a sequence of eons, one must iterate. The Iterator safely traverses the `collection` by maintaining a `cursor`. In temporal modeling, we decouple the iteration logic from the cosmic sequence itself, ensuring no boundary violations (such as reading past the end of time) ever occur.
