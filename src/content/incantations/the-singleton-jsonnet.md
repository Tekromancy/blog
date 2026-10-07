---
title: The Singleton of Jsonnet
description: A single source of truth for global configurations.
type: jsonnet
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Isolation"
formula: |2
  local GlobalSettings = {
    appName: "ArcaneApp",
    version: "1.0.0",
    maxConnections: 100
  };

  local ModuleA = {
    settings: GlobalSettings,
    name: "ModuleA"
  };

  local ModuleB = {
    settings: GlobalSettings,
    name: "ModuleB"
  };

  {
    a: ModuleA,
    b: ModuleB
  }
tags: [creational, singleton, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Jsonnet enforces referential transparency. A global object declared as a local variable acts as a Singleton, weaving an identical thread of configuration across multiple constructs.
