---
title: The Observer Hex
description: Subscribing to mystical ripples in the aether.
type: kotlin
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  interface Scryer {
      fun onEvent(event: String)
  }
  
  class CrystalBall {
      private val scryers = mutableListOf<Scryer>()
      
      fun register(s: Scryer) = scryers.add(s)
      fun triggerEvent(event: String) {
          scryers.forEach { it.onEvent(event) }
      }
  }
  
  // Pragmatic approach: Kotlin flows are the modern incarnation
tags: [kotlin, behavioral, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Observer Hex

When the ley lines shift, all bonded entities must know immediately. The Observer Hex establishes a pub-sub matrix where subjects broadcast events to a list of registered dependents. While the classic pattern is robust, modern Kotlin archmages typically utilize Kotlin Flow or RxJava for reactive stream mastery.
