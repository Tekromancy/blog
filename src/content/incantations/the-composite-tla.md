---
title: "The Composite of Fractal Timelines"
description: "Treat individual events and complex destiny webs uniformly through recursive set structures."
type: tlaplus
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Composite ----
  EXTENDS FiniteSets, Naturals
  
  CONSTANTS Leaves, Nodes
  
  VARIABLES structure, activeNode
  
  \* A simplified representation of a tree structure using relations
  Init == 
      /\ structure \in [Nodes -> SUBSET (Nodes \union Leaves)]
      /\ activeNode \in Nodes \union Leaves
      
  Traverse(child) ==
      /\ activeNode \in Nodes
      /\ child \in structure[activeNode]
      /\ activeNode' = child
      /\ UNCHANGED structure
      
  Next == \E c \in Nodes \union Leaves : Traverse(c)
  
  Spec == Init /\ [][Next]_<<structure, activeNode>>
  ====
tags: [tla, recursion, temporal-divination, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Timelines often branch fractally. The Composite pattern unifies the traversal of singular events (`Leaves`) and complex nested destinies (`Nodes`). In TLA+, this is modeled via functions mapping nodes to subsets of children. Verification tools can then traverse these fractal destinies recursively to prove absence of cyclic paradoxes.
