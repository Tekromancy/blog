---
title: The Flyweight (Racket)
description: Sharing massive amounts of fine-grained magical entities efficiently.
type: racket
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Phantoms"
formula: |2
  #lang racket

  (define rune-cache (make-hash))

  (struct intrinsic-rune (symbol element) #:transparent)

  (define (get-rune symbol element)
    (hash-ref! rune-cache (cons symbol element)
               (λ ()
                 (displayln (format "Forging new rune: ~a (~a)" symbol element))
                 (intrinsic-rune symbol element))))

  (define (cast-rune rune x y)
    (printf "Casting ~a at coordinates (~a, ~a)\n" (intrinsic-rune-symbol rune) x y))

  (define r1 (get-rune 'alpha 'fire))
  (define r2 (get-rune 'beta 'ice))
  (define r3 (get-rune 'alpha 'fire)) ;; Reused!

  (cast-rune r1 10 20)
  (cast-rune r3 50 60)
tags: [racket, structural, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Flyweight

When scattering thousands of arcane symbols across the battlefield, memory becomes a scarce resource. The Flyweight pattern mitigates this by caching intrinsic state. In Racket, `hash-ref!` elegantly fetches or computes a rune. Identical runes share the same memory structure, while their extrinsic state (like coordinates) is supplied upon casting.
