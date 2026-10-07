---
title: "Template Method via Serpent Speed Runes"
description: "Channeling the Template Method pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Skeleton"
formula: |2
  type
    Ritual = ref object of RootObj

  method step1(r: Ritual) {.base.} = discard
  method step2(r: Ritual) {.base.} = discard

  proc performRitual(r: Ritual) =
    r.step1()
    r.step2()
tags: [nim, template-method, behavioral, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Template Method Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Template Method** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Template Method
The Behavioral school teaches us to mold reality. By using Nim's macro spells and swift execution, the Template Method manifests in the physical realm seamlessly. Compile to C, execute like lightning.
