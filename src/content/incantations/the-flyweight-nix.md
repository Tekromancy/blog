---
title: "The Flyweight Hex"
description: "Sharing common state across multiple pure evaluation contexts."
type: nix
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Pure Environment Hexes"
formula: |2
  let
    # The Flyweight Factory (Memoization/Shared state)
    # The common intrinsic state is stored here to prevent duplication.
    sharedCore = {
      system = "x86_64-linux";
      stdenv = "standard-environment-v3";
    };

    # The extrinsic state is combined with the intrinsic flyweight
    createSpell = name: power: {
      inherit name power;
      context = sharedCore;
    };
  in
  [
    (createSpell "Arcane Missile" 10)
    (createSpell "Frost Nova" 25)
    (createSpell "Blink" 5)
  ]
tags: [structural, flyweight, nix, sharing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Flyweight pattern in Nix utilizes the inherent structural sharing of the language. Since memory is immutable, sharing `sharedCore` across thousands of derivations consumes no extra memory during evaluation, optimizing the magical weave.
