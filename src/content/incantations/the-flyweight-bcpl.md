---
title: The Flyweight of Stardust Memories
description: Share primal cosmic dust efficiently among millions of echoing phantoms.
type: bcpl
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Echo-Binding"
formula: |2
  GET "libhdr"

  MANIFEST $(
    MAX_DUST = 5
  $)

  GLOBAL $(
    DustCache : 210
  $)

  LET GetCosmicDust(type) = VALOF $(
    IF type < 0 \/ type >= MAX_DUST RESULTIS 0
    IF DustCache!type = 0 THEN $(
      DustCache!type := type * 100 // Extrinsic calculation simulated
      writef("Forged new cosmic dust of type %d*n", type)
    $)
    RESULTIS DustCache!type
  $)

  LET RenderPhantom(phantomId, dustType, x, y) BE $(
    LET dustPower = GetCosmicDust(dustType)
    writef("Phantom %d at (%d,%d) uses dust power %d*n", phantomId, x, y, dustPower)
  $)

  LET START() BE $(
    LET cache = getvec(MAX_DUST)
    FOR i = 0 TO MAX_DUST - 1 DO cache!i := 0
    DustCache := cache

    RenderPhantom(1, 2, 10, 20)
    RenderPhantom(2, 2, 15, 25) // Should reuse dust type 2
    RenderPhantom(3, 4, 30, 40)

    freevec(DustCache)
  $)
tags: [flyweight, stardust, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
