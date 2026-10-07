---
title: The Builder (Racket)
description: Incrementally enchant a complex parenthetical construct, step by step.
type: racket
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Golemancy"
formula: |2
  #lang racket

  (struct golem (material eyes core) #:transparent)

  (define (make-golem-builder)
    (let ([material 'clay]
          [eyes 'sapphire]
          [core 'fire])
      (λ (msg . args)
        (case msg
          [(set-material!) (set! material (car args))]
          [(set-eyes!) (set! eyes (car args))]
          [(set-core!) (set! core (car args))]
          [(build) (golem material eyes core)]))))

  (define builder (make-golem-builder))
  (builder 'set-material! 'obsidian)
  (builder 'set-eyes! 'rubies)
  (builder 'set-core! 'void)
  (define my-golem (builder 'build))

  (printf "Awakened Golem: ~a\n" my-golem)
tags: [racket, creational, builder, parenthetical-evolution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Builder

A Golemancer's delight. The Builder pattern in Racket often takes the form of a closure-based state machine, retaining the evolving form of the golem until the final `(build)` incantation is spoken. This parenthetical evolution separates the construction of a complex object from its representation, allowing the exact same construction processes to yield different crystalline representations.
