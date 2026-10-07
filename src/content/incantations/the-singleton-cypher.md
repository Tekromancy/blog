---
title: The Singleton Nexus Anchor
description: Enforcing a single unified point of truth using constraints and MERGE rites.
type: cypher
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Anchor-weaving"
formula: |2
  // Pre-requisite: Assert the singular nature of the Nexus
  // CREATE CONSTRAINT single_nexus IF NOT EXISTS FOR (n:Nexus) REQUIRE n.realm IS UNIQUE;
  
  // The Incantation to retrieve or initialize the Singleton
  MERGE (nexus:Nexus {realm: 'PrimeMaterial'})
  ON CREATE SET nexus.established_at = timestamp(),
                nexus.entropy_level = 0
  ON MATCH SET nexus.last_accessed = timestamp()
  
  RETURN nexus
tags: [cypher, singleton, constraints, merge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Singleton pattern guarantees that only one instance of a class exists. In Cypher, this translates to ensuring a single, unique node represents a global entity or concept, such as a central `Nexus` or `Configuration` node.

We achieve this through the combined power of unique database constraints and the idempotent `MERGE` clause. No matter how many threads or rogue agents attempt to initialize the Nexus concurrently, the graph engine's internal locks and constraints will ensure that exactly one Anchor is manifested in the cyber-grid.
