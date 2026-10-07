---
title: The Composite Hierarchy Tree
description: Treating individual objects and compositions of objects uniformly via recursive graph traversal.
type: cypher
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Divination // Fractal Topology"
formula: |2
  // Match any component (File or Directory) and recursively calculate total size
  MATCH (root:FileSystemComponent {name: 'root_dir'})
  
  // Traverse the composite structure using variable-length paths
  MATCH path = (root)-[:CONTAINS*0..]->(leaf:FileSystemComponent)
  WHERE NOT (leaf)-[:CONTAINS]->() // ensure we are at the leaves if needed, or aggregate all
  
  // Calculate the total mass of the structure uniformly
  WITH root, sum(leaf.size) AS total_subtree_size
  
  RETURN root.name, total_subtree_size
tags: [cypher, composite, tree-traversal, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern allows clients to treat individual objects and compositions of objects uniformly. For a graph database like Neo4j, this is arguably its most natural state. Hierarchies, trees, and fractal topologies are first-class citizens.

Using variable-length paths (`-[:CONTAINS*0..]->`), a single Cypher incantation can sweep through an infinitely deep recursive tree. Whether the starting node is a single leaf (a file) or a massive composite structure (a directory containing sub-directories), the query execution treats them identically, rolling up the arcane metadata into a single, unified metric.
