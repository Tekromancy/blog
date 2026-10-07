---
title: The State Hex
description: Allowing a cursed object to drastically alter its behavior when its internal demonic alignment shifts.
type: motoko
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Actor Model Hexes"
formula: |2
  module StatePattern {
    public type State = {
      attack : () -> Text;
    };
  
    public class DormantState() {
      public func attack() : Text { "The blade is dull and slumbers." };
    };
  
    public class AwakenedState() {
      public func attack() : Text { "The blade hungers! It drinks soul essence!" };
    };
  
    public class CursedSword() {
      var state : State = DormantState();
  
      public func setState(newState : State) : () {
        state := newState;
      };
  
      public func strike() : Text {
        state.attack();
      };
    };
  
    public actor DeathKnight {
      let blade = CursedSword();
  
      public func engageCombat() : async (Text, Text) {
        let firstStrike = blade.strike(); // Dormant
        
        // The blood of the first strike awakens the demon inside
        blade.setState(AwakenedState());
        
        let secondStrike = blade.strike(); // Awakened
        
        (firstStrike, secondStrike);
      };
    };
  }
tags: [motoko, behavioral, state, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The State Hex embeds polymorphism directly into an actor's lifecycle. Rather than managing complex `if-else` runes to determine the sword's behavior based on an internal boolean, the `CursedSword` delegates its actions entirely to interchangeable `State` objects.
