---
title: The Prototype of Echoing Forms
description: Clone existing manifestations to populate the Ancestral Void quickly.
type: bcpl
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  GET "libhdr"

  MANIFEST $(
    SIGIL_ID = 0
    SIGIL_POWER = 1
    SIGIL_SIZE = 2
  $)

  LET CreateSigil(id, power) = VALOF $(
    LET sigil = getvec(SIGIL_SIZE)
    sigil!SIGIL_ID = id
    sigil!SIGIL_POWER = power
    RESULTIS sigil
  $)

  LET CloneSigil(original) = VALOF $(
    LET clone = getvec(SIGIL_SIZE)
    clone!SIGIL_ID = original!SIGIL_ID
    clone!SIGIL_POWER = original!SIGIL_POWER
    RESULTIS clone
  $)

  LET PrintSigil(sigil, name) BE $(
    writef("Sigil %s - ID: %d, Power: %d*n", name, sigil!SIGIL_ID, sigil!SIGIL_POWER)
  $)

  LET START() BE $(
    LET primeSigil = CreateSigil(42, 1000)
    LET echoSigil = CloneSigil(primeSigil)
    
    PrintSigil(primeSigil, "Prime")
    PrintSigil(echoSigil, "Echo")
    
    freevec(primeSigil)
    freevec(echoSigil)
  $)
tags: [prototype, cloning, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
