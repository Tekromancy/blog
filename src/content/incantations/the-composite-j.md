---
title: "The Composite"
description: "Treating single elemental motes and complex runic clusters uniformly via boxing."
type: j
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Tree Weaving"
formula: |2
  NB. A tree structure using boxed arrays
  leaf1 =: <'Spark'
  leaf2 =: <'Ember'
  cluster =: < leaf1 , leaf2
  root =: < cluster , <'Flame'
  
  NB. Uniform operation (flatten and count)
  count_motes =: # @: S: 0
  
  NB. Usage: count_motes root
tags: [composite, trees, boxing, recursive]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

J's boxed arrays naturally form composite tree structures. L: and S: (Level and Spread) operate uniformly on these trees.
