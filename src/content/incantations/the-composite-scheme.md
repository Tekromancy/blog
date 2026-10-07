---
title: The Composite
description: Treating individual spells and grand rituals uniformly through recursive lists.
type: scheme
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  (define (execute-magic node)
    (if (list? node)
        (for-each execute-magic node)
        (display (string-append "Executing: " (symbol->string node) "\n"))))

  (define grand-ritual
    (list 'draw-circle
          (list 'ignite-candles 'chant-incantation)
          'summon-demon))

  (execute-magic grand-ritual)
tags: [structural, scheme, recursion, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By utilizing Scheme's intrinsic tree structures (lists of lists), the composite pattern is natively woven into the language's fabric.
