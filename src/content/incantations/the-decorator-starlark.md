---
title: The Decorator
description: Wrapping build functions with augmented arcane properties.
type: starlark
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  def base_compile_action(src):
      return struct(
          action = "compile",
          src = src,
          execute = lambda: "Compiling %s natively" % src
      )
  
  def with_sandboxing(action_struct):
      """Decorates an action with sandboxing requirements."""
      def _execute():
          print("Establishing hermetic sandbox for %s..." % action_struct.src)
          return action_struct.execute() + " within sandbox"
          
      # We replicate the interface but override behavior
      return struct(
          action = action_struct.action,
          src = action_struct.src,
          execute = _execute,
          sandboxed = True
      )
  
  # Usage
  raw_action = base_compile_action("main.c")
  safe_action = with_sandboxing(raw_action)
tags: [structural, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Decorator** pattern thrives in Starlark. Functions and structs are first-class citizens, meaning one can effortlessly write high-order macro functions that accept a struct and return a mutated or "wrapped" struct. This technique is often used to bolt-on logging, sandboxing, or telemetry to an underlying build rule without altering its core hermetic definition. It is pure functional composition applied to build definitions.
