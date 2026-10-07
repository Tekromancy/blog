---
title: "Proxy via Serpent Speed Runes"
description: "Channeling the Proxy pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Ward Interception"
formula: |2
  type
    Grimoire = ref object of RootObj
    RealGrimoire = ref object of Grimoire
    ProxyGrimoire = ref object of Grimoire
      real: RealGrimoire
      accessLevel: int

  method read(g: Grimoire) {.base.} = discard
  method read(r: RealGrimoire) = echo "Reading ancient secrets"
  method read(p: ProxyGrimoire) =
    if p.accessLevel > 5:
      if p.real.isNil: p.real = RealGrimoire()
      p.real.read()
    else:
      echo "Access denied"
tags: [nim, proxy, structural, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Proxy Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Proxy** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Proxy
The Structural school teaches us to mold reality. By using Nim's macro spells and swift execution, the Proxy manifests in the physical realm seamlessly. Compile to C, execute like lightning.
