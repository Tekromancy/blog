---
title: The Prototypical Clone
description: Duplicating complex entities by referencing a source of truth.
type: graphql
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Replication"
formula: |2
  type SpellScroll {
    id: ID!
    incantation: String!
    potency: Int!
    creator: String!
  }

  input CloneScrollInput {
    sourceId: ID!
    # Optional overrides for the clone
    newPotency: Int
    newCreator: String
  }

  type Mutation {
    # The Prototype pattern: copy an existing entity
    duplicateScroll(input: CloneScrollInput!): SpellScroll!
  }
tags: [graphql, mutations, replication, creational, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype pattern in GraphQL involves mutations that take an existing entity's ID and replicate its state. By providing a `sourceId` and optional overrides, the Oracle copies the arcane data without the client needing to read and re-write every field.
