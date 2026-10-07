---
title: The Flyweight of Snobol
description: Sharing intrinsic magical essence to save runic space.
type: snobol
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Compression"
formula: |2
          * Flyweight Pattern in SNOBOL4
          * Intrinsic state is a shared string
          ESSENCE_FIRE = 'Shared Fire Essence'

          * Extrinsic state (position) is kept separate
          SPELL_A = ESSENCE_FIRE ' at coords 10,20'
          SPELL_B = ESSENCE_FIRE ' at coords 30,40'

          OUTPUT = SPELL_A
          OUTPUT = SPELL_B
  END
tags: [snobol, structural, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the Grimoire grows too large, the Flyweight pattern condenses memory. The shared essence of an element is stored in a single variable, and only the unique, extrinsic coordinates are added upon casting.
