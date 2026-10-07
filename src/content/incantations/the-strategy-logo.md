---
title: "Strategy: The Pathfinding Algorithms"
description: "Hot-swap the algorithmic logic used to trace a labyrinth, passing different Lisp-like functions to a generic solver."
type: logo
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Algorithmic Pathfinding"
formula: |2
  to execute-path :strategy :dist
    run list :strategy :dist
  end

  to spiral-strategy :dist
    repeat 10 [ fd :dist rt 15 make "dist :dist + 2 ]
  end

  to jagged-strategy :dist
    repeat 5 [ fd :dist rt 90 fd :dist lt 90 ]
  end

  ; The cyber-oracle chooses the path
  execute-path "spiral-strategy 10
  pu home pd
  execute-path "jagged-strategy 20
tags: [turtle-divination, algorithmic-pathfinding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
