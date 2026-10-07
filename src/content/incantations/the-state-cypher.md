---
title: The State Phase-Shift
description: Altering an entity's behavior and available traversals by mutating its explicit State node.
type: cypher
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  // Match the entity and its current State
  MATCH (entity:Machine {id: $machineId})-[r:CURRENT_STATE]->(currentState:State)
  
  // Delete the old state pointer
  DELETE r
  
  // Determine new state transition
  WITH entity, currentState
  MATCH (newState:State)
  WHERE (currentState.name = 'IDLE' AND newState.name = 'PROCESSING')
     OR (currentState.name = 'PROCESSING' AND newState.name = 'COMPLETED')
     
  // Shift the entity into the new phase
  MERGE (entity)-[:CURRENT_STATE]->(newState)
  
  // Set properties on the entity depending on the newly assigned state
  SET entity.status_label = newState.name
  
  RETURN entity.id, newState.name AS ActivePhase
tags: [cypher, state, behavioral, state-machine, transitions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern allows an object to alter its behavior when its internal state changes. In Cypher, rather than embedding complex `CASE` logic into every query, we model states as explicit, independent nodes (`State`). 

An entity holds a single `CURRENT_STATE` relationship. By destroying this link and forging it anew to a different state node, the entity undergoes a phase shift. Future queries interacting with this entity will naturally branch into different execution paths simply by matching on the characteristics of the connected state node, effectively delegating behavior to the state graph.
