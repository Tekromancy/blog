---
title: "Composite: The Fractal Matrix of Wards"
description: "Treat individual geometric strokes and complex nested mandalas uniformly through a composite tree evaluated recursively."
type: logo
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractalism"
formula: |2
  ; A primitive is a direct command.
  ; A composite is a list of primitives or other composites.

  to execute-ward :ward
    if wordp :ward [ run :ward stop ]
    if empty? :ward [ stop ]

    localmake "head first :ward
    ifelse listp :head [
      ; It's a nested mandala (composite)
      execute-ward :head
    ] [
      ; It's a direct command (primitive), run the whole list
      run :ward
      stop
    ]
    execute-ward bf :ward
  end

  ; Leaf nodes
  make "stroke-a [fd 50]
  make "stroke-b [rt 90]

  ; Composite nodes
  make "mandala (list :stroke-a :stroke-b :stroke-a :stroke-b)
  make "grand-mandala (list :mandala [rt 45] :mandala)

  ; Execute the fractal matrix
  execute-ward :grand-mandala
tags: [turtle-divination, algorithmic-pathfinding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
