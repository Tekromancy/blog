---
title: The Decorator of Web Runes
description: Dynamically augment the power of web runes via pure functional composition.
type: purescript
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Spell Weaving"
formula: |2
  module Arcane.Decorator where
  import Prelude

  type Spell = { cast :: String -> String }

  baseBolt :: Spell
  baseBolt = { cast: \target -> "Magic Bolt strikes " <> target }

  -- Decorators are just function composition over the record
  withFire :: Spell -> Spell
  withFire s = { cast: \target -> s.cast target <> " with burning flames!" }

  withShadow :: Spell -> Spell
  withShadow s = { cast: \target -> "From the shadows, " <> s.cast target }

  ultimateBolt :: Spell
  ultimateBolt = withShadow (withFire baseBolt)
tags: [structural, decorator, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
