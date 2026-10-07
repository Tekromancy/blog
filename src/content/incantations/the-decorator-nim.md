---
title: "Decorator via Serpent Speed Runes"
description: "Channeling the Decorator pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Aura Layering"
formula: |2
  type
    Artifact = ref object of RootObj
    BaseArtifact = ref object of Artifact
    ArtifactDecorator = ref object of Artifact
      wrapped: Artifact

  method use(a: Artifact) {.base.} = discard
  method use(b: BaseArtifact) = echo "Base use"
  method use(d: ArtifactDecorator) =
    d.wrapped.use()
    echo "Plus extra power"
tags: [nim, decorator, structural, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Decorator Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Decorator** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Decorator
The Structural school teaches us to mold reality. By using Nim's macro spells and swift execution, the Decorator manifests in the physical realm seamlessly. Compile to C, execute like lightning.
