---
title: The Strategy
description: Equipping algorithms dynamically like spellbooks in combat.
type: scheme
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  (define (execute-combat-strategy strategy target)
    (strategy target))

  (define (fire-strategy target)
    (string-append "Incinerating " target))

  (define (ice-strategy target)
    (string-append "Freezing " target))

  (execute-combat-strategy fire-strategy "Goblin")
tags: [behavioral, scheme, higher-order-functions, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Higher-order functions enable raw algorithmic strategy to be passed around and applied dynamically, the essence of tactical evocation.
