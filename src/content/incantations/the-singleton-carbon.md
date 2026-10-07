---
title: "The Singleton Incantation in Carbon"
description: "Ensure only one instance of a nexus object exists across the entire Carbon matrix."
type: carbon
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Leyline Control"
formula: |2
  package Singleton api;

  // Carbon's approach to global state is heavily restricted by design.
  // We simulate a singleton through module-level variables or static access.
  
  class NexusNode {
    var energy_level: i32;
    
    fn GetPower[me: Self]() -> i32 { return me.energy_level; }
    fn Pulse[addr me: Self*]() { (*me).energy_level += 1; }
  }

  var GlobalNexus: NexusNode = {.energy_level = 100};

  fn GetNexus() -> NexusNode* {
    return &GlobalNexus;
  }
tags: [creational, carbon, global state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Singleton: The Singular Nexus

The old C++ mages abused Singletons, turning their grimoires into tangled webs of global state and order-of-initialization disasters. Carbon, guided by the Successor Pact, frowns upon unchecked globals.

Yet, when a true, unified Leyline Node is required—a single source of truth for the entire application—the pattern remains. In Carbon, we expose this via strict, statically initialized variables and deliberate accessor functions, ensuring that the initialization order is deterministic and memory remains inviolate.
