---
title: "The Builder Hex"
description: "Step-by-step construction of complex derivation rituals."
type: nix
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Pure Environment Hexes"
formula: |2
  let
    # The Builder constructs complex enchantments step-by-step
    spellBuilder = initialAttrs: {
      addMaterial = material: spellBuilder (initialAttrs // { materials = initialAttrs.materials ++ [ material ]; });
      addIncantation = word: spellBuilder (initialAttrs // { words = initialAttrs.words ++ [ word ]; });
      build = initialAttrs;
    };

    emptySpell = { materials = []; words = []; };
    
    # Director
    fireballBuilder = spellBuilder emptySpell;
    
    fireballSpell = fireballBuilder
      .addMaterial "Bat Guano"
      .addMaterial "Sulfur"
      .addIncantation "Ignis!"
      .build;
  in
    fireballSpell
tags: [creational, builder, nix, pipelines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Through pure functional updates, the Builder Hex accumulates state across sequential applications. In the realm of Nix, this is often seen in `overrideAttrs` chains or module systems, allowing deep customization of derivations before their final evaluation.
