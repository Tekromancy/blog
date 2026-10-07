---
title: The State (Racket)
description: Altering an entity's behavior when its internal state changes.
type: racket
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shapeshifting"
formula: |2
  #lang racket

  (define (make-elemental)
    (let ([state 'water])
      (define (freeze!) (set! state 'ice))
      (define (boil!) (set! state 'steam))
      (define (attack)
        (case state
          [(water) "Splashes gently."]
          [(ice) "Pierces with icicles!"]
          [(steam) "Scalds with hot vapor!"]))
      (hash 'freeze! freeze!
            'boil! boil!
            'attack attack)))

  (define my-elemental (make-elemental))
  (displayln ((hash-ref my-elemental 'attack)))

  ((hash-ref my-elemental 'freeze!))
  (displayln ((hash-ref my-elemental 'attack)))
tags: [racket, behavioral, state, shapeshifting]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The State

An elemental spirit behaves differently depending on its current form. The State pattern encapsulates state-specific behaviors inside a single object. By mutating the internal `state` variable, the elemental dramatically shifts its attack patterns without changing its outward identity.
