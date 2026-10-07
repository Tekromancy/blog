---
title: The Flyweight Incantation
description: Maximizing memory efficiency by sharing immutable arcane particles.
type: clojure
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Swarming
formula: |
  (ns tekromancy.flyweight)
  
  ;; Clojure's data structures inherently use structural sharing.
  ;; Memoization further enforces Flyweight caching.
  
  (defn expensive-rune-generation [rune-type]
    (Thread/sleep 100) ; Simulate heavy astral cost
    {:type rune-type :data "complex-fractal-matrix"})
  
  (def get-flyweight-rune
    (memoize expensive-rune-generation))
  
  (defn cast-swarm [size rune-type]
    (let [shared-rune (get-flyweight-rune rune-type)]
      (map (fn [idx] {:id idx :rune shared-rune}) (range size))))
  
  ;; Usage:
  ;; (cast-swarm 1000 :obsidian) ; Only computes :obsidian once
tags: [structural, flyweight, clojure, memoization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When rendering a swarm of a million obsidian daggers, memory must be conserved. Clojure's `memoize` acts as the ultimate Flyweight cache, ensuring that identical immutable objects are shared across references. Structural sharing does the heavy lifting under the hood of the JVM.
