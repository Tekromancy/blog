---
title: "State: The Turtle's Trance"
description: "Alter the turtle's fundamental behavior based on its internal trance state—seeking, tracing, or dormant."
type: logo
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Trance"
formula: |2
  make "turtle-state "seeking

  to trance-move :dist
    if equal? :turtle-state "seeking [ pu fd :dist pd ]
    if equal? :turtle-state "tracing [ setpencolor [255 0 255] fd :dist ]
    if equal? :turtle-state "dormant [ print [The turtle dreams...] ]
  end

  to change-state :new-state
    make "turtle-state :new-state
  end

  ; Divination sequence
  trance-move 50
  change-state "tracing
  trance-move 50
  change-state "dormant
  trance-move 50
tags: [turtle-divination, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
