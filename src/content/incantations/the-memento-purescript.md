---
title: The Memento of Web Runes
description: Capture and restore the internal state of a mystical entity without violating encapsulation.
type: purescript
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Soul Anchoring"
formula: |2
  module Arcane.Memento where
  import Prelude

  type SoulState = { sanity :: Int, mana :: Int }
  newtype SoulStone = SoulStone SoulState -- The Memento

  saveState :: SoulState -> SoulStone
  saveState state = SoulStone state

  restoreState :: SoulStone -> SoulState
  restoreState (SoulStone state) = state

  -- Usage
  corrupt :: SoulState -> SoulState
  corrupt s = s { sanity = s.sanity - 10 }
tags: [behavioral, memento, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
