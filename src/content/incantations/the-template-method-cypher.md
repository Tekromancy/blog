---
title: The Template Method Routine
description: Defining the skeleton of a ritual, delegating specific steps to dynamically matched sub-nodes.
type: cypher
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Skeletons"
formula: |2
  // Step 1: The immutable skeleton (Base Routine)
  MATCH (routine:DailyJob {id: 'BackupRoutine'})
  
  // Step 2: Traverse to the specialized subclass implementations
  MATCH (routine)-[:IMPLEMENTS_STEP {order: 1}]->(step1:Action)
  MATCH (routine)-[:IMPLEMENTS_STEP {order: 2}]->(step2:Action)
  
  // Execute common logic (Template code)
  SET routine.last_run = timestamp()
  
  // Execute the polymorphic steps dynamically
  // (In practice, yielding specific labels or invoking APOC based on step types)
  WITH step1, step2
  
  CALL apoc.do.case([
    step1.type = 'Compress', 'RETURN "Compressing Data..." AS result',
    step1.type = 'Encrypt', 'RETURN "Encrypting Matrix..." AS result'
  ], 'RETURN "Unknown" AS result', {}) YIELD value AS action1
  
  RETURN action1.result AS Step1Execution
tags: [cypher, template-method, behavioral, steps, apoc]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Template Method defines the skeleton of an algorithm in an operation, deferring some steps to subclasses. Within our magical Cypher paradigm, a `DailyJob` node acts as the master ritual template.

It executes the immutable logic (like updating timestamps), but delegates the actual payload execution to attached `Action` nodes ordered by relationships. Using `apoc.do.case`, the query dynamically triggers the specific polymorphic steps defined by the graph topology. The overarching spell remains unchanged, while the specific manifestations vary wildly based on the graph's connections.
