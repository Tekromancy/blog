---
title: The Mediator
description: A central arbiter coordinating complex state changes between autonomous drone nodes.
type: odin
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Illusion // Networked Consensus"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Mediator Interface
  Swarm_Mediator :: struct {
  	notify: proc(mediator: ^Swarm_Mediator, sender_id: int, event: string),
  	// In a real scenario, this holds pointers to all drones
  }
  
  // The Colleague
  Drone :: struct {
  	id:       int,
  	mediator: ^Swarm_Mediator,
  }
  
  drone_detect_enemy :: proc(d: ^Drone) {
  	fmt.printf("Drone %d: Enemy detected!\n", d.id)
  	d.mediator.notify(d.mediator, d.id, "ENEMY_SPOTTED")
  }
  
  // Concrete Mediator Implementation
  Hub_Data :: struct {
  	drones: [dynamic]^Drone,
  }
  
  Concrete_Mediator :: struct {
  	base: Swarm_Mediator,
  	data: Hub_Data,
  }
  
  hub_notify :: proc(base_med: ^Swarm_Mediator, sender_id: int, event: string) {
  	med := cast(^Concrete_Mediator)base_med
  	if event == "ENEMY_SPOTTED" {
  		fmt.printf("Hub: Received alert from Drone %d. Broadcasting attack order.\n", sender_id)
  		for drone in med.data.drones {
  			if drone.id != sender_id {
  				fmt.printf("Hub -> Drone %d: Engage targets!\n", drone.id)
  			}
  		}
  	}
  }
  
  main :: proc() {
  	// Setup mediator
  	med := Concrete_Mediator{}
  	med.base.notify = hub_notify
  	med.data.drones = make([dynamic]^Drone)
  	
  	// Setup drones
  	d1 := Drone{id = 1, mediator = &med.base}
  	d2 := Drone{id = 2, mediator = &med.base}
  	d3 := Drone{id = 3, mediator = &med.base}
  	
  	append(&med.data.drones, &d1, &d2, &d3)
  	
  	// Interaction
  	drone_detect_enemy(&d2)
  	
  	delete(med.data.drones)
  }
tags: [behavioral, odin, decoupling, central-authority]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator

If ten thousand drones attempt to communicate with one another directly, the resulting network graph collapses into a dense thicket of cross-dependencies (O(N^2)). The Mediator pattern establishes a central hub. In Odin, drones only store a pointer to the `Swarm_Mediator`. When an event occurs, it is sent to the mediator, which encapsulates the routing logic, keeping the drone struct clean, data-oriented, and oblivious to its peers.
