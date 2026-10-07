---
title: The Iterator
description: A scrying crystal that sequentially reveals the true names of demons bound within an amulet.
type: inform7
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Prose-Based Spellcasting"
formula: |2
  A bound demon is a kind of thing. A bound demon has a text called the true name.
  
  The amulet is a thing. The amulet contains a bound demon called Azazel. The true name of Azazel is "Az'azel".
  The amulet contains a bound demon called Belial. The true name of Belial is "Bel'ial".
  
  To scry the amulet:
      say "You gaze into the crystal, iterating through the bound entities...";
      repeat with the entity running through the bound demons in the amulet:
          say "A demonic presence is revealed: [true name of the entity]."
tags: [behavioral, divination, iterator, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
