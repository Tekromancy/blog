---
title: The State Incantation
description: Altering an entity's behavior as its internal energy matrix changes.
type: clojure
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Shifting
formula: |
  (ns tekromancy.state)
  
  (defmulti attack :stance)
  
  (defmethod attack :offensive [_]
    "Swings wildly with reckless abandon!")
  
  (defmethod attack :defensive [_]
    "Strikes carefully from behind a shield.")
  
  (defmethod attack :berserk [_]
    "Roars and cleaves everything in sight!")
  
  (defn change-stance [entity new-stance]
    (assoc entity :stance new-stance))
  
  ;; Usage:
  ;; (def warrior {:stance :defensive})
  ;; (attack warrior)
  ;; (attack (change-stance warrior :berserk))
tags: [behavioral, state, clojure, multimethods]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
As a spellcaster shifts stances, their very nature changes. Polymorphism handles this flawlessly. Using multimethods dispatched on a state key within a map, an entity behaves dynamically based on its internal state, encapsulating the transitions without massive conditional chains.
