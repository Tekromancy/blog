---
title: The Strategy Execution Matrix
description: Selecting interchangeable algorithmic paths at runtime by traversing to designated Strategy nodes.
type: cypher
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Algorithmic Routing"
formula: |2
  // Determine which Strategy to execute based on a runtime parameter
  MATCH (context:PricingContext {region: $region})
  
  // Find the dynamically bound Strategy node
  MATCH (context)-[:USES_STRATEGY]->(strategy:PricingStrategy)
  
  // Execute logic branches based on the Strategy's properties
  WITH strategy, $basePrice AS base
  
  RETURN CASE strategy.type
    WHEN 'FlatDiscount' THEN base - strategy.value
    WHEN 'Percentage' THEN base - (base * strategy.value)
    WHEN 'Surge' THEN base * strategy.value
    ELSE base
  END AS FinalCalculatedPrice
tags: [cypher, strategy, behavioral, polymorphism, conditional]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. In the Neo4j grid, algorithms and business rules don't need to be hardcoded in application logic; they can exist as `PricingStrategy` nodes.

By mapping a `Context` node to a specific `Strategy` node, the graph itself dictates the execution flow. When the query is cast, it evaluates the `strategy.type` to determine which arcane mathematical formula to apply. Swapping a client's algorithm is as simple as severing one relationship and drawing a line to a different strategy node.
