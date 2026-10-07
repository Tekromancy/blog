---
title: The Singleton Pattern
description: A unique, solitary source of arcane power.
type: swift
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Abjuration // Leyline
formula: |
  class LeylineNexus {
      static let shared = LeylineNexus()
      private init() {}
      func channelPower() -> String { return "Channeling nexus power..." }
  }
tags: [swift, design-pattern, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Singleton: The Leyline Nexus

In Swift, the Singleton is safely invoked using a `static let` property, ensuring thread-safe instantiation of the unique `LeylineNexus`.
