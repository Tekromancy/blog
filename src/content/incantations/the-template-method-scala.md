---
title: The Template Method Skeleton
description: Define the unyielding skeleton of a grand ritual, letting apprentices fill in the specific elemental steps.
type: scala
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Evocation // Rituals
formula: |
  abstract class GrandRitual {
    // The Template Method
    final def perform(): Unit = {
      drawCircle()
      chant()
      ignite()
    }

    private def drawCircle(): Unit = println("Drawing salt circle...")
    
    // Steps to be implemented by subclasses
    def chant(): Unit
    def ignite(): Unit
  }

  class FireRitual extends GrandRitual {
    def chant(): Unit = println("Chanting the words of ember.")
    def ignite(): Unit = println("Flames erupt!")
  }
tags: [scala, behavioral, ritual-structure]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Inversion of Control. The base `GrandRitual` calls the subclass's implementations, ensuring the dangerous sequence of the ritual cannot be reordered by a novice.
