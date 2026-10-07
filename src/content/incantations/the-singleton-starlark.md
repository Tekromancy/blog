---
title: The Singleton
description: Establishing universal truth within a Starlark evaluation phase.
type: starlark
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Constants"
formula: |2
  # Starlark files are evaluated exactly once per build phase.
  # Top-level variables inherently act as singletons for the loading phase.
  
  _global_mana_pool = {"current": 1000, "max": 1000}
  
  def get_mana_pool():
      return _global_mana_pool
      
  def consume_mana(amount):
      if _global_mana_pool["current"] >= amount:
          _global_mana_pool["current"] -= amount
          return True
      return False
tags: [creational, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

True singletons spanning an entire distributed build are impossible by design in hermetic systems. However, during the loading phase of a Starlark environment, the module itself enforces the **Singleton** pattern. A `.bzl` file is evaluated exactly once, and its exported symbols are cached and shared across all files that load it. We utilize module-level dictionaries to maintain stateful singletons (where permitted by the host environment, though many dialects freeze them post-load).
