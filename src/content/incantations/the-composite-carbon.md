---
title: "The Composite Incantation in Carbon"
description: "Treat individual components and vast network topologies of objects uniformly."
type: carbon
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Hierarchy"
formula: |2
  package Composite api;

  interface NetworkNode {
    fn CalculateLoad[me: Self]() -> i32;
  }

  class TerminalNode {
    var load: i32;
    impl as NetworkNode {
      fn CalculateLoad[me: Self]() -> i32 { return me.load; }
    }
  }

  class ServerCluster {
    // A slice or vector of generic NetworkNodes
    // Simulating with a conceptual array of pointers
    var children_load: i32; 

    impl as NetworkNode {
      fn CalculateLoad[me: Self]() -> i32 {
        // In reality, iterate over children and sum
        return me.children_load; 
      }
    }
    
    fn AddNode[addr me: Self*>(load: i32) {
      (*me).children_load += load;
    }
  }
tags: [structural, carbon, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite: Fractal Topologies

In the depths of cyberspace, a single terminal and a sprawling server cluster both process data. The Composite pattern weaves these disparate entities into a fractal hierarchy where a client cannot—and does not need to—tell the difference between a leaf node and a composite branch.

Through Carbon's robust `interface` mechanics, a `ServerCluster` can implement the same `NetworkNode` traits as a lowly `TerminalNode`. This allows recursive spells to calculate load, propagate signals, or cast protective wards across entire server trees with a single invocation.
