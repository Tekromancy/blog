---
title: The Observer Hex
description: Establishing a one-to-many dependency so that when a planetary alignment shifts, all bound familiars are notified.
type: motoko
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Actor Model Hexes"
formula: |2
  module Observer {
    public type Observer = {
      update : (Text) -> ();
    };
  
    public class Astrolabe() {
      var observers : [Observer] = [];
      var currentAlignment : Text = "Neutral";
  
      public func attach(obs : Observer) : () {
        observers := Array.append(observers, [obs]);
      };
  
      public func setAlignment(alignment : Text) : () {
        currentAlignment := alignment;
        notifyAll();
      };
  
      func notifyAll() : () {
        for (obs in observers.vals()) {
          obs.update(currentAlignment);
        };
      };
    };
  
    public class OwlFamiliar() {
      var reaction : Text = "Sleeping";
      
      public func update(alignment : Text) : () {
        reaction := "Hooting at " # alignment;
      };
      
      public func getReaction() : Text { reaction };
    };
  
    public actor Observatory {
      public func celestialEvent() : async Text {
        let astrolabe = Astrolabe();
        let owl = OwlFamiliar();
        
        astrolabe.attach(owl);
        astrolabe.setAlignment("Blood Moon");
        
        owl.getReaction(); // "Hooting at Blood Moon"
      };
    };
  }
tags: [motoko, behavioral, observer, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer Hex forms a sympathetic link between a central subject (the `Astrolabe`) and its dependents (the `Observers`). When the celestial alignment shifts, the Astrolabe iterates through its registries, automatically triggering the reactive instincts of all connected familiars.
