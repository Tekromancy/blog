---
title: "The Observer: Lattice Dependency Subscriptions"
description: "Define a one-to-many dependency so that when one configuration node changes state, all dependents automatically resolve to the new parameters."
type: cue
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Subscriptions"
formula: |2
  package wards
  
  // The Subject (Observable)
  #LeylineCore: {
  	power_level: int
  	status: "stable" | "fluctuating"
  }
  
  // The Observer Interface
  #WardSubscriber: {
  	// The observer requires a reference to the subject
  	leyline: #LeylineCore
  	
  	// The observer's own state, derived from the subject
  	shield_output: int
  	alert_mode: bool
  	
  	// The reaction logic
  	shield_output: leyline.power_level * 10
  	alert_mode: leyline.status == "fluctuating"
  }
  
  // Usage
  // 1. We define the state of the subject
  core_source: #LeylineCore & {
  	power_level: 50
  	status: "fluctuating"
  }
  
  // 2. We attach the observers
  ward_north: #WardSubscriber & { leyline: core_source }
  ward_south: #WardSubscriber & { leyline: core_source }
  
  // If core_source changes, ward_north and ward_south are automatically
  // mathematically updated in the unified graph.
tags: [observer, behavioral, cue, divination, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Observer** pattern describes how dependent objects react to changes in a central subject. In CUE, this is elegantly handled by the language's core feature: the unification graph. 

There are no event listeners or callbacks to register. Instead, the `#WardSubscriber` directly references the `#LeylineCore` struct. Its internal configuration (`shield_output`, `alert_mode`) is defined as a mathematical derivation of the core's values. When the `core_source` is declared or altered, the graph instantly propagates those changes down the leyline to all subscribing wards, ensuring total consistency across the **Lattice Data Validation Ward** network without procedural side-effects.
