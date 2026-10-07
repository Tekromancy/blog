---
title: The Relay Chain of Responsibility
description: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.
type: javascript
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Divination // Leyline Routing
formula: |
  class MagicalHandler {
    setNext(handler) {
      this.nextHandler = handler;
      return handler;
    }
    handle(threatLevel) {
      if (this.nextHandler) {
        return this.nextHandler.handle(threatLevel);
      }
      return null;
    }
  }
  
  class Acolyte extends MagicalHandler {
    handle(threatLevel) {
      if (threatLevel <= 2) { return "Acolyte neutralizes the minor threat."; }
      return super.handle(threatLevel);
    }
  }
  
  class Mage extends MagicalHandler {
    handle(threatLevel) {
      if (threatLevel <= 5) { return "Mage banishes the moderate threat."; }
      return super.handle(threatLevel);
    }
  }
  
  class Archmage extends MagicalHandler {
    handle(threatLevel) {
      if (threatLevel > 5) { return "Archmage annihilates the severe threat!"; }
      return super.handle(threatLevel);
    }
  }
  
  const acolyte = new Acolyte();
  const mage = new Mage();
  const archmage = new Archmage();
  acolyte.setNext(mage).setNext(archmage);
  
  console.log(acolyte.handle(4));
  console.log(acolyte.handle(10));
tags: [chain, routing, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Relay Chain of Responsibility

When a magical anomaly occurs, it ripples through the hierarchy. The Acolyte attempts to dispel it; if they fail, the Mage steps in, followed by the Archmage.
