---
title: "Flyweight via Serpent Speed Runes"
description: "Channeling the Flyweight pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Essence Pooling"
formula: |2
  import tables

  type
    ParticleType = ref object
      color: string
    ParticleSystem = object
      types: Table[string, ParticleType]

  proc getParticleType(ps: var ParticleSystem, color: string): ParticleType =
    if not ps.types.hasKey(color):
      ps.types[color] = ParticleType(color: color)
    result = ps.types[color]
tags: [nim, flyweight, structural, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Flyweight Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Flyweight** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Flyweight
The Structural school teaches us to mold reality. By using Nim's macro spells and swift execution, the Flyweight manifests in the physical realm seamlessly. Compile to C, execute like lightning.
