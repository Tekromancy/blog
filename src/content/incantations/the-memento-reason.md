---
title: Memento in ReasonML
description: Archiving state snapshots for time manipulation.
type: reason
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Reversion"
formula: |2
  type state = { hp: int, pos: (int, int) };
  let save = (s: state) => s; /* Immutable by default! */
  let restore = (history, index) => List.nth(history, index);
tags: [reason, memento, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Due to the unyielding laws of immutability in Reason, the Memento pattern requires zero overhead. You merely store the record in a list to step backwards through time.
