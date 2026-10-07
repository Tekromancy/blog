---
title: The Composite (jq)
description: Recursively traverse and transmute fractal trees of JSON nodes as a single entity.
type: jq
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  # A recursive walker for fractal structures
  def calculate_power:
    if type == "object" then
      if .type == "node" then
        (.value + (.children | map(calculate_power) | add // 0))
      else 0 end
    else 0 end;

  # Evaluate the composite root
  .network_root | calculate_power
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Fractal geometries and nested hierarchies defy linear parsing. The **Composite** pattern treats individual leaves and sprawling branches as one and the same. Through recursive filtering, a single incantation cascades down the entire JSON tree, calculating accumulated values across the sprawling network.
