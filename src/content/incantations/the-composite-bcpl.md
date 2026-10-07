---
title: The Composite of Fractured Echoes
description: Treat individual void-fragments and massive clustered nebulas uniformly.
type: bcpl
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Geometry"
formula: |2
  GET "libhdr"

  MANIFEST $(
    NODE_TYPE = 0
    NODE_VALUE = 1
    NODE_CHILD1 = 2
    NODE_CHILD2 = 3
    NODE_SIZE = 4

    TYPE_LEAF = 1
    TYPE_COMPOSITE = 2
  $)

  LET CreateLeaf(value) = VALOF $(
    LET node = getvec(NODE_SIZE)
    node!NODE_TYPE = TYPE_LEAF
    node!NODE_VALUE = value
    RESULTIS node
  $)

  LET CreateComposite(c1, c2) = VALOF $(
    LET node = getvec(NODE_SIZE)
    node!NODE_TYPE = TYPE_COMPOSITE
    node!NODE_CHILD1 = c1
    node!NODE_CHILD2 = c2
    RESULTIS node
  $)

  LET EvaluateResonance(node) = VALOF $(
    IF node = 0 RESULTIS 0
    IF node!NODE_TYPE = TYPE_LEAF RESULTIS node!NODE_VALUE
    RESULTIS EvaluateResonance(node!NODE_CHILD1) + EvaluateResonance(node!NODE_CHILD2)
  $)

  LET FreeNode(node) BE $(
    IF node = 0 RETURN
    IF node!NODE_TYPE = TYPE_COMPOSITE THEN $(
      FreeNode(node!NODE_CHILD1)
      FreeNode(node!NODE_CHILD2)
    $)
    freevec(node)
  $)

  LET START() BE $(
    LET frag1 = CreateLeaf(10)
    LET frag2 = CreateLeaf(20)
    LET frag3 = CreateLeaf(30)

    LET cluster1 = CreateComposite(frag1, frag2)
    LET nebula = CreateComposite(cluster1, frag3)

    writef("Total Void Resonance: %d*n", EvaluateResonance(nebula))
    FreeNode(nebula)
  $)
tags: [composite, fractals, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
