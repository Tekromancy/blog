---
title: The Decorator Incantation
description: Dynamically layering new enchantments upon an existing spell.
type: clojure
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Enchantment // Layering
formula: |
  (ns tekromancy.decorator)
  
  ;; Higher-order functions act as natural decorators in Clojure.
  
  (defn base-spell [target]
    (str "Striking " target " with pure energy"))
  
  (defn with-fire [spell-fn]
    (fn [target]
      (str (spell-fn target) " and searing flames")))
  
  (defn with-echo [spell-fn]
    (fn [target]
      (str (spell-fn target) "... (echo)")))
  
  ;; Usage:
  ;; (def ultimate-spell (-> base-spell with-fire with-echo))
  ;; (ultimate-spell "the beast")
tags: [structural, decorator, clojure, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
To augment a spell with fire and echoes, one need not forge an entirely new artifact. By wrapping functions within higher-order functions, the Decorator pattern dynamically layers mutable enchantments atop immutable behavior, chaining functional glyphs seamlessly.
