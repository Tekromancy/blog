---
title: The Bridge
description: Decoupling spell formulations from their physical elemental manifestations.
type: odin
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Dimensional Separation"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Implementor Interface (Element Manifestation)
  Element_API :: struct {
  	ignite:  proc(ctx: rawptr, power: int),
  	dissipate: proc(ctx: rawptr),
  }
  
  // Concrete Implementor: Fire
  Fire_Core :: struct {}
  fire_ignite :: proc(ctx: rawptr, power: int) { fmt.printf("Conjuring flames at %d degrees C.\n", power * 100) }
  fire_dissipate :: proc(ctx: rawptr) { fmt.println("Flames turn to ash.") }
  
  fire_api := Element_API{ignite = fire_ignite, dissipate = fire_dissipate}
  
  // Concrete Implementor: Plasma
  Plasma_Core :: struct {}
  plasma_ignite :: proc(ctx: rawptr, power: int) { fmt.printf("Superheating plasma to %d eV.\n", power * 1000) }
  plasma_dissipate :: proc(ctx: rawptr) { fmt.println("Plasma containment breached, dissipating.") }
  
  plasma_api := Element_API{ignite = plasma_ignite, dissipate = plasma_dissipate}
  
  // The Abstraction (Spell Formulation)
  Spell :: struct {
  	api: ^Element_API,
  	ctx: rawptr,
  }
  
  cast_fireball :: proc(spell: ^Spell, power: int) {
  	fmt.println("Chanting Fireball incantation...")
  	spell.api.ignite(spell.ctx, power)
  }
  
  end_spell :: proc(spell: ^Spell) {
  	spell.api.dissipate(spell.ctx)
  }
  
  main :: proc() {
  	fire_ctx := Fire_Core{}
  	classic_spell := Spell{api = &fire_api, ctx = &fire_ctx}
  	
  	plasma_ctx := Plasma_Core{}
  	cyber_spell := Spell{api = &plasma_api, ctx = &plasma_ctx}
  	
  	cast_fireball(&classic_spell, 5)
  	end_spell(&classic_spell)
  	
  	fmt.println("---")
  	
  	cast_fireball(&cyber_spell, 5)
  	end_spell(&cyber_spell)
  }
tags: [structural, odin, abstraction, vtable]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge

The Bridge pattern achieves a separation of dimensions: the abstract formulation of a spell remains distinct from its physical, elemental rendering. In Odin's data-oriented paradigms, we encapsulate the implementation inside an `API` struct containing function pointers (vtables). The structural abstraction (the spell) merely references this API. Thus, swapping a classic fire manifestation for a hyper-lethal plasma variant requires no alteration to the core incantation logic.
