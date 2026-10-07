---
title: The Composite Hex
description: Treating individual entities and compositions of entities uniformly.
type: groovy
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Unity"
formula: |2
  interface Component { void execute() }

  class LeafSpell implements Component {
      String name
      void execute() { println "Executing $name" }
  }

  class MacroSpell implements Component {
      List<Component> spells = []

      void add(Component c) { spells << c }

      void execute() {
          println "Initiating Macro-Spell Sequence..."
          spells*.execute()
      }
  }

  def fire = new LeafSpell(name: "Fireball")
  def ice = new LeafSpell(name: "Frostbite")

  def ultimate = new MacroSpell()
  ultimate.add(fire)
  ultimate.add(ice)

  ultimate.execute()
tags: [groovy, structural, composite, spread-operator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite Hex

The Composite hex weaves tree structures where both the branch and the leaf conform to the exact same magical interface. Groovy's spread-dot operator (`*.`) shines here, allowing a MacroSpell to execute all its sub-components in a single fluid gesture, propagating the invocation cleanly through the hierarchy.
