---
title: The Flyweight Pattern
description: Minimizing mana consumption by sharing magical aspects.
type: swift
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Transmutation // Efficiency
formula: |
  class AppleTexture {
      let color: String
      init(color: String) { self.color = color }
  }
  class TextureFactory {
      private var cache: [String: AppleTexture] = [:]
      func getTexture(color: String) -> AppleTexture {
          if let t = cache[color] { return t }
          let t = AppleTexture(color: color)
          cache[color] = t
          return t
      }
  }
tags: [swift, design-pattern, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight: The Orchard Cache

By caching and sharing `AppleTexture`, the Flyweight pattern allows an enchanter to conjure thousands of apples without depleting their mana reserves.
