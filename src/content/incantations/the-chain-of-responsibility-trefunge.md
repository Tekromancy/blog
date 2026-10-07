---
title: "The Chain of Responsibility: Topo-Cascade"
description: "Pass requests along a sequence of ward filters along the Z-axis."
type: trefunge
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Flowmancy"
formula: |2
  > "Req" ? v
  v   >   < h
  > "Req" ? v
  v   >   < h
  @
tags: [chain-of-responsibility, trefunge, topology, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a disruption event strikes the arcane grid, it triggers a Topo-Cascade within our Three-Dimensional Topology Wards. The Chain of Responsibility routes the errant instruction pointer through a vertical stack of ward layers.

Each layer evaluates (`?`) the disruption. If the layer cannot neutralize it, it shifts the pointer to the next plane (`h`). This continuous Z-axis delegation ensures specialized wards handle specific spectral anomalies.
