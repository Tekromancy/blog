---
title: The Adapter of Alien Glyphs
description: Adapting incompatible runic systems to work together safely.
type: fstar
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Integration"
formula: |2
  module Adapter
  
  type ancient_glyph = { old_power: int }
  type modern_rune = { new_energy: nat }
  
  let adapt (g: ancient_glyph{g.old_power >= 0}) : modern_rune =
    { new_energy = g.old_power }
tags: [adapter, integration, glyphs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter pattern allows ancient, unsafe glyphs to be converted into modern, verified runes using F*'s refinement types to assert power bounds.
