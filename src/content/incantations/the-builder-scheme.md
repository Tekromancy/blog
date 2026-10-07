---
title: The Builder
description: Assembling complex arcane constructs piece by piece via tail-call recursion.
type: scheme
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Golemancy"
formula: |2
  (define (make-golem-builder)
    (let ((head #f) (body #f) (limbs '()))
      (define (dispatch msg . args)
        (case msg
          ((set-head!) (set! head (car args)))
          ((set-body!) (set! body (car args)))
          ((add-limb!) (set! limbs (cons (car args) limbs)))
          ((build) (list 'golem head body limbs))))
      dispatch))

  (define (construct-golem builder)
    (builder 'set-head! 'obsidian-skull)
    (builder 'set-body! 'clay-torso)
    (builder 'add-limb! 'runic-arm)
    (builder 'add-limb! 'runic-arm)
    (builder 'build))
tags: [creational, scheme, state, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The builder pattern emerges naturally from message-passing closures that accumulate internal state until invoked to yield the final construct.
