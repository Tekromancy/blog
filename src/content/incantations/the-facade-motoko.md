---
title: The Facade Hex
description: Providing a simplified arcane interface to a chaotic network of magical sub-systems.
type: motoko
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Actor Model Hexes"
formula: |2
  module Facade {
    class LeylineGrid() {
      public func siphonMana() : Nat { 100 };
    };
  
    class AstralShields() {
      public func raiseShields(mana : Nat) : Bool { mana >= 50 };
    };
  
    class CelestialWeaponry() {
      public func chargeCannons(mana : Nat) : Text { "Cannons Charged!" };
    };
  
    // The Facade
    public class FortressDefenseMatrix() {
      let grid = LeylineGrid();
      let shields = AstralShields();
      let cannons = CelestialWeaponry();
  
      public func executeLockdown() : async Text {
        let mana = grid.siphonMana();
        let shieldStatus = shields.raiseShields(mana);
        if (shieldStatus) {
          cannons.chargeCannons(mana / 2);
        } else {
          "Lockdown Failed: Insufficient Mana!";
        }
      };
    };
  
    public actor Citadel {
      let matrix = FortressDefenseMatrix();
  
      public func incomingAttack() : async Text {
        await matrix.executeLockdown();
      };
    };
  }
tags: [motoko, structural, facade, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Facade Hex hides the terrifying complexity of managing leyline mana pools, astral shielding, and celestial weapons. The `Citadel` actor interacts solely with the simplified `FortressDefenseMatrix` to secure its perimeter.
