---
title: "Strategy in PostScript"
description: "Select different halftoning algorithms dynamically during the manifestation ritual."
type: postscript
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Halftone Tactics"
formula: |2
  % Strategy in PostScript
  /HalftoneDot { (Applying Classic Dot Screen...\n) print } def
  /HalftoneLine { (Applying Line Pattern Screen...\n) print } def
  
  /executeStrategy { exec } bind def
  
  /HalftoneDot executeStrategy
  /HalftoneLine executeStrategy
tags: [postscript, print-daemon, behavioral, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Strategy: Dynamic Tactical Weaving

Different rituals require different aesthetics. A Strategy allows a mage to inject interchangeable algorithms at runtime. By defining various executable arrays for tasks like halftoning or curve smoothing, the host program can quickly swap tactics without disturbing the underlying rendering loop.
