---
title: "The Decorator"
description: "Adding dynamic enchantments to STARK traces."
type: cairo
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  trait ITrace { fn execute(self: @TraceBase) -> felt252; }
  #[derive(Copy, Drop)]
  struct TraceBase {}
  impl BaseImpl of ITrace { fn execute(self: @TraceBase) -> felt252 { 'base' } }
  
  trait IDecorator { fn execute_decorated(self: @TraceDecorator) -> felt252; }
  #[derive(Copy, Drop)]
  struct TraceDecorator { inner: TraceBase }
  impl DecoratorImpl of IDecorator {
      fn execute_decorated(self: @TraceDecorator) -> felt252 {
          self.inner.execute() + 'extra_magic'
      }
  }
tags: [cairo, design-pattern, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Wrap traces in layers of arcane modifiers without altering their fundamental structure.
