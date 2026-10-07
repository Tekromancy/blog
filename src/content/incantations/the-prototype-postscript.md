---
title: "Prototype in PostScript"
description: "Clone an existing memory-resident glyph matrix without repeating the summoning ritual."
type: postscript
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Ectromancy // Matrix Cloning"
formula: |2
  % Prototype in PostScript
  /cloneDaemon {
    dup length dict copy
  } bind def
  
  /ProtoDaemon << /type (Raster) /resolution 300 >> def
  
  /NewDaemon ProtoDaemon cloneDaemon def
  NewDaemon /resolution 600 put
  
  NewDaemon /resolution get =
tags: [postscript, print-daemon, creational, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Prototype: Ectoplasmic Duplication

Why invoke the grueling and mana-intensive creation ritual twice? The Prototype pattern allows a master of Ectromancy to simply clone an already-resident Print Daemon in the stack memory. Once cloned, the matrix can be modified independently, saving invaluable processor cycles during massive batch-printing operations.
