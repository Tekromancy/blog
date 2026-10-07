---
title: "The Abstract Factory"
description: "Forging STARK prover artifacts through polymorphic factories."
type: cairo
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Provermancy"
formula: |2
  trait ArtifactFactory<T> {
      fn create_trace(self: @T) -> felt252;
      fn create_proof(self: @T) -> felt252;
  }
  #[derive(Copy, Drop)]
  struct StarkFactory {}
  impl StarkFactoryImpl of ArtifactFactory<StarkFactory> {
      fn create_trace(self: @StarkFactory) -> felt252 { 'stark_trace' }
      fn create_proof(self: @StarkFactory) -> felt252 { 'stark_proof' }
  }
tags: [cairo, design-pattern, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the STARK prover realms, the Abstract Factory conjures corresponding traces and proofs without binding the alchemist to their concrete forms.
