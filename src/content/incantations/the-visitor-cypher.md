---
title: The Visitor's Spectral Sweep
description: Separating an algorithm from the graph structure by injecting a visitor node that aggregates data.
type: cypher
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Spectral Sweeping"
formula: |2
  // Instantiate the Spectral Visitor
  CREATE (visitor:TaxVisitor {id: randomUUID(), total_collected: 0})
  
  // Define the structure to be visited (all commercial properties)
  WITH visitor
  MATCH (target:Property {zone: 'Commercial'})
  
  // The Visitor "visits" each node, applying logic based on the node's specifics
  WITH visitor, target,
       CASE target.class
         WHEN 'Luxury' THEN target.value * 0.15
         WHEN 'Standard' THEN target.value * 0.05
         ELSE 0
       END AS tax_yield
       
  // Accumulate the state within the Visitor
  WITH visitor, sum(tax_yield) AS total_yield
  SET visitor.total_collected = total_yield
  
  RETURN visitor.id, visitor.total_collected
tags: [cypher, visitor, behavioral, extraction, aggregation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Visitor pattern represents an operation to be performed on the elements of an object structure, letting you define a new operation without changing the classes of the elements. In a Neo4j grid, injecting a "Spectral Sweep" is a common task.

Instead of writing complex extraction logic into the `Property` nodes themselves, we manifest a temporary `TaxVisitor` node (or merely use a variable as the visitor in memory). The visitor sweeps through the commercial zones, reading properties, calculating polymorphic logic via a `CASE` statement, and aggregating the externalized results. The graph structure remains pure and unsullied by the specific algorithms of the tax collectors.
