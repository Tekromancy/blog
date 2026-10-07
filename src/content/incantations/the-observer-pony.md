---
title: The Observer Ward
description: Subscribing to mystical emanations.
type: pony
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Omniscience"
formula: |2
  interface tag Watcher
    be update(event: String val)

  actor Oracle
    let _watchers: Array[Watcher] = Array[Watcher]
    be attach(w: Watcher) => _watchers.push(w)
    be trigger(event: String val) =>
      for w in _watchers.values() do w.update(event) end
tags: [pony, observer, actor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Observer Ward

Using actors and tag interfaces, Observers receive asynchronous events without risking cross-thread mutation.
