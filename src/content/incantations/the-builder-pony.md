---
title: The Builder Ward
description: Constructing complex magical constructs step-by-step in isolation.
type: pony
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Golemancy"
formula: |2
  class iso GolemBuilder
    var _arms: U32 = 0
    fun ref add_arms(n: U32): GolemBuilder ref =>
      _arms = _arms + n
      this
    fun consume build(): Golem iso^ =>
      recover Golem(_arms) end
tags: [pony, builder, reference-capabilities]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Builder Ward

Step-by-step conjuration of complex entities is vulnerable to interference. By keeping the builder `iso` (isolated) or `ref`, we ward off data races during the crafting process, finally consuming it to yield a fresh `iso` construct ready to be passed to another actor.
