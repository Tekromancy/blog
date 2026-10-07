---
title: The Composite (Racket)
description: Treat individual magical effects and amalgamations of effects uniformly.
type: racket
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal"
formula: |2
  #lang racket

  (struct simple-spell (name) #:transparent)
  (struct macro-spell (spells) #:transparent)

  (define (cast magic)
    (cond
      [(simple-spell? magic) (printf "Casting ~a\n" (simple-spell-name magic))]
      [(macro-spell? magic)
       (displayln "Initiating Macro Spell...")
       (for-each cast (macro-spell-spells magic))]
      [else (error "Unknown magic type")]))

  (define spark (simple-spell "Spark"))
  (define gust (simple-spell "Gust"))
  (define storm (macro-spell (list spark gust (simple-spell "Rain"))))

  (cast storm)
tags: [racket, structural, composite, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite

A fractal recursion of magic. The Composite pattern enables an Archmage to bundle spells into `macro-spells` and cast them as if they were a single incantation. Racket's list processing and dynamic dispatch through `cond` make traversing these magical trees beautifully elegant.
