---
title: "Facade in PostScript"
description: "Provide a simple incantation interface to the complex graphics state matrix."
type: postscript
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Matrix Masking"
formula: |2
  % Facade in PostScript
  /GraphicsFacade <<
    /beginRitual { gsave 0 setgray 1 setlinewidth }
    /endRitual { grestore (Ritual Matrix Cleansed\n) print }
  >> def
  
  GraphicsFacade /beginRitual get exec
  % ... raw operations ...
  GraphicsFacade /endRitual get exec
tags: [postscript, print-daemon, structural, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# Facade: Masking the Abyss

The internal graphics state of PostScript is a chaotic vortex of matrices, clipping paths, and color spaces. Directly manipulating these forces is perilous for an Apprentice. The Facade provides a safe, simplified interface, masking the abyss of complexity behind easily digestible methods like `beginRitual` and `endRitual`.
