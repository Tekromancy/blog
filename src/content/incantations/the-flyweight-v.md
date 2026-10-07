---
title: "The Flyweight Sigil"
description: "Sharing arcane intrinsic states to summon millions of particles without draining the mana pool."
type: v
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Efficiency"
formula: |2
  module main

  // Intrinsic State (Shared)
  struct ParticleModel {
  	texture string
  	color   string
  }

  // Extrinsic State (Unique)
  struct Particle {
  	x     int
  	y     int
  	model &ParticleModel
  }

  fn (p Particle) render() {
  	println("Rendering \${p.model.color} particle at (\${p.x}, \${p.y})")
  }

  struct ParticleFactory {
  mut:
  	cache map[string]&ParticleModel
  }

  fn (mut f ParticleFactory) get_model(color string) &ParticleModel {
  	if color !in f.cache {
  		println("Compiling new particle model: \$color")
  		f.cache[color] = &ParticleModel{texture: "dot.png", color: color}
  	}
  	return f.cache[color]
  }

  fn main() {
  	mut factory := ParticleFactory{}

  	red_model := factory.get_model("red")
  	blue_model := factory.get_model("blue")
  	red_model_2 := factory.get_model("red") // cached

  	mut swarm := []Particle{}
  	swarm << Particle{x: 10, y: 20, model: red_model}
  	swarm << Particle{x: 15, y: 25, model: blue_model}
  	swarm << Particle{x: 100, y: 200, model: red_model_2}

  	for p in swarm {
  		p.render()
  	}
  }
tags: [vlang, flyweight, structural, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Flyweight Sigil

When invoking a swarm of a million digital familiars, maintaining unique data for each will crash your nervous system. The Flyweight offloads the intrinsic state (the model, the texture) into a shared reference. Vlang's strict reference control ensures that cached models are accessed rapidly, maximizing memory density.
