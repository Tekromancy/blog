---
title: The Tactician Strategy
description: Define a family of magical algorithms, encapsulate each one, and make them interchangeable.
type: javascript
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Evocation // Tactics
formula: |
  class AttackStrategy { execute() {} }
  
  class FireballStrategy extends AttackStrategy {
    execute() { console.log("Casting devastating AoE Fireball!"); }
  }
  
  class MagicMissileStrategy extends AttackStrategy {
    execute() { console.log("Firing precise Magic Missiles."); }
  }
  
  class BattleMage {
    setStrategy(strategy) { this.strategy = strategy; }
    attack() { this.strategy.execute(); }
  }
  
  const mage = new BattleMage();
  mage.setStrategy(new FireballStrategy());
  mage.attack();
  
  mage.setStrategy(new MagicMissileStrategy());
  mage.attack();
tags: [algorithms, tactics, swapping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Tactician Strategy

A Battle Mage does not rely on a single spell. Depending on the foe, they swap their methodology entirely. The Strategy pattern lets the algorithm vary independently from the clients that use it.
