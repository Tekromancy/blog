---
title: The Mediator
description: Centralizing complex communication between disparate arcane subroutines.
type: typescript
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  interface NexusMediator {
    notify(sender: object, event: string): void;
  }
  
  class ManaPool {
    constructor(private mediator: NexusMediator) {}
    drain() { this.mediator.notify(this, 'Drained'); }
  }
  
  class ShieldGenerator {
    constructor(private mediator: NexusMediator) {}
    collapse() { this.mediator.notify(this, 'Collapsed'); }
  }
  
  class BattleNexus implements NexusMediator {
    public manaPool!: ManaPool;
    public shield!: ShieldGenerator;
    
    notify(sender: object, event: string) {
      if (event === 'Drained' && sender === this.manaPool) {
        console.log("Mana depleted. Shield collapsing automatically.");
        this.shield.collapse();
      }
    }
  }
tags: [behavioral, typescript, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by keeping the Mana Pool and Shield Generator from referring to each other directly; instead, they route all state changes through the Battle Nexus for centralized logic processing.
