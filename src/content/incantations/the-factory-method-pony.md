---
title: The Factory Method Ward
description: Deferring instantiation to specialized actor-model forges.
type: pony
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Sub-forging"
formula: |2
  trait val SpellCrafter
    fun craft(): Spell iso^

  class val FireCrafter is SpellCrafter
    fun craft(): Spell iso^ => recover FireSpell end
tags: [pony, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Factory Method Ward

By defining a factory interface as `val`, actors can safely share the crafter and concurrently produce isolated (`iso`) spells.
