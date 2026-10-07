---
title: The Abstract Factory Ward
description: Forging related artifacts safely across concurrent dimensions.
type: pony
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice Wards"
formula: |2
  trait val AbstractFactory
    fun create_weapon(): Weapon val
    fun create_armor(): Armor val

  class val ElvenFactory is AbstractFactory
    fun create_weapon(): Weapon val => ElvenWeapon
    fun create_armor(): Armor val => ElvenArmor
tags: [pony, abstract-factory, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Abstract Factory Ward

In the strict, lockless realms of Pony, the Abstract Factory acts as an immutable forge (`val`). Once cast, its blueprints cannot be tainted by concurrent invocations, ensuring perfectly woven artifact families across actor boundaries.
