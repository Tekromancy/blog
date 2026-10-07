---
title: "Factory Method: The Spawning Pools of LOGO"
description: "Define an interface for creating a turtle entity, but let subclasses (or specific procedure branches) alter the type of spirit summoned."
type: logo
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Cyber-Spirits"
formula: |2
  to spawn-spirit :type
    if equal? :type "seeker [ output [ [type seeker] [speed 10] [color red] ] ]
    if equal? :type "weaver [ output [ [type weaver] [speed 5] [color blue] ] ]
    output [ [type anomaly] [speed 0] [color black] ]
  end

  to trace-spirit :spirit
    localmake "col last assoc "color :spirit
    setpencolor :col
    ; Divination trace based on spirit
    fd 50
  end

  make "my-spirit spawn-spirit "seeker
  trace-spirit :my-spirit
tags: [turtle-divination, Lisp-like]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
