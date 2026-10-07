---
title: The State
description: Allowing an entity to radically alter its behavior when its internal magical state shifts.
type: typescript
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  interface ElementalState {
    attack(): string;
  }
  
  class FireForm implements ElementalState {
    attack() { return "Unleashing a torrent of flame!"; }
  }
  
  class IceForm implements ElementalState {
    attack() { return "Shattering foes with glacial spikes!"; }
  }
  
  class ElementalShapeshifter {
    private state: ElementalState;
    constructor(state: ElementalState) { this.state = state; }
    
    changeForm(newState: ElementalState) { this.state = newState; }
    
    strike() { console.log(this.state.attack()); }
  }
tags: [behavioral, typescript, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern allows an object to alter its behavior when its internal state changes. It appears as though the object changed its class. Perfect for entities like shapeshifters or adaptable combat drones that swap elemental affinities on the fly without unwieldy conditional statements.
