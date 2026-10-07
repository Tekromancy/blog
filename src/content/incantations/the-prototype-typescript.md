---
title: The Prototype
description: Cloning pre-compiled arcane memory states to spawn instantaneous duplicates.
type: typescript
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  interface CloneableArcana {
    clone(): CloneableArcana;
  }
  
  class SpiritServitor implements CloneableArcana {
    constructor(public designation: string, public energyLevel: number) {}
    
    clone(): this {
      // Utilizing object spread for a shallow copy of the spirit matrix
      const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
      clone.designation += " (Echo)";
      return clone;
    }
  }
  
  const primeServitor = new SpiritServitor("Alpha", 9000);
  const echoServitor = primeServitor.clone();
tags: [creational, typescript, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype pattern specifies the kind of objects to create using a prototypical instance, and creates new objects by copying this prototype. In the fast-paced realm of cyber-magic, cloning a highly-complex matrix structure is vastly more efficient than recompiling it from scratch.
