---
title: "Prototype via Serpent Speed Runes"
description: "Channeling the Prototype pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Mirror Replication"
formula: |2
  type
    Cloneable = ref object of RootObj
    ShadowClone = ref object of Cloneable
      mana: int

  method clone(c: Cloneable): Cloneable {.base.} = discard
  method clone(c: ShadowClone): Cloneable =
    ShadowClone(mana: c.mana)
tags: [nim, prototype, creational, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Prototype Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Prototype** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Prototype
The Creational school teaches us to mold reality. By using Nim's macro spells and swift execution, the Prototype manifests in the physical realm seamlessly. Compile to C, execute like lightning.
