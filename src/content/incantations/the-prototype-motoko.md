---
title: The Prototype Hex
description: Cloning an existing actor's memory state to manifest a spectral duplicate.
type: motoko
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Actor Model Hexes"
formula: |2
  module Prototype {
    public type SpectralClone = {
      clone : () -> SpectralClone;
      haunt : () -> async Text;
      setTarget : (Text) -> ();
    };
  
    public class Phantom(initialTarget : Text) {
      var currentTarget : Text = initialTarget;
  
      public func haunt() : async Text {
        "Haunting " # currentTarget;
      };
  
      public func setTarget(t : Text) : () {
        currentTarget := t;
      };
  
      public func clone() : SpectralClone {
        Phantom(currentTarget); // Duplicate the current spectral state
      };
    };
  
    public actor Phylactery {
      var templatePhantom = Phantom("The Unworthy");
  
      public func unleashSwarm() : async [SpectralClone] {
        let clone1 = templatePhantom.clone();
        let clone2 = templatePhantom.clone();
        
        clone2.setTarget("The Innocent");
        
        [clone1, clone2];
      };
    };
  }
tags: [motoko, creational, prototype, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Prototype Hex enables the duplication of complex, stateful apparitions without running through their original, potentially expensive summoning rites. By relying on a `clone` method, new instances are torn directly from the astral fabric of an existing phantom.
