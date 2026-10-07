---
title: The Facade
description: Concealing the labyrinthine depths of archaic rituals behind a singular rune.
type: scheme
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Glamour"
formula: |2
  (define (initiate-ley-lines) 'ley-lines-active)
  (define (align-stars) 'stars-aligned)
  (define (open-portal) 'portal-open)

  (define (cast-gate-spell)
    (initiate-ley-lines)
    (align-stars)
    (open-portal)
    'success)
tags: [structural, scheme, modules, simplification]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A facade simply sequences complex subordinate functions, presenting a clean, unified invocation point for the uninitiated apprentice.
