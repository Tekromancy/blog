---
title: "Flyweight: The Shared Vertices of the Astral Grid"
description: "Minimize memory usage by sharing the heavy Lisp-like lists of sacred polygon vertices, applying only extrinsic offsets per entity."
type: logo
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  ; Intrinsic state (heavy list of coordinates) shared via global property
  pprop "sacred-mesh "vertices [[0 0] [10 50] [50 50] [40 0]]

  to draw-mesh-at :offset-x :offset-y
    localmake "verts gprop "sacred-mesh "vertices
    pu
    setpos (list (first first :verts) + :offset-x (last first :verts) + :offset-y)
    pd
    foreach bf :verts [
      setpos (list (first ?) + :offset-x (last ?) + :offset-y)
    ]
    ; close shape
    setpos (list (first first :verts) + :offset-x (last first :verts) + :offset-y)
  end

  ; Algorithmic pathfinding through the void using shared mesh
  draw-mesh-at 0 0
  draw-mesh-at 100 100
  draw-mesh-at -50 200
tags: [turtle-divination, memory-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
