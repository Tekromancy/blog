---
title: The Flyweight
description: Caching immutable data structures to preserve memory during massive graph evaluations.
type: starlark
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Abjuration // Efficiency"
formula: |2
  # A cache residing at the module level
  _toolchain_config_cache = {}
  
  def get_toolchain_config(arch, opt_level):
      key = "%s_%s" % (arch, opt_level)
      if key not in _toolchain_config_cache:
          # Simulate expensive computation or heavy struct creation
          flags = ["-m" + arch, "-O" + str(opt_level)]
          if opt_level > 2:
              flags.append("-finline-functions")
          _toolchain_config_cache[key] = struct(
              architecture = arch,
              optimization = opt_level,
              compiler_flags = tuple(flags) # Tuples are immutable
          )
      return _toolchain_config_cache[key]
  
  # Usage
  c1 = get_toolchain_config("x86_64", 3)
  c2 = get_toolchain_config("x86_64", 3)
  # c1 and c2 refer to the exact same struct in memory
tags: [structural, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In a massive Bazel workspace, evaluating the BUILD files can instantiate millions of strings and configurations. The **Flyweight** pattern prevents memory bloat by caching heavily reused, immutable structures (like toolchain configurations or common compiler flags) at the module level. Because Starlark enforces immutability on returned data, these cached structs can be shared across the entire build graph without fear of accidental corruption.
