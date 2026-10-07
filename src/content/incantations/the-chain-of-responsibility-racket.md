---
title: The Chain of Responsibility (Racket)
description: Passing a mystical request along a chain of handlers.
type: racket
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Threads"
formula: |2
  #lang racket

  (define (make-handler condition action next-handler)
    (λ (request)
      (if (condition request)
          (action request)
          (if next-handler
              (next-handler request)
              (printf "Request ~a unhandled.\n" request)))))

  (define fire-handler
    (make-handler (λ (r) (eq? r 'fire))
                  (λ (r) (displayln "Handled by Fire Mage"))
                  #f))

  (define ice-handler
    (make-handler (λ (r) (eq? r 'ice))
                  (λ (r) (displayln "Handled by Ice Mage"))
                  fire-handler))

  (define arcane-handler
    (make-handler (λ (r) (eq? r 'arcane))
                  (λ (r) (displayln "Handled by Arcane Mage"))
                  ice-handler))

  (arcane-handler 'ice)
  (arcane-handler 'fire)
  (arcane-handler 'shadow)
tags: [racket, behavioral, chain-of-responsibility, functional-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Chain of Responsibility

By linking closures together, we form an unbroken thread of execution. When an arcane anomaly is detected, it is passed down the chain. Each Mage in the circle inspects the request; if their elements align, they handle it, otherwise, it flows to the next. Metamagic gracefully untangled.
