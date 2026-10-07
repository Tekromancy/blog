---
title: The Chain of Responsibility Incantation
description: Passing a spell's payload through a sequence of protective wards.
type: clojure
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Abjuration // Chaining
formula: |
  (ns tekromancy.chain-of-responsibility)
  
  (defn ward-of-fire [req]
    (if (= (:type req) :fire)
      (println "Ward of Fire absorbed the attack.")
      req))
  
  (defn ward-of-ice [req]
    (if (= (:type req) :ice)
      (println "Ward of Ice absorbed the attack.")
      req))
  
  (defn final-impact [req]
    (when (map? req)
      (println "Direct hit! Damage taken:" (:power req))))
  
  (defn create-chain [& handlers]
    (fn [request]
      (reduce (fn [acc handler]
                (if (map? acc)
                  (handler acc)
                  (reduced acc)))
              request
              handlers)))
  
  ;; Usage:
  ;; (def defense-grid (create-chain ward-of-fire ward-of-ice final-impact))
  ;; (defense-grid {:type :ice :power 50})
tags: [behavioral, chain-of-responsibility, clojure, functional-composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An attack hurtling through the ether must be vetted by multiple wards. The Chain of Responsibility is forged via `reduce` over a sequence of functions. If a ward neutralizes the threat, it short-circuits via `reduced`; otherwise, the dark energy passes down the chain.
