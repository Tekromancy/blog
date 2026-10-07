---
title: The Visitor
description: Projecting external astral operations onto an established network of monolithic structures.
type: odin
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral Extraction"
formula: |2
  package main
  
  import "core:fmt"
  
  // Forward declarations for Nodes
  Data_Core :: struct { capacity: int }
  Leyline_Node :: struct { frequency: f32 }
  
  // Node Type Enum for dispatch
  Node_Type :: enum {
  	Core,
  	Leyline,
  }
  
  Node :: struct {
  	type: Node_Type,
  	data: rawptr,
  }
  
  // The Visitor API
  Visitor_API :: struct {
  	visit_core:    proc(ctx: rawptr, core: ^Data_Core),
  	visit_leyline: proc(ctx: rawptr, leyline: ^Leyline_Node),
  }
  
  // The accept method (Dispatching)
  accept_visitor :: proc(node: ^Node, api: ^Visitor_API, ctx: rawptr) {
  	switch node.type {
  	case .Core:
  		api.visit_core(ctx, cast(^Data_Core)node.data)
  	case .Leyline:
  		api.visit_leyline(ctx, cast(^Leyline_Node)node.data)
  	}
  }
  
  // Concrete Visitor: Diagnostics
  Diagnostics :: struct {}
  
  diag_core :: proc(ctx: rawptr, core: ^Data_Core) {
  	fmt.printf("Diagnostics [Core]: Capacity is %d TB.\n", core.capacity)
  }
  
  diag_leyline :: proc(ctx: rawptr, leyline: ^Leyline_Node) {
  	fmt.printf("Diagnostics [Leyline]: Frequency is %.2f Hz.\n", leyline.frequency)
  }
  
  diag_api := Visitor_API{visit_core = diag_core, visit_leyline = diag_leyline}
  
  // Concrete Visitor: Overclock
  Overclock :: struct {}
  
  oc_core :: proc(ctx: rawptr, core: ^Data_Core) {
  	core.capacity *= 2
  	fmt.printf("Overclock [Core]: Capacity boosted to %d TB.\n", core.capacity)
  }
  
  oc_leyline :: proc(ctx: rawptr, leyline: ^Leyline_Node) {
  	leyline.frequency *= 1.5
  	fmt.printf("Overclock [Leyline]: Frequency boosted to %.2f Hz.\n", leyline.frequency)
  }
  
  oc_api := Visitor_API{visit_core = oc_core, visit_leyline = oc_leyline}
  
  main :: proc() {
  	core_data := Data_Core{capacity = 500}
  	n1 := Node{type = .Core, data = &core_data}
  	
  	ley_data := Leyline_Node{frequency = 60.0}
  	n2 := Node{type = .Leyline, data = &ley_data}
  	
  	nodes := []Node{n1, n2}
  	
  	diag_ctx := Diagnostics{}
  	oc_ctx := Overclock{}
  	
  	fmt.println("--- Running Diagnostics ---")
  	for n in nodes {
  		accept_visitor(&n, &diag_api, &diag_ctx)
  	}
  	
  	fmt.println("\n--- Running Overclock ---")
  	for n in nodes {
  		accept_visitor(&n, &oc_api, &oc_ctx)
  	}
  }
tags: [behavioral, odin, double-dispatch, tagged-unions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Visitor

When the structures of an arcane network are crystallized and immutable, adding new behavior internally requires shattering their foundational code. The Visitor pattern extracts operations into independent entities. In Odin, `Node_Type` enums route double-dispatch without bloated OOP architectures. An external `Visitor_API` allows new astral diagnostics or overclocking routines to project themselves onto the existing nodes seamlessly.
