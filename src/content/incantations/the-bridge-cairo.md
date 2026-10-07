---
title: "The Bridge"
description: "Decoupling STARK hash functions from the proving logic."
type: cairo
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Connection"
formula: |2
  trait IHashAlgo<T> { fn hash(self: @T, data: felt252) -> felt252; }
  #[derive(Copy, Drop)]
  struct PoseidonHash {}
  impl PoseidonImpl of IHashAlgo<PoseidonHash> {
      fn hash(self: @PoseidonHash, data: felt252) -> felt252 { data + 1 }
  }
  #[derive(Copy, Drop)]
  struct Prover<T> { hasher: T }
  trait IProver<T> { fn prove(self: @Prover<T>, data: felt252) -> felt252; }
  impl ProverImpl<T, +IHashAlgo<T>> of IProver<T> {
      fn prove(self: @Prover<T>, data: felt252) -> felt252 {
          self.hasher.hash(data)
      }
  }
tags: [cairo, design-pattern, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Separates the mystical hash algorithm from the prover's structure, allowing both to evolve independently.
