---
title: The Flyweight Hex
description: Caching intrinsic mystical states to prevent mana exhaustion.
type: kotlin
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Abjuration // Efficiency
formula: |
  class RuneTexture(val color: String, val glow: Boolean)
  
  object TextureCache {
      private val cache = mutableMapOf<String, RuneTexture>()
      
      fun getTexture(color: String): RuneTexture {
          return cache.getOrPut(color) {
              println("Generating new texture for $color")
              RuneTexture(color, true)
          }
      }
  }
  
  class RenderedRune(val x: Int, val y: Int, val texture: RuneTexture)
tags: [kotlin, structural, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Flyweight Hex

Summoning ten thousand runes onto the sensory field will quickly drain the JVM's heap memory, leading to catastrophic garbage collection freezes. The Flyweight Hex stores intrinsic, immutable properties in a shared cache. Only the extrinsic coordinates are unique, ensuring maximum efficiency and minimal mana bleed.
