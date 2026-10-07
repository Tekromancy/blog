---
title: The Factory Method of Magical Artifacts
description: Define an interface for creating resources, but let subclasses decide which class to instantiate in Move.
type: move
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Runesmithing"
formula: |2
  module arcane::factory_method {
      struct Artifact has key, store {
          magic_level: u64,
      }
  
      const ELEVEL_TOO_LOW: u64 = 0;
  
      // The factory method enforces resource-safe creation rules
      public fun create_artifact(level: u64): Artifact {
          assert!(level > 0, ELEVEL_TOO_LOW);
          Artifact { magic_level: level }
      }
  }
tags: [creational, factory-method, move, artifacts]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
