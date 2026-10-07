---
title: The Oracle's Factory Method
description: Delegating the instantiation of specific mystical entities to the underlying resolvers.
type: graphql
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Resolvers"
formula: |2
  interface SummonedEntity {
    id: ID!
    planeOfOrigin: String!
  }

  type Demon implements SummonedEntity {
    id: ID!
    planeOfOrigin: String!
    horns: Int!
  }

  type Angel implements SummonedEntity {
    id: ID!
    planeOfOrigin: String!
    wingspan: Float!
  }

  type Mutation {
    # The Factory Method
    # The exact type of SummonedEntity is decided by the Oracle's internal logic
    performSummoning(ritualType: String!): SummonedEntity!
  }
tags: [graphql, interface, mutation, creational, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Through the Factory Method, the exact nature of the entity returned is obscured from the invoker. The client simply asks the Oracle to perform a summoning, and the Oracle's hidden logic decides whether an Angel or a Demon manifests.
