---
title: The Decorator
description: Wrapping spells in layers of metamorphic energy
type: haxe
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Metamagic"
formula: |2
  interface IEnchantment {
      public function getEffect():String;
      public function getManaCost():Int;
  }

  class BaseStrike implements IEnchantment {
      public function new() {}
      public function getEffect():String { return "Physical Strike"; }
      public function getManaCost():Int { return 5; }
  }

  class EnchantmentDecorator implements IEnchantment {
      private var wrapped:IEnchantment;
      public function new(wrapped:IEnchantment) { this.wrapped = wrapped; }
      public function getEffect():String { return this.wrapped.getEffect(); }
      public function getManaCost():Int { return this.wrapped.getManaCost(); }
  }

  class FlamingAura extends EnchantmentDecorator {
      public override function getEffect():String {
          return super.getEffect() + " + Fire Damage";
      }
      public override function getManaCost():Int {
          return super.getManaCost() + 10;
      }
  }
tags: [transmutation, decorator, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than creating subclasses for every permutation of `FlamingFrostStrike`, the Decorator dynamically wraps our core runic functions. Metamagic layers can be stacked endlessly, modifying behavior at runtime without bloating the compile targets.
