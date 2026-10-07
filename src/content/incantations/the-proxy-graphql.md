---
title: The Proxy of the Gatekeeper
description: Controlling access to sensitive realms through intermediary resolvers.
type: graphql
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Wards"
formula: |2
  type ForbiddenKnowledge {
    secret: String!
  }

  type Query {
    # The field itself is a proxy. The resolver intercepts the call, 
    # checks permissions in context, and forwards it to the true data source.
    accessForbiddenKnowledge(token: String!): ForbiddenKnowledge
  }
tags: [graphql, structural, proxy, authorization, resolvers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Proxy pattern is naturally embedded in the resolver functions of a GraphQL server. A resolver doesn't necessarily hold the data; it acts as a proxy, verifying the caster's credentials, applying rate limits, and then fetching the data from the true underlying source if permitted.
