---
title: The Bridge Hex
description: Decoupling an abstraction from its implementation so both can vary independently.
type: groovy
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Dimensional Rift"
formula: |2
  interface MagicEngine {
      void channel()
  }

  class ArcaneEngine implements MagicEngine {
      void channel() { println "Channeling arcane ley-lines..." }
  }

  class CyberEngine implements MagicEngine {
      void channel() { println "Processing cyber-neural streams..." }
  }

  abstract class SpellConstruct {
      protected MagicEngine engine
      SpellConstruct(MagicEngine engine) { this.engine = engine }
      abstract void ignite()
  }

  class AttackSpell extends SpellConstruct {
      AttackSpell(MagicEngine e) { super(e) }
      void ignite() {
          print "Attack Spell: "
          engine.channel()
      }
  }

  new AttackSpell(new CyberEngine()).ignite()
tags: [groovy, structural, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge Hex

The Bridge hex splits a monolithic construct into two orthogonal dimensions: the abstraction (the Spell) and the implementation (the Engine). A cyber-mage can swap engines on the fly, empowering their constructs with either arcane or technological forces without altering the spell's core architecture.
