---
title: The Adapter Conduit
description: Translates arcane frequencies from an incompatible artifact into a standard mana interface.
type: scala
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Resonance"
formula: |2
  trait StandardManaInterface {
    def channelMana(amount: Int): String
  }

  // The incompatible legacy artifact
  class AncientElvenCrystal {
    def elvenChannel(intensity: Double, purity: String): String = {
      s"Channeling at $intensity with $purity purity."
    }
  }

  // The Adapter
  class CrystalAdapter(crystal: AncientElvenCrystal) extends StandardManaInterface {
    override def channelMana(amount: Int): String = {
      val intensity = amount.toDouble / 10.0
      crystal.elvenChannel(intensity, "High")
    }
  }

  // Usage via Scala 3 given/using or implicit classes could also work.
tags: [scala, structural, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Adapter wraps ancient, incompatible code, forcing it to implement a modern interface. Perfect for integrating chaotic, forgotten magics into structured, type-safe environments.
