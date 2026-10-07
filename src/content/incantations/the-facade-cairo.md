---
title: "The Facade"
description: "Simplifying the convoluted STARK prover invocation."
type: cairo
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  #[derive(Copy, Drop)]
  struct ProverSubsystemA {}
  #[derive(Copy, Drop)]
  struct ProverSubsystemB {}
  
  #[derive(Copy, Drop)]
  struct ProverFacade { a: ProverSubsystemA, b: ProverSubsystemB }
  trait IFacade { fn generate_proof(self: @ProverFacade) -> felt252; }
  
  impl FacadeImpl of IFacade {
      fn generate_proof(self: @ProverFacade) -> felt252 {
          // coordinate complex subsystems
          'stark_proof_ready'
      }
  }
tags: [cairo, design-pattern, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A unified portal that hides the bewildering complexity of polynomial commitments and FRI operations.
