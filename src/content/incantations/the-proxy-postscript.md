---
title: "Proxy in PostScript"
description: "Delay the summoning of a massive image daemon until it is actually required to draw."
type: postscript
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Conjuration // Lazy Summoning"
formula: |2
  % Proxy in PostScript
  /HeavyImage << /load { (Loading 100MB Raster Soul...\n) print } >> def
  
  /ImageProxy <<
    /loaded false
    /draw {
      dup /loaded get not {
        HeavyImage /load get exec
        dup /loaded true put
      } if
      (Drawing Image Matrix\n) print
    }
  >> def
  
  ImageProxy /draw get exec
  ImageProxy /draw get exec
tags: [postscript, print-daemon, structural, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Proxy: Lazy Manifestation

Why summon a 100-megabyte, full-color daemon into the physical plane if it is ultimately masked or falls outside the clipping path? The Proxy stands as a lightweight surrogate, deferring the heavy lifting until the precise moment the spirit is invoked via a `/draw` command.
