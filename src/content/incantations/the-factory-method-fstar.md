---
title: The Factory Method of Soul Forging
description: Delegating the instantiation of soul-bound entities to specialized subclasses.
type: fstar
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Soul Forging"
formula: |2
  module FactoryMethod
  
  type soul_type = | Warrior | Mage
  
  type entity = { name: string; power: int }
  
  let create_entity (t: soul_type) : entity =
    match t with
    | Warrior -> { name = "Blade Spirit"; power = 100 }
    | Mage -> { name = "Spell Weaver"; power = 150 }
tags: [factory, instantiation, souls]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Using dependent types and ADTs to represent factory methods for generating various ethereal entities with verified baseline power levels.
