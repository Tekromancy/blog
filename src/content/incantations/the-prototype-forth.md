---
title: Prototype (Forth)
description: Clone souls directly through memory transposition.
type: forth
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Soulcloning"
formula: |2
  \ Soulcloning: The Prototype Pattern
  \ To clone, we simply CMOVE the memory bytes of an entity.

  CREATE BASE-SOUL 4 ALLOT
  HEX DE AD BE EF BASE-SOUL ! DECIMAL

  : CLONE-SOUL ( src dst -- )
    OVER OVER 4 CMOVE
    ." Soul cloned across the void." CR ;

  CREATE NEW-SOUL 4 ALLOT

  \ Usage:
  \ BASE-SOUL NEW-SOUL CLONE-SOUL
tags: [creational, prototype, forth, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

True necromancers don't build from scratch when they can copy. The Prototype pattern is realized in Forth through raw memory manipulation (`CMOVE`). You capture the essence (data) of a construct and duplicate it byte-for-byte.
