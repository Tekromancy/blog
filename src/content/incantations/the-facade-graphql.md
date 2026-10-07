---
title: The Universal Facade
description: Providing a single, unified interface to a multitude of complex subsystems.
type: graphql
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Veil"
formula: |2
  # The single, simple Schema exposing a vast network of micro-services
  type Query {
    # Calls the Identity micro-service
    user(id: ID!): User
    
    # Calls the Inventory database
    relic(id: ID!): Relic
  }
  
  type User {
    id: ID!
    name: String!
    # A single field that might aggregate data from three different APIs
    profileDashboard: Dashboard!
  }

  type Dashboard {
    guild: String!
    achievements: [String!]!
    wealth: Int!
  }
tags: [graphql, structural, facade, api-gateway]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

GraphQL itself is often the ultimate Facade pattern. The Oracle acts as an API gateway, hiding the chaotic architecture of distributed REST endpoints, gRPC services, and databases behind a clean, easily traversable graph.
