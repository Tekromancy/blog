---
title: The Singleton Incantation
description: Ensuring only one instance of an arcane nexus exists across the JVM threadscape.
type: clojure
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Leylines"
formula: |2
  (ns tekromancy.singleton)

  ;; A `defonce` combined with a `delay` or atom provides thread-safe singletons

  (defonce arcane-nexus
    (delay (println "Initializing the Arcane Nexus...")
           {:energy 1000 :status :active}))

  (defn tap-nexus []
    @arcane-nexus)

  ;; Usage:
  ;; (tap-nexus) ; Initializes on first call, returns the same nexus on subsequent calls.
tags: [creational, singleton, clojure, concurrency]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Singleton in the JVM realm must survive the chaos of concurrent threads. By binding our nexus to a `delay` wrapped in a `defonce`, we guarantee that the complex initialization ritual is performed exactly once, granting all threads access to the same eternal fountain of mana.
