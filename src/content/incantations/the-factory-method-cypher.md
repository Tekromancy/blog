---
title: The Factory Method of Daemon Spawning
description: Polymorphic node creation based on data-driven conditional logic and label mutation.
type: cypher
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity Spawning"
formula: |2
  UNWIND $daemons AS daemonData
  // Determine the polymorphic label to apply based on input traits
  WITH daemonData,
       CASE daemonData.affinity
         WHEN 'FIRE' THEN 'IgnisDaemon'
         WHEN 'ICE' THEN 'GlaciesDaemon'
         ELSE 'NullDaemon'
       END AS daemonLabel
  
  // Create the generic Daemon node
  CREATE (d:Daemon {
    id: randomUUID(),
    affinity: daemonData.affinity,
    power: daemonData.power
  })
  
  // Use APOC to dynamically add the specific label (Factory Method execution)
  WITH d, daemonLabel
  CALL apoc.create.addLabels(d, [daemonLabel]) YIELD node
  
  RETURN node.id AS DaemonID, labels(node) AS DaemonTypes
tags: [cypher, factory-method, neo4j, dynamic-labels]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method defers the exact type of object creation to subclasses. In the realm of graph divination, this translates to determining a node's specific labels at runtime based on the data it possesses.

By invoking the ancient `apoc.create.addLabels` incantation, we execute a true Factory Method within the query itself. The generic `Daemon` is summoned, and based on its elemental affinity parameter, its true specialized form (such as `IgnisDaemon` or `GlaciesDaemon`) is manifested into the graph construct.
