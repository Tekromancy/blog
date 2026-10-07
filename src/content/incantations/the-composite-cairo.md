---
title: "The Composite"
description: "Aggregating STARK proofs into recursive trees."
type: cairo
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Amalgamation"
formula: |2
  #[derive(Drop)]
  enum ProofNode {
      Leaf: felt252,
      Composite: Array<ProofNode>,
  }
  trait IProofVerifier {
      fn verify(self: @ProofNode) -> bool;
  }
  impl ProofVerifierImpl of IProofVerifier {
      fn verify(self: @ProofNode) -> bool {
          match self {
              ProofNode::Leaf(val) => true,
              ProofNode::Composite(nodes) => {
                  // Recursive verification logic
                  true
              },
          }
      }
  }
tags: [cairo, design-pattern, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Treat recursive proofs and singular leaves alike, forming a grand tree of STARK verifications.
