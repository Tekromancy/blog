---
title: The Iterator (Racket)
description: Traversing a collection of magical artifacts sequentially without exposing its underlying representation.
type: racket
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Seers"
formula: |2
  #lang racket

  (define (make-grimoire-iterator spells)
    (let ([current spells])
      (λ ()
        (if (null? current)
            'end-of-grimoire
            (let ([next-spell (car current)])
              (set! current (cdr current))
              next-spell)))))

  (define iter (make-grimoire-iterator '("Fireball" "Frostbolt" "Arcane Missiles")))

  (displayln (iter))
  (displayln (iter))
  (displayln (iter))
  (displayln (iter))
tags: [racket, behavioral, iterator, stateful-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator

The Iterator acts as a Divining tool, moving sequentially through a Grimoire without revealing whether the pages are bound as lists, arrays, or mystical trees. A simple closure closing over the `current` state allows a Mage to pull spells one by one until the tome is empty.
