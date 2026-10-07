---
title: The Factory Method Pattern
description: Delegating the instantiation of magical artifacts to subclasses.
type: swift
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Artifactmancy"
formula: |2
  protocol Wand {
      func cast() -> String
  }
  class ElderWand: Wand {
      func cast() -> String { return "Casting with Elder Wand..." }
  }
  protocol WandMaker {
      func createWand() -> Wand
  }
  class ElderWandMaker: WandMaker {
      func createWand() -> Wand { return ElderWand() }
  }
tags: [swift, design-pattern, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Factory Method: The Wand Maker's Secret

The Factory Method allows an arcane protocol to define an interface for creating wands, but lets conforming types decide which wand to instantiate.
