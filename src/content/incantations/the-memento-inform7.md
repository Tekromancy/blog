---
title: The Memento
description: A chronomancy spell that captures a snapshot of a grimoire's state, allowing a wizard to rewind time if a transcription error occurs.
type: inform7
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Prose-Based Spellcasting"
formula: |2
  A magical grimoire is a kind of thing. A magical grimoire has a text called the current passage.
  
  A time-crystal is a kind of thing. A time-crystal has a text called the preserved passage.
  
  To create a memory crystal of (G - a magical grimoire):
      let the crystal be a new time-crystal;
      now the preserved passage of the crystal is the current passage of G;
      say "The current state of the grimoire is sealed within the time-crystal."
      
  To restore (G - a magical grimoire) from (C - a time-crystal):
      now the current passage of G is the preserved passage of C;
      say "Time rewinds, restoring the grimoire to the crystal's preserved state."
tags: [behavioral, chronomancy, memento, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
