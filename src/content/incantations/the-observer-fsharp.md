---
title: The Observer Leyline
description: Defining a one-to-many dependency so that when a core arcane node changes state, all connected wards are notified.
type: fsharp
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Leylines"
formula: |2
  open System

  // Idiomatic F# uses the built-in IObservable / IObserver or Events.
  type Leyline() =
      let surgeEvent = Event<int>()

      member _.OnSurge = surgeEvent.Publish

      member _.TriggerSurge(power) =
          printfn "Leyline pulsing with %d power!" power
          surgeEvent.Trigger(power)

  let centralLeyline = Leyline()

  // Scribe the wards (Observers)
  let ward1 = centralLeyline.OnSurge.Subscribe(fun p -> printfn "Ward 1 absorbed %d mana." p)
  let ward2 = centralLeyline.OnSurge.Subscribe(fun p -> printfn "Ward 2 glows brightly from %d mana." p)

  centralLeyline.TriggerSurge(500)

  // Unbinding wards
  ward1.Dispose()
  centralLeyline.TriggerSurge(200)
tags: [behavioral, observer, fsharp, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The CLR provides first-class support for the Observer pattern through `IObservable` and F#'s native `Event` system. This allows an archmage to wire wards and familiars to leylines using pure functional subscriptions.
