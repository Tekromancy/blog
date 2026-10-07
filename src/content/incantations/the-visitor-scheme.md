---
title: The Visitor
description: Projecting astral forms to analyze diverse mystical nodes without altering them.
type: scheme
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral Projection"
formula: |2
  (define (accept node visitor)
    (case (car node)
      ((spell) (visitor 'visit-spell (cdr node)))
      ((ward) (visitor 'visit-ward (cdr node)))))

  (define (power-analyzer msg data)
    (case msg
      ((visit-spell) (display "Analyzing spell power\n"))
      ((visit-ward) (display "Analyzing ward integrity\n"))))

  (accept '(spell "Fireball" 50) power-analyzer)
tags: [behavioral, scheme, pattern-matching, dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The visitor separates the operations from the elemental structures, allowing mages to define new scrying techniques over existing spell taxonomies.
