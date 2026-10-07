---
title: The Composite Incantation
description: Treating individual sigils and sprawling rune clusters uniformly.
type: clojure
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal"
formula: |2
  (ns tekromancy.composite)

  ;; Clojure's tree data structures are composites by nature.
  (defprotocol EvalRune
    (evaluate [_]))

  (defrecord LeafRune [power]
    EvalRune
    (evaluate [_] power))

  (defrecord ClusterRune [runes]
    EvalRune
    (evaluate [_]
      (reduce + (map evaluate runes))))

  ;; Usage:
  ;; (evaluate (->ClusterRune [(->LeafRune 10)
  ;;                           (->ClusterRune [(->LeafRune 20) (->LeafRune 5)])]))
tags: [structural, composite, clojure, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the arcane fractal geometry of the JVM, a single rune and a cluster of runes must react symmetrically to the caster's will. By defining a protocol and recursively applying it across both leaves and branches, the Composite pattern unfolds naturally, harnessing map-reduce pipelines.
