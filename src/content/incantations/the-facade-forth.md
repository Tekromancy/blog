---
title: Facade (Forth)
description: Hide the maddening low-level rituals behind a single word.
type: forth
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Glyph-Masking"
formula: |2
  \ Glyph-Masking: The Facade
  \ Wrapping arcane sub-systems into a clean invocation.

  : INIT-AETHER ( -- ) ." Aether matrix spun." CR ;
  : DRAW-PENTAGRAM ( -- ) ." Pentagram inscribed in RAM." CR ;
  : INVOKE-PACT ( -- ) ." Blood pact verified." CR ;

  \ The Facade
  : CAST-DEMON-SUMMON ( -- )
    INIT-AETHER
    DRAW-PENTAGRAM
    INVOKE-PACT
    ." Demon unleashed!" CR ;

  \ Usage:
  \ CAST-DEMON-SUMMON
tags: [structural, facade, forth, masking]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The lower layers of Forth are fraught with stack juggling, register masking, and memory allocation. The Facade is a master word that orchestrates the descent into madness, exposing only a clean, simple invocation to the user above.
