---
title: The Chain of Responsibility
description: Cascading an anomalous energy spike down a hierarchy of warding nodes until contained.
type: odin
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Cascade Flow"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Handler structure
  Ward_Node :: struct {
  	name: string,
  	capacity: int,
  	next: ^Ward_Node,
  }
  
  // The handling procedure
  absorb_impact :: proc(node: ^Ward_Node, damage: int) {
  	if damage <= node.capacity {
  		fmt.printf("Node [%s] successfully absorbed the impact of %d.\n", node.name, damage)
  	} else if node.next != nil {
  		fmt.printf("Node [%s] overloaded. Cascading %d damage to next node.\n", node.name, damage)
  		absorb_impact(node.next, damage)
  	} else {
  		fmt.printf("Critical Failure: %d damage uncontained! Shield grid shattered.\n", damage)
  	}
  }
  
  main :: proc() {
  	// Constructing the chain
  	core_ward := Ward_Node{name = "Core Aegis", capacity = 10000, next = nil}
  	inner_ward := Ward_Node{name = "Inner Shell", capacity = 1000, next = &core_ward}
  	outer_ward := Ward_Node{name = "Outer Deflector", capacity = 100, next = &inner_ward}
  	
  	fmt.println("--- Incoming strike: 50 ---")
  	absorb_impact(&outer_ward, 50)
  	
  	fmt.println("\n--- Incoming strike: 500 ---")
  	absorb_impact(&outer_ward, 500)
  	
  	fmt.println("\n--- Incoming strike: 5000 ---")
  	absorb_impact(&outer_ward, 5000)
  	
  	fmt.println("\n--- Incoming strike: 50000 ---")
  	absorb_impact(&outer_ward, 50000)
  }
tags: [behavioral, odin, pointers, cascading]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Chain of Responsibility

When a rogue eviction thread strikes the firewall, the resulting energy must be dispersed. The Chain of Responsibility links warding nodes linearly. Rather than a complex dispatch system, Odin utilizes simple linked struct pointers. An impact hits the first node; if the threshold is exceeded, the node defers to `node.next`. This linear flow of execution ensures clean memory layouts and obvious trace paths during debugging.
