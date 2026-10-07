---
title: The Strategy
description: Swapping combat algorithms mid-battle using enums
type: haxe
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Casting"
formula: |2
  // Haxe ADT magic for Strategy
  enum CombatTactic {
      Aggressive(power:Int);
      Defensive(shield:Int);
      Evasive;
  }

  class Tactician {
      public var strategy:CombatTactic;

      public function new(strategy:CombatTactic) {
          this.strategy = strategy;
      }

      public function executeTurn():Void {
          switch (strategy) {
              case Aggressive(power):
                  trace('Attacking recklessly with $power damage!');
              case Defensive(shield):
                  trace('Raising barriers blocking $shield damage!');
              case Evasive:
                  trace('Dodging into the ethereal plane!');
          }
      }
  }
tags: [evocation, strategy, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

While traditional OOP Strategy uses interfaces, Haxe's robust enums (Algebraic Data Types) provide a much more functional, idiomatic approach. Swapping a tactic changes the pattern matching behavior instantly without the overhead of heavy class inheritance.
