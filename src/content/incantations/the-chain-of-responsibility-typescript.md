---
title: The Chain of Responsibility
description: Passing a spell request along a chain of magical wards and handlers.
type: typescript
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Defense Grid"
formula: |2
  abstract class WardHandler {
    protected next: WardHandler | null = null;
    setNext(handler: WardHandler): WardHandler {
      this.next = handler;
      return handler;
    }
    abstract handle(attackPower: number): string | null;
  }
  
  class KineticWard extends WardHandler {
    handle(attackPower: number) {
      if (attackPower < 50) return "Kinetic Ward absorbed the blow.";
      return this.next ? this.next.handle(attackPower) : "Attack breached all wards!";
    }
  }
  
  class PlasmaShield extends WardHandler {
    handle(attackPower: number) {
      if (attackPower < 100) return "Plasma Shield dissipated the energy.";
      return this.next ? this.next.handle(attackPower) : "Attack breached all wards!";
    }
  }
tags: [behavioral, typescript, chain]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility decouples the sender of a magical assault from its receivers. A cascade of wards processes an incoming attack one by one; if a ward cannot withstand the blow, it seamlessly passes the energy to the next layer in the defense grid.
