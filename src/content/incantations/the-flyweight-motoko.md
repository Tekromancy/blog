---
title: The Flyweight Hex
description: Conserving magical memory by sharing intrinsic arcane state among vast swarms of entities.
type: motoko
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Actor Model Hexes"
formula: |2
  module Flyweight {
    // Intrinsic, shared state
    public type FamiliarEssence = {
      species : Text;
      color : Text;
      aura : Text;
    };
  
    public class EssenceRegistry() {
      var batEssence : ?FamiliarEssence = null;
  
      public func getBatEssence() : FamiliarEssence {
        switch (batEssence) {
          case (null) {
            let e = { species = "Bat"; color = "Black"; aura = "Shadow" };
            batEssence := ?e;
            e;
          };
          case (?e) { e };
        };
      };
    };
  
    // Extrinsic, unique state
    public type SwarmMember = {
      x : Nat;
      y : Nat;
      essence : FamiliarEssence;
    };
  
    public actor VampireLord {
      let registry = EssenceRegistry();
      var swarm : [SwarmMember] = [];
  
      public func spawnBat(x: Nat, y: Nat) : async () {
        let e = registry.getBatEssence();
        let bat : SwarmMember = { x = x; y = y; essence = e };
        swarm := Array.append(swarm, [bat]);
      };
    };
  }
tags: [motoko, structural, flyweight, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When calling forth swarms of bats, replicating their identical traits wastes precious mental weave. The Flyweight Hex extracts the intrinsic `FamiliarEssence` into a shared registry, allowing thousands of actors to merely reference the essence while managing their own unique coordinates.
