---
title: "Memento: Whispers of Past Trajectories"
description: "Take a snapshot of the turtle's astral state (position, heading, color) into a Lisp-like list, explore a timeline, and revert."
type: logo
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Echoes"
formula: |2
  to save-state
    output (list pos heading pencolor)
  end

  to restore-state :memento
    pu
    setpos item 1 :memento
    setheading item 2 :memento
    setpencolor item 3 :memento
    pd
  end

  ; Algorithmic Pathfinding with Undo
  fd 50
  make "chronos-anchor save-state

  ; Divergent timeline
  setpencolor [255 0 0]
  rt 45 fd 100
  print [Timeline failed. Reverting...]

  ; Restore
  restore-state :chronos-anchor
  setpencolor [0 255 0]
  lt 45 fd 100
tags: [turtle-divination, Lisp-like]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
