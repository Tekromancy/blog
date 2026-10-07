---
title: The Proxy Guardian Relic
description: Controlling access to a sensitive graph cluster by routing traversals through a validation proxy node.
type: cypher
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Guardian Wards"
formula: |2
  // User attempts to access a highly sensitive DataVault
  MATCH (user:Netrunner {id: $runnerId})
  
  // The traversal MUST pass through the Proxy (Guardian)
  MATCH (user)-[req:REQUESTS_ACCESS]->(proxy:VaultProxy)-[:GUARDS]->(vault:DataVault)
  
  // Proxy logic evaluates clearance
  WHERE user.clearance_level >= proxy.required_clearance
    AND proxy.status = 'ACTIVE'
    
  // If the Proxy allows it, yield the Vault data
  WITH user, vault
  // Log the successful breach
  CREATE (user)-[:ACCESSED {time: timestamp()}]->(vault)
  
  RETURN vault.secrets AS ExtractedData
tags: [cypher, proxy, structural, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Proxy pattern provides a surrogate or placeholder to control access to another object. Within the Neo4j matrix, a Proxy is manifested as an intermediary node (a `VaultProxy` or Guardian) that sits directly on the critical path between a user and the secure data.

By mandating that all traversals to a `DataVault` must first flow through the `VaultProxy`, we enforce access control logic at the graph layer. The query evaluates the runner's clearance against the Proxy's wards; if the conditions fail, the traversal dies in the void, and the real entity remains shielded.
