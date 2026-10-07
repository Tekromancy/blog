---
title: The Composite of Web Runes
description: Compose pure web runes into tree structures to represent part-whole hierarchies.
type: purescript
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Rune Clusters"
formula: |2
  module Arcane.Composite where
  import Prelude
  import Data.Array (map)
  import Data.Foldable (sum)

  data SpellComponent
    = SingleRune Int
    | RuneCluster (Array SpellComponent)

  evaluatePower :: SpellComponent -> Int
  evaluatePower (SingleRune power) = power
  evaluatePower (RuneCluster components) = sum (map evaluatePower components)

  complexGlyph :: SpellComponent
  complexGlyph = RuneCluster
    [ SingleRune 10
    , SingleRune 15
    , RuneCluster [ SingleRune 5, SingleRune 20 ]
    ]
tags: [structural, composite, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
