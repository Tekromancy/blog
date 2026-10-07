---
title: The Decorator Hex
description: Dynamically layering additional volatile effects onto existing spells.
type: motoko
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Evocation // Actor Model Hexes"
formula: |2
  module Decorator {
    public type Spell = {
      damage : () -> Nat;
      description : () -> Text;
    };
  
    public class BaseMissile() {
      public func damage() : Nat { 10 };
      public func description() : Text { "Magic Missile" };
    };
  
    // The Decorator
    public class PoisonCoating(baseSpell : Spell) {
      public func damage() : Nat {
        baseSpell.damage() + 5;
      };
      public func description() : Text {
        baseSpell.description() # " (Poisoned)";
      };
    };
  
    public class EchoRune(baseSpell : Spell) {
      public func damage() : Nat {
        baseSpell.damage() * 2;
      };
      public func description() : Text {
        "Echoing " # baseSpell.description();
      };
    };
  
    public actor Sorcerer {
      public func castEnhancedMissile() : async (Text, Nat) {
        let rawMissile = BaseMissile();
        let poisonedMissile = PoisonCoating(rawMissile);
        let deadlyMissile = EchoRune(poisonedMissile);
        
        (deadlyMissile.description(), deadlyMissile.damage())
      };
    };
  }
tags: [motoko, structural, decorator, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Decorator Hex allows spells to be dynamically encased in concentric rings of augmentation. Without altering the original `BaseMissile`, we layer poison and echo effects, compounding their arcane outputs seamlessly.
