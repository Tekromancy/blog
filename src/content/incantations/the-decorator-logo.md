---
title: "Decorator: Auras of the Shell"
description: "Dynamically attach glowing auras or temporal shifts to turtle operations without altering the original drawing procedures."
type: logo
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Enchantment"
formula: |2
  to base-sigil
    repeat 4 [ fd 40 rt 90 ]
  end

  to with-glow :proc
    ; Save state
    localmake "old-color pencolor
    localmake "old-size pensize

    ; Apply aura
    setpensize 5
    setpencolor [0 255 0]
    run list :proc

    ; Restore state
    setpensize :old-size
    setpencolor :old-color
  end

  to with-echo :proc
    run list :proc
    pu rt 10 fd 10 pd
    run list :proc
  end

  ; Decorating the sigil
  with-echo "base-sigil
  pu fd 100 pd
  with-glow "base-sigil
tags: [turtle-divination, algorithmic-pathfinding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
