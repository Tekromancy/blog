---
title: Bridge (Forth)
description: Decouple the spirit (abstraction) from the vessel (implementation).
type: forth
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Necromancy // Vessel-Binding"
formula: |2
  \ Vessel-Binding: The Bridge
  \ Abstraction logic is separate from implementation via deferred words.

  DEFER RENDER-VESSEL

  : DRAW-BONE-GOLEM ( -- ) ." Rendering bone matrix." CR ;
  : DRAW-FLESH-HOUND ( -- ) ." Rendering flesh sinews." CR ;

  \ The Abstraction
  : MANIFEST-ENTITY ( -- )
    ." Initiating dark ritual..." CR
    RENDER-VESSEL
    ." Entity is now corporeal." CR ;

  \ Usage:
  \ ' DRAW-BONE-GOLEM IS RENDER-VESSEL
  \ MANIFEST-ENTITY
  \ ' DRAW-FLESH-HOUND IS RENDER-VESSEL
  \ MANIFEST-ENTITY
tags: [structural, bridge, forth, vessels]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern allows the ritual logic (abstraction) to remain unchanged while the manifestation (implementation) shifts. By assigning execution tokens (`XT`s) to `DEFER`red words, we bind different spirits to our conjuration routines on the fly.
