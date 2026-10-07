---
title: The Chronos Memento
description: Without violating encapsulation, capture and externalize an object's internal state so that it can be restored later.
type: javascript
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Time Reversal
formula: |
  class Memento {
    constructor(state) { this.state = state; }
    getState() { return this.state; }
  }
  
  class TimeWeaver {
    constructor() { this.mana = 100; this.location = "Tower"; }
    saveState() { return new Memento({ mana: this.mana, location: this.location }); }
    restoreState(memento) {
      const state = memento.getState();
      this.mana = state.mana;
      this.location = state.location;
    }
    cast() { this.mana -= 30; this.location = "Battlefield"; }
  }
  
  const weaver = new TimeWeaver();
  const timeline = weaver.saveState(); // Saved at Tower with 100 mana
  
  weaver.cast();
  console.log(`Mana: ${weaver.mana}, Location: ${weaver.location}`);
  
  weaver.restoreState(timeline);
  console.log(`Restored - Mana: ${weaver.mana}, Location: ${weaver.location}`);
tags: [state, history, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Chronos Memento

Chronomancers survive by anchoring themselves in time. The Memento pattern is a crystallized snapshot of reality, allowing the caster to rollback devastating mistakes.
