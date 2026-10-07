---
title: "The Singleton Hex"
description: "Leveraging laziness to ensure a resource is only evaluated once."
type: nix
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Pure Environment Hexes"
formula: |2
  let
    # In Nix, laziness and immutability naturally create Singletons.
    # The evaluation of `leyLineNexus` happens exactly once when forced,
    # and the result is cached for all subsequent references.
    leyLineNexus = let
      initializeNexus = builtins.trace "Initializing the singular Ley Line Nexus..." {
        power = "infinite";
        status = "stable";
      };
    in initializeNexus;

    mageA = leyLineNexus;
    mageB = leyLineNexus;
  in
  # Both mages reference the exact same nexus in memory.
  { inherit mageA mageB; }
tags: [creational, singleton, nix, laziness]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton pattern in an immutable, purely functional language like Nix is an inherent property of the evaluation model. Due to lazy evaluation, an expression bound to a variable is evaluated at most once. Once instantiated, its value is universally shared across all callers in the environment.
