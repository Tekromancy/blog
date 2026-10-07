---
title: The Factory Method Ritual
description: Defer the instantiation of magical entities to subclasses via a sealed contract.
type: scala
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Summoning
formula: |
  sealed trait Familiar { def speak(): String }
  case class Raven() extends Familiar { def speak() = "Nevermore" }
  case class Cat() extends Familiar { def speak() = "Meow" }

  trait SummoningCircle {
    def manifestFamiliar(): Familiar // The Factory Method
    
    def performRitual(): String = {
      val familiar = manifestFamiliar()
      s"The ritual completes, and the familiar says: ${familiar.speak()}"
    }
  }

  class DarkCircle extends SummoningCircle {
    override def manifestFamiliar(): Familiar = Raven()
  }

  class HearthCircle extends SummoningCircle {
    override def manifestFamiliar(): Familiar = Cat()
  }
tags: [scala, creational, summoning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
This incantation outlines a blueprint where the exact type of Familiar spawned is left to the specialized SummoningCircle, ensuring strict polymorphic consistency.
