---
title: The Strategy Hex
description: Defining a family of interchangeable combat tactics, allowing the wielder to switch algorithms at runtime.
type: motoko
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Actor Model Hexes"
formula: |2
  module Strategy {
    public type CombatStrategy = {
      execute : (Nat, Nat) -> Nat;
    };
  
    public class AggressiveTactics() {
      public func execute(a : Nat, b : Nat) : Nat {
        a + b; // Maximize output
      };
    };
  
    public class DefensiveTactics() {
      public func execute(a : Nat, b : Nat) : Nat {
        if (a > b) { a - b } else { 0 }; // Minimize loss
      };
    };
  
    public class Warlord(strategy : CombatStrategy) {
      var currentStrategy = strategy;
  
      public func setStrategy(newStrategy : CombatStrategy) : () {
        currentStrategy := newStrategy;
      };
  
      public func clash(forcesA : Nat, forcesB : Nat) : Nat {
        currentStrategy.execute(forcesA, forcesB);
      };
    };
  
    public actor Battlefield {
      public func simulateWar() : async (Nat, Nat) {
        let warlord = Warlord(AggressiveTactics());
        let aggressiveResult = warlord.clash(100, 50);
        
        warlord.setStrategy(DefensiveTactics());
        let defensiveResult = warlord.clash(100, 50);
        
        (aggressiveResult, defensiveResult);
      };
    };
  }
tags: [motoko, behavioral, strategy, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Strategy Hex isolates combat algorithms from the actors that utilize them. The `Warlord` need not be burdened with the mathematical complexities of aggression or defense; instead, they swap interchangeable `CombatStrategy` objects to adapt to the shifting tides of war.
