---
title: The Adapter Hex
description: Bridging incompatible magical frequencies to allow disparate actors to communicate.
type: motoko
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Actor Model Hexes"
formula: |2
  module Adapter {
    // Target interface expected by modern spellcasters
    public type ModernWand = {
      castSpell : () -> async Text;
    };
  
    // The Adaptee: an ancient relic with incompatible syntax
    public class AncientStaff() {
      public func invokeAncientRune() : async Text {
        "Dovahkiin! (Ancient Rune Invoked)";
      };
    };
  
    // The Adapter matching the target interface
    public class StaffAdapter(staff : AncientStaff) {
      public func castSpell() : async Text {
        // Translates the modern request into the ancient invocation
        await staff.invokeAncientRune();
      };
    };
  
    public actor WizardTower {
      let oldStaff = AncientStaff();
      let adaptedWand : ModernWand = StaffAdapter(oldStaff);
  
      public func duel() : async Text {
        await adaptedWand.castSpell();
      };
    };
  }
tags: [motoko, structural, adapter, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter Hex translates the esoteric and archaic interfaces of ancient magical artifacts into standard protocols understood by contemporary actors. It safely wraps an `AncientStaff` so it can be wielded as a `ModernWand` without shattering the space-time continuum.
