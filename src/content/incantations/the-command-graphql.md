---
title: The Command Incantation
description: Encapsulating a request as a standalone object.
type: graphql
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Execution"
formula: |2
  # The Command object encapsulating all parameters for an action
  input TeleportCommand {
    destinationCoords: [Float!]!
    passengerCount: Int!
    useLeyLines: Boolean! = true
  }

  type TeleportResult {
    success: Boolean!
    energyExpended: Int!
  }

  type Mutation {
    # Executing the Command
    executeTeleport(command: TeleportCommand!): TeleportResult!
  }
tags: [graphql, behavioral, command, mutations, inputs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Every GraphQL mutation is essentially an implementation of the Command pattern. By encapsulating all the parameters of an action into a single `Input` object (the command), the Oracle can queue, log, or even reverse the magical operations systematically.
