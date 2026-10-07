---
title: The Proxy Hex
description: A spectral stand-in for a resource-heavy arcane entity.
type: kotlin
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Illusion // Phantasm
formula: |
  interface Grimoire {
      fun readSecret(): String
  }
  
  class AncientGrimoire : Grimoire {
      init { println("Loading heavy grimoire into memory...") }
      override fun readSecret() = "The ultimate truth"
  }
  
  class GrimoireProxy : Grimoire {
      private val realGrimoire by lazy { AncientGrimoire() }
      
      override fun readSecret(): String {
          println("Checking clearance...")
          return realGrimoire.readSecret()
      }
  }
tags: [kotlin, structural, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy Hex

Some entities are too massive, too dangerous, or too remote to interact with directly. The Proxy Hex creates a spectral duplicate that manages access. By leveraging Kotlin's `by lazy` delegate, the proxy ensures the true entity is only summoned precisely when its secrets are demanded, optimizing startup times in the grid.
