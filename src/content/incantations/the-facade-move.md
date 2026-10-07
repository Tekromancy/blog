---
title: The Facade of Ultimate Artifacts
description: Provide a unified interface to a set of interfaces in a subsystem in Move.
type: move
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  module arcane::facade {
      // Mocked Subsystems
      struct Potion has store, drop {}
      struct Aura has store, drop {}
      struct Rune has store, drop {}
  
      struct UltimateArtifact has key, store {
          potion: Potion,
          aura: Aura,
          rune: Rune,
      }
  
      // The Facade creates the complex object interacting with multiple subsystems
      public fun create_ultimate_artifact(): UltimateArtifact {
          UltimateArtifact {
              potion: Potion {},
              aura: Aura {},
              rune: Rune {},
          }
      }
  }
tags: [structural, facade, move, synthesis]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
