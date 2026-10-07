---
title: The Flyweight
description: Efficient structural sharing for repetitive arcana.
type: gleam
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Essence Sharing"
formula: |2
  import gleam/dict.{type Dict}

  pub type ParticleType {
    Spark(color: String, heat: Int)
  }

  pub type Particle {
    Particle(x: Int, y: Int, shared_type: ParticleType)
  }

  pub fn spawn_particles(ptype: ParticleType, count: Int) -> List(Particle) {
    // Due to BEAM immutable data structures, `ptype` is shared in memory
    // across all Particle instances automatically.
    gleam/list.repeat(Particle(0, 0, ptype), count)
  }
tags: [transmutation, flyweight, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Flyweight
On the BEAM, structural sharing is free. Shared references cost virtually zero memory.
