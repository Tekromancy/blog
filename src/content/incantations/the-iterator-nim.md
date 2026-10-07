---
title: "Iterator via Serpent Speed Runes"
description: "Channeling the Iterator pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Traversal"
formula: |2
  type
    Spellbook = object
      spells: seq[string]

  iterator items(sb: Spellbook): string =
    for s in sb.spells:
      yield s
tags: [nim, iterator, behavioral, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Iterator** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Iterator
The Behavioral school teaches us to mold reality. By using Nim's macro spells and swift execution, the Iterator manifests in the physical realm seamlessly. Compile to C, execute like lightning.
