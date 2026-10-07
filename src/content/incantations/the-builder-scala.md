---
title: The Builder Array
description: Construct complex magical constructs step-by-step, separating the ritual script from its execution.
type: scala
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Golemancy
formula: |
  case class Golem(core: String, limbs: Int, runes: List[String])

  class GolemBuilder {
    private var core: String = "Clay"
    private var limbs: Int = 4
    private var runes: List[String] = List.empty

    def withCore(c: String): GolemBuilder = { this.core = c; this }
    def withLimbs(l: Int): GolemBuilder = { this.limbs = l; this }
    def withRune(r: String): GolemBuilder = { this.runes = this.runes :+ r; this }
    
    def awaken(): Golem = Golem(core, limbs, runes)
  }

  // Usage:
  // val adamantineGolem = new GolemBuilder()
  //   .withCore("Adamantine")
  //   .withLimbs(6)
  //   .withRune("Indestructibility")
  //   .awaken()
tags: [scala, creational, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Builder pattern allows you to progressively accumulate arcane energy and intent before solidifying it into an immutable `Golem` structure.
