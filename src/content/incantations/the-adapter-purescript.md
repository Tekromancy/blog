---
title: The Adapter of Web Runes
description: Translate the arcane API of ancient grimoires into modern CyberTablet interfaces.
type: purescript
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Protocol Shifting"
formula: |2
  module Arcane.Adapter where
  import Prelude

  -- Old API
  type OldGrimoire = { readScroll :: String -> String }
  dustyGrimoire :: OldGrimoire
  dustyGrimoire = { readScroll: \spell -> "Reading ancient text: " <> spell }

  -- New Expected API
  type CyberTablet = { executeApp :: String -> String }

  -- The Adapter
  grimoireAdapter :: OldGrimoire -> CyberTablet
  grimoireAdapter grimoire =
    { executeApp: \appId -> grimoire.readScroll ("App ID " <> appId <> " encoded in runes") }
tags: [structural, adapter, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
