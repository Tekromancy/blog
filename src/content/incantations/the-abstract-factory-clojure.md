---
title: The Abstract Factory Incantation
description: Manifesting families of arcane glyphs without specifying their concrete forms.
type: clojure
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Glyphmancy
formula: |
  (ns tekromancy.abstract-factory)
  
  (defprotocol SpellForge
    (cast-fire [_])
    (cast-ice [_]))
  
  (defrecord InfernalForge []
    SpellForge
    (cast-fire [_] "Infernal Fireball")
    (cast-ice [_] "Soul Frost"))
  
  (defrecord CelestialForge []
    SpellForge
    (cast-fire [_] "Holy Flame")
    (cast-ice [_] "Crystal Glacier"))
  
  (defn invoke-elements [forge]
    [(cast-fire forge) (cast-ice forge)])
  
  ;; Usage:
  ;; (invoke-elements (->InfernalForge))
tags: [creational, abstract-factory, clojure, jvm-transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the realm of JVM Transmutation, the Abstract Factory is a high-order conduit that summons families of related spells without binding the caster to their concrete manifestations. Immutable glyphs cascade through protocols, forming a perfect matrix of polymorphic dispatch.
