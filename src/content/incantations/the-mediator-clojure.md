---
title: The Mediator Incantation
description: Centralizing complex communications between disparate magical artifacts.
type: clojure
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Illusion // Networking
formula: |
  (ns tekromancy.mediator
    (:require [clojure.core.async :as async]))
  
  ;; Core.async channels act as perfect Mediators.
  
  (def central-nexus (async/chan))
  
  (defn artifact-node [name]
    (async/go-loop []
      (when-let [msg (async/<! central-nexus)]
        (println name "received via Nexus:" msg)
        (recur))))
  
  ;; Usage:
  ;; (artifact-node "Eye of Truth")
  ;; (artifact-node "Amulet of Time")
  ;; (async/put! central-nexus "A demonic portal has opened!")
tags: [behavioral, mediator, clojure, core-async]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When artifacts scream at each other across threads, chaos reigns. The Mediator pattern silences the void by channeling all messages through a central `core.async` nexus. Independent nodes no longer need direct references to each other, communicating purely through the mediator channel.
