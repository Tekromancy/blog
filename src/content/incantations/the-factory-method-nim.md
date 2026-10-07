---
title: "Factory Method via Serpent Speed Runes"
description: "Channeling the Factory Method pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity Summoning"
formula: |2
  type
    Familiar = ref object of RootObj
    Raven = ref object of Familiar
    Cat = ref object of Familiar

  method speak(f: Familiar) {.base.} = discard
  method speak(f: Raven) = echo "Nevermore"
  method speak(f: Cat) = echo "Meow"

  proc summonFamiliar(kind: string): Familiar =
    if kind == "raven": Raven()
    else: Cat()
tags: [nim, factory-method, creational, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Factory Method Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Factory Method** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Factory Method
The Creational school teaches us to mold reality. By using Nim's macro spells and swift execution, the Factory Method manifests in the physical realm seamlessly. Compile to C, execute like lightning.
