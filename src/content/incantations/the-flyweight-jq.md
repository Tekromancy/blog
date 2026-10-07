---
title: The Flyweight (jq)
description: Compress the datascape by extracting intrinsic states into shared reference pools.
type: jq
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Compression"
formula: |2
  # Input with massive duplication
  # [ { "type": "grunt", "hp": 100, "x": 10, "y": 20 }, ... ]

  # Extracting shared (intrinsic) state to a dictionary
  def extract_flyweights:
    {
      "dictionary": {
        "grunt": { "hp": 100, "weapon": "blaster" },
        "elite": { "hp": 500, "weapon": "plasma_rifle" }
      },
      "instances": [ .[] | { "t": .type, "x": .x, "y": .y } ]
    };

  # Re-hydrating via the Flyweight dictionary
  def hydrate_flyweights:
    .dictionary as $dict
    | .instances[]
    | . + $dict[.t] | del(.t);

  # Usage
  extract_flyweights
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the swarm grows too vast, memory collapses under the weight of redundant data. The **Flyweight** pattern partitions an object's state. Intrinsic properties—those shared across a thousand entities—are banished to a singular dictionary. The JSON entities themselves retain only their extrinsic state (like coordinates), reconstructing their full form on the fly only when necessary.
