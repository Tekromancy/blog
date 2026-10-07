---
title: The Composite
description: Fractal ward structures represented by algebraic data types.
type: haskell
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal"
formula: |2
  module Composite where
  data Graphic = Leaf String | Node [Graphic]
  draw :: Graphic -> String
  draw (Leaf s) = s
  draw (Node xs) = concatMap draw xs
tags: [composite, adt, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
