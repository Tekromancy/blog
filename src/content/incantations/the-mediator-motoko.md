---
title: The Mediator Hex
description: Centralizing complex communications between chaotic magical components.
type: motoko
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Actor Model Hexes"
formula: |2
  module Mediator {
    public type Colleague = {
      receiveMessage : (Text) -> ();
      setMediator : (Mediator) -> ();
    };
  
    public type Mediator = {
      notify : (Colleague, Text) -> ();
    };
  
    public class FireElemental(name : Text) {
      var med : ?Mediator = null;
      var lastMessage : Text = "";
  
      public func setMediator(m : Mediator) : () { med := ?m; };
      public func receiveMessage(msg : Text) : () { lastMessage := msg; };
      
      public func spark() : () {
        switch(med) {
          case (?m) { m.notify(this, "I have sparked!"); };
          case (null) {};
        };
      };
      
      public func report() : Text { lastMessage };
    };
  
    public class RitualCircle() {
      var fire1 : ?FireElemental = null;
      var fire2 : ?FireElemental = null;
  
      public func register(f1 : FireElemental, f2 : FireElemental) : () {
        fire1 := ?f1;
        fire2 := ?f2;
      };
  
      public func notify(sender : Colleague, event : Text) : () {
        // If fire1 sparked, notify fire2
        // Simplification due to object identity constraints in Motoko,
        // we'd typically use IDs to compare sender.
        switch(fire2) {
          case (?f) { f.receiveMessage("Other sparked: " # event); };
          case (null) {};
        };
      };
    };
  
    public actor SummoningChamber {
      public func performRitual() : async Text {
        let f1 = FireElemental("Ignis");
        let f2 = FireElemental("Cinder");
        
        let circle = RitualCircle();
        circle.register(f1, f2);
        
        f1.setMediator(circle);
        f2.setMediator(circle);
        
        f1.spark();
        
        f2.report(); // Will show that it was notified by the circle
      };
    };
  }
tags: [motoko, behavioral, mediator, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To prevent elemental summons from cross-communicating in an explosive, tight-coupled web, the Mediator Hex funnels all state changes through a central `RitualCircle`. The elementals do not know of each other; they merely speak to the circle, which orchestrates the ritual safely.
