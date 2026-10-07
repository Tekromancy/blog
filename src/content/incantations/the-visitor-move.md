---
title: The Visitor of Elemental Nodes
description: Represent an operation to be performed on the elements of an object structure without changing the classes in Move.
type: move
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Analytics"
formula: |2
  module arcane::visitor {
      struct ElementNode has drop { value: u64 }
      
      struct Visitor has drop {
          sum: u64,
      }
  
      public fun new_visitor(): Visitor {
          Visitor { sum: 0 }
      }
  
      public fun visit(visitor: &mut Visitor, node: &ElementNode) {
          visitor.sum = visitor.sum + node.value;
      }
  }
tags: [behavioral, visitor, move, traversals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
