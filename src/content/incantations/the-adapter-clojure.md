---
title: The Adapter Incantation
description: Translating incompatible magical frequencies into unified resonance.
type: clojure
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Harmonization
formula: |
  (ns tekromancy.adapter)
  
  (defprotocol TargetProtocol
    (cast-spell [_]))
  
  ;; The Adaptee, using an ancient, incompatible interface
  (defrecord AncientWand [ancient-power]
    Object
    (toString [_] (str "Ancient wand crackles with " ancient-power)))
  
  (defn invoke-ancient [wand]
    (str "Invoking " (:ancient-power wand)))
  
  ;; The Adapter, utilizing `extend-type` to adapt existing types to new protocols
  (extend-type AncientWand
    TargetProtocol
    (cast-spell [this]
      (invoke-ancient this)))
  
  ;; Usage:
  ;; (cast-spell (->AncientWand "Void Energy"))
tags: [structural, adapter, clojure, protocols]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When interfacing with ancient grimoires, their energy structures rarely align with modern protocol demands. The Adapter pattern in Clojure is performed beautifully via `extend-type` or `extend-protocol`, transmuting legacy types to speak the current language without modifying their original source.
