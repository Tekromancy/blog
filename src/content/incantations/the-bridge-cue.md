---
title: "The Bridge: Decoupled Energy Matrices"
description: "Separate the abstraction of a ward from its implementation environment, allowing both to vary independently."
type: cue
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Enchantment // Decoupling"
formula: |2
  package wards
  
  // Implementor interface
  #EnergySource: {
  	type: string
  	capacity: int
  }
  
  // Concrete Implementors
  #LeylineSource: #EnergySource & { type: "Leyline", capacity: 5000 }
  #ReactorSource: #EnergySource & { type: "Fusion", capacity: 10000 }
  
  // Abstraction interface
  #DefensiveWard: {
  	name: string
  	// The Bridge
  	source: #EnergySource
  	
  	// Derived capabilities based on source
  	defenseRating: source.capacity / 100
  }
  
  // Refined Abstractions
  #AegisWard: #DefensiveWard & {
  	name: "Aegis-Class-Shield"
  	defenseRating: >= 50
  }
  
  // Usage
  // We can attach any source to any ward, bridging the two hierarchies
  leylineAegis: #AegisWard & {
  	source: #LeylineSource
  }
  
  reactorAegis: #AegisWard & {
  	source: #ReactorSource
  }
tags: [bridge, structural, cue, decoupling, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In complex arcane systems, a **Lattice Data Validation Ward** (the abstraction) and its core magical power source (the implementor) often need to evolve independently. If you tightly couple every type of shield to a specific type of generator, the configuration permutations explode.

The **Bridge** pattern mitigates this by embedding the `#EnergySource` struct directly into the `#DefensiveWard` abstraction. The ward derives its operational metrics (`defenseRating`) from the bridged source dynamically. You can now define a new ward class or a new energy source class independently, and unify them together flawlessly at deployment time.
