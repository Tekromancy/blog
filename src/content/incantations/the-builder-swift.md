---
title: The Builder Pattern
description: Step-by-step assembly of complex magical constructs safely.
type: swift
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Constructmancy
formula: |
  class Golem {
      var head: String = ""
      var body: String = ""
      var limbs: String = ""
  }
  protocol GolemBuilder {
      func buildHead()
      func buildBody()
      func buildLimbs()
      func getResult() -> Golem
  }
  class OrchardGolemBuilder: GolemBuilder {
      private var golem = Golem()
      func buildHead() { golem.head = "Applewood Head" }
      func buildBody() { golem.body = "Bark Body" }
      func buildLimbs() { golem.limbs = "Branch Limbs" }
      func getResult() -> Golem { return golem }
  }
tags: [swift, design-pattern, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Builder: Constructing the Orchard Golem

The Builder pattern separates the construction of a complex magical construct from its representation. By using an `OrchardGolemBuilder`, a Swift sorcerer can safely initialize properties step-by-step.
