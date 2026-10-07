---
title: The Memento of Temporal Anchors
description: Capture and restore the internal state of a volatile spell before it implodes.
type: bcpl
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Anchoring"
formula: |2
  GET "libhdr"

  MANIFEST $(
    STATE_SIZE = 1
  $)

  LET CreateAnchor(power) = VALOF $(
    LET anchor = getvec(STATE_SIZE)
    anchor!0 = power
    RESULTIS anchor
  $)

  LET RestoreFromAnchor(anchor) = anchor!0

  LET START() BE $(
    LET spellPower = 100
    writef("Initial spell power: %d*n", spellPower)

    // Save state
    LET anchor = CreateAnchor(spellPower)
    writef("State anchored.*n")

    // Volatile mutation
    spellPower := 9999
    writef("Spell mutated to volatile power: %d*n", spellPower)

    // Restore state
    spellPower := RestoreFromAnchor(anchor)
    writef("Spell power restored to: %d*n", spellPower)

    freevec(anchor)
  $)
tags: [memento, chronomancy, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
