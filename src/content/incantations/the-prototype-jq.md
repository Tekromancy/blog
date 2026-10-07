---
title: The Prototype (jq)
description: Clone and mutate arcane data-structures to bypass the cost of genesis.
type: jq
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  # The master template
  def baseline_drone:
    { "class": "scout", "sensors": "active", "stealth": true, "payload": null };

  # Cloning and mutating (Transmutation)
  def clone_drone($mutations):
    baseline_drone * $mutations;

  # Instantiating a swarm
  [
    clone_drone({ "id": 1 }),
    clone_drone({ "id": 2, "payload": "emp" }),
    clone_drone({ "id": 3, "sensors": "overdrive" })
  ]
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Why forge anew when you can replicate? The **Prototype** acts as an ancestral JSON template. Utilizing the deep-merge operator (`*`), we project the original matrix into a new context, grafting unique cybernetic mutations onto the clone. This bypasses the heavy toll of raw creation and ensures a uniform foundation across the swarm.
