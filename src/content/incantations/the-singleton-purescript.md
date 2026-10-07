---
title: The Singleton of Web Runes
description: Ensure a single source of truth for the arcane matrix, accessed via Reader environment.
type: purescript
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Leyline Anchoring"
formula: |2
  module Arcane.Singleton where
  import Prelude
  import Control.Monad.Reader (Reader, ask, runReader)

  type CoreCrystal = { frequency :: Number, resonance :: String }

  -- The Single Instance
  theOmegaCrystal :: CoreCrystal
  theOmegaCrystal = { frequency: 432.0, resonance: "Aether" }

  type SpellM = Reader CoreCrystal

  castResonance :: SpellM String
  castResonance = do
    crystal <- ask
    pure $ "Casting with resonance: " <> crystal.resonance

  executeSpell :: String
  executeSpell = runReader castResonance theOmegaCrystal
tags: [creational, singleton, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
