---
title: The Abstract Factory (Racket)
description: A metamagical forge for creating families of related arcane constructs without specifying their concrete classes.
type: racket
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Metamagic"
formula: |2
  #lang racket

  (define (make-fire-factory)
    (hash 'create-wand (λ () "Wand of Fireball")
          'create-robe (λ () "Robe of Flames")))

  (define (make-ice-factory)
    (hash 'create-wand (λ () "Wand of Frost")
          'create-robe (λ () "Robe of Winter")))

  (define (forge-equipment factory)
    (let ([wand ((hash-ref factory 'create-wand))]
          [robe ((hash-ref factory 'create-robe))])
      (printf "Forged: ~a and ~a\n" wand robe)))

  (forge-equipment (make-fire-factory))
  (forge-equipment (make-ice-factory))
tags: [racket, creational, abstract-factory, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory

In the deep parenthetical realms of Racket, the Abstract Factory is a high-order spell that binds functions into hash maps or structs, acting as a dynamic grimoire of creation. Through the `#lang` runes, we summon factories that dispense thematic arcane gear. By invoking `forge-equipment` with different factories, we weave metamagic that adapts to the elemental resonance of our needs.
