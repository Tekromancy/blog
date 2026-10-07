---
title: "Command via Serpent Speed Runes"
description: "Channeling the Command pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Geas Inscription"
formula: |2
  type
    Command = ref object of RootObj
    CastCommand = ref object of Command
      spellName: string

  method execute(c: Command) {.base.} = discard
  method execute(c: CastCommand) = echo "Casting ", c.spellName
tags: [nim, command, behavioral, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Command Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Command** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Command
The Behavioral school teaches us to mold reality. By using Nim's macro spells and swift execution, the Command manifests in the physical realm seamlessly. Compile to C, execute like lightning.
