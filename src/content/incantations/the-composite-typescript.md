---
title: The Composite
description: Treating individual spells and massive enchantments uniformly via strict type hierarchies.
type: typescript
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Matrix Linking"
formula: |2
  interface MagicComponent {
    execute(): void;
  }
  
  class Sigil implements MagicComponent {
    constructor(private name: string) {}
    execute(): void { console.log(`Triggering sigil: ${this.name}`); }
  }
  
  class SpellMatrix implements MagicComponent {
    private components: MagicComponent[] = [];
    
    add(component: MagicComponent) { this.components.push(component); }
    
    execute(): void {
      console.log("Activating Spell Matrix...");
      for (const comp of this.components) {
        comp.execute();
      }
    }
  }
tags: [structural, typescript, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern allows you to compose objects into tree structures to represent part-whole hierarchies. Whether casting a single sigil or a sprawling, recursive matrix of intertwined glyphs, the execution interface remains rigorously consistent.
