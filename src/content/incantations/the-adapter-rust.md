---
title: Adapter of the Alien Interface
description: Convert the interface of a class into another interface clients expect.
type: rust
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Interface-warping
formula: |
  pub trait StandardGridNode {
      fn connect(&self) -> String;
  }

  pub struct LegacyAlienArtifact;
  impl LegacyAlienArtifact {
      pub fn psychic_link(&self) -> String {
          "Psionic connection established.".to_string()
      }
  }

  pub struct ArtifactAdapter {
      artifact: LegacyAlienArtifact,
  }

  impl StandardGridNode for ArtifactAdapter {
      fn connect(&self) -> String {
          // Translate the psychic link into a standard grid connection
          self.artifact.psychic_link()
      }
  }
tags: [structural, adapter, transmutation, integration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When excavating codebases from the First Epoch, or integrating unholy alien technology into your modern neural-deck, you will inevitably encounter incompatible paradigms. The Adapter pattern is the universal translator, a transmutation of logic.

It wraps the foreign, incomprehensible API in a familiar cyber-shell, allowing your standard grid protocols to interface seamlessly with eldritch horrors without requiring a full systemic rewrite.
