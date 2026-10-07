---
title: The Flyweight Particles
description: Share intrinsic magically dense data across millions of spectral constructs to save memory.
type: scala
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarming"
formula: |2
  // Intrinsic State
  case class SpectralCore(color: String, baseDamage: Int)

  // Flyweight Factory
  object CoreSynthesizer {
    private var cache: Map[String, SpectralCore] = Map()

    def getCore(color: String): SpectralCore = {
      cache.getOrElse(color, {
        val newCore = SpectralCore(color, if (color == "Red") 10 else 5)
        cache += (color -> newCore)
        newCore
      })
    }
  }

  // Extrinsic State
  case class Wisp(x: Double, y: Double, core: SpectralCore) {
    def render(): Unit = println(s"Wisp at $x, $y glowing ${core.color}")
  }
tags: [scala, structural, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Flyweight prevents arcane memory leaks by caching and sharing the heavy intrinsic cores of identical summoned entities.
