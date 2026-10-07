---
title: The Observer Pattern
description: Notifying multiple magical wards of a significant event.
type: swift
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Telepathy
formula: |
  protocol Observer: AnyObject {
      func update(threat: String)
  }
  class Watchtower {
      private var observers: [Observer] = []
      func add(_ observer: Observer) { observers.append(observer) }
      func alert(threat: String) {
          observers.forEach { $0.update(threat: threat) }
      }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer: The Watchtower's Warning

The Observer establishes a telepathic link where the `Watchtower` can notify multiple dependent wards of incoming threats instantly.
