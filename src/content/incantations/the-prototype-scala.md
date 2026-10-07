---
title: The Prototype Clone
description: Duplicate complex magical states without re-casting the entire initialization spell.
type: scala
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Duplication
formula: |
  case class SpellMatrix(runes: Vector[String], potency: Double) {
    // Scala case classes inherently provide a highly efficient `copy` method, 
    // effectively acting as the Prototype pattern organically.
    def cloneMatrix(newPotency: Double = this.potency): SpellMatrix = {
      this.copy(potency = newPotency)
    }
  }

  // Usage:
  // val fireball = SpellMatrix(Vector("Ignis", "Projicio"), 50.0)
  // val greaterFireball = fireball.cloneMatrix(100.0)
tags: [scala, creational, illusion, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In Scala, pure functional magic gives us case classes. The `copy` method is the ultimate Prototype implementation, offering type-safe alchemy to spin up new constructs from existing templates.
