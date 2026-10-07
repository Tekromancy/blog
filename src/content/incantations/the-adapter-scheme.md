---
title: The Adapter
description: Bridging incompatible magical interfaces via functional wrappers.
type: scheme
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  ;; Old interface
  (define (cast-old-spell name power)
    (list 'cast name 'with-power power))

  ;; Adapter for new interface expecting (cast-spell context)
  (define (make-spell-adapter name power)
    (lambda (context)
      (cast-old-spell name (* power (cdr (assq 'boost context))))))

  (define adapted (make-spell-adapter 'lightning 10))
  (adapted '((boost . 2)))
tags: [structural, scheme, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A simple wrapper function transmutes the old invocation into the new standard, ensuring seamless channeling of aether.
