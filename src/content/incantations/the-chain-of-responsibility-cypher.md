---
title: The Chain of Responsibility Flow
description: Passing requests along a sequence of handler nodes until one consumes and processes the signal.
type: cypher
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Signal Routing"
formula: |2
  // A signal enters the chain
  MATCH (signal:Alert {id: $alertId})
  
  // Match the chain of handlers sorted by sequence
  MATCH path = (start:Handler {is_entry: true})-[:NEXT_HANDLER*0..]->(h:Handler)
  
  // Find the first handler in the chain that can process this severity
  WHERE h.max_severity >= signal.severity
  
  // Extract the specific handler and slice the path
  WITH signal, h, length(path) AS depth
  ORDER BY depth ASC LIMIT 1
  
  // Bind the signal to the handler
  MERGE (signal)-[:HANDLED_BY {time: timestamp()}]->(h)
  
  RETURN h.name AS ResponsibleNode, depth AS ChainDepth
tags: [cypher, chain-of-responsibility, behavioral, path-traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility delegates commands to a chain of processing objects. Cypher elegantly translates this into a literal graph path consisting of `Handler` nodes connected by `NEXT_HANDLER` relationships.

When an `Alert` signal enters the system, we traverse the linked list of handlers. The `WHERE` clause acts as the filter, checking if a node has the capacity to process the signal. By ordering by path length and limiting to 1, we ensure the signal is caught by the *first* capable node in the chain, successfully mimicking the classic behavioral pattern within the grid.
