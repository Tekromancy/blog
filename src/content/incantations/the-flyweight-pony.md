---
title: The Flyweight Ward
description: Sharing immaterial essences.
type: pony
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm Weaving"
formula: |2
  class val ParticleType
    let color: String
    new create(c: String) => color = c

  class Particle
    let _type: ParticleType val
    var _x: F32
    var _y: F32
    new create(t: ParticleType val, x: F32, y: F32) =>
      _type = t
      _x = x
      _y = y
tags: [pony, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Flyweight Ward

In Pony, the Flyweight pattern naturally leverages `val` reference capabilities to safely share intrinsic state across millions of actor/object instances.
