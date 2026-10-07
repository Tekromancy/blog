---
title: The Decorator
description: Layering magical enhancements seamlessly over existing artifacts.
type: scheme
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  (define (base-shield damage)
    (max 0 (- damage 10)))

  (define (with-fire-resistance shield-fn)
    (lambda (damage type)
      (if (eq? type 'fire)
          (shield-fn (quotient damage 2))
          (shield-fn damage))))

  (define (with-reflect shield-fn)
    (lambda (damage type)
      (let ((net-damage (shield-fn damage type)))
        (display "Reflecting ") (display (- damage net-damage)) (newline)
        net-damage)))

  (define mystic-shield (with-reflect (with-fire-resistance base-shield)))
tags: [structural, scheme, function-composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Function composition serves as the perfect rune for stacking magical wards, each layer wrapping the core in a new protective shell.
