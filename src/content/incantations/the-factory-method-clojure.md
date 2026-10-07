---
title: The Factory Method Incantation
description: Delegating the instantiation of arcane constructs to specialized sigils.
type: clojure
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Spawning
formula: |
  (ns tekromancy.factory-method)
  
  (defmulti summon-familiar (fn [type] type))
  
  (defmethod summon-familiar :raven [_]
    {:creature :raven, :action "Scouts the astral plane."})
  
  (defmethod summon-familiar :shadow-cat [_]
    {:creature :shadow-cat, :action "Hunts in the void."})
  
  ;; Usage:
  ;; (summon-familiar :shadow-cat)
tags: [creational, factory-method, clojure, multimethods]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using Clojure's multimethods, the Factory Method becomes a dynamic ritual of dispatch. By examining the essence (type) of the request, the JVM transmutation engine dynamically summons the exact familiar required, completely decoupling the invocation from the instantiation.
