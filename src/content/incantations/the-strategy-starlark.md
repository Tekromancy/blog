---
title: The Strategy
description: Swapping algorithms for artifact synthesis dynamically.
type: starlark
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Planning"
formula: |2
  def fast_build_strategy(srcs):
      return ["fast_compile: " + s for s in srcs]
      
  def optimized_build_strategy(srcs):
      return ["heavy_compile: " + s for s in srcs]
      
  def build_project(srcs, strategy_func):
      # The core context delegates the actual synthesis to the injected strategy
      print("Preparing workspace...")
      artifacts = strategy_func(srcs)
      return artifacts
  
  # Usage
  debug_mode = True
  active_strategy = fast_build_strategy if debug_mode else optimized_build_strategy
  
  outputs = build_project(["core.c", "math.c"], active_strategy)
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Strategy** pattern leverages Starlark's support for first-class functions. Instead of nesting deep `if/else` statements to handle debug versus release builds, the Archmage simply passes the desired compilation algorithm as a function pointer to the core rule. This isolates the tactical algorithmic logic from the structural workspace preparation, ensuring that new strategies can be invoked without modifying the primary invocation spell.
