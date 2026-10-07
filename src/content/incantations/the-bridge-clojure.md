---
title: The Bridge Incantation
description: Decoupling the abstraction of a spell from its elemental implementation.
type: clojure
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Weaving"
formula: |2
  (ns tekromancy.bridge)

  (defprotocol Element
    (ignite [_]))

  (defrecord VoidElement []
    Element
    (ignite [_] "darkness consumes"))

  (defrecord PlasmaElement []
    Element
    (ignite [_] "plasma scorches"))

  (defprotocol Spell
    (channel [_]))

  (defrecord ProjectileSpell [element]
    Spell
    (channel [_] (str "A projectile flies and " (ignite element))))

  (defrecord ShieldSpell [element]
    Spell
    (channel [_] (str "A shield forms as " (ignite element))))

  ;; Usage:
  ;; (channel (->ProjectileSpell (->VoidElement)))
tags: [structural, bridge, clojure, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge pattern separates the shape of the spell (projectile, shield) from the raw elemental energy that powers it (void, plasma). In the Lisp-like matrix, we compose these orthogonal dimensions using simple records and protocols, avoiding an explosion of inherited subclasses.
