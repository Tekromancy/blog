---
title: The Abstract Factory Hex
description: A creational hex using algebraic effects to summon families of related magical artifacts without specifying their concrete origins.
type: koka
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  effect factory
    ctl create-wand() : string
    ctl create-robe() : string
  
  fun high-elf-factory(action : () -> <factory|e> a) : e a
    with handler
      ctl create-wand() resume("Elven Crystal Wand")
      ctl create-robe() resume("Silken Star Robe")
    action()
  
  fun dark-elf-factory(action : () -> <factory|e> a) : e a
    with handler
      ctl create-wand() resume("Obsidian Shadow Wand")
      ctl create-robe() resume("Spider-silk Cloak")
    action()
  
  fun equip-mage() : factory string
    val wand = create-wand()
    val robe = create-robe()
    "Equipped: " ++ wand ++ " and " ++ robe
  
  pub fun main()
    println("High Elf:")
    println(high-elf-factory(equip-mage))
    println("Dark Elf:")
    println(dark-elf-factory(equip-mage))
tags: [koka, creational, abstract-factory, algebraic-effects, hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
