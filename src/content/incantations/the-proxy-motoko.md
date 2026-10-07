---
title: The Proxy Hex
description: Placing a protective or lazy-loading astral veil over a sensitive magical artifact.
type: motoko
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Actor Model Hexes"
formula: |2
  module Proxy {
    public type Oracle = {
      scry : (Text) -> async Text;
    };
  
    public class AncientOracle() {
      public func scry(target : Text) : async Text {
        // Expensive computation / network call
        "The future of " # target # " is bleak.";
      };
    };
  
    public class OracleProxy(accessCode : Text) {
      var realOracle : ?AncientOracle = null;
  
      public func scry(target : Text) : async Text {
        if (accessCode != "open sesame") {
          return "Access Denied: Invalid sigil.";
        };
  
        // Lazy initialization
        let oracle = switch (realOracle) {
          case (null) {
            let o = AncientOracle();
            realOracle := ?o;
            o;
          };
          case (?o) { o };
        };
  
        await oracle.scry(target);
      };
    };
  
    public actor DivinationTower {
      let protectedOracle = OracleProxy("open sesame");
  
      public func queryDestiny() : async Text {
        await protectedOracle.scry("The Empire");
      };
    };
  }
tags: [motoko, structural, proxy, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy Hex establishes a surrogate for an object, controlling access to it. In this grimoire entry, the `OracleProxy` ensures that only mages with the correct access code can consult the `AncientOracle`, which is instantiated only upon successful verification to conserve mana.
