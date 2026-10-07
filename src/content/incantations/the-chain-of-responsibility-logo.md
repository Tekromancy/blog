---
title: "Chain of Responsibility: The Cascading Wards"
description: "Pass a disruptive cyber-anomaly through a chain of geomantic wards until one has the correct frequency to neutralize it."
type: logo
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Cascade"
formula: |2
  to fire-ward :anomaly
    if equal? :anomaly "fire [ print [Fire ward activated.] rt 90 fd 50 stop ]
    ice-ward :anomaly
  end

  to ice-ward :anomaly
    if equal? :anomaly "ice [ print [Ice ward activated.] setpencolor [0 0 255] arc 360 20 stop ]
    void-ward :anomaly
  end

  to void-ward :anomaly
    print [Void ward absorbed the unknown anomaly.]
    cs
  end

  ; Trigger the chain
  fire-ward "ice
  fire-ward "glitch
tags: [turtle-divination, algorithmic-pathfinding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
