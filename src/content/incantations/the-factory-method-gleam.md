---
title: The Factory Method
description: Type-safe conjuration via opaque types and constructor functions.
type: gleam
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity Spawning"
formula: |2
  pub opaque type Golem {
    Golem(power: Int, material: String)
  }

  pub fn animate_clay_golem() -> Golem {
    Golem(power: 5, material: "Clay")
  }

  pub fn animate_iron_golem() -> Golem {
    Golem(power: 20, material: "Iron")
  }
tags: [conjuration, factory-method, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Factory Method
Opaque types combined with constructor functions provide the exact semantics of a factory method while preserving type-safe encapsulation.
