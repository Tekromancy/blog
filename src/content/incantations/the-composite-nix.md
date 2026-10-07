---
title: "The Composite Hex"
description: "Treating individual derivations and compositions of derivations uniformly."
type: nix
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Pure Environment Hexes"
formula: |2
  let
    # Leaf component
    mkMaterial = name: {
      type = "material";
      inherit name;
      evaluate = "Material: ''${name}";
    };

    # Composite component
    mkSpellbook = name: children: {
      type = "spellbook";
      inherit name children;
      evaluate = "Spellbook ''${name} containing: [" + 
        (builtins.concatStringsSep ", " (map (c: c.evaluate) children)) + "]";
    };

    # Usage
    manaPotion = mkMaterial "Mana Water";
    healingHerb = mkMaterial "Bloodweed";
    
    restorationKit = mkSpellbook "Restoration" [ manaPotion healingHerb ];
    masterCache = mkSpellbook "Archmage Stash" [ restorationKit (mkMaterial "Phoenix Feather") ];
  in
  masterCache.evaluate
tags: [structural, composite, nix, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern creates tree-like structures where leaves and branches implement the same interface. In Nix, this maps cleanly to nested derivation environments, module imports, or configuration trees that evaluate uniformly.
