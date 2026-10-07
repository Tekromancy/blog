---
title: The Flyweight of Web Runes
description: Efficiently share large volumes of arcane glyphs to save web memory.
type: purescript
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Aether Optimization"
formula: |2
  module Arcane.Flyweight where
  import Prelude
  import Data.Map as Map
  import Data.Maybe (fromMaybe)

  -- Intrinsic state (Flyweight)
  type RuneGlyph = { symbol :: String, magicalCost :: Int }

  -- Extrinsic state
  type PlacedRune = { glyph :: RuneGlyph, x :: Int, y :: Int }

  -- Flyweight Factory
  type GrimoireCache = Map.Map String RuneGlyph

  getRune :: String -> GrimoireCache -> RuneGlyph
  getRune key cache =
    fromMaybe { symbol: "?", magicalCost: 0 } (Map.lookup key cache)

  placeRune :: RuneGlyph -> Int -> Int -> PlacedRune
  placeRune glyph x y = { glyph, x, y }
tags: [structural, flyweight, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
