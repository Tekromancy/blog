---
title: The Singleton Hex
description: Ensuring only one definitive instance of an ancient relic exists within an actor's realm.
type: motoko
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Actor Model Hexes"
formula: |2
  module Singleton {
    // In Motoko, an actor itself is a singleton by nature.
    // However, if we need a shared internal singleton inside an actor:
    public type Chronosphere = {
      getTime : () -> Nat;
      tick : () -> ();
    };
  
    // We encapsulate the singleton in a module-level instantiation 
    // or through an actor's stable state.
    actor AbsoluteChronosphere {
      var time : Nat = 0;
  
      public func getTime() : async Nat {
        time;
      };
  
      public func tick() : async () {
        time += 1;
      };
    };
  }
tags: [motoko, creational, singleton, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Within the Motoko paradigm, an `actor` inherently behaves as a Singleton. It processes messages sequentially and holds exclusive control over its isolated memory state. The Absolute Chronosphere cannot be duplicated within its canister, ensuring perfect syncronization.
