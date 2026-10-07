---
title: "Composite via Serpent Speed Runes"
description: "Channeling the Composite pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Structuring"
formula: |2
  type
    Component = ref object of RootObj
    Leaf = ref object of Component
    CompositeNode = ref object of Component
      children: seq[Component]

  method operation(c: Component) {.base.} = discard
  method operation(l: Leaf) = echo "Leaf op"
  method operation(c: CompositeNode) =
    for child in c.children: child.operation()
tags: [nim, composite, structural, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **Composite** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the Composite
The Structural school teaches us to mold reality. By using Nim's macro spells and swift execution, the Composite manifests in the physical realm seamlessly. Compile to C, execute like lightning.
