---
title: The Composite of Glyphs
description: Treating individual sigils and complex glyph arrays uniformly using recursive types.
type: roc
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Abjuration // Sigilcraft"
tags: [fast-functional-wards, roc, composite, tree]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface GlyphComposite
      exposes [Glyph, evaluateGlyph]
      imports []

  # Recursive type representing both leaves and branches
  Glyph : [
      Sigil U64,
      Array (List Glyph)
  ]

  evaluateGlyph : Glyph -> U64
  evaluateGlyph = \glyph ->
      when glyph is
          Sigil power -> power
          Array glyphs ->
              List.walk glyphs 0 \acc, g ->
                  acc + evaluateGlyph g
---
