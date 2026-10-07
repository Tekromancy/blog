---
title: The Iterator
description: Traversing infinite planes via Foldable, Traversable, and lazy lists.
type: haskell
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Transmutation // Traversal"
formula: |2
  module Iterator where
  -- Haskell uses Foldable and lists.
  traverseList :: Show a => [a] -> [String]
  traverseList = fmap show
tags: [iterator, foldable, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
