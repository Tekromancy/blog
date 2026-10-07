---
title: The Chain of Responsibility
description: A hierarchy of elemental wards that intercepts and attempts to nullify incoming curses before passing them down the line.
type: inform7
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Prose-Based Spellcasting"
formula: |2
  A warding sigil is a kind of thing. A warding sigil has a warding sigil called the next-in-line.
  A warding sigil has a text called the protected element.
  
  The fire-ward is a warding sigil. The protected element of it is "fire".
  The frost-ward is a warding sigil. The protected element of it is "frost".
  The next-in-line of the fire-ward is the frost-ward.
  
  To process the curse of (element - a text) through (W - a warding sigil):
      if the protected element of W is the element:
          say "The [W] flares to life, nullifying the [element] curse!";
      otherwise if the next-in-line of W is not nothing:
          say "The [W] ignores the curse, passing it along...";
          process the curse of element through the next-in-line of W;
      otherwise:
          say "The [element] curse breaches all defenses and strikes!"
tags: [behavioral, abjuration, chain-of-responsibility, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
