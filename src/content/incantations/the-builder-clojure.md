---
title: The Builder Incantation
description: Constructing complex immutable constructs step by step using thread-first sigils.
type: clojure
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Constructmancy"
formula: |2
  (ns tekromancy.builder)

  ;; In Clojure, the Builder pattern is often replaced by immutable maps
  ;; and the thread-first macro (->) to accumulate state naturally.

  (defn create-golem []
    {:type :clay, :power 10, :runes []})

  (defn bind-rune [golem rune]
    (update golem :runes conj rune))

  (defn empower [golem power-boost]
    (update golem :power + power-boost))

  (defn animate [golem]
    (assoc golem :status :animated))

  ;; Usage:
  ;; (-> (create-golem)
  ;;     (bind-rune :fire)
  ;;     (bind-rune :speed)
  ;;     (empower 50)
  ;;     (animate))
tags: [creational, builder, clojure, immutable-glyphs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
To construct a golem from raw ether, one does not mutate it. Instead, the Builder pattern flows through the thread-first sigil (`->`), sequentially weaving new aspects into an immutable entity until it is fully realized and animated.
