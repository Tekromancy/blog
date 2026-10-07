---
title: "The Decorator Hex"
description: "Dynamically wrapping derivations to add behaviors."
type: nix
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Pure Environment Hexes"
formula: |2
  let
    # Base component
    baseDerivation = {
      name = "pure-core";
      buildInputs = [ "gcc" ];
    };

    # Decorator 1: Add debug symbols
    withDebug = drv: drv // {
      name = "''${drv.name}-debug";
      buildInputs = drv.buildInputs ++ [ "gdb" ];
    };

    # Decorator 2: Add profiling
    withProfiling = drv: drv // {
      name = "''${drv.name}-profiled";
      buildInputs = drv.buildInputs ++ [ "valgrind" ];
    };

    # Composition of decorators
    finalDerivation = withProfiling (withDebug baseDerivation);
  in
  finalDerivation
tags: [structural, decorator, nix, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator pattern in Nix is executed via function composition and attribute updates. Instead of modifying the base derivation directly, wrappers augment the inputs and attributes, effectively composing new magical properties on top of the original hermetic seal.
