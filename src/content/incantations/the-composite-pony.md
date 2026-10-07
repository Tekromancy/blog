---
title: The Composite Ward
description: Structuring nested magical topologies.
type: pony
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Hierarchy"
formula: |2
  trait val SpellComponent
    fun power(): U32

  class val SpellMatrix is SpellComponent
    let _nodes: Array[SpellComponent val] val
    new create(n: Array[SpellComponent val] val) => _nodes = n
    fun power(): U32 =>
      var sum: U32 = 0
      for node in _nodes.values() do sum = sum + node.power() end
      sum
tags: [pony, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Composite Ward

Immutable trees constructed from `val` arrays enable lock-free traversal of complex spell matrices.
