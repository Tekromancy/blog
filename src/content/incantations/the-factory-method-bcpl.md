---
title: The Factory Method of Ancestral Spawning
description: Defer the exact manifestation of void-entities to subclasses or invocation parameters.
type: bcpl
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity-Weaving"
formula: |2
  GET "libhdr"

  MANIFEST $(
    ENTITY_WRAITH = 1
    ENTITY_LURKER = 2
  $)

  LET SpawnEntity(type) = VALOF $(
    SWITCHON type INTO $(
      CASE ENTITY_WRAITH:
        RESULTIS "Void Wraith"
      CASE ENTITY_LURKER:
        RESULTIS "Abyssal Lurker"
      DEFAULT:
        RESULTIS "Formless Echo"
    $)
  $)

  LET START() BE $(
    LET entity1 = SpawnEntity(ENTITY_WRAITH)
    LET entity2 = SpawnEntity(ENTITY_LURKER)
    writef("Spawned: %s*n", entity1)
    writef("Spawned: %s*n", entity2)
  $)
tags: [factory-method, spawning, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
