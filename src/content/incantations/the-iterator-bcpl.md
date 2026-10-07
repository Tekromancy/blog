---
title: The Iterator of the Astral Planes
description: Traverse the infinite layered planes of the void without exposing their raw structure.
type: bcpl
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Conjuration // Planewalking"
formula: |2
  GET "libhdr"

  MANIFEST $(
    ITER_ARRAY = 0
    ITER_POS = 1
    ITER_MAX = 2
    ITER_SIZE = 3
  $)

  LET CreateIterator(array, max) = VALOF $(
    LET iter = getvec(ITER_SIZE)
    iter!ITER_ARRAY = array
    iter!ITER_POS = 0
    iter!ITER_MAX = max
    RESULTIS iter
  $)

  LET HasNext(iter) = iter!ITER_POS < iter!ITER_MAX

  LET Next(iter) = VALOF $(
    LET val = (iter!ITER_ARRAY)!(iter!ITER_POS)
    iter!ITER_POS := iter!ITER_POS + 1
    RESULTIS val
  $)

  LET START() BE $(
    LET planes = getvec(4)
    planes!0 := 101 // Plane of Shadows
    planes!1 := 202 // Plane of Mirrors
    planes!2 := 303 // Plane of Echoes

    LET iter = CreateIterator(planes, 3)

    writef("Traversing planes:*n")
    WHILE HasNext(iter) DO $(
      writef("Arrived at Plane ID: %d*n", Next(iter))
    $)

    freevec(iter)
    freevec(planes)
  $)
tags: [iterator, traversal, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
