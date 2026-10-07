---
title: The Visitor
description: Dispatching operations on sum types via pattern matching.
type: gleam
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Essence Extraction"
formula: |2
  pub type Entity {
    Demon(power: Int)
    Fae(trickery: Int)
  }

  pub fn calculate_threat(entity: Entity) -> Int {
    case entity {
      Demon(power) -> power * 10
      Fae(trickery) -> trickery * 5
    }
  }
tags: [divination, visitor, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Visitor
In functional languages, the Visitor pattern is just pattern matching over a sum type. No double dispatch required.
