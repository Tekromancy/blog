---
title: The Bridge of Snobol
description: Separating abstraction from implementation using indirect jumps.
type: snobol
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Ethereal Bridge"
formula: |2
          * Bridge Pattern in SNOBOL4
          DEFINE('CAST_SPELL(SPELL, IMPL)')

          CAST_SPELL('FIREBALL', 'WAND')
          CAST_SPELL('FIREBALL', 'STAFF')
          :(END)

  CAST_SPELL
          OUTPUT = 'Casting ' SPELL ' using ' IMPL :(RETURN)
  END
tags: [snobol, structural, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By splitting the spell from the focus (wand or staff), the Bridge allows both to vary independently. The caster merely provides both components to the conjuration function.
