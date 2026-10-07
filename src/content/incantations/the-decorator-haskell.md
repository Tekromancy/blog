---
title: The Decorator
description: Function composition layering magical effects infinitely.
type: haskell
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Composition"
formula: |2
  module Decorator where
  type Spell = String -> String
  fireEnchant :: Spell
  fireEnchant s = s ++ " with Fire"
  frostEnchant :: Spell
  frostEnchant s = s ++ " with Frost"
  combinedSpell = fireEnchant . frostEnchant
tags: [decorator, composition, functional]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
