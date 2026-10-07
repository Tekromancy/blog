---
title: The Prototype of Web Runes
description: Clone and mutate existing mystical entities via pure functional record updates.
type: purescript
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Simulacrum"
formula: |2
  module Arcane.Prototype where
  import Prelude

  -- In pure FP, cloning is just variable binding, but we can model a cloneable entity
  type Familiar =
    { name :: String
    , species :: String
    , powerLevel :: Int
    }

  baseRaven :: Familiar
  baseRaven = { name: "Corvus", species: "Shadow Raven", powerLevel: 10 }

  -- 'Cloning' and mutating via record updates
  cloneAndRename :: String -> Familiar -> Familiar
  cloneAndRename newName f = f { name = newName }

  empowerFamiliar :: Int -> Familiar -> Familiar
  empowerFamiliar boost f = f { powerLevel = f.powerLevel + boost }
tags: [creational, prototype, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
