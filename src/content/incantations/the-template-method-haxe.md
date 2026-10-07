---
title: The Template Method
description: Locking down the macro-ritual while overriding the micro
type: haxe
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Structure"
formula: |2
  abstract class GrandRitual {
      public function new() {}

      // The Template Method
      public final function performRitual():Void {
          prepareComponents();
          chant();
          releaseEnergy();
      }

      private function prepareComponents():Void {
          trace("Gathering base mana...");
      }

      // Hooks to be overridden
      abstract private function chant():Void;
      abstract private function releaseEnergy():Void;
  }

  class FireStormRitual extends GrandRitual {
      private function chant():Void {
          trace("Chanting the words of cinder and ash.");
      }
      private function releaseEnergy():Void {
          trace("A massive fireball erupts!");
      }
  }
tags: [evocation, template-method, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Template Method seals the skeleton of an algorithm inside a `final` base function, preventing rogue apprentices from disrupting the critical sequence of operations. Specific hooks like the `chant` and `releaseEnergy` are left `abstract` for safe specialization in subclasses.
