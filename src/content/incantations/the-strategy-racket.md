---
title: The Strategy (Racket)
description: Encapsulating a family of algorithms and making them interchangeable.
type: racket
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  #lang racket

  ;; Strategies
  (define (aggressive-stance enemy) (format "Charging head-on at ~a!" enemy))
  (define (defensive-stance enemy) (format "Raising shields against ~a." enemy))
  (define (stealth-stance enemy) (format "Sneaking around ~a." enemy))

  ;; Context
  (define (engage enemy strategy)
    (displayln (strategy enemy)))

  (engage "Orc Warlord" aggressive-stance)
  (engage "Dragon" defensive-stance)
tags: [racket, behavioral, strategy, functional-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Strategy

In languages where functions are first-class citizens, the Strategy pattern is effortlessly native. Instead of building complex class hierarchies, we simply pass the tactical algorithm (the function) into the execution context. Parenthetical Evolution at its sleekest!
