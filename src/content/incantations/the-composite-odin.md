---
title: The Composite
description: Treating hierarchical networks of runes identically to individual sigils.
type: odin
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Matrices"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Node type using a tagged union for safety and speed
  Node_Type :: enum {
  	Sigil,
  	Matrix,
  }
  
  Rune_Node :: struct {
  	name: string,
  	type: Node_Type,
  	// Only used if type == .Matrix
  	children: [dynamic]^Rune_Node,
  	// Only used if type == .Sigil
  	power: int,
  }
  
  // Operations over the tree
  activate_node :: proc(node: ^Rune_Node, indent: string = "") {
  	switch node.type {
  	case .Sigil:
  		fmt.printf("%s* Activating Sigil [%s] (Power: %d)\n", indent, node.name, node.power)
  	case .Matrix:
  		fmt.printf("%s+ Energizing Matrix [%s]\n", indent, node.name)
  		for child in node.children {
  			activate_node(child, fmt.tprintf("%s  ", indent))
  		}
  	}
  }
  
  add_child :: proc(parent: ^Rune_Node, child: ^Rune_Node) {
  	if parent.type == .Matrix {
  		append(&parent.children, child)
  	}
  }
  
  destroy_node :: proc(node: ^Rune_Node) {
  	if node.type == .Matrix {
  		for child in node.children {
  			destroy_node(child)
  		}
  		delete(node.children)
  	}
  }
  
  main :: proc() {
  	root_matrix := Rune_Node{name = "Omni-Matrix", type = .Matrix, children = make([dynamic]^Rune_Node)}
  	sub_matrix := Rune_Node{name = "Defense Cluster", type = .Matrix, children = make([dynamic]^Rune_Node)}
  	
  	sigil1 := Rune_Node{name = "Aegis", type = .Sigil, power = 50}
  	sigil2 := Rune_Node{name = "Ward", type = .Sigil, power = 30}
  	sigil3 := Rune_Node{name = "Strike", type = .Sigil, power = 100}
  	
  	add_child(&sub_matrix, &sigil1)
  	add_child(&sub_matrix, &sigil2)
  	
  	add_child(&root_matrix, &sub_matrix)
  	add_child(&root_matrix, &sigil3)
  	
  	activate_node(&root_matrix)
  	
  	destroy_node(&root_matrix)
  }
tags: [structural, odin, trees, tagged-unions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite

A fractal matrix of spell-constructs can contain individual runes or nested sub-matrices. To handle them uniformly, we invoke the Composite pattern. Instead of complex virtual dispatch, Odin favors tagged unions or enums combined with structs. Here, `Rune_Node` differentiates its behavior using a simple `switch`, treating single sigils and complex matrices with cache-friendly data structures.
