---
title: The State
description: Shifting arcane forms internally without altering the outward projection.
type: scheme
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  (define (make-shapeshifter)
    (let ((current-form #f))
      (define (wolf-state msg)
        (case msg ((attack) 'bite) ((shift) (set! current-form bear-state))))
      (define (bear-state msg)
        (case msg ((attack) 'maul) ((shift) (set! current-form wolf-state))))
      (set! current-form wolf-state)
      (lambda (msg) (current-form msg))))

  (define shifter (make-shapeshifter))
  (shifter 'attack) ; => bite
  (shifter 'shift)
  (shifter 'attack) ; => maul
tags: [behavioral, scheme, state-machine, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Mutating internal state references allows the entity to dynamically swap its functional behavior without changing its identifier.
