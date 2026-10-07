---
title: The Observer
description: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
type: unison
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Resonance"
formula: |2
  type Observer a = a -> ()
  
  structural type Subject a = Subject a [Observer a]
  
  notifyObservers : Subject a -> ()
  notifyObservers sub = match sub with
    Subject state obs -> 
      List.map (o -> o state) obs
      ()
      
  -- Alternatively, using FRP or Abilities to broadcast state changes
  -- is more idiomatic in pure functional architectures.
tags: [behavioral, observer, unison, events, callbacks]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer pattern creates a resonant leyline between a subject and its watchers. In Unison, we can model this directly with lists of callback functions (the observers). When the subject's internal state shifts—resulting in a new immutable state—the notification function is triggered, propagating the echoes of the change to all attuned listeners.
