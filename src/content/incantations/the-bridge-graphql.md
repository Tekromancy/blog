---
title: The Bridge of Realms
description: Decoupling a mystical abstraction from its earthly implementation.
type: graphql
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Abstraction"
formula: |2
  # The Abstraction
  interface SpellcastingAbility {
    castSpell(name: String!): String!
    manaCost: Int!
  }

  # Implementation A
  type Wizard implements SpellcastingAbility {
    castSpell(name: String!): String!
    manaCost: Int!
    grimoire: String!
  }

  # Implementation B
  type Sorcerer implements SpellcastingAbility {
    castSpell(name: String!): String!
    manaCost: Int!
    bloodline: String!
  }

  type Query {
    # The client queries the abstraction, indifferent to the underlying implementation
    fetchCasters: [SpellcastingAbility!]!
  }
tags: [graphql, structural, bridge, interfaces]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern uses GraphQL interfaces to decouple the definition of a capability (the abstraction) from its specific implementation. A client can interact with `SpellcastingAbility` without caring whether a `Wizard` or `Sorcerer` fulfills the contract.
