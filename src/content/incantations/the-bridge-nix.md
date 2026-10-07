---
title: "The Bridge Hex"
description: "Decoupling abstraction from implementation in pure expressions."
type: nix
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Pure Environment Hexes"
formula: |2
  let
    # Implementations (The Backend Systems)
    linuxEnv = { buildCommand = "make linux"; };
    darwinEnv = { buildCommand = "make darwin"; };

    # Abstractions (The Frontend Interfaces)
    # The abstraction holds a reference to the implementation (the bridge)
    standardSpell = impl: {
      cast = "Executing standard build: ''${impl.buildCommand}";
    };

    empoweredSpell = impl: {
      cast = "Executing empowered build with superuser rights: sudo ''${impl.buildCommand}";
    };
  in
  {
    linuxStandard = (standardSpell linuxEnv).cast;
    darwinEmpowered = (empoweredSpell darwinEnv).cast;
  }
tags: [structural, bridge, nix, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By passing the implementation as an argument to the abstraction, the Bridge pattern prevents a Cartesian explosion of variations. This approach is highly useful when managing multiple platforms (Linux, Darwin) across various operational profiles.
