---
title: "Builder via Serpent Speed Runes"
description: "Channeling the Builder pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Artifact Forging"
formula: |2
  type
    Golem = object
      head, body, arms, legs: string
    GolemBuilder = ref object
      g: Golem

  proc newGolemBuilder(): GolemBuilder = GolemBuilder(g: Golem())
  proc setHead(b: GolemBuilder, h: string) = b.g.head = h
  proc build(b: GolemBuilder): Golem = b.g
tags: [nim, builder, creational, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Builder Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Builder** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Builder
The Creational school teaches us to mold reality. By using Nim's macro spells and swift execution, the Builder manifests in the physical realm seamlessly. Compile to C, execute like lightning.
