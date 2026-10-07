---
title: The Abstract Factory of Resource Safe Runes
description: Forge families of related magical resources using abstract factories in Move.
type: move
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Runesmithing"
formula: |2
  module arcane::abstract_factory {
      struct Rune<phantom Element> has store, drop { power: u64 }
      
      struct Fire {}
      struct Ice {}
  
      struct Forge<phantom Element> has key, store {
          base_power: u64
      }
  
      public fun forge_rune<Element>(forge: &Forge<Element>): Rune<Element> {
          Rune { power: forge.base_power }
      }
  }
tags: [creational, abstract-factory, move, runes, resources]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
