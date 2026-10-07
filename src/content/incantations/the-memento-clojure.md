---
title: The Memento Incantation
description: Capturing and restoring the snapshot of a fragile arcane process.
type: clojure
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Restoration
formula: |
  (ns tekromancy.memento)
  
  ;; Immutability gives us Memento for free. We just hold onto old states.
  
  (def timeline (atom '()))
  (def state (atom {:hp 100 :mana 50}))
  
  (defn save-state! []
    (swap! timeline conj @state)
    (println "Timeline snapshot saved."))
  
  (defn mutate-state! [f]
    (save-state!)
    (swap! state f))
  
  (defn rewind! []
    (when-let [past (first @timeline)]
      (reset! state past)
      (swap! timeline rest)
      (println "Rewound to past state:" @state)))
  
  ;; Usage:
  ;; (mutate-state! #(assoc % :hp 10))
  ;; (rewind!)
tags: [behavioral, memento, clojure, state-management]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Time magic is trivial when the timeline is built of Immutable Glyphs. The Memento pattern is inherently solved in Clojure. Since maps cannot be modified in place, saving the past is merely keeping a reference to it. Rewinding time is just pointing the world atom back to a previous epoch.
