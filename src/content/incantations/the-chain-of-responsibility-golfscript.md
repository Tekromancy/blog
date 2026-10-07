---
title: The Chain of Responsibility of the Shortened Breath
description: Passing the breath along a sequence of runic nodes until one accepts it.
type: golfscript
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Linkage"
formula: |2
  # Chain of Responsibility
  [ { 1 > { "H1" } { 0 } if } { 2 > { "H2" } { 0 } if } ]
  { 1$ ~ } % # Evaluate chain
tags: [behavioral, golfscript, the-shortened-breath]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
