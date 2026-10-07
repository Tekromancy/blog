---
title: The Observer of the Weave
description: Awaiting and reacting to shifts in the magical fabric.
type: graphql
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Evocation // Divination"
formula: |2
  type CelestialEvent {
    eventName: String!
    magnitude: Int!
    timestamp: String!
  }

  type Subscription {
    # The Observer pattern natively supported
    # Clients subscribe to this field and the Oracle pushes updates
    watchCelestialEvents(constellation: String!): CelestialEvent!
  }
tags: [graphql, behavioral, observer, subscriptions, realtime]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Subscriptions in GraphQL are the pure embodiment of the Observer pattern. Instead of polling the Oracle continuously (and exhausting one's mana), a caster establishes a persistent connection, subscribing to specific events. When the fabric of reality shifts, the Oracle automatically pushes the new data to the observing client.
