---
title: The Abstract Factory
description: Cross-Realm Transmutation of Families of Runes
type: haxe
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Transmutation // Cross-Realm"
formula: |2
  interface ISpell {
      public function cast():Void;
  }

  interface IWand {
      public function channel():Void;
  }

  interface IArcaneFactory {
      public function createSpell():ISpell;
      public function createWand():IWand;
  }

  class FireSpell implements ISpell {
      public function new() {}
      public function cast():Void { trace("Casting Pyromancy across the planes!"); }
  }

  class FireWand implements IWand {
      public function new() {}
      public function channel():Void { trace("Channeling heat energy..."); }
  }

  class FireMageFactory implements IArcaneFactory {
      public function new() {}
      public function createSpell():ISpell { return new FireSpell(); }
      public function createWand():IWand { return new FireWand(); }
  }

  class Client {
      public static function evoke(factory:IArcaneFactory) {
          var spell = factory.createSpell();
          var wand = factory.createWand();
          wand.channel();
          spell.cast();
      }
  }
tags: [transmutation, abstract-factory, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through Cross-Realm Transmutation, the Abstract Factory guarantees that the runes inscribed in one plane remain compatible when ported to another. We bind spells and wands to a singular planar factory, ensuring type-safe magic regardless of the target runtime.
