---
title: The Memento
description: Capturing and restoring an object's internal state to rewind temporal errors.
type: typescript
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Temporal Reversion"
formula: |2
  class SoulCrystal {
    constructor(private state: string) {}
    getState() { return this.state; }
  }
  
  class MageEntity {
    private hp: number = 100;
    
    saveState(): SoulCrystal {
      return new SoulCrystal(JSON.stringify({ hp: this.hp }));
    }
    
    restoreState(memento: SoulCrystal) {
      const state = JSON.parse(memento.getState());
      this.hp = state.hp;
      console.log(`HP restored to ${this.hp}`);
    }
    
    takeDamage() { this.hp -= 20; }
  }
tags: [behavioral, typescript, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern captures and externalizes an object's internal state without violating encapsulation. It serves as a literal chronomantic save point, allowing a mage to store their current condition in a Soul Crystal and revert back when reality fragments into undesirable outcomes.
