---
title: "The Visitor"
description: "Injecting new analytics into abstract syntax trees of constraints."
type: cairo
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  #[derive(Drop)]
  enum Node {
      Constraint: felt252,
      Variable: felt252,
  }
  
  trait IVisitor<T> {
      fn visit_constraint(ref self: T, val: felt252);
      fn visit_variable(ref self: T, val: felt252);
  }
  
  #[derive(Drop)]
  struct CostVisitor { cost: u32 }
  impl CostVisitorImpl of IVisitor<CostVisitor> {
      fn visit_constraint(ref self: CostVisitor, val: felt252) { self.cost += 10; }
      fn visit_variable(ref self: CostVisitor, val: felt252) { self.cost += 1; }
  }
tags: [cairo, design-pattern, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Wanders through the labyrinth of constraints, collecting metadata and invoking new effects without mutating the nodes themselves.
