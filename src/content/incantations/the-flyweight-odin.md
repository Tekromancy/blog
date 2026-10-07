---
title: The Flyweight
description: Packing legions of summoned particles into dense, cache-friendly data lines.
type: odin
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Memory Compression"
formula: |2
  package main
  
  import "core:fmt"
  
  // Intrinsic State (Shared, Immutable)
  Particle_Model :: struct {
  	sprite_id:  u32,
  	base_color: u32,
  	mass:       f32,
  }
  
  // The Factory for Flyweights
  Particle_Factory :: struct {
  	models: map[string]^Particle_Model,
  }
  
  get_model :: proc(factory: ^Particle_Factory, name: string, sprite_id: u32, base_color: u32, mass: f32) -> ^Particle_Model {
  	if name not_in factory.models {
  		new_model := new(Particle_Model)
  		new_model.sprite_id = sprite_id
  		new_model.base_color = base_color
  		new_model.mass = mass
  		factory.models[name] = new_model
  		fmt.printf("Minted new intrinsic model for %s.\n", name)
  	}
  	return factory.models[name]
  }
  
  // Extrinsic State (Unique per instance, tightly packed)
  Particle_Instance :: struct {
  	x, y, z: f32,
  	velocity: f32,
  	model: ^Particle_Model,
  }
  
  main :: proc() {
  	factory := Particle_Factory{models = make(map[string]^Particle_Model)}
  	
  	// A storm of 10,000 embers
  	storm_size :: 10000
  	embers := make([]Particle_Instance, storm_size)
  	
  	ember_model := get_model(&factory, "Ember", 0x1A, 0xFF4500, 0.01)
  	
  	// We reuse the same model pointer for all 10,000 instances
  	for i in 0..<storm_size {
  		embers[i] = Particle_Instance{
  			x = f32(i % 100),
  			y = f32(i / 100),
  			z = 0,
  			velocity = 5.0,
  			model = ember_model,
  		}
  	}
  	
  	fmt.printf("Summoned a storm of %d particles.\n", len(embers))
  	fmt.printf("Instance 0 model mass: %.2f\n", embers[0].model.mass)
  	fmt.printf("Instance 9999 model mass: %.2f\n", embers[9999].model.mass)
  }
tags: [structural, odin, memory, cache-friendly]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Flyweight

When manifesting a tempest of spectral ash, allocating distinct memory for every ember’s intrinsic properties will rapidly exhaust the mana pool (RAM) and fragment the cache. The Flyweight pattern splits data into intrinsic (shared, heavy) and extrinsic (unique, light) states. Odin’s SoA (Structure of Arrays) capabilities or simple tightly packed arrays of `Particle_Instance` referencing a shared `Particle_Model` pointer ensure that legions can be summoned without halting the divination engine.
