---
title: The Facade (Racket)
description: A simplified interface to a complex system of arcane subsystems.
type: racket
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Veil"
formula: |2
  #lang racket

  ;; Complex subsystems
  (define (chant-words) (displayln "Chanting ancient words..."))
  (define (burn-incense) (displayln "Burning rare incense..."))
  (define (draw-runes) (displayln "Drawing glowing runes..."))

  ;; The Facade
  (define (perform-summoning-ritual)
    (displayln "--- Initiating Summoning Ritual ---")
    (burn-incense)
    (chant-words)
    (draw-runes)
    (displayln "--- Ritual Complete. Demon Summoned! ---"))

  (perform-summoning-ritual)
tags: [racket, structural, facade, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Facade

Behind the veil of the `#lang` runes, complex subsystems orchestrate the flow of mana. The Facade pattern simplifies this chaos, offering a single point of interaction. `perform-summoning-ritual` abstracts the tedious details of incense, chanting, and rune-drawing away from the Adept, letting them focus purely on the conjuration.
