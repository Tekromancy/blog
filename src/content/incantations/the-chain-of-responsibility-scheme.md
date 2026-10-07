---
title: The Chain of Responsibility
description: Passing the magical burden down a lineage of elder wardens.
type: scheme
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
formula: |2
  (define (make-ward element next-ward)
    (lambda (attack)
      (if (eq? (car attack) element)
          (string-append "Absorbed " (symbol->string element) " attack!")
          (if next-ward
              (next-ward attack)
              "Attack breached all wards!"))))

  (define master-ward
    (make-ward 'fire
      (make-ward 'water
        (make-ward 'lightning #f))))

  (master-ward '(lightning 50))
tags: [behavioral, scheme, recursion, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A chain of closures delegates the request dynamically, passing the invocation down the lineage until a capable warden handles it.
