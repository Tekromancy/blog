---
title: The Strategies of War
description: Defining a family of algorithms and making them interchangeable via inputs.
type: graphql
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  # The Strategy Enums
  enum SortingStrategy {
    BY_POWER_DESC
    BY_AGE_ASC
    BY_RARITY
  }

  enum CombatAlgorithm {
    AGGRESSIVE
    DEFENSIVE
    STEALTH
  }

  type Query {
    # The client chooses the strategy for fetching and sorting
    listWarriors(sort: SortingStrategy! = BY_POWER_DESC): [Warrior!]!
  }

  type Mutation {
    # The client chooses the execution strategy
    executeRaid(target: String!, tactics: CombatAlgorithm!): RaidResult!
  }

  type Warrior {
    name: String!
    power: Int!
  }

  type RaidResult {
    success: Boolean!
    casualties: Int!
  }
tags: [graphql, behavioral, strategy, enums, inputs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In GraphQL, the Strategy pattern is frequently implemented by passing Enums as arguments to fields. The client explicitly dictates the algorithm or behavior the resolver should use—whether it's how to sort a list of entities or which tactical algorithm to use during a complex mutation.
