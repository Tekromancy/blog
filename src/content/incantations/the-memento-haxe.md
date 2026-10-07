---
title: The Memento
description: Preserving a snapshot of time for timeline rollback
type: haxe
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Reversal"
formula: |2
  class ChronoMemento {
      public var state(default, null):String;
      public function new(state:String) { this.state = state; }
  }

  class Alchemist {
      private var brewState:String = "Water";

      public function new() {}

      public function addReagent(reagent:String):Void {
          brewState += " + " + reagent;
          trace('Current brew: $brewState');
      }

      public function saveToTime():ChronoMemento {
          return new ChronoMemento(brewState);
      }

      public function revertTime(memento:ChronoMemento):Void {
          this.brewState = memento.state;
          trace('Reverted to: $brewState');
      }
  }

  class Chronomancer {
      public static function experiment() {
          var alchemist = new Alchemist();
          alchemist.addReagent("Brimstone");
          var safetySave = alchemist.saveToTime();

          alchemist.addReagent("Unstable Ether"); // BOOM
          alchemist.revertTime(safetySave); // Safe!
      }
  }
tags: [chronomancy, memento, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento safely captures the inner matrix of an object without exposing its internal implementation details. Through Chronomancy, we save the exact permutation of a system and retrieve it if a catastrophic runtime explosion occurs.
