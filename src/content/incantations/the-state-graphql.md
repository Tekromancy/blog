---
title: The State of the Soul
description: Altering an entity's schema based on its internal condition.
type: graphql
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Evocation // Transformation"
formula: |2
  # The common interface for all states
  interface QuestState {
    id: ID!
    title: String!
  }

  # Concrete State 1
  type PendingQuest implements QuestState {
    id: ID!
    title: String!
    requiredLevel: Int!
  }

  # Concrete State 2
  type ActiveQuest implements QuestState {
    id: ID!
    title: String!
    currentObjective: String!
    timeRemaining: Int!
  }

  # Concrete State 3
  type CompletedQuest implements QuestState {
    id: ID!
    title: String!
    rewardsClaimed: Boolean!
  }

  union Quest = PendingQuest | ActiveQuest | CompletedQuest

  type Query {
    # The entity returned has different fields based on its internal state
    getQuest(id: ID!): Quest!
  }
tags: [graphql, behavioral, state, unions, interfaces]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern in GraphQL is powerfully represented by returning Unions or Interfaces where the concrete type changes depending on the entity's lifecycle. A quest that is `Pending` exposes different fields than one that is `Active`, naturally forcing the client to handle the entity's current state.
