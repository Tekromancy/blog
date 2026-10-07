---
title: The Composite Hex
description: Treating single artifacts and chaotic swarms identically.
type: kotlin
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Conjuration // Swarm
formula: |
  interface MagicalEntity {
      fun trigger()
  }
  
  class Sigil : MagicalEntity {
      override fun trigger() = println("Sigil flashes")
  }
  
  class RuneCluster : MagicalEntity {
      private val entities = mutableListOf<MagicalEntity>()
      
      fun add(entity: MagicalEntity) = entities.add(entity)
      
      override fun trigger() {
          entities.forEach { it.trigger() }
      }
  }
tags: [kotlin, structural, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite Hex

In the neon-lit astal plane, a single sigil and a massive cluster of runes should be invocable via the exact same command. The Composite hex aligns single nodes and complex branches into a unified interface tree, allowing spells to cascade recursively through the hierarchy with null-safe precision.
