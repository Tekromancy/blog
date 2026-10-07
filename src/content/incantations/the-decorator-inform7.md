---
title: The Decorator
description: Layering magical enhancements onto a basic spell, adding flaming or echoing effects dynamically.
type: inform7
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Alteration // Prose-Based Spellcasting"
formula: |2
  A spell effect is a kind of value. The spell effects are basic, flaming, and echoing.
  
  A castable spell is a kind of thing. A castable spell has a list of spell effects called the enhancements.
  
  To cast (S - a castable spell):
      say "You release the magical energy.";
      if basic is listed in the enhancements of S:
          say "A simple bolt of force strikes out.";
      if flaming is listed in the enhancements of S:
          say "Flames wreathe the spell, scorching the air!";
      if echoing is listed in the enhancements of S:
          say "The spell repeats itself in a temporal echo!"
          
  To add the flaming enhancement to (S - a castable spell):
      add flaming to the enhancements of S.
      
  To add the echoing enhancement to (S - a castable spell):
      add echoing to the enhancements of S.
tags: [structural, alteration, decorator, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
