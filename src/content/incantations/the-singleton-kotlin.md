---
title: The Singleton Hex
description: The singular focal point of a magical realm.
type: kotlin
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Abjuration // Leyline
formula: |
  object LeylineNexus {
      var activeMana: Int = 1000
      
      fun tap() {
          if (activeMana > 0) activeMana -= 10
      }
  }
tags: [kotlin, creational, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Singleton Hex

Certain entities in the cyberscape can only exist once. The Leyline Nexus, the singular source of magical routing, cannot be duplicated without fracturing the JVM. Kotlin's `object` declaration provides a thread-safe, lazily-initialized Singleton out of the box, weaving an unbreakable ward against multiple instantiations.
