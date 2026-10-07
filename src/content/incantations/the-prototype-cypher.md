---
title: The Prototype Clone-Weave
description: Duplicating complex subgraphs and entities by echoing existing topological patterns.
type: cypher
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Echo-mancy"
formula: |2
  MATCH (prototype:Construct {id: $prototypeId})
  
  // Clone the node itself using APOC
  CALL apoc.refactor.cloneNodes([prototype], true, ['id']) YIELD input, output AS clone
  
  // Generate a new unique signature for the clone
  SET clone.id = randomUUID(),
      clone.cloned_from = prototype.id,
      clone.generation = coalesce(prototype.generation, 0) + 1
      
  // Clone outward relationships to preserve the structural prototype
  WITH prototype, clone
  MATCH (prototype)-[r]->(target)
  CALL apoc.create.relationship(clone, type(r), properties(r), target) YIELD rel
  
  RETURN clone, collect(rel) AS bindings
tags: [cypher, prototype, cloning, apoc]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Prototype pattern requires the ability to create new objects by copying an existing instance. In a graph ecosystem, copying an entity isn't merely duplicating a row; it requires echoing its very connections into the void and binding the new node to the same relational anchors.

Using `apoc.refactor.cloneNodes`, a cyber-mage can effortlessly replicate the core attributes of a structure, bypassing the need for complex property mapping. We then cast an outward gaze to replicate the structural bindings, ensuring the clone shares the same network topology as its predecessor.
