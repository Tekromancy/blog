---
title: "State via Serpent Speed Runes"
description: "Channeling the State pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  type
    State = ref object of RootObj
    Context = ref object
      state: State

  method request(s: State, c: Context) {.base.} = discard
  proc changeState(c: Context, s: State) = c.state = s
tags: [nim, state, behavioral, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **State** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the State
The Behavioral school teaches us to mold reality. By using Nim's macro spells and swift execution, the State manifests in the physical realm seamlessly. Compile to C, execute like lightning.
