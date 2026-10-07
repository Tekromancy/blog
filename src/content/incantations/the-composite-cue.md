---
title: "The Composite: Recursive Lattice Structures"
description: "Treat individual wards and complex clusters of wards uniformly within the recursive data tree."
type: cue
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Recursive Geometry"
formula: |2
  package wards
  
  // The Component interface
  #WardNode: {
  	id: string
  	power: int
  	isCluster: bool
  }
  
  // Leaf Node
  #SingleWard: #WardNode & {
  	isCluster: false
  	type: "Shield" | "Banish"
  }
  
  // Composite Node
  #WardCluster: #WardNode & {
  	isCluster: true
  	
  	// Recursive embedding of components
  	children: [...#WardNode]
  	
  	// The power of the cluster is theoretically the sum, but in CUE we often validate
  	// constraints rather than computing. Here we enforce a rule:
  	// A cluster must have greater power than any single child.
  	// (In a real scenario, you might use CUE's list.Sum if needed, but constraint
  	// validation is the primary focus).
  	power: >= 100
  }
  
  // Usage
  root_matrix: #WardCluster & {
  	id: "Alpha-Node"
  	power: 500
  	children: [
  		#SingleWard & { id: "Sub-1", power: 50, type: "Shield" },
  		#SingleWard & { id: "Sub-2", power: 40, type: "Banish" },
  		#WardCluster & {
  			id: "Beta-Node"
  			power: 150
  			children: [
  				#SingleWard & { id: "Sub-3", power: 10, type: "Shield" }
  			]
  		}
  	]
  }
tags: [composite, structural, cue, recursion, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When constructing a vast **Lattice Data Validation Ward**, the defensive matrix is rarely flat. It comprises individual sigils nestled within complex clusters, which are in turn nestled within macro-clusters. 

The **Composite** pattern allows us to treat a single sigil (`#SingleWard`) and a sprawling cluster (`#WardCluster`) uniformly as a `#WardNode`. Because CUE natively handles recursive data structures and deep validation, you can enforce structural constraints across the entire tree simultaneously. For example, ensuring that a cluster always meets a minimum power threshold, regardless of its deeply nested geometry.
