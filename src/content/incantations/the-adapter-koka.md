---
title: The Adapter Translation Glyph
description: Adapts an incompatible arcane interface to a required one using effect mapping.
type: koka
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  effect old-magic
    ctl cast-fireball(power: int) : string
  
  effect modern-magic
    ctl invoke-flame(intensity: int, duration: int) : string
  
  fun adapter(action: () -> <modern-magic|e> a) : <old-magic|e> a
    with handler
      ctl invoke-flame(i, d) resume(cast-fireball(i * d))
    action()
  
  pub fun main()
    with handler
      ctl cast-fireball(p) resume("Fireball hits for " ++ p.show ++ " damage!")
    with adapter
    println(invoke-flame(5, 2))
tags: [koka, adapter, effect-mapping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
