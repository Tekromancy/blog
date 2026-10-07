---
title: The Builder
description: Constructing complex cyber-runic structures step-by-step through data-oriented pipelines.
type: odin
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Runic Architecture"
formula: |2
  package main
  
  import "core:fmt"
  
  // The complex structure to be built
  Cyber_Golem :: struct {
  	chassis:  string,
  	core:     string,
  	weaponry: [dynamic]string,
  }
  
  // The Builder context
  Golem_Builder :: struct {
  	golem: Cyber_Golem,
  }
  
  init_builder :: proc() -> Golem_Builder {
  	return Golem_Builder{
  		golem = Cyber_Golem{
  			weaponry = make([dynamic]string),
  		},
  	}
  }
  
  set_chassis :: proc(b: ^Golem_Builder, chassis: string) -> ^Golem_Builder {
  	b.golem.chassis = chassis
  	return b
  }
  
  set_core :: proc(b: ^Golem_Builder, core: string) -> ^Golem_Builder {
  	b.golem.core = core
  	return b
  }
  
  add_weapon :: proc(b: ^Golem_Builder, weapon: string) -> ^Golem_Builder {
  	append(&b.golem.weaponry, weapon)
  	return b
  }
  
  build :: proc(b: ^Golem_Builder) -> Cyber_Golem {
  	// A true builder might validate before returning
  	return b.golem
  }
  
  destroy_golem :: proc(g: ^Cyber_Golem) {
  	delete(g.weaponry)
  }
  
  main :: proc() {
  	builder := init_builder()
  	
  	// Fluent-style pipelining
  	add_weapon(
  		add_weapon(
  			set_core(
  				set_chassis(&builder, "Titanium Frame"), 
  				"Plasma Reactor"
  			), 
  			"Laser Gatling"
  		), 
  		"EMP Launcher"
  	)
  	
  	golem := build(&builder)
  	defer destroy_golem(&golem)
  	
  	fmt.printf("Deployed Golem:\n Chassis: %s\n Core: %s\n Weapons: %v\n", golem.chassis, golem.core, golem.weaponry)
  }
tags: [creational, odin, pipelines, data-oriented]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Builder

When forging massive entities like the Cyber-Golems of the Outer Wastes, constructing them in a single incantation leads to chaotic allocations and misaligned runic matrices. The Builder pattern orchestrates step-by-step assembly, passing pointers to a mutable context. In Odin, this can take the shape of fluent-style procedure chaining, ensuring the data is progressively and safely molded before the final `build` seal is broken.
