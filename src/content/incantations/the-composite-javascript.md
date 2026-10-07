---
title: The Legion Composite
description: Compose arcane entities into tree structures to represent part-whole hierarchies.
type: javascript
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Necromancy // Swarm Control
formula: |
  class UndeadEntity {
    command() { throw new Error('Not implemented'); }
  }
  
  class Skeleton extends UndeadEntity {
    command() { console.log('Skeleton marches forward.'); }
  }
  
  class Zombie extends UndeadEntity {
    command() { console.log('Zombie groans and shambles.'); }
  }
  
  class UndeadLegion extends UndeadEntity {
    constructor() {
      super();
      this.units = [];
    }
    add(unit) { this.units.push(unit); }
    command() {
      console.log('Legion commander issues orders:');
      this.units.forEach(unit => unit.command());
    }
  }
  
  const squad = new UndeadLegion();
  squad.add(new Skeleton());
  squad.add(new Zombie());
  
  const army = new UndeadLegion();
  army.add(squad);
  army.add(new Skeleton());
  
  army.command();
tags: [hierarchy, swarms, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Legion Composite

A single skeletal warrior obeys the dark master's call just as an entire legion does. The Composite pattern treats the individual and the swarm interchangeably.
