---
title: The Command
description: Encapsulating spells as deferred, executable scrolls.
type: scheme
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Compulsion"
formula: |2
  (define (make-spell-scroll spell target)
    (lambda () (spell target)))

  (define (cast-doom target)
    (display (string-append "Doom falls upon " target "\n")))

  (define scroll-of-doom (make-spell-scroll cast-doom "The Lich"))

  ;; Later...
  (scroll-of-doom)
tags: [behavioral, scheme, thunks, lazy-evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By utilizing zero-argument closures (thunks), we encode an entire spell matrix into a single scroll to be unrolled at a later time.
