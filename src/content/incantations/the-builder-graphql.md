---
title: The Builder's Ritual
description: Constructing complex magical constructs step-by-step using input types.
type: graphql
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Inputs"
formula: |2
  # The blueprint for our complex construct
  input GolemBuilderInput {
    material: MaterialType!
    height: Float!
    runes: [String!]
    boundSpirit: SpiritInput
  }

  enum MaterialType {
    CLAY
    STONE
    IRON
    CRYSTAL
  }

  input SpiritInput {
    trueName: String!
    elementalAffinity: String!
  }

  type Golem {
    id: ID!
    status: String!
    power: Int!
  }

  type Mutation {
    # The Builder method encapsulating complex creation
    awakenGolem(blueprint: GolemBuilderInput!): Golem!
  }
tags: [graphql, input-types, mutations, creational, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder pattern translates elegantly into GraphQL via deeply nested Input Types. Rather than passing dozens of disparate arguments to a mutation, a single cohesive blueprint is offered to the Oracle, guiding the complex ritual of creation.
