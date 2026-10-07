---
title: The Adapter (Racket)
description: Translating the incantations of one magical lineage to be understood by another.
type: racket
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  #lang racket

  ;; Old magic system
  (define (cast-old-spell name power)
    (printf "Old Magic: Casting ~a with power ~a\n" name power))

  ;; New magic system interface expectation: (cast spell-struct)
  (struct modern-spell (identifier intensity))

  ;; The Adapter
  (define (modern-to-old-adapter spell)
    (cast-old-spell (modern-spell-identifier spell)
                    (modern-spell-intensity spell)))

  ;; Usage
  (define my-spell (modern-spell "Thunderbolt" 85))
  (modern-to-old-adapter my-spell)
tags: [racket, structural, adapter, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Adapter

As magical languages evolve and new `#lang` forms are birthed, old grimoires often become incompatible with modern syntax. The Adapter acts as a transmutative bridge. Here, a simple function unwraps the modern `struct` and feeds its essence into the archaic `cast-old-spell` function. Parentheses adapt to parentheses.
