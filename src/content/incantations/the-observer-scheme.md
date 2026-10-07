---
title: The Observer
description: Tying sympathetic magical links so all familiars react as one.
type: scheme
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  (define (make-subject)
    (let ((observers '()))
      (lambda (msg . args)
        (case msg
          ((attach) (set! observers (cons (car args) observers)))
          ((notify) (for-each (lambda (obs) (obs (car args))) observers))))))

  (define master-rune (make-subject))
  (master-rune 'attach (lambda (event) (display "Familiar 1 saw: ") (display event) (newline)))
  (master-rune 'notify 'rune-glows)
tags: [behavioral, scheme, events, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A subject maintains a list of observer closures. When the aether pulses, it iterates over the list, invoking each sympathetic link.
