---
title: Flyweight in ReasonML
description: Sharing immutable state vectors.
type: reason
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Creation"
formula: |2
  module ParticleType = {
    type t = { color: string, sprite: string };
    let fire = { color: "red", sprite: "fire.png" };
  };

  type particle = { x: int, y: int, pType: ParticleType.t };
  let spawnFire = (x, y) => { x, y, pType: ParticleType.fire };
tags: [reason, flyweight, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Immutable bindings allow vast swarms of particles to reference a single shared configuration object, minimizing memory corruption.
