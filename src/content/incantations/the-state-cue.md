---
title: "The State: Conditional Transition Matrices"
description: "Alter a ward's internal constraints and validation rules dynamically based on its designated state variable."
type: cue
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  package wards
  
  // Context
  #PhaseWard: {
  	// The State variable
  	phase: "DORMANT" | "ACTIVE" | "OVERLOAD"
  	
  	// Properties that depend on state
  	draw: int
  	emit: int
  	
  	// The State transition logic (Behavior variation)
  	if phase == "DORMANT" {
  		draw: <= 5
  		emit: 0
  	}
  	if phase == "ACTIVE" {
  		draw: >= 50 & <= 100
  		emit: draw * 2
  	}
  	if phase == "OVERLOAD" {
  		draw: > 100
  		emit: >= 500
  	}
  }
  
  // Usage
  // Valid Dormant Ward
  ward_A: #PhaseWard & {
  	phase: "DORMANT"
  	draw: 2
  	emit: 0
  }
  
  // Valid Active Ward
  ward_B: #PhaseWard & {
  	phase: "ACTIVE"
  	draw: 75
  	// emit is automatically computed to 150
  }
  
  // Invalid State Application (Unification Error)
  // ward_C: #PhaseWard & {
  // 	phase: "DORMANT"
  // 	draw: 10 // Error: > 5
  // }
tags: [state, behavioral, cue, transmutation, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A **Lattice Data Validation Ward** behaves entirely differently when it is resting compared to when it is under severe cyber-astral assault. The constraints applied to its configuration must shift accordingly.

In OOP, the **State** pattern changes an object's class at runtime. In CUE, it is handled via declarative conditional unification. By switching a single `phase` field, the `#PhaseWard` invokes entirely different sets of mathematical constraints upon its properties (`draw` and `emit`). This guarantees that a configuration claiming to be in a "DORMANT" state strictly obeys the resting rules, preventing logical contradictions in the deployment manifest.
