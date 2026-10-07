---
title: The Flyweight Node Cache
description: Sharing massive quantities of structural instances by externalizing intrinsic state into singular nodes.
type: cypher
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Density Reduction"
formula: |2
  // Instead of duplicating massive texture or geometry data on every tree
  // We link thousands of instances to a single Flyweight blueprint
  
  // Create or retrieve the shared Flyweight (Intrinsic State)
  MERGE (oakModel:Model3D {type: 'OakTree', lod: 'High', geometry_hash: '0x1A2B3C'})
  
  // Generate the instances (Extrinsic State)
  UNWIND $forestData AS tree
  CREATE (instance:PropInstance {
    id: tree.id,
    x: tree.x,
    y: tree.y,
    z: tree.z,
    scale: tree.scale
  })
  
  // Link instance to the Flyweight
  MERGE (instance)-[:USES_MODEL]->(oakModel)
  
  RETURN count(instance) AS TreesSpawned, oakModel.type
tags: [cypher, flyweight, optimization, sharing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Flyweight pattern reduces the cost of creating and manipulating a large number of similar objects. In a graph database, storing massive, repetitive JSON payloads or string blobs on millions of nodes leads to a collapsed cyber-grid.

Instead, we employ the Flyweight paradigm: we extract the intrinsic, unchanging data (the 3D geometry of an oak tree) into a singular `Model3D` node. The millions of individual trees become mere `PropInstance` nodes storing only their extrinsic state (coordinates, scale), pointing via a relationship to the shared model. The memory footprint of the matrix is vastly reduced.
