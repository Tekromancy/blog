---
title: "The Visitor: The Planar Auditor"
description: "Perform external operations on a 3D structure without mutating its geometry."
type: trefunge
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  > "Node" v
  v "Visit" < h
  > "Node" v
  v "Visit" < l
  @
tags: [visitor, trefunge, topology, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When interacting with a fragile and highly dense Three-Dimensional Topology Ward, altering its code can trigger disastrous resonance cascades. The Visitor is the Planar Auditor.

It is an external instruction pointer that traverses the nodes of the ward. At each node, it briefly dips into its own operational layer (`h`), performs its logic (such as validation or gathering arcane essence), and returns (`l`) to the host grid. This safely extends the ward's functionality without risking spatial mutation.
