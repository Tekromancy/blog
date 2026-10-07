---
title: The Singleton
description: The solitary nexus of arcane state
type: haxe
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Nexus Ward"
formula: |2
  class ManaLeyline {
      private static var instance:ManaLeyline;
      public var ambientMana:Int;

      private function new() {
          this.ambientMana = 1000;
      }

      public static function getInstance():ManaLeyline {
          if (instance == null) {
              instance = new ManaLeyline();
          }
          return instance;
      }

      public function tap(amount:Int):Bool {
          if (this.ambientMana >= amount) {
              this.ambientMana -= amount;
              return true;
          }
          return false;
      }
  }
tags: [abjuration, singleton, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Singleton ensures only one nexus of a particular mana leyline exists per runtime. Haxe's cross-compilation handles statics cleanly, but beware: overusing Singletons can entangle your runic state, leading to resonance cascades across multiple planes.
