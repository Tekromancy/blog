---
title: Singleton in ReasonML
description: Module-level global state in a functional world.
type: reason
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Warding"
formula: |2
  module ManaPool = {
    let pool = ref(100);
    let drain = amount => {
      pool := pool^ - amount;
      pool^;
    };
  };
tags: [reason, singleton, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Singleton manifests as a module enclosing a `ref`. It holds the global state of the application's ley lines.
