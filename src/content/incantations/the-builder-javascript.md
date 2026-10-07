---
title: The Golem Builder
description: Incrementally assemble complex constructs, allowing the same process to yield different golems.
type: javascript
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Construct Assembly
formula: |
  class Golem {
    constructor() { this.parts = []; }
    add(part) { this.parts.push(part); }
    awaken() { console.log(`Awakened Golem with: ${this.parts.join(', ')}`); }
  }
  
  class GolemBuilder {
    constructor() { this.golem = new Golem(); }
    infuseCore() { return this; }
    attachLimbs() { return this; }
    inscribeRunes() { return this; }
    getGolem() { return this.golem; }
  }
  
  class IronGolemBuilder extends GolemBuilder {
    infuseCore() { this.golem.add('Molten Iron Core'); return this; }
    attachLimbs() { this.golem.add('Heavy Iron Plating'); return this; }
    inscribeRunes() { this.golem.add('Runes of Fortitude'); return this; }
  }
  
  class Director {
    constructBasic(builder) {
      builder.infuseCore().attachLimbs();
    }
    constructRunic(builder) {
      builder.infuseCore().attachLimbs().inscribeRunes();
    }
  }
  
  const director = new Director();
  const builder = new IronGolemBuilder();
  director.constructRunic(builder);
  builder.getGolem().awaken();
tags: [construction, golems, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Golem Builder

Not all creations can be manifested in a single breath. Some require the painstaking assembly of parts, step by step, layer by layer. The Builder allows for step-by-step conjuration of mighty constructs.
