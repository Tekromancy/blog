---
title: The Monolith Singleton
description: Ensure a magical construct has only one instance, and provide a global point of access to it.
type: javascript
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Abjuration // Leyline Anchoring
formula: |
  class LeylineNexus {
    constructor() {
      if (LeylineNexus.instance) {
        return LeylineNexus.instance;
      }
      this.mana = 1000;
      LeylineNexus.instance = this;
    }
    
    drawMana(amount) {
      if (this.mana >= amount) {
        this.mana -= amount;
        return amount;
      }
      return 0;
    }
  }
  
  const nexus1 = new LeylineNexus();
  const nexus2 = new LeylineNexus();
  
  nexus1.drawMana(200);
  console.log(nexus2.mana); // 800 - they share the same essence!
tags: [unique, singular, leylines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Monolith Singleton

There is only one true nexus of leyline energy. Attempting to create another will only tether you back to the original source. The Singleton ensures absolute synchronization of the weave.
