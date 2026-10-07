---
title: The Abstract Factory of Snobol
description: Weaving arcane string patterns to forge entire families of magical artifacts.
type: snobol
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Patternmancy"
formula: |2
          * Abstract Factory in SNOBOL4
          * We construct a factory using pattern variables
          DEFINE('CREATE_FIRE_WAND()')
          DEFINE('CREATE_ICE_WAND()')

          * Factory invocation
          FACTORY = 'FIRE'
          WAND = EVAL('CREATE_' FACTORY '_WAND()')
          OUTPUT = WAND

  CREATE_FIRE_WAND
          CREATE_FIRE_WAND = 'Wand of True Fire' :(RETURN)

  CREATE_ICE_WAND
          CREATE_ICE_WAND = 'Wand of Pure Ice' :(RETURN)
  END
tags: [snobol, strings, creational, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Deep in the string-weaver's sanctum, the Abstract Factory pattern takes the form of dynamic evaluation. By defining our creation spells and invoking them through the primordial `EVAL` function, we can conjure entire families of magical objects without hardcoding the incantations.
