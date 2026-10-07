---
title: The Visitor Hex
description: Represent an operation to be performed on the elements of an object structure.
type: hare
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Spectral Inspection"
formula: |2
  use fmt;

  type Node = struct {
  	accept: *fn(n: *Node, v: *Visitor) void,
  	data: str,
  };

  type Visitor = struct {
  	visit: *fn(v: *Visitor, n: *Node) void,
  };

  fn node_accept(n: *Node, v: *Visitor) void = {
  	v.visit(v, n);
  };

  fn auditor_visit(v: *Visitor, n: *Node) void = {
  	fmt::printfln("Auditor spectral scan on node: {}", n.data)!;
  };

  export fn main() void = {
  	let n1 = Node { accept = &node_accept, data = "Core Data" };
  	let n2 = Node { accept = &node_accept, data = "User Logs" };
  	
  	let auditor = Visitor { visit = &auditor_visit };
  	
  	n1.accept(&n1, &auditor);
  	n2.accept(&n2, &auditor);
  };
tags: [behavioral, visitor, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When a data structure is too fragile or rigid to modify, the Visitor hex sends a spectral entity to walk its branches. The nodes simply accept the spirit, allowing it to perform external computations.
