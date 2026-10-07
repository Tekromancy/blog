---
title: "The Builder"
description: "Step-by-step assembly of complex STARK proof configurations."
type: cairo
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Structurization"
formula: |2
  #[derive(Copy, Drop)]
  struct ProofConfig { security_level: u32, hash_fn: felt252 }
  #[derive(Copy, Drop)]
  struct ProofBuilder { security_level: u32, hash_fn: felt252 }
  trait IBuilder {
      fn new() -> ProofBuilder;
      fn set_security(ref self: ProofBuilder, level: u32);
      fn set_hash(ref self: ProofBuilder, hash: felt252);
      fn build(self: @ProofBuilder) -> ProofConfig;
  }
  impl BuilderImpl of IBuilder {
      fn new() -> ProofBuilder { ProofBuilder { security_level: 0, hash_fn: 0 } }
      fn set_security(ref self: ProofBuilder, level: u32) { self.security_level = level; }
      fn set_hash(ref self: ProofBuilder, hash: felt252) { self.hash_fn = hash; }
      fn build(self: @ProofBuilder) -> ProofConfig { ProofConfig { security_level: *self.security_level, hash_fn: *self.hash_fn } }
  }
tags: [cairo, design-pattern, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Construct intricate STARK configurations piece by piece, shielding the final proof generation from incomplete states.
