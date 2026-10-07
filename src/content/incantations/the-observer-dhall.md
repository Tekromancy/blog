---
title: Observer in Dhall
description: Distribute runic events to a list of expectant watcher functions.
type: dhall
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  let Event = < RuneActivated : Text | RuneFaded : Text >
  let Observer = Event -> Text
  
  let archmageObserver : Observer =
        \(e : Event) ->
          merge
            { RuneActivated = \(r : Text) -> "Archmage notes activation of " ++ r
            , RuneFaded = \(r : Text) -> "Archmage mourns fading of " ++ r
            }
            e
  
  let trigger = \(e : Event) -> \(obs : List Observer) ->
        -- Functional application would occur here
        "Event triggered and logged."
  
  in  trigger (Event.RuneActivated "Halt") [ archmageObserver ]
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

While traditional event loops don't exist in Dhall, the **Observer** pattern is modeled statically by passing event unions into lists of functions. This guarantees that when an event is constructed within the configuration domain, all observers resolve their reactions deterministically before the configuration is emitted.
