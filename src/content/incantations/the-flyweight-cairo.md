---
title: "The Flyweight"
description: "Sharing constant polynomial evaluations across STARK traces."
type: cairo
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  #[derive(Copy, Drop)]
  struct SharedPolynomials { base_eval: felt252 }
  
  #[derive(Copy, Drop)]
  struct TraceRow { shared: SharedPolynomials, dynamic_val: felt252 }
  
  trait ITraceRow { fn compute(self: @TraceRow) -> felt252; }
  impl TraceRowImpl of ITraceRow {
      fn compute(self: @TraceRow) -> felt252 {
          *self.shared.base_eval + *self.dynamic_val
      }
  }
tags: [cairo, design-pattern, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Optimizes memory inside Cairo's restrictive environment by sharing immutable polynomial states among countless trace rows.
