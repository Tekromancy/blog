---
title: The Factory Method Effect
description: A creational incantation delegating the instantiation of magical entities to effect handlers.
type: koka
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  effect summoner
    ctl summon-familiar() : string
  
  fun fire-mage(action : () -> <summoner|e> a) : e a
    with handler
      ctl summon-familiar() resume("Fire Salamander")
    action()
  
  fun water-mage(action : () -> <summoner|e> a) : e a
    with handler
      ctl summon-familiar() resume("Water Undine")
    action()
  
  pub fun main()
    println(fire-mage { "Summoned: " ++ summon-familiar() })
    println(water-mage { "Summoned: " ++ summon-familiar() })
tags: [koka, factory-method, summoning, effects]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
