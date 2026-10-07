---
title: "Builder in PostScript"
description: "Construct complex sigils and intricate print matrices step-by-step."
type: postscript
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Evocation // Sigilcraft"
formula: |2
  % Builder in PostScript
  /SigilBuilder <<
    /sigil ()
    /addRune { /sigil exch sigil exch concatstrings def }
    /build { sigil ( Built\n) concatstrings print }
  >> def
  
  SigilBuilder /addRune get (Alpha Rune ) exec
  SigilBuilder /addRune get (Beta Rune) exec
  SigilBuilder /build get exec
tags: [postscript, print-daemon, creational, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# Builder: Incremental Manifestation

Not all incantations can be unleashed in a single, volatile breath. The Builder pattern allows a cyber-mage to construct an intricate sigil or document tree step-by-step. By isolating the construction logic from the final glyph representation, you ensure that even the most chaotic combinations of runes are safely compiled before the final ink hits the page.
