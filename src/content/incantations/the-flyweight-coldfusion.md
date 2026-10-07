---
title: The Flyweight of the Swarm
description: Share server-side mana efficiently when conjuring immense numbers of fine-grained spirits.
type: coldfusion
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarms"
formula: |2
  component name="SoulFragment" {
      // Intrinsic state
      variables.essence = "Dark Matter";

      public void function manifest(string position) {
          // Position is extrinsic state
          writeOutput("SoulFragment of " & variables.essence & " appears at " & arguments.position);
      }
  }

  component name="SoulForge" {
      variables.cache = {};

      public SoulFragment function getFragment(string type) {
          if (!structKeyExists(variables.cache, type)) {
              variables.cache[type] = new SoulFragment();
          }
          return variables.cache[type];
      }
  }
tags: [flyweight, coldfusion, swarms, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the binding circle demands a million locusts, generating a unique soul for each will crash the server-side realm. The Flyweight caches intrinsic essence, sharing it among the swarm, while the client dictates the extrinsic positioning. A true master of mana efficiency.
