---
title: "The Template Method: Skeletal Ward Rituals"
description: "Define the skeletal framework of a validation ritual in a base schema, deferring specific algorithmic steps to unifying schemas."
type: cue
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Enchantment // Skeletal Frameworks"
formula: |2
  package wards
  
  // The Template Method (Base Schema)
  #BaseRitual: {
  	// The invariant structure
  	id: string
  	timestamp: string
  	
  	// Abstract steps (must be defined by unifying schemas)
  	step_1_gather: int
  	step_2_refine: float
  	
  	// The final calculated invariant step, reliant on the abstract steps
  	final_output: float
  	final_output: step_1_gather * step_2_refine
  }
  
  // Concrete Implementation A
  #LunarRitual: #BaseRitual & {
  	// Implementing the deferred steps
  	step_1_gather: 50
  	step_2_refine: 1.5
  }
  
  // Concrete Implementation B
  #SolarRitual: #BaseRitual & {
  	// Implementing the deferred steps
  	step_1_gather: 200
  	step_2_refine: 3.14
  }
  
  // Usage
  cast_lunar: #LunarRitual & {
  	id: "LUNAR-01"
  	timestamp: "midnight"
  }
  
  // cast_lunar.final_output automatically resolves to 75.0
tags: [template-method, behavioral, cue, enchantment, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When laying down the foundational matrix for a **Lattice Data Validation Ward**, certain structural rules must never change, while other specific parameter tunings must be customized based on the elemental alignment of the conjurer.

The **Template Method** pattern is perfectly aligned with CUE's inheritance model. The `#BaseRitual` defines the skeleton: it requires an `id` and `timestamp`, and it strictly defines how the `final_output` is calculated from `step_1` and `step_2`. However, it leaves the actual values of those steps unconstrained. Sub-schemas like `#LunarRitual` simply unify with the base, filling in the missing algorithmic steps. The invariant mathematical rules of the Template Method ensure that no matter how the steps are customized, the final output formula remains inviolate.
