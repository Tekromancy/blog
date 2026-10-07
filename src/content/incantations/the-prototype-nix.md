---
title: "The Prototype Hex"
description: "Cloning and mutating base definitions into new magical entities."
type: nix
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Pure Environment Hexes"
formula: |2
  let
    # Base prototype
    baseFamiliar = {
      species = "spirit";
      health = 100;
      mana = 50;
      # The cloning mechanism (Nix's `//` update operator)
      clone = self: overrides: self // overrides;
    };

    # Cloning and modifying the prototype
    ravenFamiliar = baseFamiliar.clone baseFamiliar {
      species = "raven";
      flight = true;
      stealth = 80;
    };

    shadowCat = baseFamiliar.clone baseFamiliar {
      species = "cat";
      stealth = 100;
    };
  in
  [ ravenFamiliar shadowCat ]
tags: [creational, prototype, nix, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In Nix, the Prototype pattern is pervasive. The `//` operator serves as the ultimate cloner, merging base attribute sets with new overrides. This technique is identical to how derivations are often cloned and modified via `override` or `overrideAttrs`.
