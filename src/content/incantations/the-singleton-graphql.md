---
title: The Singleton Roots of the Oracle
description: The single, omnipresent entry points to the Graph.
type: graphql
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Universal // Schema"
formula: |2
  schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
  }

  # The Singleton Query Root
  type RootQuery {
    omniscienceLevel: Int!
    readAkashicRecords(id: ID!): Record
  }

  # The Singleton Mutation Root
  type RootMutation {
    alterReality(change: String!): RealityStatus!
  }

  # The Singleton Subscription Root
  type RootSubscription {
    watchLeyLines: LeyLineEvent!
  }

  type Record {
    id: ID!
    content: String!
  }

  type RealityStatus {
    stable: Boolean!
  }

  type LeyLineEvent {
    surge: Int!
  }
tags: [graphql, schema, root-types, creational, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the realm of GraphQL, the Singleton pattern is enforced natively by the specification. The `Query`, `Mutation`, and `Subscription` roots are singletons—there can be only one instance of each in the entire schema, serving as the sole gateways to the Oracle's wisdom.
