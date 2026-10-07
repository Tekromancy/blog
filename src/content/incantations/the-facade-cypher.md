---
title: The Facade of the Macro-Spell
description: Providing a unified, simplified query interface to a complex underlying graph topology.
type: cypher
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Macro-Weaving"
formula: |2
  // A complex, multi-layered internal operation masked by a single query layer
  // The User only executes this "Facade" query
  
  CALL apoc.periodic.commit(
    "MATCH (user:User {status: 'PENDING_DELETION'})
     // Complex internal sub-graph teardown
     OPTIONAL MATCH (user)-[r1:OWNS]->(asset)
     DETACH DELETE asset
     OPTIONAL MATCH (user)-[r2:MEMBER_OF]->(group)
     // Rebalance group power
     SET group.member_count = group.member_count - 1
     DETACH DELETE user
     RETURN count(*) AS limit",
    {limit: 100}
  ) YIELD updates, executions
  
  RETURN updates, executions
tags: [cypher, facade, structural, apoc, encapsulation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Facade pattern provides a unified interface to a set of interfaces in a subsystem. In the Neo4j grimoire, a Facade is often a macro-query or a stored APOC procedure that encapsulates complex, multi-step graph traversals and mutations.

Instead of requiring the application client to manually delete connected assets, rebalance group sizes, and handle batching, the Facade query wraps these labyrinthine operations into a single execute-and-forget spell. The complexity of the cyber-grid remains hidden behind the illusion of a simple command.
