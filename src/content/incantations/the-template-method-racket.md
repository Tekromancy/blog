---
title: The Template Method (Racket)
description: Defining the skeleton of an algorithm while allowing subclasses to override specific steps.
type: racket
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Rituals"
formula: |2
  #lang racket

  (define (perform-ritual gather-components cast-spell)
    (displayln "Starting the ritual...")
    (gather-components)
    (displayln "Chanting base incantations...")
    (cast-spell)
    (displayln "Ritual concluded."))

  (define (fire-ritual)
    (perform-ritual
     (λ () (displayln "Gathering sulfur and ash."))
     (λ () (displayln "Casting 'Ignis'!"))))

  (fire-ritual)
tags: [racket, behavioral, template-method, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Template Method

Rituals often share a common structure, varying only in the specific components gathered and the final words spoken. In Racket, the Template Method is gracefully handled by passing higher-order functions into a skeletal orchestrator. The base skeleton controls the flow, while the injected functions dictate the magic.
