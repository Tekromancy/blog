---
title: "The Proxy"
description: "Guarding access to the heavy STARK prover."
type: cairo
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Guarding"
formula: |2
  trait IProver { fn prove(self: @ProverProxy, data: felt252) -> felt252; }
  #[derive(Copy, Drop)]
  struct HeavyProver {}
  #[derive(Copy, Drop)]
  struct ProverProxy { has_access: bool, heavy: HeavyProver }
  
  impl ProxyImpl of IProver {
      fn prove(self: @ProverProxy, data: felt252) -> felt252 {
          if *self.has_access {
              'proof_generated'
          } else {
              'access_denied'
          }
      }
  }
tags: [cairo, design-pattern, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A sentinel that checks permissions or caches results before invoking the costly underlying proving ritual.
