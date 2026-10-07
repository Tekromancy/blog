---
title: The Proxy (Racket)
description: A magical ward that controls access to a sensitive or expensive spell.
type: racket
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Wards"
formula: |2
  #lang racket

  (define (forbidden-spell)
    "Executing Forbidden Magic: The world trembles!")

  (define (make-proxy-spell user-level)
    (λ ()
      (if (>= user-level 50)
          (forbidden-spell)
          "Access Denied: You lack the required arcane level.")))

  (define apprentice-cast (make-proxy-spell 10))
  (define archmage-cast (make-proxy-spell 99))

  (displayln (apprentice-cast))
  (displayln (archmage-cast))
tags: [racket, structural, proxy, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Proxy

Some spells are too dangerous to be invoked directly. The Proxy acts as an Abjuration ward, intercepting the call and performing necessary checks before allowing the invocation to proceed. By wrapping the `forbidden-spell` in a closure, we dictate exactly who may harness its world-trembling power.
