---
title: The Strategy
description: Encapsulating interchangeable families of algorithms to dynamically select combat tactics.
type: typescript
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Analysis"
formula: |2
  interface CombatStrategy {
    execute(target: string): void;
  }
  
  class StealthStrike implements CombatStrategy {
    execute(target: string) { console.log(`Infiltrating and striking ${target} silently.`); }
  }
  
  class FrontalAssault implements CombatStrategy {
    execute(target: string) { console.log(`Unleashing devastating force on ${target}.`); }
  }
  
  class CyberMage {
    constructor(private strategy: CombatStrategy) {}
    
    setStrategy(strategy: CombatStrategy) { this.strategy = strategy; }
    
    engage(target: string) { this.strategy.execute(target); }
  }
tags: [behavioral, typescript, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it. A Cyber Mage can swap seamlessly between Stealth and Assault strategies simply by hot-swapping strict-typed logic chips at runtime.
