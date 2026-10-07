---
title: The Factory Method Hex
description: Deferring the manifestation of entities to the subclasses.
type: kotlin
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Summoning
formula: |
  sealed class Familiar
  class Raven : Familiar()
  class Cat : Familiar()
  
  abstract class Summoner {
      abstract fun summon(): Familiar
      fun bind() {
          val familiar = summon()
          println("Binding ${familiar::class.simpleName} to the soul...")
      }
  }
  
  class ShadowSummoner : Summoner() {
      override fun summon() = Raven()
  }
tags: [kotlin, creational, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Factory Method Hex

When a Summoner calls into the aether, they know not exactly which familiar will heed the call. By utilizing the Factory Method, we defer the exact instantiation logic to specialized covens. Combined with Kotlin's sealed classes, we ensure our summoned entities are strictly bounded within the known magical taxonomies.
