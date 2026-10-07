---
title: The Observer Incantation
description: Watching the shifting tides of state and reacting in real-time.
type: clojure
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  (ns tekromancy.observer)
  
  (def ancient-obelisk (atom {:status :dormant}))
  
  ;; Clojure's `add-watch` is the built-in Observer pattern.
  
  (add-watch ancient-obelisk :cultist-watcher
             (fn [key ref old-state new-state]
               (when (not= (:status old-state) (:status new-state))
                 (println "The Obelisk shifted to:" (:status new-state)))))
  
  ;; Usage:
  ;; (swap! ancient-obelisk assoc :status :glowing)
tags: [behavioral, observer, clojure, atoms, watches]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Scrying the exact moment an artifact alters its state is critical. The Observer pattern in Clojure is fully integrated into its state management. By affixing an `add-watch` to an atom, your function is immediately notified whenever the JVM transmutation causes the reference to swap values.
