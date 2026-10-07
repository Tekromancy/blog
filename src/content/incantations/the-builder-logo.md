---
title: "Builder: The Pathweaver's Loom"
description: "Construct complex turtle pathfinding sequences step-by-step, assembling a ritual circle before executing the trace."
type: logo
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Pathfinding"
formula: |2
  to new-ritual
    output []
  end

  to add-vertex :ritual :angle :distance
    output lput (list "fd :distance "rt :angle) :ritual
  end

  to add-seal :ritual
    output lput [arc 360 20] :ritual
  end

  to manifest-ritual :ritual
    foreach :ritual [ run ? ]
  end

  ; Algorithmic Pathfinding
  make "my-path new-ritual
  make "my-path add-vertex :my-path 90 100
  make "my-path add-vertex :my-path 90 100
  make "my-path add-seal :my-path
  manifest-ritual :my-path
tags: [turtle-divination, algorithmic-pathfinding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
