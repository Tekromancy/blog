---
title: The Iterator of Epochs
description: Sequentially accessing the elements of a vast collection.
type: graphql
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Evocation // Traversal"
formula: |2
  # The Relay Connection pattern (Iterator)
  type ArtifactConnection {
    edges: [ArtifactEdge!]!
    pageInfo: PageInfo!
  }

  type ArtifactEdge {
    cursor: String!
    node: Artifact!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Artifact {
    id: ID!
    name: String!
  }

  type Query {
    # Iterating through artifacts using cursors
    listArtifacts(first: Int, after: String): ArtifactConnection!
  }
tags: [graphql, behavioral, iterator, pagination, relay]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Iterator pattern in the Graph Oracle is universally recognized as the Relay Connection specification. By using Cursors and PageInfo, casters can traverse massive, seemingly infinite collections of entities sequentially without loading the entire compendium into memory.
