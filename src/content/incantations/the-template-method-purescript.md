---
title: The Template Method of Web Runes
description: Define the skeletal structure of a web rune ritual in a base template.
type: purescript
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Skeleton"
formula: |2
  module Arcane.TemplateMethod where
  import Prelude

  type RitualSteps =
    { drawCircle :: String
    , chantWords :: String
    , offerSacrifice :: String
    }

  performRitual :: RitualSteps -> String
  performRitual steps =
    "Step 1: " <> steps.drawCircle <> "\n" <>
    "Step 2: " <> steps.chantWords <> "\n" <>
    "Step 3: " <> steps.offerSacrifice <> "\n" <>
    "Ritual Complete."

  -- Concrete instantiations (Template Method)
  bloodRitual :: RitualSteps
  bloodRitual =
    { drawCircle: "Draw circle with crimson chalk."
    , chantWords: "Sanguis vitae!"
    , offerSacrifice: "A drop of the caster's blood."
    }
tags: [behavioral, template-method, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
