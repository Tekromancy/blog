---
title: The Abstract Factory
description: A grimoire of data-oriented divination for generating planar artifacts of varying alignments.
type: odin
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Planar Smithing"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Arcane Interface for Artifacts
  Weapon :: struct {
  	name: string,
  	damage: int,
  }
  
  Armor :: struct {
  	name: string,
  	defense: int,
  }
  
  // The Abstract Factory of Forges
  Forge_VTable :: struct {
  	craft_weapon: proc(ctx: rawptr) -> Weapon,
  	craft_armor:  proc(ctx: rawptr) -> Armor,
  }
  
  Forge :: struct {
  	vtable: ^Forge_VTable,
  	ctx:    rawptr,
  }
  
  // --- Cyber-Necromancy Forge ---
  Cyber_Necro_Forge :: struct {
  	soul_charge: int,
  }
  
  cyber_necro_vtable := Forge_VTable{
  	craft_weapon = proc(ctx: rawptr) -> Weapon {
  		return Weapon{"Neon Scythe", 50}
  	},
  	craft_armor = proc(ctx: rawptr) -> Armor {
  		return Armor{"Bone-Plated Cyber Jacket", 25}
  	},
  }
  
  // --- Celestial Tech Forge ---
  Celestial_Tech_Forge :: struct {
  	light_frequency: f32,
  }
  
  celestial_tech_vtable := Forge_VTable{
  	craft_weapon = proc(ctx: rawptr) -> Weapon {
  		return Weapon{"Photon Blade", 45}
  	},
  	craft_armor = proc(ctx: rawptr) -> Armor {
  		return Armor{"Aura Shielding", 40}
  	},
  }
  
  // Divination execution
  main :: proc() {
  	necro_forge_data := Cyber_Necro_Forge{soul_charge = 100}
  	necro_forge := Forge{vtable = &cyber_necro_vtable, ctx = &necro_forge_data}
  	
  	tech_forge_data := Celestial_Tech_Forge{light_frequency = 440.0}
  	tech_forge := Forge{vtable = &celestial_tech_vtable, ctx = &tech_forge_data}
  	
  	forges := []Forge{necro_forge, tech_forge}
  	
  	for forge in forges {
  		weapon := forge.vtable.craft_weapon(forge.ctx)
  		armor := forge.vtable.craft_armor(forge.ctx)
  		fmt.printf("Forged: %s and %s\n", weapon.name, armor.name)
  	}
  }
tags: [creational, odin, polymorphism, data-oriented]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory

In the neon-drenched sub-levels of the Spire, data-oriented divination requires rigid schemas for generating planar artifacts. The Abstract Factory pattern in Odin is not implemented via heavy OOP hierarchies, but rather through struct composition and explicit vtables. This ensures cache locality and transparent memory layouts while allowing polymorphous item generation across different planar alignments (e.g., Cyber-Necromancy vs. Celestial Tech). By divorcing data from behavior, the technomancer crafts with unparalleled performance.
