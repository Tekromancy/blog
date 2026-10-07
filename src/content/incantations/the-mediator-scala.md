---
title: The Mediator Nexus
description: Prevent elemental factions from destroying each other by routing their communications through a central hub.
type: scala
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Binding
formula: |
  trait Council {
    def broadcast(message: String, sender: Archmage): Unit
  }

  class Archmage(val name: String, council: Council) {
    def speak(msg: String): Unit = council.broadcast(msg, this)
    def hear(msg: String): Unit = println(s"$name hears: $msg")
  }

  class HighCouncil extends Council {
    private var mages = List.empty[Archmage]
    
    def register(mage: Archmage): Unit = mages = mages :+ mage
    
    def broadcast(message: String, sender: Archmage): Unit = {
      mages.filterNot(_ == sender).foreach(_.hear(message))
    }
  }
tags: [scala, behavioral, binding, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Mediator centralizes complex communications. Instead of a chaotic web of Mages shouting at one another, the HighCouncil guarantees orderly resolution.
