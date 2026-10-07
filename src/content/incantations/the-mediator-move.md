---
title: The Mediator of Magical Treaties
description: Define an object that encapsulates how a set of objects interact, promoting loose coupling in Move.
type: move
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Diplomacy"
formula: |2
  module arcane::mediator {
      struct Registry has key {
          wizards: u64,
          warlocks: u64,
      }
  
      // Mediator function handling interactions between wizards and warlocks via global state
      public fun negotiate_truce(registry_addr: address) acquires Registry {
          let registry = borrow_global_mut<Registry>(registry_addr);
          registry.wizards = registry.wizards + 1;
          registry.warlocks = registry.warlocks + 1;
      }
  }
tags: [behavioral, mediator, move, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
