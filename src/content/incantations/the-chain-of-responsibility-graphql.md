---
title: The Chain of Wards
description: Passing requests through a sequence of mystical handlers.
type: graphql
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Flow"
formula: |2
  # The Chain implemented via Directives
  directive @isAuthenticated on FIELD_DEFINITION
  directive @hasRole(role: String!) on FIELD_DEFINITION
  directive @rateLimit(max: Int!, window: String!) on FIELD_DEFINITION

  type Mutation {
    # The request passes through the chain: 
    # 1. Is Authenticated? -> 2. Has Role? -> 3. Rate Limit OK? -> 4. Resolver
    castApocalypticSpell(target: String!): String! 
      @isAuthenticated 
      @hasRole(role: "ARCHMAGE")
      @rateLimit(max: 1, window: "1d")
  }
tags: [graphql, behavioral, chain-of-responsibility, directives, middleware]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the Graph Oracle, the Chain of Responsibility is elegantly embodied by schema directives (or resolver middleware). When a caster attempts a mutation, the request must pass through a sequence of protective wards. If any ward in the chain rejects the request, the spell fails immediately.
