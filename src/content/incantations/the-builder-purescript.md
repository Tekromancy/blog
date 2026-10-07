---
title: The Builder of Web Runes
description: Construct complex, strongly-typed spell matrices step by step.
type: purescript
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Matrix Assembly"
formula: |2
  module Arcane.Builder where
  import Prelude
  import Data.Foldable (foldl)

  type SpellMatrix =
    { elements :: Array String
    , duration :: Int
    , target :: String
    }

  defaultMatrix :: SpellMatrix
  defaultMatrix = { elements: [], duration: 0, target: "Self" }

  -- Using State-like transformations or just record updates
  type MatrixBuilder = SpellMatrix -> SpellMatrix

  addElement :: String -> MatrixBuilder
  addElement e matrix = matrix { elements = matrix.elements <> [e] }

  setDuration :: Int -> MatrixBuilder
  setDuration d matrix = matrix { duration = d }

  setTarget :: String -> MatrixBuilder
  setTarget t matrix = matrix { target = t }

  buildSpell :: Array MatrixBuilder -> SpellMatrix
  buildSpell builders = foldl (\m b -> b m) defaultMatrix builders
tags: [creational, builder, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
