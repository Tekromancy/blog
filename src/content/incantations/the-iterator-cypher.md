---
title: The Iterator's Infinite Walk
description: Providing sequential access to an aggregate's elements without exposing its underlying graph topology.
type: cypher
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Pacing"
formula: |2
  // Initialize the cursor (Iterator) for a client
  MATCH (collection:DataAggregate {name: 'Archives'})-[:CONTAINS]->(firstItem:ArchiveItem {index: 0})
  MERGE (cursor:Cursor {session_id: $sessionId})
  ON CREATE SET cursor.current_index = 0
  
  // Advance the iterator to fetch the next N items
  WITH cursor, firstItem
  MATCH (currentItem:ArchiveItem {index: cursor.current_index})
  MATCH path = (currentItem)-[:NEXT_ITEM*0..5]->(nextItems:ArchiveItem)
  
  // Update the cursor to the last fetched item's index + 1
  WITH cursor, nodes(path) AS items
  SET cursor.current_index = items[-1].index + 1
  
  RETURN items
tags: [cypher, iterator, behavioral, pagination, cursors]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Iterator pattern provides a way to access the elements of an aggregate object sequentially. In the chaotic sprawl of a graph, a standard linked list or sequential structure must be explicitly mapped via relationships like `NEXT_ITEM`.

To prevent overloading the cyber-grid, we employ a `Cursor` node to maintain the state of the iteration. The query uses this cursor to pick up exactly where it left off, walking the `NEXT_ITEM` relationships to fetch the next batch of nodes. The underlying complexity of the `DataAggregate` is completely shielded from the netrunner.
