---
title: "Composite in PostScript"
description: "Assemble a tree of composite vector shapes into a singular, terrifying Rune."
type: postscript
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Runes"
formula: |2
  % Composite in PostScript
  /CompositeRune <<
    /children []
    /add { /children exch children exch [ exch aload pop exch ] def }
    /draw { children { /draw get exec } forall }
  >> def
  
  /LineRune << /draw { (Drawing Line\n) print } >> def
  /CircleRune << /draw { (Drawing Circle\n) print } >> def
  
  CompositeRune /add get LineRune exec
  CompositeRune /add get CircleRune exec
  CompositeRune /draw get exec
tags: [postscript, print-daemon, structural, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Composite: Fractal Constructs

The Composite pattern blurs the line between a single graphic primitive and a massive, complex grouping of paths. To the Print Daemon, the tree of nested components looks identical to a single leaf node. This allows for the construction of deeply fractal spells, where rendering the root unleashes a cascading storm of sub-routines.
