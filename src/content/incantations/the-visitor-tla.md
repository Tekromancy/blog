---
title: "The Visitor of Dimensional Walkers"
description: "Represent an operation to be performed on the elements of an object structure without changing their classes."
type: tlaplus
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE Visitor ----
  EXTENDS Naturals, FiniteSets
  
  CONSTANTS Nodes, Types, VisitorLogic(_, _)
  
  VARIABLES unvisitedNodes, results
  
  Init == 
      /\ unvisitedNodes = Nodes
      /\ results = {}
      
  Visit(node, type) ==
      /\ node \in unvisitedNodes
      /\ results' = results \union {VisitorLogic(node, type)}
      /\ unvisitedNodes' = unvisitedNodes \setminus {node}
      
  Next == \E n \in unvisitedNodes, t \in Types : Visit(n, t)
  
  Spec == Init /\ [][Next]_<<unvisitedNodes, results>>
  ====
tags: [tla, traversal, temporal-divination, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Dimensional Walkers traverse the cosmic graph, blessing or cursing nodes based on their innate types. The Visitor pattern decouples the algorithm (`VisitorLogic`) from the `Nodes` themselves. TLA+ ensures complete coverage: eventually, `unvisitedNodes` will be empty, meaning every timeline has been evaluated by the Walker.
