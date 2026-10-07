---
title: The Factory Method
description: Delegating the manifestation of magical entities to specialized sub-closures.
type: scheme
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  (define (make-spawner spawn-fn)
    (lambda (type)
      (let ((entity (spawn-fn type)))
        (display "Summoned: ") (display entity) (newline)
        entity)))

  (define elemental-spawner
    (make-spawner
      (lambda (type)
        (case type
          ((fire) 'fire-elemental)
          ((water) 'water-elemental)
          (else 'unknown-entity)))))
tags: [creational, scheme, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Higher-order functions allow specialized summoning logic to be injected into generalized creation rituals.
