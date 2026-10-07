---
title: The Factory Method (Racket)
description: Delegate the specific instantiation of magical essences to subclass-like functions.
type: racket
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Essence"
formula: |2
  #lang racket

  (define (summon-familiar type)
    (case type
      [(owl) (λ () "Hoot! I am an Owl familiar.")]
      [(cat) (λ () "Meow! I am a Cat familiar.")]
      [(dragon) (λ () "Roar! I am a Dragon familiar.")]
      [else (error "Unknown familiar type")]))

  (define my-owl (summon-familiar 'owl))
  (define my-dragon (summon-familiar 'dragon))

  (displayln (my-owl))
  (displayln (my-dragon))
tags: [racket, creational, factory-method, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Factory Method

The Factory Method defines an interface for creating an object, but leaves the choice of its type to the subclasses—or in Racket's case, the specific branch of a higher-order function. `summon-familiar` acts as the arcane nexus, dynamically returning a new thunk representing the summoned creature. Metamagic made simple and elegant through `#lang racket`.
