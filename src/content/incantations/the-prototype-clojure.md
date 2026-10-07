---
title: The Prototype Incantation
description: Cloning immutable essences to spawn new manifestations.
type: clojure
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Cloning
formula: |
  (ns tekromancy.prototype)
  
  ;; In Clojure, prototypes are just immutable maps.
  ;; Cloning is merely merging or associating new values into an existing map.
  
  (def base-phantom
    {:health 100 :mana 50 :type :phantom})
  
  (defn spawn-mutated-phantom [prototype mutation]
    (merge prototype mutation))
  
  ;; Usage:
  ;; (def fire-phantom (spawn-mutated-phantom base-phantom {:type :fire-phantom :mana 100}))
tags: [creational, prototype, clojure, immutable-data]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Why cast a complex summoning spell when you can clone an existing essence? In the Lisp-like matrix, data is immutable, so "cloning" is practically instantaneous and memory-efficient via structural sharing. The Prototype pattern is effortlessly realized through map manipulations.
