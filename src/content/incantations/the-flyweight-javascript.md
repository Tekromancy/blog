---
title: The Swarm Flyweight
description: Use sharing to support large numbers of fine-grained entities efficiently.
type: javascript
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm Logistics"
formula: |2
  class ParticleEssence {
    constructor(color, sprite) {
      this.color = color;
      this.sprite = sprite;
    }
    render(x, y) {
      console.log(`Rendering ${this.color} spark at (${x}, ${y}) with ${this.sprite}`);
    }
  }

  class ParticleFactory {
    constructor() { this.essences = {}; }
    getEssence(color, sprite) {
      const key = `${color}_${sprite}`;
      if (!this.essences[key]) {
        this.essences[key] = new ParticleEssence(color, sprite);
      }
      return this.essences[key];
    }
  }

  class SwarmParticle {
    constructor(x, y, essence) {
      this.x = x; this.y = y; this.essence = essence;
    }
    draw() { this.essence.render(this.x, this.y); }
  }

  const factory = new ParticleFactory();
  const swarm = [];
  for(let i=0; i<1000; i++) {
    const essence = factory.getEssence('crimson', 'flame.png');
    swarm.push(new SwarmParticle(i, i*2, essence));
  }
tags: [optimization, swarms, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Swarm Flyweight

When summoning a swarm of a thousand locusts, storing the intrinsic magical essence for each one would drain you dry. Share the inner core and only store the spatial coordinates of the shell.
