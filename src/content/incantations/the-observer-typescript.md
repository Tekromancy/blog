---
title: The Observer
description: Defining a one-to-many dependency to broadcast arcane state changes across the net.
type: typescript
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  interface ScryingOrb {
    update(manaLevel: number): void;
  }
  
  class LeylineNode {
    private observers: ScryingOrb[] = [];
    private manaLevel: number = 100;
    
    attach(orb: ScryingOrb) { this.observers.push(orb); }
    
    setManaLevel(level: number) {
      this.manaLevel = level;
      this.notifyObservers();
    }
    
    private notifyObservers() {
      for (const orb of this.observers) {
        orb.update(this.manaLevel);
      }
    }
  }
  
  class WizardTowerOrb implements ScryingOrb {
    update(manaLevel: number) {
      console.log(`Tower Orb detects new mana level: ${manaLevel}`);
    }
  }
tags: [behavioral, typescript, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Observer pattern lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing. It is the fundamental architecture of telepathic linkings and network alerts, ensuring all Scrying Orbs instantly sync when the Leyline shifts.
