---
title: "The Template Method Hex"
description: "Defining the skeletal framework of an arcane ritual."
type: nix
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # The Template Method
    mkStandardDerivation = hooks: {
      name = hooks.name or "unknown-spell";
      
      # The fixed algorithm skeleton
      execute = ''
        ''${hooks.preBuild or "echo 'Preparing the circle...'"}
        ''${hooks.buildPhase or "echo 'Chanting default incantation...'"}
        ''${hooks.postBuild or "echo 'Sealing the circle.'"}
      '';
    };

    # Concrete Implementations overriding hooks
    fireballSpell = mkStandardDerivation {
      name = "Fireball";
      buildPhase = "echo 'Ignis!'";
    };
  in
  fireballSpell.execute
tags: [behavioral, template-method, nix, frameworks]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method defines the skeleton of an algorithm, deferring some steps to subclasses or overrides. Nix's `stdenv.mkDerivation` is a prime example: it provides a rigid phased structure (`preBuild`, `buildPhase`, etc.) that builders can optionally override.
