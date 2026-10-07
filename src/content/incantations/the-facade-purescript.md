---
title: The Facade of Web Runes
description: Provide a simplified, unified rune array to complex subsystem grimories.
type: purescript
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Interface Masking"
formula: |2
  module Arcane.Facade where
  import Prelude

  -- Complex sub-systems
  summoningCircle :: { draw :: String -> String }
  summoningCircle = { draw: \demon -> "Drawing circle for " <> demon }

  incantation :: { chant :: String -> String }
  incantation = { chant: \words -> "Chanting: " <> words }

  pactBinding :: { seal :: String -> String }
  pactBinding = { seal: \entity -> "Sealing pact with " <> entity }

  -- The Facade
  type WarlockAPI = { summonDemon :: String -> String }

  warlockFacade :: WarlockAPI
  warlockFacade =
    { summonDemon: \name ->
        summoningCircle.draw name <> " | " <>
        incantation.chant "Zal'garoth Kaza!" <> " | " <>
        pactBinding.seal name
    }
tags: [structural, facade, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
