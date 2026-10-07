---
title: The Decorator (Racket)
description: Dynamically attach new responsibilities to a function.
type: racket
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Weaving"
formula: |2
  #lang racket

  (define (base-attack)
    "Strike!")

  (define (with-fire base-func)
    (λ ()
      (string-append (base-func) " + Fire Damage")))

  (define (with-poison base-func)
    (λ ()
      (string-append (base-func) " + Poison Damage")))

  (define flaming-poison-attack (with-poison (with-fire base-attack)))

  (displayln (flaming-poison-attack))
tags: [racket, structural, decorator, functional-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Decorator

Instead of subclassing or rewriting, we wrap functions within functions. The Decorator pattern is inherently natural to Racket. By taking a base function and returning a new closure that augments its output, we can weave multiple enchantments onto a single strike with pure Parenthetical Evolution.
