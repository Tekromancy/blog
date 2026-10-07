---
title: The Abstract Factory Hex
description: Forging families of arcane JVM artifacts without specifying concrete classes.
type: groovy
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifactmancy"
formula: |2
  interface Weapon { void strike() }
  interface Armor { void defend() }

  interface Forge {
      Weapon craftWeapon()
      Armor craftArmor()
  }

  class CyberForge implements Forge {
      Weapon craftWeapon() { return { println "Firing plasma beam!" } as Weapon }
      Armor craftArmor() { return { println "Deploying energy shield!" } as Armor }
  }

  class EtherForge implements Forge {
      Weapon craftWeapon() { return { println "Casting ethereal strike!" } as Weapon }
      Armor craftArmor() { return { println "Phasing out of reality!" } as Armor }
  }

  def equipAndFight(Forge forge) {
      def w = forge.craftWeapon()
      def a = forge.craftArmor()
      w.strike()
      a.defend()
  }

  equipAndFight(new CyberForge())
tags: [groovy, creational, abstract-factory, jvm-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Abstract Factory Hex

By wielding the Abstract Factory hex, an adept can generate entire ecosystems of related arcane artifacts. In the JVM cyber-realm, relying on interfaces and Groovy's map/closure coercion (`as Interface`) allows for rapid manifestation of toolsets without hardcoding concrete implementation bindings.
