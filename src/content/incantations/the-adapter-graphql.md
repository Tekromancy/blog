---
title: The Adapter of Ancient Texts
description: Bridging archaic data structures into the modern Oracle's schema.
type: graphql
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  # The Old API provided messy data
  type AncientGrimoire {
    old_id: ID!
    author_name_str: String!
    pages_count: Int!
  }

  # The Modern GraphQL Schema (Adapter)
  type Tome {
    id: ID!
    author: String!
    pageCount: Int!
  }

  type Query {
    # The resolver for this query acts as the Adapter, mapping AncientGrimoire fields to Tome
    readTome(id: ID!): Tome
  }
tags: [graphql, structural, adapter, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter pattern in the Graph Oracle allows arcane and convoluted legacy data sources (like REST endpoints or raw database schemas) to be translated seamlessly into a clean, modern GraphQL schema. The resolvers act as translators, converting `author_name_str` into a simple `author`.
