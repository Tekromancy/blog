---
title: The Template Method
description: Outlining the grand ritual while letting apprentices fill in the details.
type: scheme
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritualism"
formula: |2
  (define (perform-ritual preparation-fn invocation-fn)
    (display "Cleansing the circle...\n")
    (preparation-fn)
    (display "Chanting the ancient words...\n")
    (invocation-fn)
    (display "The ritual is complete.\n"))

  (define (fire-ritual)
    (perform-ritual 
      (lambda () (display "Lighting candles.\n"))
      (lambda () (display "Calling the flame.\n"))))
tags: [behavioral, scheme, higher-order-functions, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The core ritual structure remains immutable, while specific conjuration steps are injected as anonymous closures by the caster.
