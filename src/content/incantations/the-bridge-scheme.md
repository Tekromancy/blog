---
title: The Bridge
description: Decoupling ethereal abstraction from corporeal implementation.
type: scheme
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  (define (make-wand material-impl)
    (lambda (action)
      (case action
        ((channel) (material-impl 'glow))
        ((strike) (material-impl 'shatter)))))

  (define (crystal-material)
    (lambda (msg)
      (case msg
        ((glow) "The crystal hums with blinding light.")
        ((shatter) "The crystal shatters into a thousand ethereal shards."))))

  (define my-wand (make-wand (crystal-material)))
  (my-wand 'channel)
tags: [structural, scheme, message-passing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Message-passing allows an abstraction (the wand) to seamlessly command its implementation (the material), separating the magic from the medium.
