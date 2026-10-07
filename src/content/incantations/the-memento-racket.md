---
title: The Memento (Racket)
description: Capturing and restoring the internal state of a magical entity.
type: racket
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time"
formula: |2
  #lang racket

  (define (make-spellbook)
    (let ([spells '()])
      (hash 'add-spell! (λ (s) (set! spells (cons s spells)))
            'get-spells (λ () spells)
            'save (λ () spells) ;; The Memento is just the immutable list
            'restore! (λ (memento) (set! spells memento)))))

  (define book (make-spellbook))
  ((hash-ref book 'add-spell!) "Light")
  ((hash-ref book 'add-spell!) "Heal")

  (define saved-state ((hash-ref book 'save)))

  ((hash-ref book 'add-spell!) "Doomsday")
  (printf "Before rewind: ~a\n" ((hash-ref book 'get-spells)))

  ((hash-ref book 'restore!) saved-state)
  (printf "After rewind: ~a\n" ((hash-ref book 'get-spells)))
tags: [racket, behavioral, memento, time-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento

Chronomancy made accessible. Because Racket heavily relies on immutable data structures (like lists), the Memento pattern often comes for free. A "snapshot" of a spellbook is merely a reference to the list at that moment in time. Restoring state is as simple as reverting a variable to point back to the captured list.
