---
title: The Abstract Factory Hex
description: Summoning related families of actor hexes without specifying their concrete demonic origins.
type: motoko
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Actor Model Hexes"
formula: |2
  module AbstractFactory {
    public type ActorHex = {
      invoke : () -> async Text;
    };
  
    public type HexFactory = {
      createCurse : () -> ActorHex;
      createBlessing : () -> ActorHex;
    };
  
    public class DemonHexFactory() {
      public func createCurse() : ActorHex {
        object {
          public func invoke() : async Text { "Hellfire Curse Invoked!" };
        }
      };
      public func createBlessing() : ActorHex {
        object {
          public func invoke() : async Text { "Dark Boon Granted!" };
        }
      };
    };
  
    public class CelestialHexFactory() {
      public func createCurse() : ActorHex {
        object {
          public func invoke() : async Text { "Holy Smite Invoked!" };
        }
      };
      public func createBlessing() : ActorHex {
        object {
          public func invoke() : async Text { "Divine Shield Granted!" };
        }
      };
    };
  }
tags: [motoko, creational, abstract-factory, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory Hex allows a summoner to forge complete families of associated actor hexes. Whether weaving demonic curses or celestial blessings, the client actor remains isolated from the specific sigil implementations, interacting purely through the `HexFactory` interface.
