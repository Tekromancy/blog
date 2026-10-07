---
title: The Memento Time-Crystal
description: Capturing and externalizing an entity's internal state to restore it later, navigating temporal timelines.
type: cypher
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  // Save State (Create Memento)
  MATCH (entity:Character {id: $charId})
  // Freeze current state into a new Memento node
  CREATE (m:Memento {
    hp: entity.hp,
    mana: entity.mana,
    location: entity.location,
    timestamp: timestamp()
  })
  // Bind it to the timeline
  MERGE (entity)-[:HAS_HISTORY]->(m)
  
  WITH entity, m
  
  // Restore State (Revert to Memento)
  // Find the most recent Memento
  MATCH (entity)-[:HAS_HISTORY]->(latest:Memento)
  WITH entity, latest ORDER BY latest.timestamp DESC LIMIT 1
  
  // Overwrite current entity state with the Memento's preserved truth
  SET entity.hp = latest.hp,
      entity.mana = latest.mana,
      entity.location = latest.location
      
  RETURN entity.id, entity.hp
tags: [cypher, memento, behavioral, versioning, time-travel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Memento pattern captures and externalizes an object's internal state so it can be restored later, without violating encapsulation. In the cyber-grid, this is the very essence of Chronomancy. 

Instead of destructive updates, we spin off a `Memento` node that freezes the entity's current properties. These time-crystals are linked via `HAS_HISTORY` relationships, forming a temporal chain. When a catastrophic failure occurs, a simple Cypher reversal pulls the most recent crystal from the void and overwrites the corrupted present with a perfectly preserved past.
