---
title: The Visitor Hex
description: Separating an algorithm from the mystical object structure on which it operates.
type: motoko
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Actor Model Hexes"
formula: |2
  module VisitorPattern {
    public type Visitor = {
      visitDemon : (Demon) -> Text;
      visitAngel : (Angel) -> Text;
    };
  
    public type Entity = {
      accept : (Visitor) -> Text;
    };
  
    public class Demon(power : Nat) {
      public func getPower() : Nat { power };
      public func accept(v : Visitor) : Text { v.visitDemon(this) };
    };
  
    public class Angel(grace : Nat) {
      public func getGrace() : Nat { grace };
      public func accept(v : Visitor) : Text { v.visitAngel(this) };
    };
  
    public class SoulReaper() {
      public func visitDemon(d : Demon) : Text {
        "Reaping demon soul worth " # Nat.toText(d.getPower()) # " power.";
      };
      public func visitAngel(a : Angel) : Text {
        "Cannot reap angel with " # Nat.toText(a.getGrace()) # " grace.";
      };
    };
  
    public actor Purgatory {
      public func executeJudgment() : async [Text] {
        let entities : [Entity] = [Demon(666), Angel(777)];
        let reaper = SoulReaper();
        
        var logs : [Text] = [];
        for (e in entities.vals()) {
          logs := Array.append(logs, [e.accept(reaper)]);
        };
        logs;
      };
    };
  }
tags: [motoko, behavioral, visitor, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor Hex is essential when an arcane structure contains numerous heterogeneous entities. Instead of cluttering the `Demon` and `Angel` definitions with the logic for soul reaping, a `SoulReaper` (the Visitor) traverses the collection, and double-dispatch routes the execution to the correct invocation.
