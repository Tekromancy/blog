---
title: The Iterator Hex
description: Traversing a forbidden collection of cursed artifacts without exposing its underlying structure.
type: motoko
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Actor Model Hexes"
formula: |2
  module Iterator {
    public type Iterator<T> = {
      hasNext : () -> Bool;
      next : () -> ?T;
    };
  
    public class RelicVault(relics : [Text]) {
      public func createIterator() : Iterator<Text> {
        var currentIndex : Nat = 0;
        
        object {
          public func hasNext() : Bool {
            currentIndex < relics.size();
          };
          
          public func next() : ?Text {
            if (currentIndex < relics.size()) {
              let item = relics[currentIndex];
              currentIndex += 1;
              ?item;
            } else {
              null;
            }
          };
        }
      };
    };
  
    public actor Archaeologist {
      let vault = RelicVault(["Cursed Amulet", "Bone Dagger", "Void Chalice"]);
  
      public func inspectVault() : async [Text] {
        let iter = vault.createIterator();
        var found : [Text] = [];
        
        while (iter.hasNext()) {
          switch (iter.next()) {
            case (?relic) {
              found := Array.append(found, [relic]);
            };
            case (null) {};
          };
        };
        found;
      };
    };
  }
tags: [motoko, behavioral, iterator, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator Hex allows a mage to sequence through the elements of a `RelicVault` without knowing whether it is a flat array, a linked grimoire, or a dimensional pocket. The iteration logic is cleanly decoupled from the collection itself.
