---
title: The Abstract Factory Incantation
description: A planar sigil for manifesting coherent families of elementals without binding to concrete elemental planes.
type: scala
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Planar Binding
formula: |
  sealed trait Elemental
  case class FireElemental(power: Int) extends Elemental
  case class WaterElemental(power: Int) extends Elemental

  trait ElementalFactory {
    def summonBasic(): Elemental
    def summonGreater(): Elemental
  }

  class FirePlaneFactory extends ElementalFactory {
    override def summonBasic(): Elemental = FireElemental(10)
    override def summonGreater(): Elemental = FireElemental(100)
  }

  class WaterPlaneFactory extends ElementalFactory {
    override def summonBasic(): Elemental = WaterElemental(10)
    override def summonGreater(): Elemental = WaterElemental(100)
  }

  object PlanarSummoner {
    def weave(factory: ElementalFactory): List[Elemental] = {
      List(factory.summonBasic(), factory.summonGreater())
    }
  }
tags: [scala, creational, pure-functional, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory isolates the pure functional magic of manifestation from the chaotic details of elemental origin. By leveraging Scala's powerful trait system, a thaumaturge ensures type-safe manifestations.
