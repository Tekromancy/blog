---
title: "Strategy via Serpent Speed Runes"
description: "Channeling the Strategy pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Prevision"
formula: |2
  type
    Strategy = ref object of RootObj
    Context = ref object
      strat: Strategy

  method execute(s: Strategy) {.base.} = discard
  proc setStrategy(c: Context, s: Strategy) = c.strat = s
tags: [nim, strategy, behavioral, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Strategy Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Strategy** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Strategy
The Behavioral school teaches us to mold reality. By using Nim's macro spells and swift execution, the Strategy manifests in the physical realm seamlessly. Compile to C, execute like lightning.
