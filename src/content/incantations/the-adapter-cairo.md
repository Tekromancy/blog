---
title: "The Adapter"
description: "Bridging ancient SNARK verifiers to STARK proofs."
type: cairo
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  trait IOldVerifier { fn verify_snark(self: @OldVerifier, proof: felt252) -> bool; }
  trait INewVerifier { fn verify_stark(self: @StarkAdapter, proof: felt252) -> bool; }
  #[derive(Copy, Drop)]
  struct OldVerifier {}
  impl OldVerifierImpl of IOldVerifier {
      fn verify_snark(self: @OldVerifier, proof: felt252) -> bool { true }
  }
  #[derive(Copy, Drop)]
  struct StarkAdapter { old: OldVerifier }
  impl AdapterImpl of INewVerifier {
      fn verify_stark(self: @StarkAdapter, proof: felt252) -> bool {
          self.old.verify_snark(proof)
      }
  }
tags: [cairo, design-pattern, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An intermediary sigil that translates modern STARK proofs into a language comprehensible by ancient SNARK verifiers.
