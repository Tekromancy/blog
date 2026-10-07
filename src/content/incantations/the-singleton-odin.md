---
title: The Singleton
description: Establishing a solitary nexus point for accessing the grand leyline network.
type: odin
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Enchantment // Global Convergence"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Singleton structure
  Leyline_Nexus :: struct {
  	active_connections: int,
  	mana_pool:          f64,
  }
  
  // Global instance
  @private
  _instance: Leyline_Nexus
  
  @private
  _initialized: bool = false
  
  // Accessor procedure
  get_nexus :: proc() -> ^Leyline_Nexus {
  	if !_initialized {
  		_instance = Leyline_Nexus{
  			active_connections = 0,
  			mana_pool = 1000000.0,
  		}
  		_initialized = true
  	}
  	return &_instance
  }
  
  main :: proc() {
  	nexus1 := get_nexus()
  	nexus1.active_connections += 5
  	
  	nexus2 := get_nexus()
  	nexus2.mana_pool -= 500.0
  	
  	fmt.printf("Nexus Status: %d connections, %.2f mana\n", nexus1.active_connections, nexus1.mana_pool)
  	fmt.printf("Pointer equivalence: %v\n", nexus1 == nexus2)
  }
tags: [creational, odin, global-state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Singleton

Despite the warnings of the elder syntacticians regarding global mutable state, certain artifacts—like the Leyline Nexus—can exist only as a singular point in reality. In Odin, the Singleton is naturally modeled through package-level private global variables (`@private`) and controlled accessor procedures. This keeps the data encapsulated within its own module sphere while granting universal access to those with the proper pointers.
