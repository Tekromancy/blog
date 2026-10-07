---
title: "Abstract Factory via Serpent Speed Runes"
description: "Channeling the Abstract Factory pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matrix Weaving"
formula: |2
  type
    SpellFactory = ref object of RootObj
    FireFactory = ref object of SpellFactory
    IceFactory = ref object of SpellFactory
    Spell = ref object of RootObj
    FireSpell = ref object of Spell
    IceSpell = ref object of Spell

  method castSpell(s: Spell) {.base.} = discard
  method castSpell(s: FireSpell) = echo "Casting Fire!"
  method castSpell(s: IceSpell) = echo "Casting Ice!"

  method createSpell(f: SpellFactory): Spell {.base.} = discard
  method createSpell(f: FireFactory): Spell = FireSpell()
  method createSpell(f: IceFactory): Spell = IceSpell()
tags: [nim, abstract-factory, creational, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Abstract Factory Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Abstract Factory** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Abstract Factory
The Creational school teaches us to mold reality. By using Nim's macro spells and swift execution, the Abstract Factory manifests in the physical realm seamlessly. Compile to C, execute like lightning.
