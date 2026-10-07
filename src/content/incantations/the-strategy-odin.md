---
title: The Strategy
description: Swapping combat targeting algorithms seamlessly on the fly.
type: odin
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Algorithmic Splicing"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Strategy Interface
  Targeting_Strategy :: proc(enemies: []string) -> string
  
  // Concrete Strategies
  closest_target :: proc(enemies: []string) -> string {
  	if len(enemies) == 0 { return "" }
  	fmt.println("[Targeting: CLOSEST]")
  	// Imagine distance calculations here
  	return enemies[0]
  }
  
  weakest_target :: proc(enemies: []string) -> string {
  	if len(enemies) == 0 { return "" }
  	fmt.println("[Targeting: WEAKEST]")
  	// Imagine HP checks here
  	return enemies[len(enemies)-1]
  }
  
  // The Context
  Auto_Turret :: struct {
  	strategy: Targeting_Strategy,
  }
  
  fire_turret :: proc(t: ^Auto_Turret, enemies: []string) {
  	target := t.strategy(enemies)
  	if target != "" {
  		fmt.printf("Turret fires at: %s\n", target)
  	}
  }
  
  main :: proc() {
  	enemies := []string{"Grunt A", "Heavy B", "Scout C"}
  	
  	turret := Auto_Turret{strategy = closest_target}
  	fire_turret(&turret, enemies)
  	
  	// Swap algorithm at runtime
  	turret.strategy = weakest_target
  	fire_turret(&turret, enemies)
  }
tags: [behavioral, odin, algorithms, first-class-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Strategy

In the heat of a cyber-raid, an auto-turret must dynamically adapt from prioritizing the closest hostiles to picking off the weakest links. The Strategy pattern defines a family of algorithms and makes them interchangeable. Odin's robust support for first-class procedures allows us to bind targeting logic to a simple function pointer. Modifying the strategy involves zero structural overhead—just a pointer swap.
