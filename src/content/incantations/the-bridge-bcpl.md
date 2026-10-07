---
title: The Bridge Across the Astral Chasm
description: Decouple the abstraction of void-entities from their dimensional implementations.
type: bcpl
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Dimensional Weaving"
formula: |2
  GET "libhdr"

  // Implementations (Dimensions)
  LET DimAbyssal(op) BE $(
    SWITCHON op INTO $(
      CASE 1: writef(" [Abyssal Form]"); ENDCASE
      CASE 2: writef(" [Abyssal Strike]"); ENDCASE
    $)
  $)

  LET DimEthereal(op) BE $(
    SWITCHON op INTO $(
      CASE 1: writef(" [Ethereal Form]"); ENDCASE
      CASE 2: writef(" [Ethereal Strike]"); ENDCASE
    $)
  $)

  // Abstractions (Entities)
  LET EntityManifest(dimFunc) BE $(
    writef("Manifesting entity:")
    dimFunc(1)
    writef("*n")
  $)

  LET EntityAttack(dimFunc) BE $(
    writef("Entity attacks:")
    dimFunc(2)
    writef("*n")
  $)

  LET START() BE $(
    writef("Summoning from Abyssal Plane:*n")
    EntityManifest(DimAbyssal)
    EntityAttack(DimAbyssal)

    writef("Summoning from Ethereal Plane:*n")
    EntityManifest(DimEthereal)
    EntityAttack(DimEthereal)
  $)
tags: [bridge, dimensions, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
