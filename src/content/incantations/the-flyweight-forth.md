---
title: Flyweight (Forth)
description: Share ethereal forms to spare the physical memory bounds.
type: forth
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Shadow-Cloning"
formula: |2
  \ Shadow-Cloning: The Flyweight
  \ Using arrays/lookup tables for shared intrinsic state.

  \ Array of elemental sprites
  CREATE SPRITE-TYPES
    10 , \ 0: Fire HP
    20 , \ 1: Water HP
    30 , \ 2: Earth HP

  : RENDER-SPRITE ( x y type_id -- )
    CELLS SPRITE-TYPES + @
    ." Rendering sprite at " SWAP . . ." with HP " . CR ;

  \ Usage:
  \ 5 5 0 RENDER-SPRITE
  \ 10 12 0 RENDER-SPRITE  \ Reuses fire sprite data
tags: [structural, flyweight, forth, shadows]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the memory limits close in, the Flyweight provides salvation. Instead of giving every imp its own attributes, we pass a shared ID to look up intrinsic data from a central array, pushing only extrinsic coordinates onto the stack.
