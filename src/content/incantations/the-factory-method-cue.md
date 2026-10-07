---
title: "The Factory Method: Parametric Sigil Evocation"
description: "Define a unified interface for creating lattice wards, but let configuration values alter the instantiated schema."
type: cue
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Parametric Evocation"
formula: |2
  package wards
  
  // The generic product
  #Sigil: {
  	class: string
  	radius: number
  	active: bool | *true
  }
  
  // Specific sigils
  #NullSigil: #Sigil & {
  	class: "Null"
  	radius: <=10
  }
  
  #VoidSigil: #Sigil & {
  	class: "Void"
  	radius: >=100
  }
  
  // The Factory Method via conditional unification
  #SigilFactory: {
  	// Input parameter
  	sigilClass: string
  	
  	// Output product
  	product: #Sigil
  	
  	// Factory logic
  	if sigilClass == "Null" {
  		product: #NullSigil
  	}
  	if sigilClass == "Void" {
  		product: #VoidSigil
  	}
  }
  
  // Usage
  evocation1: #SigilFactory & {
  	sigilClass: "Null"
  	product: { radius: 5 }
  }
  
  evocation2: #SigilFactory & {
  	sigilClass: "Void"
  	product: { radius: 500 }
  }
  
  sigilA: evocation1.product
  sigilB: evocation2.product
tags: [factory-method, creational, cue, evocation, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In CUE, the **Factory Method** manifests not as a callable function, but as a parameterized configuration struct relying on conditional logic. When dealing with **Lattice Data Validation Wards**, you frequently need a generic mechanism to conjure specific types of defensive sigils without hardcoding the concrete schema into your main configuration tree.

The `#SigilFactory` accepts a parameter, `sigilClass`. Through CUE's `if` statements, it dynamically binds the output `product` to the appropriate concrete schema (`#NullSigil` or `#VoidSigil`). The unified graph ensures that whatever parameters you pass down to `product` are strictly validated against the conditionally selected archetype.
