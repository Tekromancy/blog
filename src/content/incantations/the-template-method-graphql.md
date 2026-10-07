---
title: The Template of Rituals
description: Defining the skeleton of an algorithm in an interface, deferring steps to subclasses.
type: graphql
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Rituals"
formula: |2
  # The Template defined by the Interface
  interface Ritual {
    id: ID!
    # Common step 1
    gatherIngredients: [String!]!
    # Common step 2
    chantIncantation: String!
    
    # The specific result (deferred to implementation)
    ritualEffect: String!
  }

  type SummoningRitual implements Ritual {
    id: ID!
    gatherIngredients: [String!]!
    chantIncantation: String!
    
    # Specific implementation
    ritualEffect: String! # E.g., "A demon appears"
    demonName: String!
  }

  type BanishingRitual implements Ritual {
    id: ID!
    gatherIngredients: [String!]!
    chantIncantation: String!
    
    # Specific implementation
    ritualEffect: String! # E.g., "The demon is banished"
    targetDimension: String!
  }
tags: [graphql, behavioral, template-method, interfaces]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method in schema design uses Interfaces to enforce a strict skeleton of fields (the algorithm's steps or common attributes) that every concrete type must implement. The specific, varying behaviors or extra fields are then deferred to the implementing types.
