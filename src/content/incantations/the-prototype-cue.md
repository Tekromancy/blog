---
title: "The Prototype: Resonance Cloning"
description: "Duplicate and slightly modify existing lattice validation matrices to produce new, fully-formed wards."
type: cue
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Resonance Cloning"
formula: |2
  package wards
  
  // The Base Prototype Schema
  #ResonanceMatrix: {
  	id:        string
  	frequency: float
  	harmonics: [...int]
  	stable:    bool | *true
  }
  
  // An established prototype instance (a baseline template)
  template_alpha: #ResonanceMatrix & {
  	id: "ALPHA-001"
  	frequency: 432.0
  	harmonics: [1, 3, 5]
  }
  
  // Clone and modify (Unification)
  clone_beta: template_alpha & {
  	id: "BETA-002"
  	// CUE allows overriding defaults, but modifying concrete values
  	// requires careful structuring. If we want to change frequency,
  	// we must design the prototype to leave it open, or use structural
  	// copying if it's purely default data.
  }
  
  // Better Prototype Design in CUE: Default Values
  #ClonableMatrix: {
  	id:        string | *"DEFAULT-ID"
  	frequency: float | *440.0
  	harmonics: [...int] | *[2, 4, 6]
  }
  
  prototype_omega: #ClonableMatrix
  
  // Cloning from the omega prototype
  clone_gamma: prototype_omega & {
  	id: "GAMMA-003"
  	frequency: 528.0 // Overrides default
  }
tags: [prototype, creational, cue, cloning, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Prototype** pattern in CUE relies entirely on the language's core feature: data inheritance and default overrides. When architecting **Lattice Data Validation Wards**, you often have a complex base configuration that needs to be duplicated and slightly tweaked across a hundred different nodes in the cyber-astral network.

By defining a prototype with fallback defaults (e.g., `float | *440.0`), you create a resonance template. Cloning is simply the act of declaring a new configuration that unifies with the prototype. CUE will seamlessly copy over all the base configurations, allowing you to explicitly override specific fields, like frequency or ID, without violating the fundamental constraints of the `#ClonableMatrix` schema.
