---
title: The Composite Pattern
description: Treating individual spells and spell combinations uniformly.
type: swift
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Illusion // Gestalt
formula: |
  protocol SpellComponent {
      func cast()
  }
  class SimpleSpell: SpellComponent {
      func cast() { print("Casting simple spell") }
  }
  class MacroSpell: SpellComponent {
      private var components: [SpellComponent] = []
      func add(_ component: SpellComponent) { components.append(component) }
      func cast() { components.forEach { $0.cast() } }
  }
tags: [swift, design-pattern, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite: The Macro Spell

With the Composite pattern, a magus can weave simple spells into a `MacroSpell`, executing them all with a single word of power.
