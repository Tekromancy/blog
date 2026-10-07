---
title: The Mediator of Domains
description: Centralizing complex communications and reducing dependencies.
type: graphql
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Evocation // Coordination"
formula: |2
  # Independent Domains
  type Guild {
    id: ID!
    name: String!
  }

  type Quest {
    id: ID!
    title: String!
  }

  # The Mediator Root
  type Mutation {
    # The Oracle acts as the Mediator.
    # Instead of the Guild service calling the Quest service directly,
    # the central GraphQL schema orchestrates the interaction.
    assignQuestToGuild(guildId: ID!, questId: ID!): QuestAssignmentResult!
  }

  type QuestAssignmentResult {
    guild: Guild!
    quest: Quest!
    status: String!
  }
tags: [graphql, behavioral, mediator, orchestration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The entire GraphQL Root (Query/Mutation) often functions as a Mediator in a microservices architecture. Instead of services calling each other chaotically (a tangled web of dependencies), they remain independent. The Graph Oracle mediates their interactions, executing orchestrating resolvers that stitch their capabilities together.
