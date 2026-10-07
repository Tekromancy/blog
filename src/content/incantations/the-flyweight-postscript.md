---
title: "Flyweight in PostScript"
description: "Share font spirit dictionaries to save demonic memory space in the stack."
type: postscript
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Spirit Caching"
formula: |2
  % Flyweight in PostScript
  /FontCache << >> def
  
  /getFontSpirit {
    FontCache exch 2 copy known not {
      (Summoning and Caching Font Spirit...\n) print
      2 copy << /data (Heavy Vector Glyphs) >> put
    } if
    get
  } bind def
  
  /Helvetica getFontSpirit pop
  /Helvetica getFontSpirit pop
tags: [postscript, print-daemon, structural, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# Flyweight: Spirit Caching

When conjuring tens of thousands of individual characters on a page, creating a new font spirit for each glyph would rapidly exhaust the interpreter's memory stack. The Flyweight caches these intrinsic states, ensuring that "Helvetica" is loaded only once. All subsequent invocations simply reference the already summoned spirit.
