---
title: The Bridge (Racket)
description: Decoupling an abstraction from its implementation so the two can vary independently.
type: racket
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Duality"
formula: |2
  #lang racket

  ;; Implementations (The Elemental Sources)
  (define (fire-source) "Flames")
  (define (ice-source) "Frost")

  ;; Abstractions (The Spells)
  (define (make-bolt source)
    (λ () (format "Shooting a bolt of ~a!" (source))))

  (define (make-shield source)
    (λ () (format "Raising a shield of ~a!" (source))))

  ;; Bridging them
  (define fire-bolt (make-bolt fire-source))
  (define ice-shield (make-shield ice-source))

  (displayln (fire-bolt))
  (displayln (ice-shield))
tags: [racket, structural, bridge, functional-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge

The Bridge pattern ensures that spells and their elemental sources are not hard-coded together. By passing the elemental source as a function to the spell constructor, Racket allows us to seamlessly cross the bridge between abstract invocation and concrete manifestation. Macro Metamagic at its finest!
