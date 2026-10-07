---
title: "The Singleton: The Root Anchor Ward"
description: "Ensure a single, unified source of truth for global lattice configuration limits."
type: cue
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Anchoring"
formula: |2
  package wards
  
  // The global configuration schema
  #GlobalLatticeState: {
  	max_energy: int & <= 10000
  	version:    string & =~"^v[0-9]+\\.[0-9]+\\.[0-9]+$"
  	environment: "dev" | "staging" | "prod"
  }
  
  // The Singleton Instance
  // By declaring it at the top level without a #, it becomes a concrete constraint
  // that all other files in the same package must unify with if they reference it.
  global_state: #GlobalLatticeState & {
  	max_energy: *5000 | int
  	version:    * "v1.0.0" | string
  	environment: *"prod" | string
  }
  
  // Any attempt to redefine global_state in another file within the same
  // package to contradictory values will fail CUE's lattice unification.
  // E.g., global_state: { max_energy: 15000 } // Error! Conflicts with <= 10000
  // global_state: { environment: "dev" } // Will unify, overriding default if done correctly.
  
  // Accessing the singleton
  ward_config: {
  	local_energy_cap: global_state.max_energy / 10
  	active_env: global_state.environment
  }
tags: [singleton, creational, cue, anchoring, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In standard programming, the **Singleton** pattern restricts instantiation to a single object. In CUE, everything is a unified lattice. A Singleton is achieved by declaring a concrete, top-level struct within a package that acts as the unbreakable **Root Anchor Ward**.

Because CUE evaluates all files in a package simultaneously, `global_state` cannot be duplicated with conflicting values without triggering a unification error. It provides a single source of truth for the entire configuration environment. Other wards, hexes, and daemons tap into this singleton to derive their local constraints, safe in the knowledge that the root anchor cannot be paradoxically fragmented.
