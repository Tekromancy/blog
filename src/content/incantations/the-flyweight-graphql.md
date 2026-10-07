---
title: The Flyweight Nodes
description: Minimizing memory consumption by sharing common entity structures.
type: graphql
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  # The shared Flyweight interface
  interface Node {
    id: ID!
  }

  type SharedSpell implements Node {
    id: ID! # A globally unique ID for caching
    incantation: String!
    baseDamage: Int!
  }

  type Wizard {
    name: String!
    # Instead of duplicating the spell data, we link to the shared flyweight node
    knownSpells: [SharedSpell!]!
  }
tags: [graphql, structural, flyweight, node, cache, relay]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In the Graph Oracle, the Flyweight pattern is implemented via global object identification (the Relay `Node` interface). By ensuring each entity has a globally unique ID, client-side caches (like Apollo or Relay) can store a single instance of an object in memory and reference it endlessly, saving vital resources.
