---
title: The Factory Method
description: Delegating the instantiation of arcane familiars through polymorphic creator procedures.
type: odin
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Familiar Binding"
formula: |2
  package main
  
  import "core:fmt"
  
  // Data for our familiars
  Familiar_Type :: enum {
  	Scout_Drone,
  	Mana_Hound,
  }
  
  Familiar :: struct {
  	name: string,
  	health: int,
  	mana: int,
  }
  
  // The Factory Method
  summon_familiar :: proc(ftype: Familiar_Type) -> Familiar {
  	switch ftype {
  	case .Scout_Drone:
  		return Familiar{name = "Optic Scout", health = 10, mana = 50}
  	case .Mana_Hound:
  		return Familiar{name = "Aether Hound", health = 80, mana = 20}
  	case:
  		return Familiar{name = "Unknown Entity", health = 1, mana = 1}
  	}
  }
  
  main :: proc() {
  	// A simple factory dispatch driven by enums—ideal for data-oriented programming
  	drone := summon_familiar(.Scout_Drone)
  	hound := summon_familiar(.Mana_Hound)
  	
  	fmt.printf("Summoned %s (HP: %d, MP: %d)\n", drone.name, drone.health, drone.mana)
  	fmt.printf("Summoned %s (HP: %d, MP: %d)\n", hound.name, hound.health, hound.mana)
  }
tags: [creational, odin, enums, data-oriented]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Factory Method

In traditional OOP, the Factory Method relies on subclassing to override creation behavior. In the brutal logic of Odin's data-oriented divination, we rely on Enums and switch statements to route creation logic. This minimizes indirection, groups data definitions together, and simplifies the binding of synthetic familiars into the corporeal plane.
