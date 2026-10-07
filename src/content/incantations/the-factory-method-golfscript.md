---
title: The Factory Method of the Shortened Breath
description: Deferring the creation of the exact symbol until the breath is released.
type: golfscript
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Evocation"
formula: |2
  # Factory Method in GolfScript
  { "TypeA" = { "ConstructA" } { "ConstructB" } if } :create;
  "TypeA" create ~
tags: [creational, golfscript, the-shortened-breath]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
