---
title: The Abstract Factory
description: Conjuring related mystic artifacts through minimalist parenthetical runes.
type: scheme
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  (define (make-mage-factory)
    (lambda (msg)
      (case msg
        ((create-wand) (lambda () 'mage-wand))
        ((create-robe) (lambda () 'mage-robe)))))

  (define (make-warlock-factory)
    (lambda (msg)
      (case msg
        ((create-wand) (lambda () 'warlock-staff))
        ((create-robe) (lambda () 'warlock-cloak)))))

  (define (summon-equipment factory)
    (let ((wand ((factory 'create-wand)))
          (robe ((factory 'create-robe))))
      (list wand robe)))
tags: [creational, scheme, closures, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the minimalist parenthetical runes of Scheme, abstract factories are simply closures returning closures.
