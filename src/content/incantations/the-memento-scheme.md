---
title: The Memento
description: Capturing and restoring the fleeting state of temporal anomalies.
type: scheme
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  (define (make-temporal-entity init-state)
    (let ((state init-state))
      (define (dispatch msg . args)
        (case msg
          ((set-state!) (set! state (car args)))
          ((save) (lambda () state))
          ((restore) (set! state ((car args))))
          ((get-state) state)))
      dispatch))

  (define anomaly (make-temporal-entity 'stable))
  (define memento (anomaly 'save))
  (anomaly 'set-state! 'chaotic)
  (anomaly 'restore memento)
tags: [behavioral, scheme, closures, state-preservation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By utilizing a closure to capture the lexical environment’s current state, we effectively bottle time, ready to be poured back into the entity.
