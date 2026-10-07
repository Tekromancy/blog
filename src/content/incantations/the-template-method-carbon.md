---
title: "The Template Method Incantation in Carbon"
description: "Define the skeleton of a high-level ritual in an operation, deferring specific steps to subclasses."
type: carbon
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Structure"
formula: |2
  package TemplateMethod api;

  // In Carbon, we use interfaces to define the customizable steps
  interface RitualSteps {
    fn PrepareComponents[me: Self]();
    fn Ignite[me: Self]();
    fn Cleanup[me: Self]();
  }

  // The executor acts as the skeleton
  class RitualExecutor {
    fn ExecuteRitual[me: Self](steps: RitualSteps*) {
      (*steps).PrepareComponents();
      (*steps).Ignite();
      (*steps).Cleanup();
    }
  }

  class FireballRitual {
    impl as RitualSteps {
      fn PrepareComponents[me: Self]() { /* gather sulfur */ }
      fn Ignite[me: Self]() { /* spark */ }
      fn Cleanup[me: Self]() { /* vent heat */ }
    }
  }
tags: [behavioral, carbon, inheritance, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method: The Skeleton Ritual

Certain high-tier spells follow a strict sequence: Prepare, Cast, Cleanup. If you allow junior adepts to write the entire ritual, they will forget the cleanup phase and leak memory. The Template Method pattern locks down the skeleton of the algorithm.

While C++ used abstract base classes and virtual functions for this, Carbon often prefers composition and interfaces. The `RitualExecutor` defines the immutable sequence. Specific implementations, like `FireballRitual`, simply provide the required `RitualSteps`. The Successor Pact enforces structure to prevent catastrophic meltdowns.
