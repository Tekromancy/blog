---
title: The Singleton Nexus
description: Ensures a single, globally accessible focal point of magical energy.
type: scala
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Warding"
formula: |2
  // Scala provides native Singletons via the `object` keyword.
  object LeyLineNexus {
    private var energyLevel: Int = 1000

    def drawEnergy(amount: Int): Boolean = {
      if (energyLevel >= amount) {
        energyLevel -= amount
        true
      } else false
    }

    def currentEnergy: Int = energyLevel
  }

  // Usage:
  // LeyLineNexus.drawEnergy(50)
tags: [scala, creational, nexus, native]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
No complex double-checked locking is required here. The `object` declaration is a native construct, manifesting exactly one instance within the JVM's arcane void.
