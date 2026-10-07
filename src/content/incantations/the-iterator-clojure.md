---
title: The Iterator Incantation
description: Transversing an infinite expanse of void energy sequentially.
type: clojure
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Sequencing
formula: |
  (ns tekromancy.iterator)
  
  ;; Sequences (seqs) are Clojure's core Iterator abstraction.
  
  (def infinite-mana-pool (iterate inc 0))
  
  (defn draw-mana [pool amount]
    (take amount pool))
  
  ;; Usage:
  ;; (draw-mana infinite-mana-pool 5) ; => (0 1 2 3 4)
  
  ;; Transducers provide high-performance, stateless iteration:
  (def xform (comp (filter even?) (map #(* % 10))))
  
  ;; (into [] xform (range 10))
tags: [behavioral, iterator, clojure, sequences, transducers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Lisp sequence abstraction (`ISeq`) is the Iterator pattern ascended to godhood. It can seamlessly traverse infinite streams of magical energy via lazy evaluation. Transducers push this further, allowing you to compose iterative transformations completely decoupled from their collections.
