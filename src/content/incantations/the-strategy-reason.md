---
title: Strategy in ReasonML
description: Passing higher-order runes to determine algorithmic fate.
type: reason
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical"
formula: |2
  let strike = (damageStrategy, base) => damageStrategy(base);

  let critStrategy = (x) => x * 2;
  let poisonStrategy = (x) => x + 5;

  let finalDmg = strike(critStrategy, 10);
tags: [reason, strategy, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Functions are first-class citizens. The Strategy pattern is simply passing a specific behavior function into a generic executor.
