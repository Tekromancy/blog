---
title: The Flyweight
description: Sharing immutable aetherial essences to conserve memory dimensions.
type: scheme
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  (define rune-forge
    (let ((cache '()))
      (lambda (rune-type)
        (let ((existing (assq rune-type cache)))
          (if existing
              (cdr existing)
              (let ((new-rune (string-append "Rune of " (symbol->string rune-type))))
                (set! cache (cons (cons rune-type new-rune) cache))
                new-rune))))))
tags: [structural, scheme, memoization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By memoizing the creation of magical essences, the flyweight pattern prevents the aether from being cluttered with redundant phantasms.
