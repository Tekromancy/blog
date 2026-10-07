---
title: "The Iterator Hex"
description: "Traversing pure collections to accumulate magical power."
type: nix
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # The collection of arcane seals
    seals = [ "Fire" "Water" "Earth" "Air" ];
    
    # The Iterator (folding over a list in Nix is our natural iterator)
    # Here we use builtins.foldl' as our iterator mechanism to accumulate power.
    iterateSeals = builtins.foldl' (acc: seal: acc + " -> " + seal) "Void" seals;
  in
  iterateSeals
tags: [behavioral, iterator, nix, lists, folds]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In Nix, the Iterator pattern is fundamentally embedded in its functional list processing functions like `map` and `foldl'`. Instead of manually managing an external state cursor, the archmage delegates the traversal to pure functional folds.
