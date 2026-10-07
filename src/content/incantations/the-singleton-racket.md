---
title: The Singleton (Racket)
description: A solitary, ancient rune that exists only once across the entire runtime.
type: racket
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Enchantment // Monolith"
formula: |2
  #lang racket

  (define get-mana-pool
    (let ([pool-instance #f])
      (λ ()
        (unless pool-instance
          (displayln "Initializing the Ancient Mana Pool...")
          (set! pool-instance (make-hash)))
        pool-instance)))

  (define pool1 (get-mana-pool))
  (define pool2 (get-mana-pool))

  (hash-set! pool1 'crystal 100)
  (printf "Pool 2 Crystal Count: ~a\n" (hash-ref pool2 'crystal))
tags: [racket, creational, singleton, parenthetical-evolution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Singleton

A Singleton is an entity of absolute uniqueness. Through the use of lexical scope and `set!`, we bind a single instance of a hash map to the closure of `get-mana-pool`. No matter how many times the function is invoked, the same underlying magical reservoir is tapped, making it an excellent anchor for global arcane state.
