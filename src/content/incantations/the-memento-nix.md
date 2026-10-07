---
title: "The Memento Hex"
description: "Capturing and restoring the pure state of an arcane grimoire."
type: nix
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # Originator State
    mkState = grimoire: mana: { inherit grimoire mana; };

    # Save state (create Memento)
    saveState = state: { _memento = state; };

    # Restore state (restore from Memento)
    restoreState = memento: memento._memento;

    # Evolution of state
    initial = mkState "Novice" 10;
    memento1 = saveState initial;
    
    evolved = mkState "Adept" 50;
    memento2 = saveState evolved;
    
    # Rolling back
    rolledBack = restoreState memento1;
  in
  {
    inherit evolved rolledBack;
  }
tags: [behavioral, memento, nix, snapshots]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Because Nix attributes are immutable, every bound state is effectively a Memento. However, structurally organizing previous generations or configuration snapshots allows for safe rollbacks. This is the exact philosophy behind NixOS generations.
