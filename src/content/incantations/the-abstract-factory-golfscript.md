---
title: The Abstract Factory of the Shortened Breath
description: A sigil of creation, folding many into one terse utterance.
type: golfscript
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Compression"
formula: |2
  # Abstract Factory in GolfScript
  # Factories are blocks that push blocks.
  { { "Knight" } { "Mage" } } :factoryA;
  { { "Orc" } { "Goblin" } } :factoryB;
  factoryA 0=~ # Creates a Knight
tags: [creational, golfscript, the-shortened-breath]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
