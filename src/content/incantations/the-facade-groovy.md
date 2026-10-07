---
title: The Facade Hex
description: Providing a unified interface to a set of interfaces in a subsystem.
type: groovy
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Obfuscation"
formula: |2
  class ManaPool { void draw() { println "Drawing mana..." } }
  class SpellCompiler { void compile() { println "Compiling hex matrices..." } }
  class TargetMatrix { void lockOn() { println "Locking onto target..." } }

  class SpellFacade {
      def pool = new ManaPool()
      def compiler = new SpellCompiler()
      def matrix = new TargetMatrix()

      void cast() {
          pool.draw()
          compiler.compile()
          matrix.lockOn()
          println ">> BOOM <<"
      }
  }

  new SpellFacade().cast()
tags: [groovy, structural, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Facade Hex

Complexity is the enemy of a fast-moving street mage. When interacting with an archaic and convoluted sub-system of magical machinery, the Facade hex hides the chaos behind a single, elegant interface. Just call `cast()`, and let the facade handle the underlying mana flows, matrix compilations, and thread synchronization.
