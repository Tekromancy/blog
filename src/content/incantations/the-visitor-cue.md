---
title: "The Visitor: Structural Metamagic"
description: "Separate an algorithm from the lattice object structure on which it operates, enabling complex cross-cutting analysis."
type: cue
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Metamagic Analysis"
formula: |2
  package wards
  
  // The Data Structure (Elements)
  #WardGrid: {
  	alpha: { type: "shield", power: 10 }
  	beta:  { type: "banish", power: 25 }
  	gamma: { type: "shield", power: 40 }
  }
  
  // Visitor 1: Power Summation Algorithm
  #PowerSumVisitor: {
  	// Context to visit
  	grid: [string]: { type: string, power: int }
  	
  	// The operation applied across elements
  	total_power: list.Sum([for k, v in grid { v.power }] + [0])
  }
  
  // Visitor 2: Shield Counter Algorithm
  #ShieldCountVisitor: {
  	grid: [string]: { type: string, power: int }
  	
  	// The operation applied across elements
  	shield_count: len([for k, v in grid if v.type == "shield" { v }])
  }
  
  import "list"
  
  // Usage
  my_grid: #WardGrid
  
  // Apply the Visitor algorithms to the data structure
  analysis_1: #PowerSumVisitor & { grid: my_grid }
  analysis_2: #ShieldCountVisitor & { grid: my_grid }
  
  result_power: analysis_1.total_power
  result_shields: analysis_2.shield_count
tags: [visitor, behavioral, cue, divination, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In complex networks of **Lattice Data Validation Wards**, you frequently need to run diverse analytical sweeps over a massive configuration tree—summing total power, counting specific node types, or validating cross-references. If you embed these algorithms directly into the `WardGrid` definition, the core schema becomes convoluted.

The **Visitor** pattern in CUE resolves this by defining algorithms as external schemas (`#PowerSumVisitor`, `#ShieldCountVisitor`). These visitors accept the data structure (`grid`) as an input parameter and use list comprehensions to traverse and analyze the structure without modifying it. This decouples the operational metamagic from the arcane geometry, allowing you to invent new analytical visitors long after the grid's core schema is finalized.
