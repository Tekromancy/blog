---
title: The Adapter Pattern
description: Translating ancient runic spells into modern protocol-oriented magic.
type: swift
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Linguistics
formula: |
  protocol ModernSpell {
      func executeSpell()
  }
  class AncientRune {
      func invokeRune() { print("Invoking ancient power") }
  }
  class RuneAdapter: ModernSpell {
      private let rune: AncientRune
      init(rune: AncientRune) { self.rune = rune }
      func executeSpell() { rune.invokeRune() }
  }
tags: [swift, design-pattern, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Adapter: Bridging the Eras

The Adapter acts as a magical translator, wrapping an `AncientRune` so it can be invoked via the `ModernSpell` protocol.
