---
title: The Coven Mediator
description: Define an object that encapsulates how a set of magical objects interact, keeping them from referring to each other explicitly.
type: javascript
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Coven Bonding
formula: |
  class CovenCircle {
    constructor() { this.witches = []; }
    join(witch) {
      this.witches.push(witch);
      witch.coven = this;
    }
    channelPower(sender, amount) {
      this.witches.forEach(w => {
        if (w !== sender) {
          w.receivePower(amount);
        }
      });
    }
  }
  
  class Witch {
    constructor(name) { this.name = name; this.power = 0; this.coven = null; }
    cast(amount) {
      console.log(`${this.name} channels ${amount} power to the coven.`);
      this.coven.channelPower(this, amount);
    }
    receivePower(amount) {
      this.power += amount;
      console.log(`${this.name} received power. Current power: ${this.power}`);
    }
  }
  
  const circle = new CovenCircle();
  const w1 = new Witch("Morgana");
  const w2 = new Witch("Circe");
  
  circle.join(w1);
  circle.join(w2);
  
  w1.cast(50);
tags: [communication, decoupling, circles]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Coven Mediator

Witches in a coven do not pass power directly to each other; they channel it through the Circle. The Mediator coordinates all interactions, simplifying the web of dependencies.
