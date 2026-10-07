---
title: The Prototype Ward
description: Cloning magical essences using val capabilities.
type: pony
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  trait val Cloneable
    fun clone(): Cloneable val

  class val Illusion is Cloneable
    let _power: U32
    new create(p: U32) => _power = p
    fun clone(): Illusion val => Illusion(_power)
tags: [pony, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Prototype Ward

In Pony, deep cloning is often replaced by sharing immutable `val` references. When a true structural duplicate is required, the Prototype spell returns a new `val` or `iso` instance.
