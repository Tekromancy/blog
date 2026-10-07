---
title: The Composite Magic Node
description: Compose resources into tree structures to represent part-whole hierarchies in Move.
type: move
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Worldbuilding"
formula: |2
  module arcane::composite {
      use std::vector;
  
      struct Node has store, drop {
          value: u64,
          children: vector<Node>,
      }
  
      public fun create_leaf(value: u64): Node {
          Node { value, children: vector::empty() }
      }
  
      public fun add_child(parent: &mut Node, child: Node) {
          vector::push_back(&mut parent.children, child);
      }
  }
tags: [structural, composite, move, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
