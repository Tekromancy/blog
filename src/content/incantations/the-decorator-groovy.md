---
title: The Decorator Hex
description: Dynamically attaching additional responsibilities to an object via Traits and MetaClass.
type: groovy
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  interface Artifact { String getDescription() }

  class BaseSword implements Artifact {
      String getDescription() { return "Steel Sword" }
  }

  // Using Groovy Traits for dynamic decoration
  trait Flaming {
      String getDescription() { return super.getDescription() + " of Flames" }
  }

  trait Cursed {
      String getDescription() { return "Cursed " + super.getDescription() }
  }

  def sword = new BaseSword()
  def magicSword = sword.withTraits(Flaming, Cursed)

  println magicSword.getDescription()
tags: [groovy, structural, decorator, traits, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Decorator Hex

While ancient traditions require passing objects into wrapper classes to decorate them, Groovy allows an Archmage to attach traits at runtime via `withTraits`. This profoundly shifts the Decorator pattern from a structural compile-time chore into a dynamic, meta-object enhancement ritual. Apply elemental damage to your swords instantly as they are drawn!
