---
title: The Composite
description: Recursive type definitions for hierarchical magic structures.
type: gleam
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Sigil Weaving"
formula: |2
  pub type Sigil {
    Rune(power: Int)
    Glyph(parts: List(Sigil))
  }

  pub fn evaluate_power(sigil: Sigil) -> Int {
    case sigil {
      Rune(p) -> p
      Glyph(parts) -> {
        let eval_all = fn(acc, part) { acc + evaluate_power(part) }
        gleam/list.fold(parts, 0, eval_all)
      }
    }
  }
tags: [transmutation, composite, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite
Algebraic data types naturally represent the Composite pattern. A Sigil is either a single Rune or a Glyph composed of multiple Sigils.
