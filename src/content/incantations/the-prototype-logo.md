---
title: "Prototype: The Fractal Cloning of Turtles"
description: "Clone existing geometry lists and mutate their properties to populate the digital astral plane without recalculating roots."
type: logo
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Fractalism"
formula: |2
  to clone-ward :ward
    ; In Logo, lists are deep-copied inherently when assigned or modified
    output :ward
  end

  to mutate-ward :ward :scale-factor
    output map [list first ? :scale-factor * last ?] :ward
  end

  make "base-ward [[fd 50] [rt 90] [fd 50]]
  make "echo-ward mutate-ward (clone-ward :base-ward) 2

  ; Tracing sacred geometry
  foreach :base-ward [ run ? ]
  pu fd 100 pd
  foreach :echo-ward [ run ? ]
tags: [turtle-divination, sacred-geometry]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
