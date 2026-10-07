---
title: The Interpreter
description: Parsing ancient draconian syntax to unravel the meaning of a forgotten spell.
type: inform7
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Prose-Based Spellcasting"
formula: |2
  To decide what text is the interpretation of (ancient word - a text):
      if the ancient word is "Ignis":
          decide on "Fire";
      if the ancient word is "Gelus":
          decide on "Frost";
      decide on "Unknown".
      
  To translate the draconian phrase (phrase - a text):
      let the translation be the interpretation of the phrase;
      say "The translation of [phrase] is [translation]."
tags: [behavioral, divination, interpreter, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
