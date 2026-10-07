---
title: The Chain of Responsibility Hex
description: Passing a chaotic surge of magic along a sequence of wards until one contains it.
type: motoko
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Actor Model Hexes"
formula: |2
  module ChainOfResponsibility {
    public type Severity = {
      #Minor;
      #Major;
      #Catastrophic;
    };
  
    public type MagicalAnomaly = {
      id : Nat;
      severity : Severity;
    };
  
    public type Ward = {
      handleAnomaly : (MagicalAnomaly) -> async Text;
      setNextWard : (Ward) -> ();
    };
  
    public class BaseWard() {
      var next : ?Ward = null;
  
      public func setNextWard(w : Ward) : () {
        next := ?w;
      };
  
      public func passToNext(anomaly : MagicalAnomaly) : async Text {
        switch (next) {
          case (null) { "Anomaly " # Nat.toText(anomaly.id) # " breached all wards!" };
          case (?w) { await w.handleAnomaly(anomaly) };
        };
      };
    };
  
    public class OuterWard() extends BaseWard() {
      public func handleAnomaly(anomaly : MagicalAnomaly) : async Text {
        if (anomaly.severity == #Minor) {
          "Outer Ward contained minor anomaly " # Nat.toText(anomaly.id);
        } else {
          await passToNext(anomaly);
        }
      };
    };
  
    public class InnerSanctumWard() extends BaseWard() {
      public func handleAnomaly(anomaly : MagicalAnomaly) : async Text {
        if (anomaly.severity == #Major) {
          "Inner Sanctum contained major anomaly " # Nat.toText(anomaly.id);
        } else {
          await passToNext(anomaly);
        }
      };
    };
  
    public actor DefenseGrid {
      let outer = OuterWard();
      let inner = InnerSanctumWard();
      outer.setNextWard(inner);
  
      public func incomingSurge() : async Text {
        let anomaly : MagicalAnomaly = { id = 1; severity = #Major };
        await outer.handleAnomaly(anomaly); // Will be passed to InnerSanctumWard
      };
    };
  }
tags: [motoko, behavioral, chain-of-responsibility, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a magical anomaly strikes an actor's defense grid, the Chain of Responsibility Hex routes the chaotic surge through a series of Wards. Each ward inspects the surge's severity; if it lacks the power to contain it, it delegates the anomaly to the deeper, stronger wards in the chain.
