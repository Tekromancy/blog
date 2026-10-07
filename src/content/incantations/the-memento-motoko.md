---
title: The Memento Hex
description: Capturing and restoring an actor's internal astral state without violating its encapsulation.
type: motoko
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Actor Model Hexes"
formula: |2
  module Memento {
    public type Memento = {
      state : Text;
    };
  
    public class TimeWeaver() {
      var manaState : Text = "Stable";
  
      public func setState(s : Text) : () {
        manaState := s;
      };
  
      public func getState() : Text {
        manaState;
      };
  
      // Save current state to a Memento
      public func save() : Memento {
        { state = manaState };
      };
  
      // Restore state from a Memento
      public func restore(m : Memento) : () {
        manaState := m.state;
      };
    };
  
    public actor ChronoVault {
      let weaver = TimeWeaver();
      var timeline : [Memento] = [];
  
      public func causeParadox() : async Text {
        // Save initial stable state
        timeline := Array.append(timeline, [weaver.save()]);
        
        // Cause chaos
        weaver.setState("Paradoxical Chaos");
        let chaosState = weaver.getState();
        
        // Rewind time
        if (timeline.size() > 0) {
          weaver.restore(timeline[0]);
        };
        
        "Went from " # chaosState # " back to " # weaver.getState();
      };
    };
  }
tags: [motoko, behavioral, memento, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Memento Hex allows a Chronomancer to save snapshots of the volatile weave. By delegating the state storage into an immutable `Memento` struct, the original `TimeWeaver` class can safely revert to prior timelines while hiding its internal mechanics from the `ChronoVault` caretaker.
