---
title: The Bridge Ward
description: Decoupling abstraction from implementation.
type: pony
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Void Bridging"
formula: |2
  trait val ElementalCore
    fun invoke(): String

  class val Wand
    let _core: ElementalCore val
    new create(c: ElementalCore val) => _core = c
    fun cast_spell(): String => _core.invoke() + " Strike!"
tags: [pony, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Bridge Ward

Separating the wand from its core allows dynamic binding at creation while keeping everything strictly typed and memory-safe.
