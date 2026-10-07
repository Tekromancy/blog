---
title: The Composite Labyrinth
description: Representing recursive, tree-like structures within the Graph.
type: graphql
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Topology"
formula: |2
  # The Component representing both leaves and branches
  type LabyrinthNode {
    id: ID!
    name: String!
    description: String!
    
    # The recursion allowing the tree structure
    connectedNodes: [LabyrinthNode!]!
  }

  type Query {
    exploreLabyrinth(entranceId: ID!): LabyrinthNode!
  }
tags: [graphql, structural, composite, recursive, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern shines in GraphQL when defining recursive hierarchies, such as nested categories, comment threads, or labyrinthine dungeon layouts. A type simply defines a field that resolves to a list of its own type, allowing deep, arbitrary nesting in queries.
