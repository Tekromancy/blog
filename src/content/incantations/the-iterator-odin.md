---
title: The Iterator
description: Traversing fractured leyline graphs without exposing their underlying topological horrors.
type: odin
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Traversal"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Collection
  Leyline_Graph :: struct {
  	nodes: [dynamic]string,
  }
  
  // The Iterator Interface
  Leyline_Iterator :: struct {
  	graph: ^Leyline_Graph,
  	index: int,
  }
  
  create_iterator :: proc(g: ^Leyline_Graph) -> Leyline_Iterator {
  	return Leyline_Iterator{graph = g, index = 0}
  }
  
  has_next :: proc(it: ^Leyline_Iterator) -> bool {
  	return it.index < len(it.graph.nodes)
  }
  
  next :: proc(it: ^Leyline_Iterator) -> string {
  	if !has_next(it) {
  		return ""
  	}
  	val := it.graph.nodes[it.index]
  	it.index += 1
  	return val
  }
  
  main :: proc() {
  	graph := Leyline_Graph{nodes = make([dynamic]string)}
  	append(&graph.nodes, "Nexus Alpha")
  	append(&graph.nodes, "Crystal Spire")
  	append(&graph.nodes, "Void Chasm")
  	
  	iterator := create_iterator(&graph)
  	
  	fmt.println("Traversing Leylines:")
  	for has_next(&iterator) {
  		node := next(&iterator)
  		fmt.printf(" -> Reached %s\n", node)
  	}
  	
  	delete(graph.nodes)
  }
tags: [behavioral, odin, traversal, encapsulation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator

Directly manipulating the pointers of a volatile memory graph is a gamble with madness. The Iterator pattern abstracts the traversal. In Odin, a simple stateful struct acts as the cursor over a collection. It encapsulates the bounds checking and pointer arithmetic, allowing the technomancer to confidently walk the leylines from start to finish without accidentally dereferencing the void.
