---
title: The Factory Method Hex
description: Delegating the instantiation of specific magical familiars to subclass logic.
type: motoko
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Actor Model Hexes"
formula: |2
  module FactoryMethod {
    public type Familiar = {
      speak : () -> async Text;
    };
  
    public type Summoner = {
      summonFamiliar : () -> Familiar;
    };
  
    public class RavenSummoner() {
      public func summonFamiliar() : Familiar {
        object {
          public func speak() : async Text { "Nevermore." };
        }
      };
    };
  
    public class ImpSummoner() {
      public func summonFamiliar() : Familiar {
        object {
          public func speak() : async Text { "Your soul is mine!" };
        }
      };
    };
  
    public actor Grimoire {
      public func performRitual(summoner : Summoner) : async Text {
        let familiar = summoner.summonFamiliar();
        await familiar.speak();
      };
    };
  }
tags: [motoko, creational, factory-method, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A foundational incantation. The Factory Method defines an interface for creating an object, but leaves the choice of its type to the specific sub-classes or implementations. The `Grimoire` actor can perform rituals without needing to know what specific familiar it summons.
