---
title: "The Strategy"
description: "Swapping out polynomial commitment schemes on the fly."
type: cairo
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Illusion // Adaptability"
formula: |2
  trait ICommitmentStrategy<T> { fn commit(self: @T, data: felt252) -> felt252; }
  
  #[derive(Copy, Drop)]
  struct Blake2sStrategy {}
  impl BlakeImpl of ICommitmentStrategy<Blake2sStrategy> {
      fn commit(self: @Blake2sStrategy, data: felt252) -> felt252 { data + 2 }
  }
  
  #[derive(Copy, Drop)]
  struct KeccakStrategy {}
  impl KeccakImpl of ICommitmentStrategy<KeccakStrategy> {
      fn commit(self: @KeccakStrategy, data: felt252) -> felt252 { data + 3 }
  }
tags: [cairo, design-pattern, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Empowers the wizard to dynamically select the most potent commitment scheme for the given STARK invocation.
