---
title: The Builder
description: Methodically assembling complex cyber-arcane constructs step-by-step using strict type checking.
type: typescript
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct"
formula: |2
  class Golem {
    public chassis: string = '';
    public core: string = '';
    public weapons: string[] = [];
  }
  
  interface GolemBuilder {
    setChassis(): this;
    installCore(): this;
    equipWeapons(): this;
    awaken(): Golem;
  }
  
  class ObsidianGolemBuilder implements GolemBuilder {
    private golem = new Golem();
    
    setChassis() { this.golem.chassis = 'Obsidian Plating'; return this; }
    installCore() { this.golem.core = 'Plasma Soul'; return this; }
    equipWeapons() { this.golem.weapons.push('Laser Scythe'); return this; }
    awaken() { return this.golem; }
  }
tags: [creational, typescript, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder pattern separates the construction of a complex magical entity from its representation. By executing a series of specific arcane procedures via strict typed glyphs, a single building process can manifest entirely different golems or cyber-constructs.
