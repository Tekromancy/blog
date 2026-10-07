---
title: "The Factory Method: Spawning the Logical Node"
description: "Define an interface for creating a single node, but let subclasses alter the type."
type: alloy
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Node-Weaving"
formula: |2
  abstract sig NodeConstruct {}
  sig DataNode, LogicNode extends NodeConstruct {}
  
  abstract sig NodeSpawner {
    spawns: one NodeConstruct
  }
  
  sig DataSpawner extends NodeSpawner {}
  {
    spawns in DataNode
  }
  
  sig LogicSpawner extends NodeSpawner {}
  {
    spawns in LogicNode
  }
  
  pred spawn_logic[s: LogicSpawner] {
    some s.spawns
  }
  
  run spawn_logic for 3
tags: [creational, factory method, sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Factory Method: Spawning the Logical Node

The simplest form of creation magic in Alloy. The Spawner simply decrees that its `spawns` relation must yield a specific subset of the `NodeConstruct` hierarchy. Through these declarations, the model-finder explores only valid permutations of node genesis.
