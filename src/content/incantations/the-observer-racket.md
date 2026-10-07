---
title: The Observer (Racket)
description: A publication-subscription mechanism to notify multiple entities of changes.
type: racket
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  #lang racket

  (define (make-crystal-ball)
    (let ([observers '()]
          [vision #f])
      (hash 'attach (λ (obs) (set! observers (cons obs observers)))
            'set-vision! (λ (v)
                           (set! vision v)
                           (for-each (λ (obs) (obs vision)) observers)))))

  (define ball (make-crystal-ball))

  (define (seer name)
    (λ (vision) (printf "Seer ~a sees: ~a\n" name vision)))

  ((hash-ref ball 'attach) (seer "Alistair"))
  ((hash-ref ball 'attach) (seer "Morgana"))

  ((hash-ref ball 'set-vision!) "An impending storm!")
tags: [racket, behavioral, observer, scrying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Observer

When the Crystal Ball shifts its vision, all attuned Seers must be notified instantly. The Observer pattern registers callback functions (thunks) and iterates through them when the state changes. It is the cornerstone of responsive magical applications and event-driven wizardry.
