---
title: The Singleton
description: The High Altar, an arcane locus of which there can only ever be exactly one in the entire reality.
type: inform7
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Prose-Based Spellcasting"
formula: |2
  The High Altar is a thing.
  
  [Inform 7 natively enforces singletons for uniquely named things. The High Altar is exactly one object globally.]
  
  The High Altar has a number called the accumulated mana. The accumulated mana of the High Altar is usually 0.
  
  To channel energy into the locus:
      increase the accumulated mana of the High Altar by 10;
      say "The High Altar hums with arcane resonance."
      
  To decide what number is the global mana reserve:
      decide on the accumulated mana of the High Altar.
tags: [creational, abjuration, singleton, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
