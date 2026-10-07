---
title: "The Adapter Hex"
description: "Bridging incompatible derivation interfaces."
type: nix
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Pure Environment Hexes"
formula: |2
  let
    # Old Interface: Expects `{ spellName, spellPower }`
    castOldSpell = args: "Casting ''${args.spellName} with power ''${toString args.spellPower}";

    # New Interface Object: Has `{ title, magnitude }`
    modernGrimoireEntry = {
      title = "Quantum Void";
      magnitude = 9000;
    };

    # The Adapter function bridges the new object to the old interface
    adapter = modernObj: {
      spellName = modernObj.title;
      spellPower = modernObj.magnitude;
    };
  in
  castOldSpell (adapter modernGrimoireEntry)
tags: [structural, adapter, nix, interface]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter pattern maps one attribute structure to another. When working with disparate Nixpkgs versions or integrating third-party flakes, adapters become essential transmutation layers, ensuring hermetic purity despite interface evolution.
