---
title: The Builder Hex
description: Step-by-step assembly of complex magical constructs.
type: kotlin
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Conjuration // Artifice
formula: |
  class Golem private constructor(
      val core: String,
      val armor: String?,
      val weapon: String?
  ) {
      data class Builder(
          var core: String = "Mud",
          var armor: String? = null,
          var weapon: String? = null
      ) {
          fun core(core: String) = apply { this.core = core }
          fun armor(armor: String) = apply { this.armor = armor }
          fun weapon(weapon: String) = apply { this.weapon = weapon }
          fun build() = Golem(core, armor, weapon)
      }
  }
  
  // Kotlin's pragmatic alternative: DSL approach
  class ModernGolem(val core: String, val armor: String? = null, val weapon: String? = null)
tags: [kotlin, creational, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Builder Hex

Constructing a Golem requires precise incantations. One missed syllable, and the null-void consumes the construct. The Builder pattern offers a fluent, null-safe rune structure. Though Kotlin's named arguments and default parameters often render ancient builders obsolete, the classical Builder remains a powerful ward for complex initialization sequences.
