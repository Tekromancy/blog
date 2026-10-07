---
title: "The Iterator: The Volumetric Crawler"
description: "Traverse 3D grid structures systematically without exposing their geometry."
type: trefunge
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  > g : ? v > @
  ^   <   h v
  ^ p l < < <
tags: [iterator, trefunge, topology, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator is a crucial tool known to tekromancers as the Volumetric Crawler. When dealing with complex memory clusters inside Three-Dimensional Topology Wards, linear traversal is insufficient.

The crawler steps through the grid, using `g` to read data, `h` and `l` to navigate the Z-axis, and evaluates bounds (`?`). It abstracts the agonizing complexity of spatial traversal, returning a clean stream of arcane essence to the caller.
