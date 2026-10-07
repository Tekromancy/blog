---
title: The Composite Hex
description: Treating individual enchantments and complex chained hexes uniformly.
type: motoko
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Actor Model Hexes"
formula: |2
  module Composite {
    public type Enchantment = {
      trigger : () -> async Nat;
    };
  
    public class SimpleCurse(damage : Nat) {
      public func trigger() : async Nat {
        damage;
      };
    };
  
    public class CurseCluster(curses : [Enchantment]) {
      public func trigger() : async Nat {
        var total : Nat = 0;
        for (curse in curses.vals()) {
          total += await curse.trigger();
        };
        total;
      };
    };
  
    public actor Warlock {
      public func castUltimateDoom() : async Nat {
        let minorCurse = SimpleCurse(10);
        let majorCurse = SimpleCurse(50);
        let swarm = CurseCluster([minorCurse, majorCurse]);
        
        let doom = CurseCluster([swarm, SimpleCurse(100)]);
        await doom.trigger(); // Cascades through the tree
      };
    };
  }
tags: [motoko, structural, composite, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite Hex defines a recursive, tree-like structure of magic. A single `SimpleCurse` or a sprawling `CurseCluster` containing other clusters both implement the `Enchantment` interface. The actor triggers the root, and the devastation cascades down the branches.
