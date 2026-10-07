---
title: The Observer Scrying
description: Allow a legion of scrying orbs to automatically react when a distant leyline surges.
type: scala
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  trait ScryingOrb {
    def onLeylineSurge(power: Int): Unit
  }

  class Leyline {
    private var orbs = List.empty[ScryingOrb]
    
    def bind(orb: ScryingOrb): Unit = orbs = orb :: orbs
    
    def surge(power: Int): Unit = {
      println(s"Leyline surges with power $power!")
      orbs.foreach(_.onLeylineSurge(power))
    }
  }

  class DarkOrb extends ScryingOrb {
    def onLeylineSurge(power: Int): Unit = println(s"DarkOrb gleans $power souls.")
  }
tags: [scala, behavioral, divination, pub-sub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The standard publish-subscribe model of the arcane world. The Leyline remains ignorant of who watches it, maintaining loose coupling.
