---
title: "Command: The Encapsulated Spells"
description: "Turn turtle commands into data lists, allowing complex divination paths to be queued, delayed, or manipulated as pure Lisp-like data."
type: logo
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Spellbinding"
formula: |2
  make "spell-queue []

  to enqueue-spell :spell
    make "spell-queue lput :spell :spell-queue
  end

  to invoke-spells
    foreach :spell-queue [ run ? ]
    make "spell-queue []
  end

  ; Algorithmic Pathfinding via Command Queue
  enqueue-spell [fd 100]
  enqueue-spell [rt 90]
  enqueue-spell [setpencolor [255 0 0]]
  enqueue-spell [fd 100]

  ; The spells wait dormant until invoked
  invoke-spells
tags: [turtle-divination, Lisp-like]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
