---
title: The Memento of Time
description: Capturing and restoring an object's internal state.
type: graphql
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Evocation // Chronomancy"
formula: |2
  type Grimoire {
    id: ID!
    content: String!
    # The Memento: an opaque token representing a point in time
    versionToken: String! 
  }

  type Mutation {
    updateGrimoire(id: ID!, newContent: String!): Grimoire!
    
    # Restoring state using the Memento
    restoreGrimoire(id: ID!, versionToken: String!): Grimoire!
  }
tags: [graphql, behavioral, memento, state, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern in GraphQL is achieved by passing opaque state tokens (like cursor strings or version hashes) to the client. The client doesn't need to understand the contents of the `versionToken`; it simply holds it and later returns it to the Oracle to restore the entity to that exact chronological state.
