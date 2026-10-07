---
title: The Builder's Ritual of Assembly
description: Step-by-step construction of complex subgraph aggregates through methodical chained mutations.
type: cypher
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Aggregate Assembly"
formula: |2
  // Step 1: Initialize the core construct
  MERGE (construct:RitualConstruct {id: $constructId})
  ON CREATE SET construct.phase = 'INIT', construct.energy = 0
  
  // Step 2: Attach the runic amplifiers
  WITH construct
  UNWIND $runes AS rune
  MERGE (r:Rune {symbol: rune.symbol})
  MERGE (construct)-[link:AMPLIFIED_BY]->(r)
  ON CREATE SET link.resonance = rune.resonance, construct.energy = construct.energy + rune.resonance
  
  // Step 3: Seal the construct
  WITH construct
  SET construct.phase = 'SEALED', construct.completion_time = timestamp()
  
  RETURN construct
tags: [cypher, builder, neo4j, complex-nodes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder pattern translates to complex subgraph assembly through multiple steps or clauses in Cypher. By chaining `MERGE` and `WITH` operations, a geomancer incrementally weaves a massive aggregate structure.

In this ritual, we initialize a central construct, attach runic amplifiers based on parameters passed from the external application layer, and finally seal the entity. The fluent nature of the Cypher language makes builder queries highly readable, allowing one to follow the precise flow of mana as it shapes the cyber-grid.
