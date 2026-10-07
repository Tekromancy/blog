---
title: The Strategy Incantation
description: Hot-swapping combat algorithms dynamically within the ether.
type: clojure
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  (ns tekromancy.strategy)

  ;; Strategies are just first-class functions passed as arguments.

  (defn aggressive-strategy [target]
    (str "Casting Fireball directly at " target))

  (defn stealth-strategy [target]
    (str "Invisibly placing a trap near " target))

  (defn execute-assassination [target strategy-fn]
    (println "Initiating plan...")
    (println (strategy-fn target)))

  ;; Usage:
  ;; (execute-assassination "The Baron" stealth-strategy)
tags: [behavioral, strategy, clojure, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Tactical logic must be modular. In a functional paradigm, the Strategy pattern disappears entirely, replaced by first-class functions. By simply passing the desired algorithmic rune as an argument to an executor, strategies are seamlessly injected and swapped at runtime.
