---
title: "The Observer: The Omniscient Eye"
description: "A one-to-many dependency where watchers are immediately notified of a dimensional shift."
type: idris
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying-Nets"
formula: |2
  module Observer
  
  -- Observer
  ObserverFunc : Type
  ObserverFunc = String -> String
  
  watchTower : ObserverFunc
  watchTower event = "Watchtower recorded: " ++ event
  
  -- Subject
  record LeylineNexus where
    constructor MkNexus
    observers : List ObserverFunc
  
  addObserver : ObserverFunc -> LeylineNexus -> LeylineNexus
  addObserver obs (MkNexus obss) = MkNexus (obs :: obss)
  
  triggerShift : String -> LeylineNexus -> List String
  triggerShift event (MkNexus obss) = map (\f => f event) obss
tags: [behavioral, event-driven, reactive-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer pattern builds an omniscient scrying net. When the `LeylineNexus` experiences a dimensional tremor, it cascades the event to all registered `ObserverFunc` sentinels. The Theorem Proving Pacts are perfectly suited for this, utilizing lists of pure functions mapped over events. The network is completely decoupled, ensuring the Nexus remains ignorant of who—or what—is watching from the shadows.
